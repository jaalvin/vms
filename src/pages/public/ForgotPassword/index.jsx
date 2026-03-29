import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiCheckCircle, FiShield } from 'react-icons/fi';
import { CgSpinner } from 'react-icons/cg';
import VMSLogo from '../../../components/common/VMSLogo';
import Card from '../../../components/common/Card';
import authService from '../../../services/authService';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);
        try {
            await authService.forgotPassword(email);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
            setIsSent(true);
        }
    };

    return (
        <div className="vms-fp-container">
            <button className="fp-back-btn" onClick={() => navigate('/login')}>
                <FiArrowLeft /> Back to Login
            </button>

            <div className="vms-fp-content">
                <VMSLogo size={60} className="vms-fp-logo" />

                <Card className="vms-fp-card">
                    {!isSent ? (
                        <div className="fp-state-form transition-fade">
                            <div className="fp-icon-header">
                                <div className="fp-icon-circle">
                                    <FiShield />
                                </div>
                            </div>
                            <h2 className="vms-fp-title">Reset your password</h2>
                            <p className="vms-fp-subtitle">
                                Enter the email address associated with your VMS account and we will send you a secure link to reset your password.
                            </p>

                            <form onSubmit={handleSubmit} className="vms-fp-form" noValidate>
                                <div className="fp-input-group">
                                    <label>Email Address</label>
                                    <div className={`fp-input-wrapper ${error ? 'has-error' : ''}`}>
                                        <FiMail className="fp-field-icon" />
                                        <input
                                            type="email"
                                            placeholder="name@company.com"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                            autoComplete="email"
                                        />
                                    </div>
                                    {error && <span className="fp-error">{error}</span>}
                                </div>

                                <button type="submit" className="vms-fp-btn" disabled={isLoading}>
                                    {isLoading ? <CgSpinner className="spinner-icon" /> : 'Send Reset Link'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="fp-state-success transition-fade">
                            <div className="fp-icon-header success">
                                <div className="fp-icon-circle">
                                    <FiCheckCircle />
                                </div>
                            </div>
                            <h2 className="vms-fp-title">Check your inbox</h2>
                            <p className="vms-fp-subtitle">
                                We have sent a secure password reset link to <br/><strong>{email}</strong>
                            </p>
                            
                            <div className="fp-instructions">
                                <p><strong>Didn't receive the email?</strong></p>
                                <ul>
                                    <li>Check your spam or junk folder</li>
                                    <li>Ensure your email address is typed correctly</li>
                                    <li>Wait a few minutes, some servers are slow</li>
                                </ul>
                            </div>

                            <div className="fp-actions">
                                <button type="button" className="vms-fp-btn secondary" onClick={() => navigate('/login')}>
                                    Return to Login
                                </button>
                                <button type="button" className="vms-fp-resend" onClick={handleSubmit} disabled={isLoading}>
                                    {isLoading ? 'Sending...' : 'Resend Email'}
                                </button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ForgotPassword;
