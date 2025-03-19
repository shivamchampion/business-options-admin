import { useContext } from 'react';
import { NavigationContext } from '../contexts/NavigationContext';

// Custom hook to use the NavigationContext
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  
  return context;
};