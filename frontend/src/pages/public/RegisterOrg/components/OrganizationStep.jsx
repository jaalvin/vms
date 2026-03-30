import { FiArrowRight, FiAlertCircle, FiUploadCloud } from 'react-icons/fi';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { StyledInput } from './SharedInput';

const OrganizationStep = ({
    formData, handleChange, handlePhoneChange, handleToggleChange, handleLogoChange,
    logoPreview, logoZoom, setLogoZoom, errors, onNext
}) => {
    return (
        <div className="reg-step-panel animation-fade-in">
            <h3 className="step-heading">Step 1: Organization & Facilities</h3>
            <p className="step-subheading">Tell us about your organization and how visitors will check in.</p>

            <div className="sec-lbl">🏢 Basic Information</div>
            <div className="form-row">
                <StyledInput
                    label="Organization Name *"
                    name="orgName"
                    placeholder="e.g. Acme Corp"
                    value={formData.orgName}
                    onChange={handleChange}
                    error={errors.orgName}
                    required
                />
                <div className="reg-field-group">
                    <label className="reg-field-label">Organization Type</label>
                    <div className={`reg-input-wrapper ${errors.orgType ? 'has-error' : ''}`}>
                        <select name="orgType" className="reg-select" value={formData.orgType} onChange={handleChange} required>
                            <option value="" disabled>Select a type…</option>
                            <option value="school">🏫 School / University</option>
                            <option value="corporate">🏢 Corporate Office</option>
                            <option value="hospital">🏥 Hospital / Clinic</option>
                            <option value="government">🏛️ Government Agency</option>
                            <option value="other">⚙️ Other</option>
                        </select>
                    </div>
                    {errors.orgType && <span className="reg-field-error"><FiAlertCircle /> {errors.orgType}</span>}
                </div>
            </div>

            <div className="form-row">
                <StyledInput
                    label="Organization Email *"
                    type="email"
                    name="orgEmail"
                    placeholder="info@org.com"
                    value={formData.orgEmail}
                    onChange={handleChange}
                    error={errors.orgEmail}
                    required
                />
                <div className="reg-field-group">
                    <label className="reg-field-label">Organization Phone *</label>
                    <div className={`phone-input-container ${errors.orgPhone ? 'has-error' : ''}`}>
                        <PhoneInput
                            country={'gh'}
                            value={formData.orgPhone}
                            onChange={handlePhoneChange}
                            prefix="+"
                            inputProps={{ name: 'orgPhone', required: true, placeholder: '+233 XX XXX XXXX' }}
                            containerClass="vms-phone-input"
                            inputClass="vms-phone-field"
                            buttonClass="vms-phone-btn"
                            dropdownClass="vms-phone-dropdown"
                        />
                    </div>
                    {errors.orgPhone && <span className="reg-field-error"><FiAlertCircle /> {errors.orgPhone}</span>}
                </div>
            </div>

            <div className="form-full-row">
                <StyledInput
                    label="Address"
                    name="address"
                    placeholder="Street, City, Country"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                />
            </div>

            <div className="sec-lbl" style={{ marginTop: '20px' }}>🖼️ Organization Logo</div>
            <div className="logo-upload-section">
                <div className="logo-dropzone" onClick={() => document.getElementById('logo-file')?.click()}>
                    <input type="file" id="logo-file" hidden accept="image/*" onChange={handleLogoChange} />
                    {logoPreview ? (
                        <div className="logo-preview">
                            <img src={logoPreview} alt="Preview" style={{ transform: `scale(${logoZoom})` }} />
                            <div className="logo-change-hint">Change Logo</div>
                        </div>
                    ) : (
                        <div className="logo-dropzone-inner">
                            <FiUploadCloud className="dropzone-icon" />
                            <span className="dropzone-text">Click to upload logo</span>
                            <span className="dropzone-hint">PNG or JPG — max 2MB <span className="optional-label" style={{ background: '#F5E6D5', padding: '2px 7px', borderRadius: '10px', color: '#A88060' }}>Optional</span></span>
                        </div>
                    )}
                </div>
            </div>

            {logoPreview && (
                <div className="logo-controls animation-fade-in">
                    <div className="zoom-control">
                        <label>Adjust Logo Zoom</label>
                        <input type="range" min="0.5" max="2" step="0.01" value={logoZoom} onChange={(e) => setLogoZoom(parseFloat(e.target.value))} />
                    </div>
                </div>
            )}

            <div className="sec-lbl" style={{ marginTop: '20px' }}>⚙️ Visit Settings</div>
            <div className="form-full-row">
                <div className="reg-field-group">
                    <StyledInput
                        label="Max Visit Duration (minutes) Optional"
                        type="number"
                        name="maxVisitDuration"
                        placeholder="e.g. 60"
                        min={5} max={480}
                        value={formData.maxVisitDuration}
                        onChange={handleChange}
                        error={errors.maxVisitDuration}
                    />
                    <div className="reg-field-hint" style={{ marginTop: '-4px', marginBottom: '10px' }}>
                        Visitors exceeding this duration will be flagged as overdue automatically.
                    </div>
                </div>
            </div>

            <div className="toggle-row">
                <div className="toggle-info">
                    <div className="toggle-label">Photo Capture on Check-In</div>
                    <div className="toggle-desc">Take a visitor photo when they check in at reception.</div>
                </div>
                <label className="toggle">
                    <input type="checkbox" name="photoCapture" checked={formData.photoCapture} onChange={handleToggleChange} />
                    <span className="tslider"></span>
                </label>
            </div>

            <div className="reg-btn-row" style={{ marginTop: '20px' }}>
                <button type="button" className="reg-btn-primary large" onClick={onNext}>
                    Continue <FiArrowRight />
                </button>
            </div>

            <div className="reg-auth-footer" style={{ marginTop: '24px' }}>
                <p>Already have an account? <span onClick={() => window.location.href = '/login'}>Sign In</span></p>
            </div>
        </div>
    );
};

export default OrganizationStep;
