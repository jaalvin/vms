import { useState } from 'react';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

/* ── Inline styled input matching Login design ── */
export const StyledInput = ({ label, error, icon, children, ...props }) => (
    <div className="reg-field-group">
        {label && <label className="reg-field-label">{label}</label>}
        <div className={`reg-input-wrapper ${error ? 'has-error' : ''}`}>
            {icon && <span className="reg-field-icon">{icon}</span>}
            {children || <input className="reg-input" {...props} />}
        </div>
        {error && <span className="reg-field-error"><FiAlertCircle /> {error}</span>}
    </div>
);

/* ── Password field with show/hide ── */
export const PasswordField = ({ label, error, ...props }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="reg-field-group">
            {label && <label className="reg-field-label">{label}</label>}
            <div className={`reg-input-wrapper ${error ? 'has-error' : ''}`}>
                <input className="reg-input" type={show ? 'text' : 'password'} {...props} />
                <button type="button" className="reg-eye-toggle" onClick={() => setShow(v => !v)}>
                    {show ? <FiEyeOff /> : <FiEye />}
                </button>
            </div>
            {error && <span className="reg-field-error"><FiAlertCircle /> {error}</span>}
        </div>
    );
};

/* ── Password strength meter ── */
export const strengthLevel = (pw) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
};

const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColor = ['', '#e53935', '#fb8c00', '#43a047', '#1b5e20'];

export const PasswordStrength = ({ password }) => {
    const level = strengthLevel(password || '');
    if (!password) return null;
    return (
        <div className="pw-strength">
            <div className="pw-strength-bars">
                {[1, 2, 3, 4].map(i => (
                    <div
                        key={i}
                        className="pw-strength-bar"
                        style={{ background: i <= level ? strengthColor[level] : '#e0d5d0' }}
                    />
                ))}
            </div>
            <span className="pw-strength-label" style={{ color: strengthColor[level] }}>
                {strengthLabel[level]}
            </span>
        </div>
    );
};
