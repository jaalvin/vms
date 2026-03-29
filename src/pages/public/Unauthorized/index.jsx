import { useNavigate } from 'react-router-dom';
import { FiShield, FiArrowLeft } from 'react-icons/fi';
import VMSLogo from '../../../components/common/VMSLogo';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="vms-login-container vms-unauthorized-bg">
            <div className="vms-login-bg">
                <div className="vms-login-bg-img"></div>
                <div className="vms-login-bg-ov vms-unauthorized-ov"></div>
            </div>

            <div className="vms-login-content">
                <VMSLogo size={60} className="vms-login-logo" />

                <div className="vms-login-card vms-unauthorized-card animation-fade-in">
                    <div className="mfa-icon-container vms-unauthorized-icon">
                        <FiShield className="mfa-lock-icon vms-unauthorized-shield" />
                    </div>

                    <h2 className="vms-auth-title vms-unauthorized-title">Unauthorized Access</h2>
                    <p className="vms-auth-subtitle vms-unauthorized-subtitle">
                        You do not have the required permissions to access this management panel.
                        Please return to your assigned dashboard.
                    </p>

                    <button
                        className="vms-login-btn vms-unauthorized-btn"
                        onClick={() => navigate('/')}
                    >
                        <FiArrowLeft /> Back to Safety
                    </button>

                    <div className="login-security-badge vms-unauthorized-badge">
                        <FiShield className="security-badge-icon" />
                        <span>Protected by VMS Enterprise Security</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
