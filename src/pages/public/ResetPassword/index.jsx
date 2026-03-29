import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiCheckCircle, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import { CgSpinner } from 'react-icons/cg';
import VMSLogo from '../../../components/common/VMSLogo';
import Card from '../../../components/common/Card';
import './ResetPassword.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    
    const navigate = useNavigate();

    const [strength, setStrength] = useState(0);

    useEffect(() => {
        let score = 0;
        if (!password) { setStrength(0); return; }
        if (password.length > 7) score += 1;
        if (password.length > 10) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        setStrength(Math.min(score, 4));
    }, [password]);

    const validate = () => {
        const e = {};
        if (!password) e.password = 'Password is required.';
        else if (password.length < 8) e.password = 'Password must be at least 8 characters.';
        else if (strength < 2) e.password = 'Password is too weak. Please use numbers and symbols.';

        if (!confirmPassword) e.confirm = 'Please confirm your password.';
        else if (password !== confirmPassword) e.confirm = 'Passwords do not match.';
        
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!token) {
            setErrors({ general: 'Invalid or missing reset token.' });
            return;
        }

        if (!validate()) return;

        setIsLoading(true);
        try {
            await new Promise(r => setTimeout(r, 1500));
            setIsSuccess(true);
        } catch (err) {
            setErrors({ general: 'Failed to reset password. The link may have expired.' });
        } finally {
            setIsLoading(false);
        }
    };

    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
    const strengthColors = ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1b5e20'];

    if (!token && !isSuccess) {
        return (
            <div className="vms-rp-container">
                <div className="vms-rp-content transition-fade">
                    <Card className="vms-rp-card error-card">
                        <FiAlertCircle className="rp-error-icon" />
                        <h2>Invalid Link</h2>
                        <p>The password reset link is invalid or has expired.</p>
                        <button className="vms-rp-btn" onClick={() => navigate('/forgot-password')}>Request New Link</button>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="vms-rp-container">
            {!isSuccess && (
                <button className="rp-back-btn" onClick={() => navigate('/login')}>
                    <FiArrowLeft /> Back to Login
                </button>
            )}

            <div className="vms-rp-content">
                <VMSLogo size={60} className="vms-rp-logo" />

                <Card className="vms-rp-card">
                    {!isSuccess ? (
                        <div className="rp-state-form transition-fade">
                            <h2 className="vms-rp-title">Create new password</h2>
                            <p className="vms-rp-subtitle">
                                Your new password must be unique from those previously used and at least 8 characters long.
                            </p>

                            {errors.general && (
                                <div className="rp-alert-error">
                                    <FiAlertCircle /> {errors.general}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="vms-rp-form" noValidate>
                                <div className="rp-input-group">
                                    <label>New Password</label>
                                    <div className={`rp-input-wrapper ${errors.password ? 'has-error' : ''}`}>
                                        <FiLock className="rp-field-icon" />
                                        <div className="rp-password-inner">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter new password"
                                                value={password}
                                                onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
                                            />
                                            <button type="button" className="rp-eye-toggle" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <FiEyeOff /> : <FiEye />}
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {password && (
                                        <div className="rp-strength-meter">
                                            <div className="strength-bars">
                                                {[...Array(4)].map((_, i) => (
                                                    <div 
                                                        key={i} 
                                                        className={`strength-bar ${strength > i ? 'active' : ''}`}
                                                        style={{ backgroundColor: strength > i ? strengthColors[strength] : '#e0e0e0' }}
                                                    ></div>
                                                ))}
                                            </div>
                                            <span className="strength-label" style={{ color: strengthColors[strength] }}>
                                                {strengthLabels[strength]}
                                            </span>
                                        </div>
                                    )}
                                    {errors.password && <span className="rp-error">{errors.password}</span>}
                                </div>

                                <div className="rp-input-group" style={{ marginTop: '5px' }}>
                                    <label>Confirm Password</label>
                                    <div className={`rp-input-wrapper ${errors.confirm ? 'has-error' : ''}`}>
                                        <FiLock className="rp-field-icon" />
                                        <input
                                            type="password"
                                            placeholder="Confirm your password"
                                            value={confirmPassword}
                                            onChange={(e) => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirm: '' })); }}
                                        />
                                    </div>
                                    {errors.confirm && <span className="rp-error">{errors.confirm}</span>}
                                </div>

                                <button type="submit" className="vms-rp-btn" disabled={isLoading}>
                                    {isLoading ? <CgSpinner className="spinner-icon" /> : 'Reset Password'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="rp-state-success transition-fade">
                            <div className="rp-icon-header success">
                                <div className="rp-icon-circle">
                                    <FiCheckCircle />
                                </div>
                            </div>
                            <h2 className="vms-rp-title">Password Reset Complete</h2>
                            <p className="vms-rp-subtitle">
                                Your account is now secure. Please sign in with your new password to access your dashboard.
                            </p>

                            <div className="rp-actions" style={{ marginTop: '30px' }}>
                                <button type="button" className="vms-rp-btn" onClick={() => navigate('/login')}>
                                    Continue to Login
                                </button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ResetPassword;
