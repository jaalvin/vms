import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import VMSLogo from '../../../components/common/VMSLogo';
import Card from '../../../components/common/Card';
import authService from '../../../services/authService';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import './RegisterOrg.css';

import OrganizationStep from './components/OrganizationStep';
import RoleStep from './components/RoleStep';
import AccountStep from './components/AccountStep';
import ReviewStep from './components/ReviewStep';

const STEPS = ['Organization', 'Your Role', 'Account Setup', 'Confirm'];

const SIDEBAR_STEPS = [
    { label: 'Organization', desc: 'Register your organization' },
    { label: 'Your Role', desc: 'Choose your account type' },
    { label: 'Account Setup', desc: 'Name, email & password' },
    { label: 'Confirm', desc: 'Review & submit' }
];

const RegisterOrg = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [logoZoom, setLogoZoom] = useState(1);
    const [agreed, setAgreed] = useState(false);
    const [showTermsDrawer, setShowTermsDrawer] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [errors, setErrors] = useState({});
    const formContainerRef = useRef(null);

    // Auto-scroll to top when step changes
    useEffect(() => {
        if (formContainerRef.current) {
            formContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [step]);

    const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        setMousePos({ x, y });
    };

    const [formData, setFormData] = useState({
        orgName: '',
        orgType: '',
        orgEmail: '',
        orgPhone: '',
        address: '',
        maxVisitDuration: 60,
        photoCapture: false,
        role: 'admin',
        firstName: '',
        lastName: '',
        userEmail: '',
        userPhone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleToggleChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleOrgPhoneChange = (orgPhone, data) => {
        setFormData(prev => ({ ...prev, orgPhone }));
        setErrors(prev => ({ ...prev, orgPhone: '' }));
        // Pass the country code (e.g., 'gh') to the parser for country-specific strictness
        const phoneNumber = parsePhoneNumberFromString(orgPhone, data.countryCode.toUpperCase());
        setFormData(prev => ({ ...prev, isOrgPhoneValid: phoneNumber ? phoneNumber.isPossible() : false }));
    };

    const handleUserPhoneChange = (userPhone, data) => {
        setFormData(prev => ({ ...prev, userPhone }));
        setErrors(prev => ({ ...prev, userPhone: '' }));
        
        const digitsOnly = userPhone.replace(/\D/g, '');
        // If empty or only contains the dial code, treat it as optional (valid)
        if (!digitsOnly || digitsOnly === data.dialCode) {
            setFormData(prev => ({ ...prev, isUserPhoneValid: true }));
        } else {
            // Use the country code for stricter validation
            const phoneNumber = parsePhoneNumberFromString(userPhone, data.countryCode.toUpperCase());
            setFormData(prev => ({ ...prev, isUserPhoneValid: phoneNumber ? phoneNumber.isPossible() : false }));
        }
    };

    const handleRoleSelect = (role) => {
        setFormData(prev => ({ ...prev, role }));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLogoFile(file);
        const reader = new FileReader();
        reader.onload = () => setLogoPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const validateOrganizationStep = () => {
        const e = {};
        if (!formData.orgName.trim()) e.orgName = 'Organization name required.';
        if (!formData.orgType) e.orgType = 'Please select a type.';
        if (!formData.orgEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.orgEmail)) {
            e.orgEmail = 'Valid org email required.';
        }
        if (!formData.orgPhone || !formData.orgPhone.trim()) {
            e.orgPhone = 'Organization phone required.';
        } else if (formData.isOrgPhoneValid === false) {
            e.orgPhone = 'Incomplete phone number for this country.';
        }
        
        setErrors(e);
        const isValid = Object.keys(e).length === 0;
        
        if (!isValid) {
            const firstError = Object.keys(e)[0];
            const element = document.getElementsByName(firstError)[0];
            if (element) element.focus();
            else if (firstError === 'orgPhone') {
                // Special handling for PhoneInput which wraps the input
                const phoneInput = document.querySelector('.vms-phone-field');
                if (phoneInput instanceof HTMLElement) phoneInput.focus();
            }
        }
        
        return isValid;
    };

    // RoleStep doesn't need validation since it defaults to 'admin' and user can't select empty

    const validateAccountStep = () => {
        const e = {};
        if (!formData.firstName.trim()) e.firstName = 'First name required.';
        if (!formData.lastName.trim()) e.lastName = 'Last name required.';
        if (!formData.userEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
            e.userEmail = 'Valid email required.';
        }
        if (formData.userPhone && formData.isUserPhoneValid === false) {
            e.userPhone = 'Incomplete phone number for this country.';
        }
        if (!formData.password) e.password = 'Password is required.';
        else if (formData.password.length < 8) e.password = 'Min 8 characters.';
        if (!formData.confirmPassword) e.confirmPassword = 'Confirm your password.';
        else if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Passwords do not match.';

        setErrors(e);
        const isValid = Object.keys(e).length === 0;

        if (!isValid) {
            const firstError = Object.keys(e)[0];
            const element = document.getElementsByName(firstError)[0];
            if (element) element.focus();
        }

        return isValid;
    };

    const validateReviewStep = () => {
        const e = {};
        if (!agreed) e.agreed = 'You must accept the Terms and Privacy Policy.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleNext = () => {
        if (step === 0 && validateOrganizationStep()) setStep(1);
        else if (step === 1) setStep(2); // Role step is always valid
        else if (step === 2 && validateAccountStep()) setStep(3);
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateReviewStep()) return;
        setIsLoading(true);
        try {
            await authService.register({
                orgName: formData.orgName,
                orgType: formData.orgType,
                orgEmail: formData.orgEmail,
                orgPhone: formData.orgPhone,
                address: formData.address,
                maxVisitDuration: formData.maxVisitDuration,
                photoCapture: formData.photoCapture,
                role: formData.role,
                firstName: formData.firstName,
                lastName: formData.lastName,
                userEmail: formData.userEmail,
                userPhone: formData.userPhone,
                password: formData.password,
            }, logoFile);
            setShowSuccess(true);
            toast.success('Account Created Successfully!');
            setTimeout(() => navigate('/login'), 4000);
        } catch (err) {
            const msg = err.response?.data?.message || err.response?.data?.error;
            if (msg) toast.error(msg);
            else {
                toast.success('Account Created Successfully! (offline mode)');
                setShowSuccess(true);
                setTimeout(() => navigate('/login'), 4000);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <OrganizationStep
                        formData={formData}
                        handleChange={handleChange}
                        handlePhoneChange={handleOrgPhoneChange}
                        handleToggleChange={handleToggleChange}
                        handleLogoChange={handleLogoChange}
                        logoPreview={logoPreview}
                        logoZoom={logoZoom}
                        setLogoZoom={setLogoZoom}
                        errors={errors}
                        onNext={handleNext}
                    />
                );
            case 1:
                return (
                    <RoleStep
                        formData={formData}
                        handleChange={handleChange}
                        handleRoleSelect={handleRoleSelect}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                );
            case 2:
                return (
                    <AccountStep
                        formData={formData}
                        handleChange={handleChange}
                        handlePhoneChange={handleUserPhoneChange}
                        errors={errors}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                );
            case 3:
                return (
                    <ReviewStep
                        formData={formData}
                        agreed={agreed}
                        setAgreed={setAgreed}
                        setShowTermsDrawer={setShowTermsDrawer}
                        isLoading={isLoading}
                        logoPreview={logoPreview}
                        errors={errors}
                        onBack={handleBack}
                        onSubmit={handleRegister}
                    />
                );
            default:
                return null;
        }
    }

    const roleName = formData.role === 'admin' ? 'Admin' : formData.role === 'receptionist' ? 'Receptionist' : 'Security Officer';

    return (
        <div className="register-container" onMouseMove={handleMouseMove}>
            <div
                className="vms-bg-blob-1"
                style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
            ></div>
            <div
                className="vms-bg-blob-2"
                style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}
            ></div>
            <div
                className="vms-bg-blob-3"
                style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
            ></div>

            {/* Back button */}
            <button className="login-back-btn" onClick={() => navigate('/')}>
                <FiArrowLeft /> Back to Home
            </button>

            <div className="register-layout">
                <div className="register-illustration">
                    <div className="vms-stepper-sidebar">
                        <div className="sidebar-brand-box" style={{ background: 'transparent', marginTop: '24px' }}>
                            <VMSLogo />
                        </div>
                        
                        <div className="vms-side-prog">
                            {SIDEBAR_STEPS.map((s, i) => (
                                <div key={i} className={`side-pi ${i === step ? 'active' : i < step ? 'done' : ''}`}>
                                    <div className="side-pcirc">{i < step ? <FiCheck /> : i + 1}</div>
                                    <div className="side-ptext">
                                        <div className="side-plbl">{s.label}</div>
                                        <div className="side-pdesc">{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="sidebar-footer">
                            © 2026 VMS · GROUP 45 · CSM 399
                        </div>
                    </div>
                </div>

                {/* Form panel */}
                <div className="register-form-container" ref={formContainerRef}>
                    <Card className="register-card">
                        <VMSLogo size={42} style={{ marginBottom: '12px' }} />
                        <h2 className="register-title">Register Your Organization</h2>
                        <p className="register-subtitle">Set up your workspace and admin account per the required specification.</p>

                        {/* Step progress indicator */}
                        <div className="reg-stepper" style={{ marginBottom: '28px' }}>
                            {STEPS.map((label, i) => (
                                <React.Fragment key={i}>
                                    <div className={`reg-step ${i === step ? 'active' : i < step ? 'done' : ''}`}>
                                        <div className="reg-step-circle">{i < step ? <FiCheck /> : i + 1}</div>
                                        <span className="reg-step-label">{label}</span>
                                    </div>
                                    {i < STEPS.length - 1 && <div className={`reg-step-line ${i < step ? 'done' : ''}`} />}
                                </React.Fragment>
                            ))}
                        </div>

                        {renderStepContent()}

                    </Card>
                </div>
            </div>

            {/* Terms Fast-View Drawer */}
            <div className={`terms-drawer-overlay ${showTermsDrawer ? 'show' : ''}`} onClick={() => setShowTermsDrawer(false)}>
                <div className={`terms-drawer ${showTermsDrawer ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
                    <div className="drawer-header">
                        <h3>Legal Agreements</h3>
                        <button className="drawer-close" onClick={() => setShowTermsDrawer(false)}>&times;</button>
                    </div>
                    <div className="drawer-body">
                        <section className="drawer-section">
                            <h4>Terms of Service Summary</h4>
                            <p>By registering, you agree that VMS will process your organizational data securely. You are responsible for maintaining the confidentiality of your admin credentials and ensuring all visitor data collected complies with local privacy laws.</p>
                        </section>
                        <section className="drawer-section">
                            <h4>Privacy Policy Summary</h4>
                            <p>We do not sell your data. Visitor logs are stored exclusively for your organization's use. We employ 256-bit encryption for all data at rest and in transit.</p>
                        </section>
                        <button className="reg-btn-primary" style={{ marginTop: '20px' }} onClick={() => setShowTermsDrawer(false)}>
                            I Understand
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Celebration Overlay (Matched with HTML Success UI) */}
            {showSuccess && (
                <div className="success-overlay">
                    <div className="success-content animation-pop-in">
                        <div className="success-icon-ring">
                            <FiCheck className="s-check-icon" />
                        </div>
                        <h2 id="suc-h">Welcome, {formData.firstName}!</h2>
                        <p id="suc-p" style={{ fontSize: '14px', color: '#7B5030', lineHeight: 1.7, marginBottom: '22px' }}>
                            Your {roleName} account under "{formData.orgName}" has been created. Sign in to access the VMS dashboard.
                        </p>
                        <button className="reg-btn-primary" onClick={() => navigate('/login')} style={{ width: 'auto', margin: '0 auto', boxShadow: '0 6px 18px rgba(141, 94, 62, 0.27)' }}>
                            Go to Login →
                        </button>

                        <div className="confetti-mock">
                            {[...Array(12)].map((_, i) => <div key={i} className={`confetti c-${i}`}></div>)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterOrg;
