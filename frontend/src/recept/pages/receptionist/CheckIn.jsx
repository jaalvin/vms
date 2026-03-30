import React, { useState, useRef, useEffect } from 'react';
import NotificationBell from '../../components/NotificationBell.jsx';

const CheckIn = () => {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', idNumber: '', hostId: '', purpose: '',
  });
  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (stream && videoRef.current && !image) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, image]);

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [stream]);

  const startCamera = async (e) => {
    if (e) e.preventDefault();
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
    } catch {
      alert("Could not access camera.");
    }
  };

  const takePhoto = (e) => {
    if (e) e.preventDefault();
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    setImage(canvas.toDataURL('image/png'));
    if (stream) { stream.getTracks().forEach(track => track.stop()); setStream(null); }
  };

  const retakePhoto = (e) => {
    if (e) e.preventDefault();
    setImage(null);
    startCamera();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.hostId) {
      alert("Please fill in the visitor's name and select a host.");
      return;
    }
    setIsSubmitting(true);
    try {
      // In production: POST /api/visitors
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowSuccess(true);
      setFormData({ fullName: '', phone: '', email: '', idNumber: '', hostId: '', purpose: '' });
      setImage(null);
      setTimeout(() => setShowSuccess(false), 4000);
    } catch {
      alert("Failed to check in visitor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">Visitor Check-In</div>
        <div className="topbar-right">
          <NotificationBell />
          <div className="topbar-avatar">RA</div>
        </div>
      </div>

      <div className="app-content">
        {showSuccess && (
          <div className="alert alert-success mb">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div><strong>Check-in successful!</strong> Visitor has been registered and host notified.</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="checkin-grid">
            {/* Left: Visitor Details */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Visitor Details</div>
              </div>
              <div className="card-body">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input className="form-input" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Jane Doe" required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input className="form-input" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 0201234567" />
                  </div>
                  <div className="form-group">
                    <label>Email (Optional)</label>
                    <input className="form-input" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="e.g. jane@email.com" />
                  </div>
                  <div className="form-group">
                    <label>ID Number</label>
                    <input className="form-input" name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="e.g. GHA-001234567" />
                  </div>
                </div>
                <div className="form-group" style={{marginTop: 16}}>
                  <label>Person Being Visited *</label>
                  <div className="select-wrap">
                    <select className="form-input" name="hostId" value={formData.hostId} onChange={handleChange} required>
                      <option value="">Select a Host...</option>
                      <option value="H-001">Sarah Mensah — HR Manager</option>
                      <option value="H-002">Kofi Owusu — IT Director</option>
                      <option value="H-003">Noah Petrov — CEO</option>
                      <option value="H-004">Sophia Adebayo — Finance</option>
                    </select>
                  </div>
                </div>
                <div className="form-group" style={{marginTop: 16}}>
                  <label>Purpose of Visit</label>
                  <textarea className="form-input form-textarea" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="Brief description of visit purpose..." />
                </div>
              </div>
              <div className="card-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setFormData({ fullName: '', phone: '', email: '', idNumber: '', hostId: '', purpose: '' })}>Clear</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : '✓ Complete Check-In'}
                </button>
              </div>
            </div>

            {/* Right: Photo Capture */}
            <div className="card">
              <div className="card-head">
                <div className="card-title">Visitor Photo</div>
              </div>
              <div className="card-body">
                <div className="photo-zone">
                  {!image ? (
                    <>
                      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', borderRadius: 8, background: '#1C0A02', minHeight: 200, display: stream ? 'block' : 'none' }} />
                      {!stream && (
                        <div style={{ minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <div className="photo-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                          </div>
                          <div className="photo-label">Capture Visitor Photo</div>
                          <div className="photo-sub">Click below to start camera</div>
                        </div>
                      )}
                      <button type="button" className="btn btn-primary" style={{ marginTop: 12, width: '100%' }} onClick={stream ? takePhoto : startCamera}>
                        {stream ? '📸 Capture Photo' : '📷 Start Camera'}
                      </button>
                    </>
                  ) : (
                    <>
                      <img src={image} alt="Captured visitor" style={{ width: '100%', borderRadius: 8 }} />
                      <button type="button" className="btn btn-ghost" style={{ marginTop: 12, width: '100%' }} onClick={retakePhoto}>
                        🔄 Retake Photo
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckIn;
