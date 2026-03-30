import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const RoleStep = ({ formData, handleRoleSelect, onNext, onBack }) => {
    return (
        <div className="reg-step-panel animation-fade-in">
            <h3 className="step-heading">Step 2: Your Role</h3>
            <p className="step-subheading">Select the position that matches your responsibilities in the organization.</p>

            <div className="sec-lbl">🛠️ Select Account Type</div>
            <div className="role-cards">
                <div 
                    className={`rc ${formData.role === 'admin' ? 'sel' : ''}`} 
                    onClick={() => handleRoleSelect('admin')}
                >
                    <div className="rc-ico ico-a">🛡️</div>
                    <div className="rc-info">
                        <div className="rc-name">Admin</div>
                        <div className="rc-desc">Full access — manage staff, visitors, reports & all system settings.</div>
                    </div>
                    <div className="rc-dot">✓</div>
                </div>

                <div 
                    className={`rc ${formData.role === 'receptionist' ? 'sel' : ''}`} 
                    onClick={() => handleRoleSelect('receptionist')}
                >
                    <div className="rc-ico ico-r">📋</div>
                    <div className="rc-info">
                        <div className="rc-name">Receptionist</div>
                        <div className="rc-desc">Check visitors in/out, manage appointments & front-desk tasks.</div>
                    </div>
                    <div className="rc-dot">✓</div>
                </div>

                <div 
                    className={`rc ${formData.role === 'security' ? 'sel' : ''}`} 
                    onClick={() => handleRoleSelect('security')}
                >
                    <div className="rc-ico ico-s">🔒</div>
                    <div className="rc-info">
                        <div className="rc-name">Security</div>
                        <div className="rc-desc">Monitor access points, verify visitor badges & oversee site security.</div>
                    </div>
                    <div className="rc-dot">✓</div>
                </div>
            </div>

            <div className="reg-btn-row">
                <button type="button" className="reg-btn-back large" onClick={onBack}>
                    <FiArrowLeft /> Back
                </button>
                <button type="button" className="reg-btn-primary large" onClick={onNext}>
                    Continue <FiArrowRight />
                </button>
            </div>
        </div>
    );
};

export default RoleStep;
