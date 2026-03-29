import { FiTarget, FiUsers, FiShield, FiTrendingUp } from 'react-icons/fi';
import aerialTeam from '../../assets/images/aerial-view-business-team.jpg';

const AboutUsSection = () => {
    return (
        <section id="about" className="about-play-section">
            {/* Full-width Hero Image Banner */}
            <div className="about-hero-banner reveal-on-scroll full-wall-to-wall">
                <img src={aerialTeam} alt="VMS Business Team" className="about-hero-img" />
                <div className="about-hero-overlay">
                    <div className="about-hero-content-centering container">
                        <div className="about-hero-badge">
                            <span className="about-hero-badge-num">500+</span>
                            <span className="about-hero-badge-lbl">Organizations Trust Us</span>
                        </div>
                        <div className="about-hero-title-block">
                            <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '10px' }}>Our Aim &amp; Mission</span>
                            <h2 className="about-hero-heading">
                                People-First.<br />Technology-Driven.
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rest of the content stays in container */}
            <div className="container">
                {/* Mission Statement */}
                <div className="about-mission-row reveal-on-scroll">
                    <div className="about-mission-text">
                        <p>
                            VMS Enterprise is on a mission to redefine how African organizations manage their physical
                            security — replacing manual paper logs with a smart, automated ecosystem that delivers
                            absolute transparency and peace of mind.
                        </p>
                    </div>
                    <div className="about-mission-divider" />
                    <div className="about-mission-stats">
                        <div className="about-stat">
                            <span className="about-stat-num">2M+</span>
                            <span className="about-stat-lbl">Check-ins Logged</span>
                        </div>
                        <div className="about-stat">
                            <span className="about-stat-num">99.9%</span>
                            <span className="about-stat-lbl">Uptime SLA</span>
                        </div>
                        <div className="about-stat">
                            <span className="about-stat-num">45s</span>
                            <span className="about-stat-lbl">Avg Check-in Time</span>
                        </div>
                    </div>
                </div>

                {/* Pillar Cards */}
                <div className="about-pillars-v2 reveal-on-scroll delay-1">
                    <div className="pillar-v2-card">
                        <div className="pillar-v2-icon" style={{ background: 'rgba(139, 87, 58, 0.1)', color: '#8B573A' }}>
                            <FiTarget />
                        </div>
                        <h4>Our Vision</h4>
                        <p>A future where every front-desk interaction is powered by intelligent technology — seamless, secure, and data-driven.</p>
                    </div>
                    <div className="pillar-v2-card">
                        <div className="pillar-v2-icon" style={{ background: 'rgba(67, 160, 71, 0.1)', color: '#43a047' }}>
                            <FiUsers />
                        </div>
                        <h4>People at the Core</h4>
                        <p>Built for real organizations, by a team that understands facility management in the African enterprise context.</p>
                    </div>
                    <div className="pillar-v2-card">
                        <div className="pillar-v2-icon" style={{ background: 'rgba(30, 136, 229, 0.1)', color: '#1e88e5' }}>
                            <FiShield />
                        </div>
                        <h4>Enterprise Security</h4>
                        <p>Built with enterprise-grade protocols ensuring complete data integrity, audit trails, and role-based access for every user.</p>
                    </div>
                    <div className="pillar-v2-card">
                        <div className="pillar-v2-icon" style={{ background: 'rgba(251, 140, 0, 0.1)', color: '#fb8c00' }}>
                            <FiTrendingUp />
                        </div>
                        <h4>Real-Time Insight</h4>
                        <p>Transform complex facility traffic into clear, actionable reporting dashboards — empowering decision-makers instantly.</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutUsSection;
