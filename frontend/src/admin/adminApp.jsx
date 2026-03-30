import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ManageStaff from './pages/ManageStaff.jsx';
import VisitorLogs from './pages/VisitorLogs.jsx';
import AppointmentsAdmin from './pages/AppointmentsAdmin.jsx';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings.jsx';
import { LayoutDashboard, Search, Bell, Settings as SettingsIcon, Shield, BarChart3, LogOut, AlertCircle } from 'lucide-react';
import { useAppContext } from './context/AppContext.jsx';

const SEARCH_INDEX = [
  { label: 'Dashboard',             description: 'Overview, stats, peak hours',            path: '/admin/dashboard' },
  { label: 'Manage Staff',          description: 'Add, edit, remove staff members',        path: '/admin/staff' },
  { label: 'Add Staff Member',      description: 'Open the add staff modal',               path: '/admin/staff',        section: 'add' },
  { label: 'Visitor Logs',          description: 'Recent visitor activity',                path: '/admin/visitor-logs' },
  { label: 'Appointments',          description: 'Schedule and manage appointments',       path: '/admin/appointments' },
  { label: 'Schedule Appointment',  description: 'Open the schedule appointment form',     path: '/admin/appointments', section: 'schedule' },
  { label: 'Reports & Analytics',   description: 'Charts, exports, overdue visitors',      path: '/admin/reports' },
  { label: 'Settings',              description: 'Organization, security, notifications',  path: '/admin/settings' },
  { label: 'Security Settings',     description: 'Change password, session timeout',       path: '/admin/settings',     section: 'security' },
  { label: 'Notification Settings', description: 'Email alerts, host notifications',       path: '/admin/settings',     section: 'notifications' },
];

function HeaderBar({ onLogout }) {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, notifications, markAllRead } = useAppContext();

  const [searchText, setSearchText]       = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch]       = useState(false);
  const [showBell, setShowBell]           = useState(false);
  const [showUserMenu, setShowUserMenu]   = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const bellRef     = useRef(null);
  const userMenuRef = useRef(null);
  const searchRef   = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const initials    = currentUser.firstName.slice(0, 2).toUpperCase();

  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setShowBell(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setShowUserMenu(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (val) => {
    setSearchText(val);
    if (!val.trim()) { setSearchResults([]); setShowSearch(false); return; }
    const filtered = SEARCH_INDEX.filter(e =>
      e.label.toLowerCase().includes(val.toLowerCase()) ||
      e.description.toLowerCase().includes(val.toLowerCase())
    );
    setSearchResults(filtered);
    setShowSearch(true);
  };

  const handleSearchSelect = (entry) => {
    const path = entry.section ? `${entry.path}?highlight=${entry.section}` : entry.path;
    navigate(path);
    setSearchText('');
    setSearchResults([]);
    setShowSearch(false);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    setShowUserMenu(false);
    onLogout();
  };

  return (
    <header className="h-16 flex items-center justify-end px-8 gap-4 bg-[#FDF6F0] border-b border-[#E8D9CF] flex-shrink-0">
      {/* Search */}
      <div className="relative" ref={searchRef}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          value={searchText}
          onChange={e => handleSearch(e.target.value)}
          onFocus={() => searchText && setShowSearch(true)}
          placeholder="Search..."
          className="pl-10 pr-4 py-1.5 rounded-full bg-white border border-[#E8D9CF] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 text-sm w-64"
        />
        {showSearch && (
          <div className="absolute right-0 top-10 z-50 w-80 bg-white border border-[#E8D9CF] rounded-xl shadow-xl overflow-hidden">
            {searchResults.length === 0
              ? <p className="px-4 py-3 text-sm text-gray-400">No results found.</p>
              : searchResults.map((entry, i) => (
                <button
                  key={i}
                  onMouseDown={() => handleSearchSelect(entry)}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#F5E6DA] border-b border-gray-50 last:border-0"
                >
                  <p className="text-sm font-semibold text-gray-800">{entry.label}</p>
                  <p className="text-xs text-gray-400">{entry.description}</p>
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Bell */}
      <div className="relative" ref={bellRef}>
        <button
          type="button"
          onClick={() => { setShowBell(s => !s); if (!showBell) markAllRead(); }}
          className="p-2 text-gray-400 hover:text-gray-600 relative"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {showBell && (
          <div className="absolute right-0 top-12 z-50 w-80 bg-white border border-[#E8D9CF] rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-100">
              <p className="font-semibold text-gray-800">Notifications</p>
              <span className="text-xs text-gray-400">{notifications.length} total</span>
            </div>
            <ul className="max-h-80 overflow-y-auto divide-y divide-gray-50">
              {notifications.length === 0
                ? <li className="px-4 py-6 text-center text-sm text-gray-400">No notifications yet.</li>
                : [...notifications].reverse().map(n => (
                  <li key={n.id} className={`px-4 py-3 hover:bg-gray-50 ${!n.read ? 'bg-[#FDF6F0]' : ''}`}>
                    {!n.read && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8B5E3C] mr-2 mb-0.5" />}
                    <span className="text-sm text-gray-700">{n.message}</span>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(n.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {/* User Menu */}
      <div className="relative" ref={userMenuRef}>
        <button
          type="button"
          onClick={() => setShowUserMenu(s => !s)}
          className="w-9 h-9 rounded-full bg-[#8B5E3C] flex items-center justify-center text-white font-bold text-xs overflow-hidden ring-2 ring-transparent hover:ring-[#8B5E3C]/40 transition-all"
        >
          {currentUser.avatarUrl
            ? <img src={currentUser.avatarUrl} className="w-full h-full object-cover" alt="avatar" />
            : initials}
        </button>

        {showUserMenu && (
          <div className="absolute right-0 top-12 z-50 w-56 bg-white border border-[#E8D9CF] rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-4 py-3 bg-[#FDF6F0] border-b border-[#E8D9CF]">
              <p className="font-semibold text-gray-800 text-sm">{currentUser.firstName}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
            <ul className="py-1 text-sm text-gray-700">
              <li>
                <button onClick={() => { navigate('/admin/settings'); setShowUserMenu(false); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#F5E6DA] flex items-center gap-2">
                  <SettingsIcon size={15} /> Account Settings
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('/admin/settings?highlight=security'); setShowUserMenu(false); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#F5E6DA] flex items-center gap-2">
                  <Shield size={15} /> Change Password
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('/admin/reports'); setShowUserMenu(false); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#F5E6DA] flex items-center gap-2">
                  <BarChart3 size={15} /> Reports
                </button>
              </li>
              <li className="border-t border-gray-100">
                <button onClick={() => setShowLogoutConfirm(true)}
                  className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 flex items-center gap-2">
                  <LogOut size={15} /> Sign Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
            <div className="flex flex-col items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle size={20} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Sign Out?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to sign out? You'll need to log in again to access the system.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={confirmLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function AdminApp({ onLogout }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onLogout={onLogout} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <HeaderBar onLogout={onLogout} />
        <div className="flex-1 overflow-auto p-8 bg-[#FDF6F0]">
          <Routes>
            <Route path="dashboard"    element={<Dashboard />} />
            <Route path="staff"        element={<ManageStaff />} />
            <Route path="visitor-logs" element={<VisitorLogs />} />
            <Route path="appointments" element={<AppointmentsAdmin />} />
            <Route path="reports"      element={<Reports />} />
            <Route path="settings"     element={<Settings />} />
            <Route path="/"            element={<Navigate to="dashboard" replace />} />
            <Route path="*"            element={<Navigate to="dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default AdminApp;
