import { Routes, Route, Navigate } from 'react-router-dom';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NavigationProvider } from './contexts/NavigationContext';

// Layout
import MainLayout from './components/layout/MainLayout';

// Common Components
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
              
              {/* User Management - Admin only */}
              <Route path="/users">
                <Route index element={
                  <ProtectedRoute requiredPermission="users.view">
                    <UserList />
                  </ProtectedRoute>
                } />
                <Route path="create" element={
                  <ProtectedRoute requiredPermission="users.create">
                    <UserCreate />
                  </ProtectedRoute>
                } />
                <Route path=":userId" element={
                  <ProtectedRoute requiredPermission="users.view">
                    <UserDetail />
                  </ProtectedRoute>
                } />
                <Route path=":userId/edit" element={
                  <ProtectedRoute requiredPermission="users.edit">
                    <UserEdit />
                  </ProtectedRoute>
                } />
              </Route>
              
              <Route path="/roles">
                <Route index element={
                  <ProtectedRoute requiredPermission="users.view">
                    <RoleList />
                  </ProtectedRoute>
                } />
                <Route path="create" element={
                  <ProtectedRoute requiredPermission="users.create">
                    <RoleCreate />
                  </ProtectedRoute>
                } />
                <Route path=":roleId/edit" element={
                  <ProtectedRoute requiredPermission="users.edit">
                    <RoleEdit />
                  </ProtectedRoute>
                } />
              </Route>
              
              {/* Advisor Management */}
              <Route path="/advisors">
                <Route index element={
                  <ProtectedRoute requiredPermission="advisors.view">
                    <AdvisorList />
                  </ProtectedRoute>
                } />
                <Route path="create" element={
                  <ProtectedRoute requiredPermission="advisors.create">
                    <AdvisorCreate />
                  </ProtectedRoute>
                } />
                <Route path=":advisorId" element={
                  <ProtectedRoute requiredPermission="advisors.view">
                    <AdvisorDetail />
                  </ProtectedRoute>
                } />
                <Route path=":advisorId/edit" element={
                  <ProtectedRoute requiredPermission="advisors.edit">
                    <AdvisorEdit />
                  </ProtectedRoute>
                } />
              </Route>
              
              <Route path="/leads">
                <Route index element={
                  <ProtectedRoute requiredPermission="advisors.view">
                    <LeadList />
                  </ProtectedRoute>
                } />
                <Route path=":leadId" element={
                  <ProtectedRoute requiredPermission="advisors.view">
                    <LeadDetail />
                  </ProtectedRoute>
                } />
              </Route>
              
              <Route path="/commission-structure" element={
                <ProtectedRoute requiredPermission="advisors.view">
                  <CommissionStructure />
                </ProtectedRoute>
              } />
              <Route path="/payments" element={
                <ProtectedRoute requiredPermission="advisors.view">
                  <Payments />
                </ProtectedRoute>
              } />
              
              {/* Listings Management */}
              <Route path="/listings">
                <Route index element={
                  <ProtectedRoute requiredPermission="listings.view">
                    <ListingList />
                  </ProtectedRoute>
                } />
                <Route path="create" element={
                  <ProtectedRoute requiredPermission="listings.create">
                    <ListingCreate />
                  </ProtectedRoute>
                } />
                <Route path=":listingId" element={
                  <ProtectedRoute requiredPermission="listings.view">
                    <ListingDetail />
                  </ProtectedRoute>
                } />
                <Route path=":listingId/edit" element={
                  <ProtectedRoute requiredPermission="listings.edit">
                    <ListingEdit />
                  </ProtectedRoute>
                } />
                <Route path="featured" element={
                  <ProtectedRoute requiredPermission="listings.view">
                    <FeaturedListings />
                  </ProtectedRoute>
                } />
                <Route path="pending" element={
                  <ProtectedRoute requiredPermission="listings.approve">
                    <PendingApproval />
                  </ProtectedRoute>
                } />
              </Route>
              
              {/* Insta Apply */}
              <Route path="/applications">
                <Route index element={
                  <ProtectedRoute requiredPermission="instapply.view">
                    <ApplicationList />
                  </ProtectedRoute>
                } />
                <Route path=":applicationId" element={
                  <ProtectedRoute requiredPermission="instapply.view">
                    <ApplicationDetail />
                  </ProtectedRoute>
                } />
                <Route path="new" element={
                  <ProtectedRoute requiredPermission="instapply.view">
                    <NewApplications />
                  </ProtectedRoute>
                } />
                <Route path="processed" element={
                  <ProtectedRoute requiredPermission="instapply.view">
                    <ProcessedApplications />
                  </ProtectedRoute>
                } />
              </Route>
              
              {/* Content Management */}
              <Route path="/content">
                <Route path="pages">
                  <Route index element={
                    <ProtectedRoute requiredPermission="content.view">
                      <Pages />
                    </ProtectedRoute>
                  } />
                </Route>
                <Route path="blogs">
                  <Route index element={
                    <ProtectedRoute requiredPermission="content.view">
                      <Blogs />
                    </ProtectedRoute>
                  } />
                </Route>
                <Route path="faqs">
                  <Route index element={
                    <ProtectedRoute requiredPermission="content.view">
                      <Faqs />
                    </ProtectedRoute>
                  } />
                </Route>
                <Route path="testimonials">
                  <Route index element={
                    <ProtectedRoute requiredPermission="content.view">
                      <Testimonials />
                    </ProtectedRoute>
                  } />
                </Route>
                <Route path="media" element={
                  <ProtectedRoute requiredPermission="content.view">
                    <MediaLibrary />
                  </ProtectedRoute>
                } />
              </Route>
              
              {/* Analytics */}
              <Route path="/analytics">
                <Route index element={
                  <ProtectedRoute requiredPermission="analytics.view">
                    <AnalyticsOverview />
                  </ProtectedRoute>
                } />
                <Route path="users" element={
                  <ProtectedRoute requiredPermission="analytics.view">
                    <UserAnalytics />
                  </ProtectedRoute>
                } />
                <Route path="listings" element={
                  <ProtectedRoute requiredPermission="analytics.view">
                    <ListingAnalytics />
                  </ProtectedRoute>
                } />
                <Route path="conversions" element={
                  <ProtectedRoute requiredPermission="analytics.view">
                    <ConversionReports />
                  </ProtectedRoute>
                } />
                <Route path="advisors" element={
                  <ProtectedRoute requiredPermission="analytics.view">
                    <AdvisorPerformance />
                  </ProtectedRoute>
                } />
              </Route>
              
              {/* Settings */}
              <Route path="/settings">
                <Route index element={
                  <ProtectedRoute requiredPermission="settings.view">
                    <GeneralSettings />
                  </ProtectedRoute>
                } />
                <Route path="email-templates" element={
                  <ProtectedRoute requiredPermission="settings.view">
                    <EmailTemplates />
                  </ProtectedRoute>
                } />
                <Route path="payment-gateway" element={
                  <ProtectedRoute requiredPermission="settings.view">
                    <PaymentGateway />
                  </ProtectedRoute>
                } />
                <Route path="subscription-plans" element={
                  <ProtectedRoute requiredPermission="settings.view">
                    <SubscriptionPlans />
                  </ProtectedRoute>
                } />
                <Route path="system-logs" element={
                  <ProtectedRoute requiredPermission="settings.view">
                    <SystemLogs />
                  </ProtectedRoute>
                } />
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