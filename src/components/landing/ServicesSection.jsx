import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiCheck } from 'react-icons/fi';
import { capabilitiesData } from '../../data/capabilitiesData';

const ServicesSection = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* How It Works — SaaS Grade */}
            <section className="how-section" id="how">
                <div className="container">
                    <div className="section-center text-center reveal-on-scroll">
                        <span className="section-eyebrow">Simple Process</span>
                        <h2 className="section-h2">How It Works</h2>
                        <p className="section-sub">Three easy steps to go digital and stay secure.</p>
                    </div>

                    <div className="how-steps reveal-on-scroll">
                        <div className="how-card">
                            <img className="how-img" src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80" alt="Register organization" />
                            <div className="how-body">
                                <div className="how-step-num">1</div>
                                <h4 className="how-title">Register Your Organization</h4>
                                <p className="how-desc">Create your organization account and set up your admin profile. Takes less than 2 minutes of your time.</p>
                            </div>
                        </div>

                        <div className="how-card">
                            <img className="how-img" src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" alt="Staff checks in visitors" />
                            <div className="how-body">
                                <div className="how-step-num">2</div>
                                <h4 className="how-title">Start Checking Visitors In</h4>
                                <p className="how-desc">Front-desk staff quickly record visitor arrivals and departures using the intuitive VMS dashboard.</p>
                            </div>
                        </div>

                        <div className="how-card">
                            <img className="how-img" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" alt="Admin views reports" />
                            <div className="how-body">
                                <div className="how-step-num">3</div>
                                <h4 className="how-title">Admin Views Reports & Dashboard</h4>
                                <p className="how-desc">Monitor visitor activity, generate reports, and review analytics in real time from anywhere in the world.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Services Section (Play Aesthetic) */}
            <section id="services" className="detailed-services-play">
                <div className="container">
                    <div className="section-header text-center reveal-on-scroll">
                        <h2 className="section-title">Our Core Services</h2>
                        <p className="section-subtitle">Everything your front desk needs — powered by intelligent automation and real-time monitoring.</p>
                    </div>

                    {/* Service 1: Visitor Check-In & Check-Out */}
                    <div id="service-row-0" className="service-play-row reveal-on-scroll">
                        <div className="service-play-text">
                            <div className="service-accent-bar"></div>
                            <h3 className="service-play-title">Visitor Check-In & Check-Out</h3>
                            <p className="service-play-desc">
                                Digitize your front desk in seconds. Capture full visitor details, assign hosts,
                                and generate automatic timestamps — no more paper logbooks or manual errors.
                            </p>
                            <ul className="service-check-list">
                                <li><FiCheckCircle className="check-icon" /> Full visitor registration (name, phone, purpose, host, ID)</li>
                                <li><FiCheckCircle className="check-icon" /> Automatic check-in & check-out timestamps</li>
                                <li><FiCheckCircle className="check-icon" /> Optional photo capture for security verification</li>
                            </ul>
                            <button className="service-learn-more" onClick={() => navigate('/capabilities/check-in-photo-capture')}>
                                Learn More <span>→</span>
                            </button>
                        </div>
                        <div className="service-play-image">
                            <img loading="lazy" src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Visitor Check-In" className="play-img shadow-lg" />
                            <div className="service-floating-badge top-right">
                                <span className="badge-number">↓40%</span>
                                <span className="badge-label">Wait Time</span>
                            </div>
                        </div>
                    </div>

                    {/* Service 2: Live Visitor Board */}
                    <div id="service-row-1" className="service-play-row reverse reveal-on-scroll">
                        <div className="service-play-text">
                            <div className="service-accent-bar"></div>
                            <h3 className="service-play-title">Live Visitor Board</h3>
                            <p className="service-play-desc">
                                Know exactly who is inside your building at any moment. A real-time dashboard
                                for receptionists and security teams with automatic status updates and overdue alerts.
                            </p>
                            <ul className="service-check-list">
                                <li><FiCheck className="check-icon" /> Real-time presence monitoring with auto-refresh</li>
                                <li><FiCheck className="check-icon" /> Color-coded overdue visitor alerts</li>
                                <li><FiCheck className="check-icon" /> Security verification with visitor photos</li>
                            </ul>
                            <button className="service-learn-more" onClick={() => navigate('/capabilities/live-visitor-board')}>
                                Learn More <span>→</span>
                            </button>
                        </div>
                        <div className="service-play-image">
                            <img loading="lazy" src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Live Visitor Board" className="play-img shadow-lg" />
                            <div className="service-floating-badge bottom-left">
                                <span className="badge-number">24/7</span>
                                <span className="badge-label">Monitoring</span>
                            </div>
                        </div>
                    </div>

                    {/* Service 3: Appointment Scheduling */}
                    <div id="service-row-2" className="service-play-row reveal-on-scroll">
                        <div className="service-play-text">
                            <div className="service-accent-bar"></div>
                            <h3 className="service-play-title">Appointment Scheduling</h3>
                            <p className="service-play-desc">
                                Pre-register expected visitors and streamline their arrival. Hosts get notified automatically,
                                and visitors are fast-tracked through a single-click confirmation on arrival.
                            </p>
                            <ul className="service-check-list">
                                <li><FiCheck className="check-icon" /> Create, edit, and cancel appointments</li>
                                <li><FiCheck className="check-icon" /> Assign hosts and link visitors in advance</li>
                                <li><FiCheck className="check-icon" /> Daily appointment view for receptionists</li>
                            </ul>
                            <button className="service-learn-more" onClick={() => navigate('/capabilities/pre-registration-appointments')}>
                                Learn More <span>→</span>
                            </button>
                        </div>
                        <div className="service-play-image">
                            <img loading="lazy" src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=1200" alt="Appointment Scheduling" className="play-img shadow-lg" />
                            <div className="service-floating-badge top-right">
                                <span className="badge-number">1-Click</span>
                                <span className="badge-label">Check-in</span>
                            </div>
                        </div>
                    </div>

                    {/* Service 4: Reports & Analytics */}
                    <div id="service-row-3" className="service-play-row reverse reveal-on-scroll">
                        <div className="service-play-text">
                            <div className="service-accent-bar"></div>
                            <h3 className="service-play-title">Reports & Analytics</h3>
                            <p className="service-play-desc">
                                Turn visitor data into actionable insights. Generate structured reports for compliance,
                                audits, and operational planning — all exportable in seconds.
                            </p>
                            <ul className="service-check-list">
                                <li><FiCheck className="check-icon" /> Daily, weekly, and monthly report generation</li>
                                <li><FiCheck className="check-icon" /> One-click export to CSV and PDF</li>
                                <li><FiCheck className="check-icon" /> Visual visitor trend charts and analytics</li>
                            </ul>
                            <button className="service-learn-more" onClick={() => navigate('/capabilities/analytics-reporting')}>
                                Learn More <span>→</span>
                            </button>
                        </div>
                        <div className="service-play-image">
                            <img loading="lazy" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" alt="Reports & Analytics" className="play-img shadow-lg" />
                            <div className="service-floating-badge bottom-left">
                                <span className="badge-number">PDF</span>
                                <span className="badge-label">& CSV Export</span>
                            </div>
                        </div>
                    </div>

                    {/* Service 5: Staff & Role Management */}
                    <div id="service-row-4" className="service-play-row reveal-on-scroll">
                        <div className="service-play-text">
                            <div className="service-accent-bar"></div>
                            <h3 className="service-play-title">Staff & Role Management</h3>
                            <p className="service-play-desc">
                                Maintain complete control over who accesses what. Add staff, assign roles, and manage
                                permissions from a single administration panel with full audit logging.
                            </p>
                            <ul className="service-check-list">
                                <li><FiCheck className="check-icon" /> Add and manage staff accounts</li>
                                <li><FiCheck className="check-icon" /> Assign roles (Admin, Receptionist, Security)</li>
                                <li><FiCheck className="check-icon" /> Deactivate or remove user access instantly</li>
                            </ul>
                            <button className="service-learn-more" onClick={() => navigate('/capabilities/role-based-access')}>
                                Learn More <span>→</span>
                            </button>
                        </div>
                        <div className="service-play-image">
                            <img loading="lazy" src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200" alt="Staff & Role Management" className="play-img shadow-lg" />
                            <div className="service-floating-badge top-right">
                                <span className="badge-number">3</span>
                                <span className="badge-label">Access Levels</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* System Capabilities / Feature Highlights (Play Design) */}
            <section id="capabilities" className="capabilities-section">
                <div className="section-header text-center reveal-on-scroll">
                    <h2 className="section-title">System Capabilities</h2>
                    <p className="section-subtitle">A robust, scalable platform built to replace every aspect of manual logbooks.</p>
                </div>
                <div className="capabilities-grid">
                    {capabilitiesData.map((capability, index) => (
                        <div
                            key={capability.id}
                            className={`capability-item reveal-on-scroll delay-${(index % 4) + 1}`}
                            onClick={() => navigate(`/capabilities/${capability.id}`)}
                        >
                            <div className="cap-image-wrapper">
                                <img src={capability.previewImage} alt={capability.title} className="cap-preview-img" />
                                <div className="cap-icon-overlay">{capability.icon}</div>
                                <div className="cap-img-overlay"></div>
                            </div>
                            <div className="cap-content">
                                <h4>{capability.title}</h4>
                                <p>{capability.shortDesc}</p>
                                <span className="cap-learn-more">Learn More →</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default ServicesSection;
