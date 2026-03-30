import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import Login from './pages/public/Login';
import RegisterOrg from './pages/public/RegisterOrg';
import ForgotPassword from './pages/public/ForgotPassword';
import ResetPassword from './pages/public/ResetPassword';
import CapabilityDetails from './pages/public/Capabilities';
import PrivacyPolicy from './pages/public/Legal/PrivacyPolicy';
import TermsOfService from './pages/public/Legal/TermsOfService';
import LegalNotice from './pages/public/Legal/LegalNotice';
import Unauthorized from './pages/public/Unauthorized';

// Admin — layout + pages (Outlet-based, same pattern as receptionist)
import AdminLayout from './admin/AdminLayout.jsx';
import Dashboard from './admin/pages/Dashboard.jsx';
import ManageStaff from './admin/pages/ManageStaff.jsx';
import VisitorLogs from './admin/pages/VisitorLogs.jsx';
import AppointmentsAdmin from './admin/pages/AppointmentsAdmin.jsx';
import Reports from './admin/pages/Reports.jsx';
import Settings from './admin/pages/Settings.jsx';

// Receptionist layout & pages
import ReceptionistLayout from './recept/layouts/ReceptionistLayout.jsx';
import AppointmentView from './recept/pages/receptionist/AppointmentView.jsx';
import CheckIn from './recept/pages/receptionist/CheckIn.jsx';
import CheckOut from './recept/pages/receptionist/Checkout.jsx';
import LiveBoard from './recept/pages/receptionist/LiveBoard.jsx';

// Security layout & pages
import SecurityLayout from './recept/layouts/SecurityLayout.jsx';
import RealTimeMonitor from './recept/pages/security/RealTimeMonitor.jsx';
import EmergencyMode from './recept/pages/security/EmergencyMode.jsx';

import ProtectedRoute from './components/common/ProtectedRoute';

// If already logged in, redirect "/" to the correct panel
function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <LandingPage />;
  if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  if (user.role === 'receptionist') return <Navigate to="/receptionist/appointments" replace />;
  if (user.role === 'security') return <Navigate to="/security/monitor" replace />;
  return <LandingPage />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" />
        <Routes>
          {/* Public */}
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterOrg />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/capabilities/:id" element={<CapabilityDetails />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* ── ADMIN PANEL ── */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"    element={<Dashboard />} />
            <Route path="staff"        element={<ManageStaff />} />
            <Route path="visitor-logs" element={<VisitorLogs />} />
            <Route path="appointments" element={<AppointmentsAdmin />} />
            <Route path="reports"      element={<Reports />} />
            <Route path="settings"     element={<Settings />} />
          </Route>

          {/* ── RECEPTIONIST PANEL ── */}
          <Route
            path="/receptionist"
            element={
              <ProtectedRoute allowedRoles={['receptionist']}>
                <ReceptionistLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="appointments" replace />} />
            <Route path="appointments" element={<AppointmentView />} />
            <Route path="check-in"     element={<CheckIn />} />
            <Route path="check-out"    element={<CheckOut />} />
            <Route path="live-board"   element={<LiveBoard />} />
          </Route>

          {/* ── SECURITY PANEL ── */}
          <Route
            path="/security"
            element={
              <ProtectedRoute allowedRoles={['security', 'admin']}>
                <SecurityLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="monitor" replace />} />
            <Route path="monitor"   element={<RealTimeMonitor />} />
            <Route path="emergency" element={<EmergencyMode />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
