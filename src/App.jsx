import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NavigationProvider } from './contexts/NavigationContext';

// Layout
import MainLayout from './components/layout/MainLayout';

// Common Components
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// User pages
import UserList from './pages/users/UserList';
import UserDetail from './pages/users/UserDetail';
import UserCreate from './pages/users/UserCreate';
import UserEdit from './pages/users/UserEdit';
import RoleList from './pages/users/RoleList';
import RoleCreate from './pages/users/RoleCreate';
import RoleEdit from './pages/users/RoleEdit';

// Advisor pages
import AdvisorList from './pages/advisors/AdvisorList';
import AdvisorDetail from './pages/advisors/AdvisorDetail';
import AdvisorCreate from './pages/advisors/AdvisorCreate';
import AdvisorEdit from './pages/advisors/AdvisorEdit';
import LeadList from './pages/advisors/LeadList';
import LeadDetail from './pages/advisors/LeadDetail';
import CommissionStructure from './pages/advisors/CommissionStructure';
import Payments from './pages/advisors/Payments';

// Listing pages
import ListingList from './pages/listings/ListingList';
import ListingDetail from './pages/listings/ListingDetail';
import ListingCreate from './pages/listings/ListingCreate';
import ListingEdit from './pages/listings/ListingEdit';
import FeaturedListings from './pages/listings/FeaturedListings';
import PendingApproval from './pages/listings/PendingApproval';

// Insta Apply pages
import ApplicationList from './pages/insta-apply/ApplicationList';
import ApplicationDetail from './pages/insta-apply/ApplicationDetail';
import NewApplications from './pages/insta-apply/NewApplications';
import ProcessedApplications from './pages/insta-apply/ProcessedApplications';

// Content pages
import Pages from './pages/content/Pages';
import Blogs from './pages/content/Blogs';
import Faqs from './pages/content/Faqs';
import Testimonials from './pages/content/Testimonials';
import MediaLibrary from './pages/content/MediaLibrary';

// Analytics pages
import AnalyticsOverview from './pages/analytics/Overview';
import UserAnalytics from './pages/analytics/UserAnalytics';
import ListingAnalytics from './pages/analytics/ListingAnalytics';
import ConversionReports from './pages/analytics/ConversionReports';
import AdvisorPerformance from './pages/analytics/AdvisorPerformance';

// Settings pages
import GeneralSettings from './pages/settings/GeneralSettings';
import EmailTemplates from './pages/settings/EmailTemplates';
import PaymentGateway from './pages/settings/PaymentGateway';
import SubscriptionPlans from './pages/settings/SubscriptionPlans';
import SystemLogs from './pages/settings/SystemLogs';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* User Management */}
              <Route path="/users">
                <Route index element={<UserList />} />
                <Route path="create" element={<UserCreate />} />
                <Route path=":userId" element={<UserDetail />} />
                <Route path=":userId/edit" element={<UserEdit />} />
              </Route>
              
              <Route path="/roles">
                <Route index element={<RoleList />} />
                <Route path="create" element={<RoleCreate />} />
                <Route path=":roleId/edit" element={<RoleEdit />} />
              </Route>
              
              {/* Advisor Management */}
              <Route path="/advisors">
                <Route index element={<AdvisorList />} />
                <Route path="create" element={<AdvisorCreate />} />
                <Route path=":advisorId" element={<AdvisorDetail />} />
                <Route path=":advisorId/edit" element={<AdvisorEdit />} />
              </Route>
              
              <Route path="/leads">
                <Route index element={<LeadList />} />
                <Route path=":leadId" element={<LeadDetail />} />
              </Route>
              
              <Route path="/commission-structure" element={<CommissionStructure />} />
              <Route path="/payments" element={<Payments />} />
              
              {/* Listings Management */}
              <Route path="/listings">
                <Route index element={<ListingList />} />
                <Route path="create" element={<ListingCreate />} />
                <Route path=":listingId" element={<ListingDetail />} />
                <Route path=":listingId/edit" element={<ListingEdit />} />
                <Route path="featured" element={<FeaturedListings />} />
                <Route path="pending" element={<PendingApproval />} />
              </Route>
              
              {/* Insta Apply */}
              <Route path="/applications">
                <Route index element={<ApplicationList />} />
                <Route path=":applicationId" element={<ApplicationDetail />} />
                <Route path="new" element={<NewApplications />} />
                <Route path="processed" element={<ProcessedApplications />} />
              </Route>
              
              {/* Content Management */}
              <Route path="/content">
                <Route path="pages">
                  <Route index element={<Pages />} />
                </Route>
                <Route path="blogs">
                  <Route index element={<Blogs />} />
                </Route>
                <Route path="faqs">
                  <Route index element={<Faqs />} />
                </Route>
                <Route path="testimonials">
                  <Route index element={<Testimonials />} />
                </Route>
                <Route path="media" element={<MediaLibrary />} />
              </Route>
              
              {/* Analytics */}
              <Route path="/analytics">
                <Route index element={<AnalyticsOverview />} />
                <Route path="users" element={<UserAnalytics />} />
                <Route path="listings" element={<ListingAnalytics />} />
                <Route path="conversions" element={<ConversionReports />} />
                <Route path="advisors" element={<AdvisorPerformance />} />
              </Route>
              
              {/* Settings */}
              <Route path="/settings">
                <Route index element={<GeneralSettings />} />
                <Route path="email-templates" element={<EmailTemplates />} />
                <Route path="payment-gateway" element={<PaymentGateway />} />
                <Route path="subscription-plans" element={<SubscriptionPlans />} />
                <Route path="system-logs" element={<SystemLogs />} />
              </Route>
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </NavigationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
