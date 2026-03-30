import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiHandCoinLine } from 'react-icons/ri';
import VMSLogo from '../../../components/common/VMSLogo';
import './Legal.css';

const TermsOfService = () => {
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
                    <span className="legal-eyebrow">Operating Agreement</span>
                    <h1>Terms of Service</h1>
                    <p className="last-updated">The rules and guidelines for using the VMS Enterprise platform. <br/>Last Updated: March 14, 2024</p>
                </div>
            </header>

            <main className="legal-content-wrapper">
                <div className="legal-body">
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing or using the VMS Enterprise platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>

                    <h2>2. Service Provision</h2>
                    <p>VMS Enterprise provides a cloud-based visitor management solution. We reserve the right to modify, suspend, or discontinue any part of the service at any time, with notice to active organizations where applicable.</p>
                    <ul>
                        <li>99.9% Uptime Commitment for Enterprise tiers.</li>
                        <li>Regular security updates and feature enhancements.</li>
                        <li>Technical support via helpdesk for authorized administrators.</li>
                    </ul>

                    <h2>3. Organizational Responsibility</h2>
                    <p>Each registered organization is responsible for its own account security and the conduct of its assigned staff (Admins, Receptionists, Security).</p>
                    <ul>
                        <li>Maintaining confidential login credentials.</li>
                        <li>Ensuring all visitor data is collected legally.</li>
                        <li>Promptly notifying VMS of any unauthorized account access.</li>
                    </ul>

                    <h2>4. Prohibited Activities</h2>
                    <p>To maintain a secure environment, the following actions are strictly prohibited:</p>
                    <ul>
                        <li>Attempting to bypass security protocols or system limits.</li>
                        <li>Automated scraping of data or denial-of-service attacks.</li>
                        <li>Using the platform to store information unrelated to visitor management.</li>
                    </ul>

                    <h2>5. Governing Law</h2>
                    <p>These terms and conditions are governed by and construed in accordance with the laws of the Republic of Ghana, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
                    
                    <div className="legal-footer-cta">
                        <h3>Need clarification on our terms?</h3>
                        <p>Our partnership team is here to explain how we work with your organization.</p>
                        <button className="vms-btn-primary" onClick={() => navigate('/')} style={{ background: '#fff', color: '#8B573A', border: 'none' }}>
                            <RiHandCoinLine /> View Business FAQ
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TermsOfService;
