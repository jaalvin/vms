import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiLayout } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import VMSLogo from '../common/VMSLogo';

const Navbar = ({ scrolled }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    /** Map current user role to their specific dashboard route */
    const getDashboardRoute = () => {
        if (!user) return '/login';
        switch (user.role) {
            case 'admin': return '/admin/dashboard';
            case 'receptionist': return '/receptionist/check-in';
            case 'security': return '/security/monitor';
            default: return '/login';
        }
    };

    const handleConfirmLogout = () => {
        logout();
        navigate('/');
        setMenuOpen(false);
        setShowLogoutModal(false);
    };

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            const offset = 15;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setMenuOpen(false);
        }
    };

    return (
        <>
            <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
                <div
                    className="nav-brand"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{ cursor: 'pointer' }}
                >
                    <VMSLogo size={36} secondaryColor="#7B3F1E" />
                </div>

                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <a href="#home" className="nav-link" onClick={() => setMenuOpen(false)}>Home</a>
                    <a href="#services" className="nav-link" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
                    <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>About Us</a>
                    <a href="#contact-form" className="nav-link" onClick={(e) => handleNavClick(e, 'contact-form')}>Contact</a>
                    
                    <div className="nav-mobile-actions">
                        {user ? (
                            <>
                                <button className="btn-admin-portal" onClick={() => { navigate(getDashboardRoute()); setMenuOpen(false); }}>
                                    <FiLayout /> {(user.role || '').toUpperCase()} DASHBOARD
                                </button>
                                <button className="btn-logout-nav" onClick={() => setShowLogoutModal(true)}>
                                    <FiLogOut /> LOG OUT
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="btn-admin-portal" onClick={() => { navigate('/register'); setMenuOpen(false); }}>
                                    <span className="portal-icon">⬡</span> Register
                                </button>
                                <button className="btn-login-nav" onClick={() => { navigate('/login'); setMenuOpen(false); }}>
                                    LOG IN
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="nav-actions">
                    {user ? (
                        <div className="nav-user-logged-in-set">
                            <div className="nav-user-meta-pill" title={`${user.fullName || 'User'} (${user.role || 'No Role'})`}>
                                <div className="nav-user-avatar-small">{user.initials || '?'}</div>
                            </div>
                            <button className="btn-admin-portal dashboard-shortcut" onClick={() => navigate(getDashboardRoute())}>
                                DASHBOARD
                            </button>
                            <button className="nav-logout-action-btn" onClick={() => setShowLogoutModal(true)} title="Logout">
                                <FiLogOut />
                            </button>
                        </div>
                    ) : (
                        <>
                            <button className="btn-admin-portal" onClick={() => navigate('/register')}>
                                <span className="portal-icon">⬡</span> Register
                            </button>
                            <button className="btn-login-nav" onClick={() => navigate('/login')}>
                                LOG IN
                            </button>
                        </>
                    )}
                    <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </nav>

            {/* Logout Confirmation Modal - Top-Right Pop */}
            {showLogoutModal && (
                <div 
                    className="vms-modal-overlay animation-fade-in" 
                    onClick={() => setShowLogoutModal(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(28, 10, 2, 0.2)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 9999,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        padding: '85px 60px 20px 20px'
                    }}
                >
                    <div 
                        className="vms-modal-content" 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: '#ffffff',
                            width: '100%',
                            maxWidth: '360px',
                            borderRadius: '20px',
                            padding: '28px',
                            textAlign: 'center',
                            border: '1px solid rgba(139, 87, 58, 0.12)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                            animation: 'modalFadeIn 0.3s ease-out'
                        }}
                    >
                        <div 
                            className="vms-modal-icon-container"
                            style={{
                                width: '52px',
                                height: '52px',
                                background: '#FFF5F5',
                                color: '#E53935',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                margin: '0 auto 16px'
                            }}
                        >
                            <FiLogOut />
                        </div>
                        <h3 
                            className="vms-modal-title"
                            style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1C0A02', marginBottom: '8px' }}
                        >
                            Confirm Logout
                        </h3>
                        <p 
                            className="vms-modal-text"
                            style={{ color: '#8D6E63', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '24px' }}
                        >
                            Are you sure you want to end your current session? You'll need to log in again to access your management panel.
                        </p>
                        <div className="vms-modal-actions" style={{ display: 'flex', gap: '12px' }}>
                            <button 
                                className="vms-modal-btn btn-cancel" 
                                onClick={() => setShowLogoutModal(false)}
                                style={{
                                    flex: 1, padding: '10px 18px', borderRadius: '10px',
                                    fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                                    border: 'none', background: '#F5E6D5', color: '#7B3F1E'
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="vms-modal-btn btn-confirm-logout" 
                                onClick={handleConfirmLogout}
                                style={{
                                    flex: 1, padding: '10px 18px', borderRadius: '10px',
                                    fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                                    border: 'none', background: '#E53935', color: '#fff',
                                    boxShadow: '0 4px 10px rgba(229, 57, 53, 0.15)'
                                }}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
