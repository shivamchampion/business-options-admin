import * as React from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000 // 5 seconds

/**
 * Store for toasts
 */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

/**
 * Reducer function for toast state
 */
const toastReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case actionTypes.DISMISS_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId || action.toastId === "all"
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }

    case actionTypes.REMOVE_TOAST:
      if (action.toastId === "all") {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

/**
 * Initial state for toast context
 */
const initialState = {
  toasts: [],
}

/**
 * Create toast context
 */
export const ToastContext = React.createContext({
  ...initialState,
  toast: () => {},
  dismiss: () => {},
})

/**
 * Toast provider component
 */
export function ToastProvider({ children }) {
  const [state, dispatch] = React.useReducer(toastReducer, initialState)

  const toast = React.useCallback(
    (props) => {
      const id = genId()

      const dismiss = () => dispatch({
        type: actionTypes.DISMISS_TOAST,
        toastId: id,
      })

      dispatch({
        type: actionTypes.ADD_TOAST,
        toast: {
          ...props,
          id,
          open: true,
          onOpenChange: (open) => {
            if (!open) {
              dismiss()
            }
          },
        },
      })

      return {
        id,
        dismiss,
        update: (props) => dispatch({
          type: actionTypes.UPDATE_TOAST,
          toast: { ...props, id },
        }),
      }
    },
    [dispatch]
  )

  const dismiss = React.useCallback(
    (toastId) => {
      dispatch({
        type: actionTypes.DISMISS_TOAST,
        toastId,
      })
    },
    [dispatch]
  )

  React.useEffect(() => {
    const timers = new Map()

    state.toasts.forEach((toast) => {
      if (!toast.open && !timers.has(toast.id)) {
        // Set timer to remove toast after it's closed
        const timer = setTimeout(() => {
          timers.delete(toast.id)
          dispatch({
            type: actionTypes.REMOVE_TOAST,
            toastId: toast.id,
          })
        }, TOAST_REMOVE_DELAY)

        timers.set(toast.id, timer)
      }
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [state.toasts, dispatch])

  return (
    <ToastContext.Provider
      value={{
        ...state,
        toast,
        dismiss,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

/**
 * Toast hook
 */
export const useToast = () => {
  const context = React.useContext(ToastContext)

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return context
}

/**
 * Toast component
 */
export function toast({ children, ...props }) {
  return (
    <div
      className="group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-slate-200 p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full"
      {...props}
    >
      {children}
    </div>
  )
}