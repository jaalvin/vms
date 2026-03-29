import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiPhone, FiArrowUp } from 'react-icons/fi';
import VMSLogo from '../common/VMSLogo';

// Importing social icons from assets/icons
import fbIcon from '../../assets/icons/facebook.png';
import igIcon from '../../assets/icons/instagram.png';
import liIcon from '../../assets/icons/linkedin.png';
import xIcon from '../../assets/icons/twitter.png';

const Footer = ({ showBackToTop, scrollToTop }) => {
    const navigate = useNavigate();
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterSuccess, setNewsletterSuccess] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (newsletterEmail) {
            setNewsletterSuccess(true);
            setNewsletterEmail('');
            setTimeout(() => setNewsletterSuccess(false), 5000);
        }
    };

    const handleFooterNav = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            const offset = 10;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <footer id="contact" className="vms-footer">
                <div className="footer-top-shape"></div>

                <div className="container">
                    <div className="footer-main">
                        {/* Column 1: Brand & Social */}
                        <div className="footer-col brand-col">
                            <VMSLogo size={32} />
                            <p className="footer-brand-desc">
                                Professional Visitor Management System built for the modern African enterprise. Secure, efficient, and seamless.
                            </p>
                            <div className="footer-location-info">
                                <p><FiMapPin /> Accra Digital Centre, Ring Road West, Accra</p>
                                <p><FiPhone /> +233 (0) 30 277 8899</p>
                            </div>
                            <div className="social-links">
                                <a href="#" className="social-link"><img src={fbIcon} alt="Facebook" className="social-icon" /></a>
                                <a href="#" className="social-link"><img src={igIcon} alt="Instagram" className="social-icon" /></a>
                                <a href="#" className="social-link"><img src={liIcon} alt="LinkedIn" className="social-icon" /></a>
                                <a href="#" className="social-link"><img src={xIcon} alt="X" className="social-icon" /></a>
                            </div>
                        </div>

                        {/* Column 2: Services */}
                        <div className="footer-col links-col">
                            <h4 className="footer-title">Services</h4>
                            <ul className="footer-list">
                                <li><a href="#service-row-0">Visitor Check-In</a></li>
                                <li><a href="#service-row-1">Live Visitor Board</a></li>
                                <li><a href="#service-row-2">Appointments</a></li>
                                <li><a href="#service-row-3">Reports & Analytics</a></li>
                                <li><a href="#service-row-4">Staff Management</a></li>
                            </ul>
                        </div>

                        {/* Column 3: Quick Access */}
                        <div className="footer-col links-col">
                            <h4 className="footer-title">Quick Access</h4>
                            <ul className="footer-list">
                                <li><a href="#about" onClick={(e) => handleFooterNav(e, 'about')}>About Us</a></li>
                                <li><button className="footer-link-btn" onClick={() => navigate('/login')}>Login</button></li>
                                <li><button className="footer-link-btn" onClick={() => navigate('/register')}>Register Organization</button></li>
                                <li><a href="#capabilities" className="footer-link-btn" style={{ textDecoration: 'none' }} onClick={(e) => handleFooterNav(e, 'capabilities')}>System Capabilities</a></li>
                                <li><a href="#contact-form" className="footer-link-btn" style={{ textDecoration: 'none' }} onClick={(e) => handleFooterNav(e, 'contact-form')}>Contact Support</a></li>
                            </ul>
                        </div>

                        {/* Column 4: Newsletter */}
                        <div className="footer-col newsletter-col">
                            <h4 className="footer-title">Stay Secure</h4>
                            <p className="newsletter-desc">Subscribe to our newsletter for security best practices and updates.</p>
                            <form className="newsletter-form-modern" onSubmit={handleNewsletterSubmit}>
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="newsletter-input"
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="newsletter-btn">
                                    {newsletterSuccess ? 'Subscribed!' : 'Stay Informed'}
                                </button>
                            </form>
                            {newsletterSuccess && (
                                <p className="newsletter-success-msg">Check your inbox for a welcome gift!</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom-bar">
                    <div className="container">
                        <div className="footer-bottom-flex">
                            <p className="copyright">© {new Date().getFullYear()} VMS Enterprise. All rights reserved.</p>
                            <div className="footer-utility-links">
                                <button className="footer-link-btn" onClick={() => navigate('/privacy')}>Privacy Policy</button>
                                <button className="footer-link-btn" onClick={() => navigate('/terms')}>Terms of Service</button>
                                <button className="footer-link-btn" onClick={() => navigate('/legal-notice')}>Legal Notice</button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back-to-Top Button */}
            <button
                className={`back-to-top-btn ${showBackToTop ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Back to top"
            >
                <FiArrowUp />
            </button>
        </>
    );
};

export default Footer;
