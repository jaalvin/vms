import { FiArrowRight, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { StyledInput, PasswordField, PasswordStrength } from './SharedInput';

const AccountStep = ({ formData, handleChange, handlePhoneChange, errors, onNext, onBack }) => {
    
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const initials = `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase();

    return (
        <div className="reg-step-panel animation-fade-in">
            <h3 className="step-heading">Step 3: Account Setup</h3>
            <p className="step-subheading">Your personal details. Initials and full name are generated automatically.</p>
            
            <div className="sec-lbl">👤 Personal Details</div>
            <div className="form-row">
                <StyledInput 
                    label="First Name *" 
                    name="firstName" 
                    placeholder="First name" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    error={errors.firstName} 
                    required 
                />
                <StyledInput 
                    label="Last Name *" 
                    name="lastName" 
                    placeholder="Last name" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    error={errors.lastName} 
                    required 
                />
            </div>

            {(formData.firstName || formData.lastName) && (
                <div className="name-preview-box animation-fade-in">
                    <div className="initials-circle">{initials || '?'}</div>
                    <div className="preview-info">
                        <div className="preview-info-title">Auto-generated for your profile</div>
                        <div className="preview-info-desc">
                            Full name: <strong>{fullName || '—'}</strong> &nbsp;·&nbsp; Initials: <strong>{initials || '—'}</strong>
                        </div>
                    </div>
                </div>
            )}

            <div className="form-row">
                <StyledInput 
                    label="Email Address *" 
                    type="email" 
                    name="userEmail" 
                    placeholder="you@example.com" 
                    value={formData.userEmail} 
                    onChange={handleChange} 
                    error={errors.userEmail} 
                    required 
                />
                <div className="reg-field-group">
                    <label className="reg-field-label">Phone Number <span className="optional-label">Optional</span></label>
                    <div className={`phone-input-container ${errors.userPhone ? 'has-error' : ''}`}>
                        <PhoneInput
                            country={'gh'}
                            value={formData.userPhone || ''}
                            onChange={handlePhoneChange}
                            prefix="+"
                            inputProps={{ name: 'userPhone', placeholder: '+233 XX XXX XXXX' }}
                            containerClass="vms-phone-input"
                            inputClass="vms-phone-field"
                            buttonClass="vms-phone-btn"
                            dropdownClass="vms-phone-dropdown"
                        />
                    </div>
                    {errors.userPhone && <span className="reg-field-error"><FiAlertCircle /> {errors.userPhone}</span>}
                </div>
            </div>

            <div className="sec-lbl">🔑 Password</div>
            <div className="form-row">
                <div className="reg-field-group">
                    <PasswordField 
                        label="Password *" 
                        name="password" 
                        placeholder="Min 8 chars" 
                        value={formData.password || ''} 
                        onChange={handleChange} 
                        error={errors.password} 
                        required 
                    />
                    <PasswordStrength password={formData.password} />
                </div>
                <PasswordField 
                    label="Confirm Password *" 
                    name="confirmPassword" 
                    placeholder="Repeat password" 
                    value={formData.confirmPassword || ''} 
                    onChange={handleChange} 
                    error={errors.confirmPassword} 
                    required 
                />
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

export default AccountStep;
