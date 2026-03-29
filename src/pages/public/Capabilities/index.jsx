import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { capabilitiesData } from '../../../data/capabilitiesData';
import { RiArrowLeftLine, RiCheckboxCircleFill, RiShieldCheckFill, RiLineChartFill } from 'react-icons/ri';
import VMSLogo from '../../../components/common/VMSLogo';
import './Capabilities.css';

const CapabilityDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const capability = capabilitiesData.find(cap => cap.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!capability) {
        return (
            <div className="capability-not-found">
                <h2>Capability not found</h2>
                <button onClick={() => navigate('/')} className="vms-btn-primary">Return Home</button>
            </div>
        );
    }

    return (
        <div className="capability-page">
            <nav className="capability-nav">
                <div className="nav-brand-side">
                    <VMSLogo size={32} />
                </div>
                <button className="back-button" onClick={() => navigate('/')}>
                    <RiArrowLeftLine /> Return Home
                </button>
            </nav>

            <header className="capability-hero">
                <img src={capability.previewImage} alt={capability.title} className="hero-bg-image" />
                <div className="hero-overlay"></div>
                <div className="hero-content-card">
                    <span className="hero-icon-large">{capability.icon}</span>
                    <h1 className="hero-title-text">{capability.title}</h1>
                    <h2 className="hero-subtitle-text">{capability.heroText}</h2>
                </div>
            </header>

            <main className="capability-content-wrapper">
                <section className="capability-deep-dive">
                    <span className="section-label">Capabilities Details</span>
                    <h3>The Advanced Standard</h3>
                    <p className="full-desc">{capability.fullDesc}</p>
                </section>

                <div className="capability-split">
                    <section className="capability-features">
                        <span className="section-label">Technical Logic</span>
                        <div className="feature-grid">
                            {capability.keyFeatures.map((feature, idx) => (
                                <div key={idx} className="feature-pill">
                                    <RiCheckboxCircleFill className="feature-check-icon" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <aside className="capability-side-info">
                         <div className="capability-benefits-box">
                            <RiLineChartFill className="side-icon-large" style={{ fontSize: '32px', marginBottom: '20px' }} />
                            <h3>Enterprise Scale</h3>
                            <div className="benefit-card-highlight">
                                <p>{capability.benefits}</p>
                            </div>
                        </div>

                        <div className="security-assurance-box" style={{ marginTop: '20px', padding: '30px', background: '#ffffff', borderRadius: '30px', border: '1px solid rgba(141, 110, 99, 0.1)' }}>
                            <RiShieldCheckFill style={{ fontSize: '24px', color: '#8d5e3e', marginBottom: '10px' }} />
                            <h4 style={{ color: '#8B573A', fontWeight: '700' }}>Compliance Ready</h4>
                            <p style={{ fontSize: '14px', color: '#8B573A' }}>Built to meet the highest security standards for data protection and audit trails.</p>
                        </div>
                    </aside>
                </div>
            </main>

            <footer className="capability-footer">
                <h3>Ready to modernize your infrastructure?</h3>
                <button onClick={() => navigate('/register')} className="vms-btn-primary cta-btn">
                    Deploy VMS Enterprise
                </button>
                <p style={{ marginTop: '20px', opacity: '0.6', fontSize: '14px' }}>Free deployment for qualified organizations.</p>
            </footer>
        </div>
    );
};

export default CapabilityDetails;
