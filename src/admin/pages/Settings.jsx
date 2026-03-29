import { useState, useEffect, useRef } from 'react';
import { UploadCloud, ChevronRight, Save, Shield, X, AlertCircle, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react';
import { Toggle } from '../components/Toggle.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../admin-pages.css';

export default function Settings() {
  const { addNotification, sessionTimeout, setSessionTimeout, customTimeout, setCustomTimeout } = useAppContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [saveState, setSaveState]               = useState('idle');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCustomInput, setShowCustomInput]   = useState(false);
  const [customTimeoutInput, setCustomTimeoutInput] = useState('');
  const [passwordForm, setPasswordForm]         = useState({ old: '', new: '', confirm: '' });
  const [passwordError, setPasswordError]       = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const securityRef      = useRef(null);
  const notificationsRef = useRef(null);
  const logoInputRef     = useRef(null);
  const [highlight, setHighlight] = useState(null);

  useEffect(() => {
    const h = searchParams.get('highlight');
    if (h) {
      setHighlight(h);
      setTimeout(() => setHighlight(null), 2000);
      if (h === 'security')      securityRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (h === 'notifications') notificationsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [searchParams]);

  useEffect(() => {
    try {
      const s = localStorage.getItem('orgProfile'); if (s) setOrgProfile(JSON.parse(s));
      const vp = localStorage.getItem('visitorPreferences'); if (vp) setVisitorPreferences(JSON.parse(vp));
      const sec = localStorage.getItem('securitySettings'); if (sec) setSecurity(JSON.parse(sec));
      const notif = localStorage.getItem('notificationSettings'); if (notif) setNotifications(JSON.parse(notif));
    } catch { /* ignore */ }
  }, []);

  const [orgProfile, setOrgProfile] = useState({
    name: 'KNUST Administration', email: 'admin@knust.edu.gh',
    phone: '+233 24 123 4567', address: 'Kumasi, Ashanti Region, Ghana', logo: null,
  });
  const [visitorPreferences, setVisitorPreferences] = useState({ photoCapture: true, autoCheckout: false, maxDuration: 8 });
  const [security, setSecurity]       = useState({ twoFactor: false });
  const [notifications, setNotifications] = useState({ overdueAlerts: true, hostNotifications: true });

  const activeTimeout = customTimeout ?? sessionTimeout;

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setSaveState('saving');
    try {
      await new Promise(r => setTimeout(r, 700));
      localStorage.setItem('orgProfile', JSON.stringify(orgProfile));
      localStorage.setItem('visitorPreferences', JSON.stringify(visitorPreferences));
      localStorage.setItem('securitySettings', JSON.stringify(security));
      localStorage.setItem('notificationSettings', JSON.stringify(notifications));
      setSaveState('success');
      addNotification('System settings saved successfully');
      setTimeout(() => setSaveState('idle'), 3000);
    } catch {
      setSaveState('error');
      setTimeout(() => setSaveState('idle'), 3000);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwordForm.old.trim()) { setPasswordError('Please enter your current password.'); return; }
    if (passwordForm.new.length < 8) { setPasswordError('New password must be at least 8 characters.'); return; }
    if (passwordForm.new !== passwordForm.confirm) { setPasswordError('Passwords do not match.'); return; }
    setPasswordError('');
    setPasswordForm({ old: '', new: '', confirm: '' });
    setShowPasswordModal(false);
    addNotification('Password changed successfully');
  };

  const handleTimeoutChange = (val) => {
    if (val === 'custom') { setShowCustomInput(true); }
    else {
      const mins = Number(val);
      setSessionTimeout(mins); setCustomTimeout(null); setShowCustomInput(false);
      addNotification(`Session timeout updated to ${mins} minutes`);
    }
  };

  const handleApplyCustom = () => {
    const mins = Number(customTimeoutInput);
    if (mins > 0 && mins <= 480) {
      setCustomTimeout(mins); setShowCustomInput(false); setCustomTimeoutInput('');
      addNotification(`Session timeout set to ${mins} minutes`);
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { addNotification('Please select a valid image file'); return; }
    const reader = new FileReader();
    reader.onload = (e) => { setOrgProfile({ ...orgProfile, logo: e.target.result }); addNotification('Logo uploaded'); };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <div className="ap-header">
        <div>
          <h2 className="ap-title">System Settings</h2>
          <p className="ap-sub">Manage organization profile, security, and preferences.</p>
        </div>
      </div>

      <form onSubmit={handleSaveChanges}>
        <div className="ap-settings-grid">
          {/* LEFT */}
          <div className="ap-settings-col">
            {/* Organization Profile */}
            <div className="ap-settings-section">
              <h3 className="ap-settings-title">Organization Profile</h3>
              <div className="ap-form-row-2" style={{ marginBottom: 20 }}>
                <div className="ap-form-group">
                  <label className="ap-label">Organization Name</label>
                  <input type="text" value={orgProfile.name} onChange={e => setOrgProfile({ ...orgProfile, name: e.target.value })} className="ap-input" />
                </div>
                <div className="ap-form-group">
                  <label className="ap-label">Email</label>
                  <input type="email" value={orgProfile.email} onChange={e => setOrgProfile({ ...orgProfile, email: e.target.value })} className="ap-input" />
                </div>
                <div className="ap-form-group">
                  <label className="ap-label">Phone</label>
                  <input type="tel" value={orgProfile.phone} onChange={e => setOrgProfile({ ...orgProfile, phone: e.target.value })} className="ap-input" />
                </div>
                <div className="ap-form-group">
                  <label className="ap-label">Address</label>
                  <input type="text" value={orgProfile.address} onChange={e => setOrgProfile({ ...orgProfile, address: e.target.value })} className="ap-input" />
                </div>
              </div>
              <div className="ap-form-group">
                <label className="ap-label">Organization Logo</label>
                <div className="ap-logo-row">
                  <div className="ap-logo-preview">
                    {orgProfile.logo
                      ? <img src={orgProfile.logo} alt="Logo" />
                      : <span>{orgProfile.name[0]}</span>}
                  </div>
                  <div className="ap-logo-upload" onClick={() => logoInputRef.current?.click()}>
                    <UploadCloud size={20} style={{ color: '#9ca3af' }} />
                    <span className="ap-logo-upload-label">Click to upload</span>
                    <span className="ap-logo-upload-sub">PNG, JPG up to 2MB</span>
                  </div>
                  <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: 'none' }} />
                </div>
              </div>
            </div>

            {/* Visitor Preferences */}
            <div className="ap-settings-section">
              <h3 className="ap-settings-title">Visitor Preferences</h3>
              <div className="ap-toggle-setting">
                <Toggle enabled={visitorPreferences.photoCapture} onChange={val => setVisitorPreferences({ ...visitorPreferences, photoCapture: val })} />
                <div className="ap-toggle-setting-info">
                  <h4>Visitor Photo Capture</h4>
                  <p>Capture a visitor's photo during check-in for enhanced security.</p>
                </div>
              </div>
              <div className="ap-toggle-setting">
                <Toggle enabled={visitorPreferences.autoCheckout} onChange={val => setVisitorPreferences({ ...visitorPreferences, autoCheckout: val })} />
                <div className="ap-toggle-setting-info" style={{ flex: 1 }}>
                  <h4>Automatic Overdue Detection</h4>
                  <p>Flag visitors who exceed their permitted stay duration.</p>
                  <div className="ap-inline">
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Max Duration</label>
                    <input type="number" value={visitorPreferences.maxDuration} min={1} max={24}
                      onChange={e => setVisitorPreferences({ ...visitorPreferences, maxDuration: Number(e.target.value) })}
                      className="ap-duration-input" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#4b5563' }}>Hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="ap-settings-col">
            {/* Security */}
            <div ref={securityRef} className={`ap-settings-section ${highlight === 'security' ? 'highlight' : ''}`}>
              <h3 className="ap-settings-title">Security Settings</h3>
              <div className="ap-sec-row">
                <div className="ap-sec-field">
                  <label>Account Security</label>
                  <button type="button" onClick={() => setShowPasswordModal(true)} className="ap-btn-primary ap-btn-sm">
                    Change Password
                  </button>
                </div>
                <div className="ap-sec-field">
                  <label>Session Timeout</label>
                  <select value={customTimeout !== null ? 'custom' : String(sessionTimeout)}
                    onChange={e => handleTimeoutChange(e.target.value)} className="ap-input ap-select">
                    <option value="15">15 Minutes</option>
                    <option value="30">30 Minutes</option>
                    <option value="60">60 Minutes</option>
                    <option value="custom">Custom…</option>
                  </select>
                  {showCustomInput && (
                    <div className="ap-custom-timeout">
                      <input type="number" min={1} max={480} placeholder="mins" value={customTimeoutInput}
                        onChange={e => setCustomTimeoutInput(e.target.value)} />
                      <button type="button" onClick={handleApplyCustom}>Apply</button>
                    </div>
                  )}
                  <p className="ap-timeout-hint">Active: {activeTimeout} min</p>
                </div>
              </div>
              <div className="ap-sec-2fa">
                <Toggle enabled={security.twoFactor} onChange={val => setSecurity({ ...security, twoFactor: val })} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Shield size={18} style={{ color: '#8B5E3C' }} />
                  <div className="ap-sec-2fa-info">
                    <h4>Two-Factor Authentication</h4>
                    <p>Require a verification code during login.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div ref={notificationsRef} className={`ap-settings-section ${highlight === 'notifications' ? 'highlight' : ''}`}>
              <h3 className="ap-settings-title">Notification Settings</h3>
              <div className="ap-toggle-setting">
                <Toggle enabled={notifications.overdueAlerts} onChange={val => { setNotifications({ ...notifications, overdueAlerts: val }); addNotification(`Overdue alerts ${val ? 'enabled' : 'disabled'}`); }} />
                <div className="ap-toggle-setting-info">
                  <h4>Email Alerts for Overdue Visitors</h4>
                  <p>Receive notifications when visitors exceed allowed time.</p>
                </div>
              </div>
              <div className="ap-toggle-setting">
                <Toggle enabled={notifications.hostNotifications} onChange={val => { setNotifications({ ...notifications, hostNotifications: val }); addNotification(`Host notifications ${val ? 'enabled' : 'disabled'}`); }} />
                <div className="ap-toggle-setting-info">
                  <h4>Host Notifications on Arrival</h4>
                  <p>Notify host when their visitor checks in.</p>
                </div>
              </div>
              <div className="ap-notif-divider">
                <button type="button" onClick={() => navigate('/security/emergency')} className="ap-notif-expand">
                  <span>Emergency Broadcast Options</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Footer */}
        <div className="ap-save-footer">
          <div className={`ap-save-status ${saveState}`}>
            {saveState === 'saving'  && <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /><span>Saving changes…</span></>}
            {saveState === 'success' && <><CheckCircle size={15} /><span>Settings saved!</span></>}
            {saveState === 'error'   && <><AlertCircle size={15} /><span>Failed to save. Try again.</span></>}
          </div>
          <button type="submit" disabled={saveState === 'saving'} className="ap-save-btn">
            {saveState === 'saving'
              ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Saving…</>
              : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </form>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="ap-modal-overlay">
          <div className="ap-modal ap-modal-md">
            <div className="ap-modal-head">
              <h2 className="ap-modal-head-title">Change Password</h2>
              <button onClick={() => { setShowPasswordModal(false); setPasswordError(''); setPasswordForm({ old:'', new:'', confirm:'' }); }}
                className="ap-modal-close"><X size={20} /></button>
            </div>
            <form onSubmit={handleChangePassword} className="ap-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Current Password', key: 'old', show: showOld, setShow: setShowOld },
                { label: 'New Password',     key: 'new', show: showNew, setShow: setShowNew, hint: 'Minimum 8 characters' },
                { label: 'Confirm Password', key: 'confirm', show: showConf, setShow: setShowConf },
              ].map(({ label, key, show, setShow, hint }) => (
                <div key={key} className="ap-form-group">
                  <label className="ap-label">{label}</label>
                  <div className="ap-pw-wrap">
                    <input type={show ? 'text' : 'password'} required value={passwordForm[key]}
                      onChange={e => setPasswordForm({ ...passwordForm, [key]: e.target.value })}
                      className="ap-input" placeholder={hint || `Enter ${label.toLowerCase()}`} />
                    <button type="button" className="ap-pw-toggle" onClick={() => setShow(s => !s)}>
                      {show ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              ))}
              {passwordError && (
                <div className="ap-error-box">
                  <AlertCircle size={13} style={{ flexShrink: 0 }} />
                  <p>{passwordError}</p>
                </div>
              )}
              <div className="ap-form-flex">
                <button type="button" onClick={() => { setShowPasswordModal(false); setPasswordError(''); setPasswordForm({ old:'', new:'', confirm:'' }); }} className="ap-btn-ghost">Cancel</button>
                <button type="submit" className="ap-btn-primary" style={{ justifyContent: 'center' }}>Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
