import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiGovernmentLine } from 'react-icons/ri';
import VMSLogo from '../../../components/common/VMSLogo';
import './Legal.css';

const LegalNotice = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page-container">
            <div className="legal-blob legal-blob-1"></div>
            <div className="legal-blob legal-blob-2"></div>

            <nav className="legal-nav">
                <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <VMSLogo size={32} />
                </div>
                <button onClick={() => navigate(-1)} className="back-link-btn">
                    <RiArrowLeftLine /> Back to Home
                </button>
            </nav>

            <header className="legal-hero">
                <div className="legal-hero-content">
                    <span className="legal-eyebrow">Corporate Identification</span>
                    <h1>Legal Notice</h1>
                    <p className="last-updated">Official corporate information and intellectual property designations. <br/>Last Updated: March 14, 2024</p>
                </div>
            </header>

            <main className="legal-content-wrapper">
                <div className="legal-body">
                    <h2>Registered Entity</h2>
                    <p>
                        <strong>VMS Enterprise Solutions Ltd.</strong><br />
                        RC: CS102938475 (Ghana Registrar General's Department)<br />
                        Accra Digital Centre, Block B, 2nd Floor<br />
                        Ring Road West, Accra, Ghana
                    </p>

                    <h2>Contact Specifications</h2>
                    <ul>
                        <li><strong>General Inquiries:</strong> hello@vmsenterprise.com</li>
                        <li><strong>Legal & Compliance:</strong> compliance@vmsenterprise.com</li>
                        <li><strong>Corporate Hotline:</strong> +233 (0) 30 277 8899</li>
                    </ul>

                    <h2>Intellectual Property</h2>
                    <p>The VMS Enterprise platform, including all visual interfaces, custom icons, proprietary source code, and underlying database schemas, is the exclusive intellectual property of VMS Enterprise Solutions Ltd.</p>
                    <ul>
                        <li>Copyright © 2024. All rights reserved.</li>
                        <li>Trademarks: The VMS Logo and "Secure Lobby" architecture are protected.</li>
                    </ul>

                    <h2>Technical Disclaimer</h2>
                    <p>VMS Enterprise provides digital tools to enhance physical security awareness. We do not provide physical security services or insurance. The effectiveness of the system relies on physical enforcement by your authorized security personnel.</p>
                    
                    <div className="legal-footer-cta">
                        <h3>Compliance Verification</h3>
                        <p>Need our tax identification or business permits for your audit?</p>
                        <button className="vms-btn-primary" onClick={() => navigate('/')} style={{ background: '#fff', color: '#8B573A', border: 'none' }}>
                            <RiGovernmentLine /> Request Corporate Documents
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LegalNotice;
