import { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppContextProvider } from './context/AppContext.jsx';
import './styles.css';

const NAV_ITEMS = [
  {
    label: 'Dashboard', path: '/admin/dashboard',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
  },
  {
    label: 'Manage Staff', path: '/admin/staff',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
  },
  {
    label: 'Visitor Logs', path: '/admin/visitor-logs',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
  },
  {
    label: 'Appointments', path: '/admin/appointments',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  },
  {
    label: 'Reports', path: '/admin/reports',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  },
  {
    label: 'Settings', path: '/admin/settings',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
  },
];

const SEARCH_INDEX = [
  { label: 'Dashboard',             desc: 'Overview, stats, peak hours',           path: '/admin/dashboard' },
  { label: 'Manage Staff',          desc: 'Add, edit, remove staff members',       path: '/admin/staff' },
  { label: 'Visitor Logs',          desc: 'Recent visitor activity',               path: '/admin/visitor-logs' },
  { label: 'Appointments',          desc: 'Schedule and manage appointments',      path: '/admin/appointments' },
  { label: 'Reports & Analytics',   desc: 'Charts, exports, overdue visitors',     path: '/admin/reports' },
  { label: 'Settings',              desc: 'Organization, security, notifications', path: '/admin/settings' },
];

function AdminLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Topbar state
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showBell, setShowBell] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Avatar upload state
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileInputRef = useRef(null);

  const bellRef     = useRef(null);
  const userRef     = useRef(null);
  const searchRef   = useRef(null);

  const initials    = user?.initials || user?.fullName?.slice(0, 2).toUpperCase() || 'AD';
  const displayName = user?.fullName || 'Admin';

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setShowBell(false);
      if (userRef.current && !userRef.current.contains(e.target)) setShowUserMenu(false);
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
      e.desc.toLowerCase().includes(val.toLowerCase())
    );
    setSearchResults(filtered);
    setShowSearch(true);
  };

  const handleSearchSelect = (entry) => {
    navigate(entry.path);
    setSearchText(''); setSearchResults([]); setShowSearch(false);
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <AppContextProvider authUser={user}>
      <div className="admin-shell">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div className="admin-sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* ── SIDEBAR ── */}
        <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="admin-sidebar-top">
            {/* Logo */}
            <div className="admin-sidebar-logo">
              <div className="admin-logo-box">
                <span className="admin-logo-letter">V</span>
              </div>
              <span className="admin-logo-text">VMS</span>
            </div>

            {/* Role badge */}
            <div className="admin-role-badge">Admin Panel</div>

            {/* User info */}
            <div className="admin-sidebar-user">
              <button
                className="admin-avatar"
                onClick={() => fileInputRef.current?.click()}
                title="Click to upload avatar"
              >
                {avatarUrl
                  ? <img src={avatarUrl} alt="avatar" />
                  : initials}
              </button>
              <input
                ref={fileInputRef} type="file" accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarUpload}
              />
              <div>
                <div className="admin-user-name">{displayName}</div>
                <div className="admin-user-role">Administrator</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="admin-sidebar-nav">
            {NAV_ITEMS.map(({ label, path, icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `admin-nav-item${isActive ? ' active' : ''}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="admin-nav-icon">{icon}</span>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="admin-sidebar-bottom">
            <button className="admin-logout-btn" onClick={() => setShowLogoutModal(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="admin-main">

          {/* Mobile topbar */}
          <div className="admin-mobile-topbar">
            <button className="admin-mobile-menu-btn" onClick={() => setIsSidebarOpen(s => !s)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <span className="admin-mobile-logo">VMS Admin</span>
          </div>

          {/* Desktop topbar */}
          <header className="admin-topbar">
            {/* Search */}
            <div className="admin-search-wrap" ref={searchRef}>
              <svg className="admin-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search..."
                value={searchText}
                onChange={e => handleSearch(e.target.value)}
                onFocus={() => searchText && setShowSearch(true)}
              />
              {showSearch && (
                <div className="admin-search-dropdown">
                  {searchResults.length === 0
                    ? <div className="admin-search-empty">No results found.</div>
                    : searchResults.map((entry, i) => (
                      <button key={i} className="admin-search-item" onMouseDown={() => handleSearchSelect(entry)}>
                        <div className="admin-search-label">{entry.label}</div>
                        <div className="admin-search-desc">{entry.desc}</div>
                      </button>
                    ))
                  }
                </div>
              )}
            </div>

            {/* Bell */}
            <div className="admin-bell-wrap" ref={bellRef}>
              <button className="admin-bell-btn" onClick={() => setShowBell(s => !s)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
                <span className="admin-bell-dot" />
              </button>
              {showBell && (
                <div className="admin-notif-dropdown">
                  <div className="admin-notif-header">
                    <span className="admin-notif-title">Notifications</span>
                    <span className="admin-notif-count">0 total</span>
                  </div>
                  <div className="admin-notif-empty">No notifications yet.</div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="admin-user-wrap" ref={userRef}>
              <button className="admin-user-btn" onClick={() => setShowUserMenu(s => !s)}>
                {avatarUrl ? <img src={avatarUrl} alt="avatar" /> : initials}
              </button>
              {showUserMenu && (
                <div className="admin-user-dropdown">
                  <div className="admin-user-head">
                    <div className="admin-user-head-name">{displayName}</div>
                    <div className="admin-user-head-role">Administrator</div>
                  </div>
                  <button className="admin-user-menu-item" onClick={() => { navigate('/admin/settings'); setShowUserMenu(false); }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                    Account Settings
                  </button>
                  <button className="admin-user-menu-item" onClick={() => { navigate('/admin/reports'); setShowUserMenu(false); }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                    Reports
                  </button>
                  <button className="admin-user-menu-item danger" onClick={() => { setShowUserMenu(false); setShowLogoutModal(true); }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Page content */}
          <div className="admin-content">
            <Outlet />
          </div>
        </main>

        {/* Logout confirm modal */}
        {showLogoutModal && (
          <div className="admin-modal-overlay">
            <div className="admin-modal-box">
              <div className="admin-modal-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div className="admin-modal-title">Sign Out?</div>
              <div className="admin-modal-body">
                Are you sure you want to sign out?<br />You'll need to log in again to access the system.
              </div>
              <div className="admin-modal-actions">
                <button className="admin-modal-cancel" onClick={() => setShowLogoutModal(false)}>
                  Cancel
                </button>
                <button className="admin-modal-confirm" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppContextProvider>
  );
}

export default AdminLayout;
