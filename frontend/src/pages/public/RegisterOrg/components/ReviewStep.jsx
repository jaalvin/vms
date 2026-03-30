import { FiArrowLeft, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const getRoleDisplay = (role) => {
    switch (role) {
        case 'admin': return { name: 'Admin', icon: '🛡️' };
        case 'receptionist': return { name: 'Receptionist', icon: '📋' };
        case 'security': return { name: 'Security', icon: '🔒' };
        default: return { name: 'User', icon: '👤' };
    }
};

const ReviewStep = ({ 
    formData, agreed, setAgreed, setShowTermsDrawer, isLoading, logoPreview, errors, onBack, onSubmit 
}) => {
    const roleInfo = getRoleDisplay(formData.role);
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const initials = `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase();

    return (
        <form className="reg-step-panel animation-fade-in" onSubmit={onSubmit}>
            <h3 className="step-heading">Step 4: Confirm & Submit</h3>
            <p className="step-subheading">Review everything before creating your account.</p>

            <div className="review-section">
                <div className="sec-lbl">🏢 Organization</div>
                <div className="review-row">
                    <span className="review-label">Name</span>
                    <span className="review-value">{formData.orgName || '—'}</span>
                </div>
                <div className="review-row">
                    <span className="review-label">Type</span>
                    <span className="review-value">{formData.orgType || '—'}</span>
                </div>
                <div className="review-row">
                    <span className="review-label">Email</span>
                    <span className="review-value">{formData.orgEmail || '—'}</span>
                </div>
                <div className="review-row">
                    <span className="review-label">Phone</span>
                    <span className="review-value">+{formData.orgPhone || '—'}</span>
                </div>
                <div className="review-row">
                    <span className="review-label">Address</span>
                    <span className="review-value">{formData.address || '—'}</span>
                </div>
                <div className="review-row">
                    <span className="review-label">Logo</span>
                    <span className="review-value">{logoPreview ? 'Uploaded' : 'None Uploaded'}</span>
                </div>

                <div className="sec-lbl review-section-lbl-gap">⚙️ Visit Settings</div>
                <div className="review-row">
                    <span className="review-label">Max Duration</span>
                    <span className="review-value">{formData.maxVisitDuration} minutes</span>
                </div>
                <div className="review-row">
                    <span className="review-label">Photo Capture</span>
                    <span className="review-value">{formData.photoCapture ? 'Enabled' : 'Disabled'}</span>
                </div>

                <div className="sec-lbl review-section-lbl-gap">👤 Your Account</div>
                <div className="review-row">
                    <span className="review-label">Role</span>
                    <span className="review-role-badge">{roleInfo.icon} {roleInfo.name}</span>
                </div>
                <div className="review-row">
                    <span className="review-label">Full Name</span>
                    <span className="review-value">{fullName}</span>
                </div>
                <div className="review-row">
                    <span className="review-label">Initials</span>
                    <span className="review-value">{initials}</span>
                </div>
                <div className="review-row">
                    <span className="review-label">Email</span>
                    <span className="review-value">{formData.userEmail}</span>
                </div>
            </div>

            <label className={`terms-checkbox ${errors.agreed ? 'has-error' : ''}`}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                <span className="reg-checkmark"></span>
                <span className="terms-text">
                    I agree to the <span className="terms-link" onClick={(e) => { e.preventDefault(); setShowTermsDrawer(true); }}>Terms</span> and <span className="terms-link" onClick={(e) => { e.preventDefault(); setShowTermsDrawer(true); }}>Privacy Policy</span>. All details above are accurate.
                </span>
            </label>
            {errors.agreed && <span className="reg-field-error"><FiAlertCircle /> {errors.agreed}</span>}

            <div className="reg-btn-row reg-btn-row-top">
                <button type="button" className="reg-btn-back large" onClick={onBack}>
                    <FiArrowLeft /> Back
                </button>
                <button type="submit" className="reg-btn-primary large" disabled={isLoading}>
                    {isLoading ? 'Registering...' : <><FiCheckCircle className="btn-icon-left" /> Create Account ✓</>}
                </button>
            </div>
        </form>
    );
};

export default ReviewStep;
