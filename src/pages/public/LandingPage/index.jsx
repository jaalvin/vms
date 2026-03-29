import { useState, useEffect } from 'react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

import Navbar from '../../../components/landing/Navbar';
import HeroSection from '../../../components/landing/HeroSection';
import TrustedBySection from '../../../components/landing/TrustedBySection';
import LivePulseSection from '../../../components/landing/LivePulseSection';
import ServicesSection from '../../../components/landing/ServicesSection';
import AboutUsSection from '../../../components/landing/AboutUsSection';
import FAQSection from '../../../components/landing/FAQSection';
import ContactSection from '../../../components/landing/ContactSection';
import Footer from '../../../components/landing/Footer';

const LandingPage = () => {
    useScrollReveal();
    const [scrolled, setScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            setShowBackToTop(window.scrollY > 600);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="landing-container">
            {/* Parallax Blobs */}
            <div className="parallax-blob blob-1"></div>
            <div className="parallax-blob blob-2"></div>
            {/* Navigation */}
            <Navbar scrolled={scrolled} />

            <HeroSection />

            <TrustedBySection />

            <LivePulseSection />

            <ServicesSection />

            <AboutUsSection />
            <FAQSection />
            <ContactSection />

            <Footer
                showBackToTop={showBackToTop}
                scrollToTop={scrollToTop}
            />
        </div>
    );
};

export default LandingPage;
