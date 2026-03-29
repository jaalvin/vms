import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiMailSendLine } from 'react-icons/ri';
import VMSLogo from '../../../components/common/VMSLogo';
import './Legal.css';

const PrivacyPolicy = () => {
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
                    <span className="legal-eyebrow">Data Protection</span>
                    <h1>Privacy Policy</h1>
                    <p className="last-updated">Transparency in how we protect your organization and visitors. <br/>Last Updated: March 13, 2024</p>
                </div>
            </header>

            <main className="legal-content-wrapper">
                <div className="legal-body">
                    <h2>1. Strategic Commitment</h2>
                    <p>At VMS Enterprise, we don't just secure physical lobbies; we secure the data that flows through them. Our privacy framework is built on the principles of "Privacy by Design," ensuring that data protection is baked into every check-in and every report.</p>

                    <h2>2. Information We Secure</h2>
                    <p>To provide a professional visitor management experience, we process the following categories of data:</p>
                    <ul>
                        <li><strong>Identity Data:</strong> Full names, government-issued IDs (when requested), and visitor photographs.</li>
                        <li><strong>Contact Data:</strong> Phone numbers and email addresses for host notification and audit logs.</li>
                        <li><strong>Occupancy Telemetry:</strong> Precise check-in/out timestamps and visit duration tracking.</li>
                        <li><strong>Technical Fingerprints:</strong> Browser types and IP addresses used during login for security auditing.</li>
                    </ul>

                    <h2>3. How We Use Data</h2>
                    <p>The primary "Data Controller" is the Organization registered on our platform. VMS Enterprise acts as the "Data Processor," using information for:</p>
                    <ul>
                        <li>Automating organization-wide security protocols.</li>
                        <li>Generating emergency evacuation rolls in real-time.</li>
                        <li>Providing historical audit trails for compliance departments.</li>
                        <li>Preventing unauthorized physical access to your premises.</li>
                    </ul>

                    <h2>4. Enterprise-Grade Security</h2>
                    <p>We leverage industry-leading encryption (AES-256) for data at rest and TLS 1.3 for data in transit. Our infrastructure is hosted on secure, compliant cloud servers with 99.9% uptime and zero-trust architecture.</p>

                    <h2>5. Your Rights & Compliance</h2>
                    <p>We strictly adhere to the Ghana Data Protection Act (Act 843). Organizations can request full exports of their data or permanent deletion of specific records via the Admin Dashboard or by contacting our legal team.</p>
                    
                    <div className="legal-footer-cta">
                        <h3>Questions about your data?</h3>
                        <p>Our legal and compliance team is available to assist your IT department.</p>
                        <button className="vms-btn-primary" onClick={() => navigate('/')} style={{ background: '#fff', color: '#8B573A', border: 'none' }}>
                            <RiMailSendLine /> Contact Legal Team
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
