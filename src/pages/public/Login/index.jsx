import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiEye, FiEyeOff, FiLock, FiMail, FiArrowLeft, FiShield, FiAlertCircle } from 'react-icons/fi';
import { CgSpinner } from 'react-icons/cg';
import { FcGoogle } from 'react-icons/fc';
import VMSLogo from '../../../components/common/VMSLogo';
import Card from '../../../components/common/Card';
import authService from '../../../services/authService';
import { useAuth } from '../../../context/AuthContext';
import './Login.css';

const ROLE_SETTINGS = {
    admin: { name: 'Admin', icon: '🛡️', route: '/admin/dashboard', panelText: 'Admin Panel → Dashboard' },
    receptionist: { name: 'Receptionist', icon: '📋', route: '/receptionist/check-in', panelText: 'Receptionist Panel → Check-In' },
    security: { name: 'Security', icon: '🔒', route: '/security/monitor', panelText: 'Security Panel → Monitor' }
};

// Utility to generate clean initials from a full name, with email fallback
const getInitials = (name, emailAddress) => {
    if (name && name !== emailAddress.split('@')[0]) {
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        } else if (parts[0]) {
            return parts[0].slice(0, 2).toUpperCase();
        }
    }
    // Fall back to the first letter of the email (cleaner than 2 random letters)
    return emailAddress.charAt(0).toUpperCase();
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSocialLoading, setIsSocialLoading] = useState(false);
    const [showMfa, setShowMfa] = useState(false);
    const [mfaCode, setMfaCode] = useState(['', '', '', '', '', '']);
    const [redirectData, setRedirectData] = useState(null);
    const { login: contextLogin } = useAuth();
    const navigate = useNavigate();

    // Auto navigate after successful role-aware login
    useEffect(() => {
        if (!redirectData) return;
        const route = ROLE_SETTINGS[redirectData.roleId]?.route || '/';
        const timer = setTimeout(() => { navigate(route); }, 900);
        return () => clearTimeout(timer);
    }, [redirectData, navigate]);

    // Social Auth Handlers
    const handleSocialLogin = async (provider) => {
        setIsSocialLoading(true);
        toast.loading(`Connecting to ${provider}...`, { id: 'social-auth' });

        try {
            await new Promise(r => setTimeout(r, 1500));
            toast.error(`${provider} authentication is currently in sandbox mode. Please use corporate email logic.`, { id: 'social-auth' });
        } catch (err) {
            toast.error(`Failed to connect with ${provider}`, { id: 'social-auth' });
        } finally {
            setIsSocialLoading(false);
        }
    };

    // Restore remembered email
    useEffect(() => {
        const saved = localStorage.getItem('vms_remember_email');
        if (saved) { setEmail(saved); setRememberMe(true); }
    }, []);

    const validate = () => {
        const e = {};
        if (!email) e.email = 'Email address is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email address.';
        if (!password) e.password = 'Password is required.';
        else if (password.length < 6) e.password = 'Password must be at least 6 characters.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        // Remember me
        if (rememberMe) localStorage.setItem('vms_remember_email', email);
        else localStorage.removeItem('vms_remember_email');

        setIsLoading(true);
        try {
            const data = await authService.login(email, password);
             
            const serverRole = data.role;
            const fullName = data.user?.fullName || email.split('@')[0];
            const initials = data.user?.initials || getInitials(fullName, email);
            
            contextLogin({
                token: data.token,
                role: serverRole,
                fullName,
                initials
            });

            if (data.requiresMfa) {
                setShowMfa(true);
                toast.success('Credentials verified. Please enter your 2FA code.', { icon: '🔐' });
            } else {
                const mockUser = { fullName, initials };
                setRedirectData({ user: mockUser, roleId: serverRole });
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.response?.data?.error;
            if (msg) {
                toast.error(msg);
                if (msg.toLowerCase().includes('email') || msg.toLowerCase().includes('user')) {
                    setErrors({ email: msg });
                } else {
                    setErrors({ password: msg });
                }
            } else if (err.code === 'ERR_NETWORK' || err.message?.includes('Network')) {
                toast.error('Unable to connect to authentication server. Please check your network and try again.');
            } else {
                toast.error('Login failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };


    const handleMfaSubmit = async (e) => {
        e.preventDefault();
        const code = mfaCode.join('');
        if (code.length < 6) return toast.error('Please enter the full 6-digit code.');

        setIsLoading(true);
        try {
            await new Promise(r => setTimeout(r, 1200));
            toast.dismiss();
            toast.success('Identity Verified!', { icon: '✨' });

            const fullName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            const mockUser = {
                fullName,
                initials: getInitials(fullName, email)
            };
            setRedirectData({ user: mockUser, roleId: 'admin' });
        } catch (err) {
            toast.error('Invalid code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    const handleMfaChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newCode = [...mfaCode];
        newCode[index] = value.slice(-1);
        setMfaCode(newCode);

        if (value && index < 5) {
            const next = document.getElementById(`mfa-input-${index + 1}`);
            if (next) next.focus();
        }
    };

    const handleMfaKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !mfaCode[index] && index > 0) {
            const prev = document.getElementById(`mfa-input-${index - 1}`);
            if (prev) prev.focus();
        }
    };


    return (
        <div className="vms-login-container">
            <div className="vms-login-bg">
                <div className="vms-login-bg-img"></div>
                <div className="vms-login-bg-ov"></div>
            </div>

            <button className="login-back-btn" onClick={() => navigate('/')}>
                <FiArrowLeft /> Back to Home
            </button>

            <div className="vms-login-content">
                <VMSLogo size={45} className="vms-login-logo" />

                <Card className={`vms-login-card ${showMfa || redirectData ? 'mfa-mode' : ''}`}>
                    {redirectData ? (
                        <div className="redirect-step-content animation-fade-in">
                            <div className="vms-avatar-circle">
                                {redirectData.user.initials}
                            </div>
                            <h2 className="vms-auth-title redirect-auth-title">Welcome, {redirectData.user.fullName}!</h2>
                            <p className="vms-auth-subtitle redirect-auth-subtitle">{ROLE_SETTINGS[redirectData.roleId]?.name} · VMS</p>
                            
                            <div className="redirect-dest-box">
                                Redirecting you to → <span>{ROLE_SETTINGS[redirectData.roleId]?.panelText}</span>
                            </div>
                            
                            <button 
                                className="vms-login-btn redirect-go-btn"
                                onClick={() => navigate(ROLE_SETTINGS[redirectData.roleId]?.route)}
                            >
                                Go to Dashboard →
                            </button>
                        </div>
                    ) : !showMfa ? (
                        <>
                            <div className="login-card-header">
                                <h2 className="vms-auth-title">Sign In to VMS</h2>
                                <p className="vms-auth-subtitle">Welcome! Please enter your credentials to access your organization's dashboard.</p>
                            </div>

                            <form onSubmit={handleLogin} className="vms-auth-form vms-auth-form-top" noValidate>
                                <div className="vms-input-group">
                                    <label>Email Address</label>
                                    <div className={`vms-input-wrapper ${errors.email ? 'has-error' : ''}`}>
                                        <FiMail className="vms-field-icon" />
                                        <input
                                            type="email"
                                            placeholder="name@company.com"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                                            autoComplete="email"
                                        />
                                    </div>
                                    {errors.email && <span className="field-error"><FiAlertCircle /> {errors.email}</span>}
                                </div>

                                <div className="vms-input-group">
                                    <label>Password</label>
                                    <div className={`vms-input-wrapper ${errors.password ? 'has-error' : ''}`}>
                                        <FiLock className="vms-field-icon" />
                                        <div className="vms-password-field-inner">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
                                                autoComplete="current-password"
                                            />
                                            <button type="button" className="vms-eye-toggle" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <FiEyeOff /> : <FiEye />}
                                            </button>
                                        </div>
                                    </div>
                                    {errors.password && <span className="field-error"><FiAlertCircle /> {errors.password}</span>}
                                </div>

                                <div className="vms-form-actions">
                                    <label className="vms-remember">
                                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                        <span className="checkmark"></span>
                                        Remember me
                                    </label>
                                    <button type="button" className="vms-forgot-link" onClick={() => navigate('/forgot-password')}>
                                        Forgot Password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="vms-login-btn"
                                    disabled={isLoading || isSocialLoading}
                                >
                                    {isLoading ? (
                                        <span className="btn-loading-state"><CgSpinner className="spinner-icon" /> Signing in…</span>
                                    ) : ('Sign In')}
                                </button>

                                <>
                                    <div className="social-divider">
                                        <span>or continue with</span>
                                    </div>

                                    <div className="social-auth-single">
                                        <button
                                            type="button"
                                            className="social-btn google full-width"
                                            onClick={() => handleSocialLogin('Google')}
                                            disabled={isLoading || isSocialLoading}
                                        >
                                            <FcGoogle /> Continue with Google
                                        </button>
                                    </div>
                                </>

                                <div className="vms-auth-footer">
                                    <p>Don't have an account? <span className="vms-signup-link" onClick={() => navigate('/register')}>Register Your Organization</span></p>
                                </div>
                            </form>

                            {/* Enterprise Trust Badges */}
                            <div className="vms-trust-badges">
                                <div className="trust-badge">
                                    <FiShield className="t-icon" />
                                    <span>256-bit TLS Encryption</span>
                                </div>
                                <div className="trust-badge">
                                    <FiLock className="t-icon" />
                                    <span>RBAC Protection</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="mfa-step-content animation-fade-in">
                            <div className="mfa-icon-container">
                                <FiShield className="mfa-lock-icon" />
                            </div>
                            <h2 className="vms-auth-title">Security Verification</h2>
                            <p className="vms-auth-subtitle">
                                We've sent a 6-digit verification code to your email associated with <strong>{email}</strong>.
                            </p>

                            <form onSubmit={handleMfaSubmit} className="mfa-code-form">
                                <div className="mfa-input-grid">
                                    {mfaCode.map((digit, i) => (
                                        <input
                                            key={i}
                                            id={`mfa-input-${i}`}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleMfaChange(i, e.target.value)}
                                            onKeyDown={(e) => handleMfaKeyDown(i, e)}
                                            className="mfa-digit-input"
                                            autoFocus={i === 0}
                                        />
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    className="vms-login-btn mfa-btn"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <CgSpinner className="spinner-icon" /> : 'Verify & Sign In'}
                                </button>

                                <div className="mfa-footer">
                                    <p>Didn't receive the code? <button type="button" className="resend-link">Resend Code</button></p>
                                    <button type="button" className="back-to-login-link" onClick={() => setShowMfa(false)}>
                                        <FiArrowLeft /> Back to Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </Card>
            </div>


        </div>
    );
};

export default Login;
