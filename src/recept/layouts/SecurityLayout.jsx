import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../styles.css';
import { useAuth } from '../../context/AuthContext';

const SecurityLayout = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  const initials = user?.initials || user?.fullName?.slice(0, 2).toUpperCase() || 'SG';
  const displayName = user?.fullName || 'Security Guard';

  return (
    <div className="app-shell">
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
      
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#8B573A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: '18px', fontWeight: 700, fontFamily: 'Georgia, serif' }}>V</span>
              </div>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#8B573A', letterSpacing: '3px' }}>VMS</span>
            </div>
          </div>
          <div className="sidebar-role-badge">Security Panel</div>
          <div className="sidebar-user">
            <div className="avatar-circle">{initials}</div>
            <div>
              <div className="user-name">{displayName}</div>
              <div className="user-role">Gate Post</div>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/security/monitor" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            Visitor Monitor
          </NavLink>
          <NavLink to="/security/emergency" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            Emergency Mode
          </NavLink>
        </nav>
        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Log Out
          </button>
        </div>
      </aside>

      <main className="app-main">
        <div className="mobile-topbar-header">
          <button className="mobile-menu-btn" onClick={toggleSidebar}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <div className="sidebar-logo-text">VMS SECURITY</div>
        </div>
        <Outlet />
      </main>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-inner">
            <div className="modal-title">Confirm Logout</div>
            <div className="modal-body">
              Are you sure you want to log out?<br />Goodbye, see you soon.
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowLogoutModal(false)}>
                Stay Logged In
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityLayout;
