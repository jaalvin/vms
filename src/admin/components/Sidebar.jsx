import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, FileText, Calendar, BarChart3,
  Settings, LogOut, AlertCircle,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAppContext } from '../context/AppContext.jsx';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',    path: '/admin/dashboard' },
  { icon: Users,           label: 'Manage Staff', path: '/admin/staff' },
  { icon: FileText,        label: 'Visitor Logs', path: '/admin/visitor-logs' },
  { icon: Calendar,        label: 'Appointments', path: '/admin/appointments' },
  { icon: BarChart3,       label: 'Reports',      path: '/admin/reports' },
  { icon: Settings,        label: 'Settings',     path: '/admin/settings' },
];

export default function Sidebar({ onLogout }) {
  const [logoError, setLogoError] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { currentUser, setCurrentUser } = useAppContext();
  const navigate     = useNavigate();
  const fileInputRef = useRef(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCurrentUser({ ...currentUser, avatarUrl: reader.result });
    reader.readAsDataURL(file);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  const initials = currentUser.firstName
    ? currentUser.firstName.slice(0, 2).toUpperCase()
    : 'AD';

  return (
    <aside className="w-64 bg-[#FDF6F0] border-r border-[#E8D9CF] flex flex-col flex-shrink-0">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          {logoError ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '10px',
                background: '#8B573A', display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0
              }}>
                <span style={{ color: '#fff', fontSize: '22px', fontWeight: 700, fontFamily: 'Georgia, serif' }}>V</span>
              </div>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 700, color: '#8B573A', letterSpacing: '4px' }}>VMS</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '10px',
                background: '#8B573A', display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0
              }}>
                <span style={{ color: '#fff', fontSize: '22px', fontWeight: 700, fontFamily: 'Georgia, serif' }}>V</span>
              </div>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 700, color: '#8B573A', letterSpacing: '4px' }}>VMS</span>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-3 mb-8 p-3 bg-white rounded-xl border border-[#E8D9CF]">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 rounded-full bg-[#8B5E3C] flex items-center justify-center text-white font-bold text-sm overflow-hidden ring-2 ring-[#8B5E3C]/20 hover:ring-[#8B5E3C]/40 transition-all cursor-pointer flex-shrink-0"
            title="Click to upload avatar"
          >
            {currentUser.avatarUrl
              ? <img src={currentUser.avatarUrl} className="w-full h-full object-cover" alt="avatar" />
              : initials}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{currentUser.firstName}</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#8B5E3C] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-[#F5E6DA] hover:text-gray-800'
                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="mt-auto p-6 border-t border-[#E8D9CF]">
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
            <div className="flex flex-col items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle size={20} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Sign Out?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to sign out?</p>
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
    </aside>
  );
}
