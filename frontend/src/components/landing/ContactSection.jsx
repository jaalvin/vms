import { useState } from 'react';
import { FiNavigation, FiSmartphone, FiMail, FiCheckCircle, FiSend } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ContactSection = () => {
    const navigate = useNavigate();
    const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [contactSuccess, setContactSuccess] = useState(false);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setContactSuccess(true);
        setContactForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setContactSuccess(false), 5000);
    };

    return (
        <>
            {/* Ready to go digital CTA Banner (Centralized CSS) */}
            <section className="cta-banner-section reveal-on-scroll">
                <div className="container" style={{ maxWidth: '100%', padding: '0' }}>
                    <div className="cta-digital-banner-container">
                        <div className="cta-digital-bg"></div>
                        <div className="cta-digital-overlay"></div>

                        <div className="cta-digital-content" style={{ position: 'relative' }}>
                            <h2 className="cta-digital-title">Ready to go digital?</h2>
                            <p className="cta-digital-text">
                                Create your organization account and start managing visitors <br />
                                professionally from day one.
                            </p>
                            <div className="cta-buttons" style={{ justifyContent: 'center', display: 'flex' }}>
                                <button
                                    className="cta-digital-button"
                                    onClick={() => navigate('/register')}
                                >
                                    Create Organization
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section (B) */}
            <section id="contact-form" className="contact-form-section">
                <div className="container">
                    <div className="contact-row reveal-on-scroll">
                        <div className="contact-info-col">
                            <h2 className="section-title text-left">Get In Touch</h2>
                            <p className="contact-desc">Have a question or need a custom solution? Our team is here to help you find the perfect fit for your organization.</p>
                            <div className="contact-details">
                                <div className="contact-detail-item">
                                    <FiNavigation className="contact-detail-icon" />
                                    <div>
                                        <h5>Our Office</h5>
                                        <p>Accra Digital Centre,<br />Ring Road West, Accra, Ghana</p>
                                        <a
                                            href="https://maps.google.com/?q=Accra+Digital+Centre"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="contact-map-link"
                                        >
                                            View on Maps →
                                        </a>
                                    </div>
                                </div>
                                <div className="contact-detail-item">
                                    <FiSmartphone className="contact-detail-icon" />
                                    <div>
                                        <h5>Call Us</h5>
                                        <p>+233 (0) 30 277 8899</p>
                                    </div>
                                </div>
                                <div className="contact-detail-item">
                                    <FiMail className="contact-detail-icon" />
                                    <div>
                                        <h5>Email Us</h5>
                                        <p>hello@vmsenterprise.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contact-form-col">
                            <form className="contact-form" onSubmit={handleContactSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        value={contactForm.name}
                                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="you@company.com"
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input
                                        type="text"
                                        placeholder="How can we help?"
                                        value={contactForm.subject}
                                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea
                                        placeholder="Tell us about your needs..."
                                        rows={5}
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                        required
                                    ></textarea>
                                </div>
                                {contactSuccess ? (
                                    <div className="contact-success">
                                        <FiCheckCircle className="success-icon" />
                                        <span>Message sent! We'll be in touch shortly.</span>
                                    </div>
                                ) : (
                                    <button type="submit" className="vms-btn-primary contact-submit-btn">
                                        <FiSend /> Send Message
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactSection;
