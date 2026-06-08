import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Layouts
import UserLayout from './components/UserLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// User Pages
import Home from './pages/user/Home';
import Products from './pages/user/Products';
import Promotion from './pages/user/Promotion';
import Profile from './pages/user/Profile';
import Recharge from './pages/user/Recharge';
import Withdraw from './pages/user/Withdraw';
import BankDetails from './pages/user/BankDetails';
import Subscriptions from './pages/user/Subscriptions';
import Records from './pages/user/Records';
import GiftCode from './pages/user/GiftCode';
import Support from './pages/user/Support';
import ReferralEarnings from './pages/user/ReferralEarnings';
import PortfolioAnalytics from './pages/user/PortfolioAnalytics';
import VipClub from './pages/user/VipClub';
import KycVerification from './pages/user/KycVerification';
import Calculator from './pages/user/Calculator';
import Academy from './pages/user/Academy';
import Watchlist from './pages/user/Watchlist';
import AboutUs from './pages/user/AboutUs';
import UserNotifications from './pages/user/Notifications';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminKycRequests from './pages/admin/AdminKycRequests';
import AdminSupportDesk from './pages/admin/SupportDesk';
import AdminNotifications from './pages/admin/Notifications';
import AdminUsers from './pages/admin/Users';
import AdminBankRequests from './pages/admin/BankRequests';
import AdminWithdrawals from './pages/admin/Withdrawals';
import AdminGiftCodes from './pages/admin/GiftCodes';
import AdminProducts from './pages/admin/Products';
import AdminSystemLogs from './pages/admin/SystemLogs';

import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'ADMIN') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected User Routes wrapped in UserLayout */}
            <Route element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/promotion" element={<Promotion />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/recharge" element={<Recharge />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/bank" element={<BankDetails />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/records" element={<Records />} />
              <Route path="/gift" element={<GiftCode />} />
              <Route path="/support" element={<Support />} />
              <Route path="/referral-earnings" element={<ReferralEarnings />} />
              <Route path="/portfolio" element={<PortfolioAnalytics />} />
              <Route path="/vip-club" element={<VipClub />} />
              <Route path="/kyc" element={<KycVerification />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/notifications" element={<UserNotifications />} />
            </Route>

            {/* Admin Routes (AdminLayout could be added similarly later) */}
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            <Route path="/admin/bank-requests" element={<AdminRoute><AdminBankRequests /></AdminRoute>} />
            <Route path="/admin/kyc" element={<AdminRoute><AdminKycRequests /></AdminRoute>} />
            <Route path="/admin/support" element={<AdminRoute><AdminSupportDesk /></AdminRoute>} />
            <Route path="/admin/notifications" element={<AdminRoute><AdminNotifications /></AdminRoute>} />
            <Route path="/admin/withdrawals" element={<AdminRoute><AdminWithdrawals /></AdminRoute>} />
            <Route path="/admin/gift-codes" element={<AdminRoute><AdminGiftCodes /></AdminRoute>} />
            <Route path="/admin/logs" element={<AdminRoute><AdminSystemLogs /></AdminRoute>} />

            {/* 404 Not Found */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-ivory">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                    <p className="text-ash text-xl mb-6">Page Not Found</p>
                    <a href="/login" className="btn-primary">
                      Go to Login
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>

          {/* Toast Notifications */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#FFFFFF',
                color: '#1A1A1A',
                border: '1px solid #E5E7EB',
                padding: '16px',
                borderRadius: '12px',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#00D09C', // Groww Green
                  secondary: '#FFFFFF',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#FFFFFF',
                },
              },
            }}
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
