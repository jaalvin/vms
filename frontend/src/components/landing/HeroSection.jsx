import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';

const HeroSection = () => {
    const navigate = useNavigate();

    const scrollToCapabilities = () => {
        const element = document.getElementById('capabilities');
        if (element) {
            const offset = 18;
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
        <section id="home" className="play-hero-v2">
            <div className="hero-bg-v2" />
            <div className="hero-overlay-v2" />

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div className="hero-content-v2 reveal-on-scroll">
                    <h1 className="hero-title-v2">
                        Modern Visitor Management<br />
                        for <em>Organizations</em>
                    </h1>

                    <p className="hero-subtitle-v2">
                        Streamline guest check-ins, secure your premises, and manage every visit with confidence — all in one powerful platform.
                    </p>

                    <div className="hero-action-v2">
                        <button className="vms-btn-primary play-btn-main" style={{ padding: '12px 28px', width: '65%' }} onClick={() => navigate('/register')}>
                            Get Started
                        </button>
                        <button className="vms-btn-outline play-btn-ghost" style={{ padding: '12px 28px', width: '65%' }} onClick={scrollToCapabilities}>
                            Explore Platform →
                        </button>
                    </div>

                    <div className="hero-inline-stats" style={{ marginTop: '50px', background: 'rgba(255,255,255,0.06)' }}>
                        <div className="inline-stat">
                            <span className="inline-stat-number"><CountUp end={5000} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />+</span>
                            <span className="inline-stat-label">Organizations</span>
                        </div>
                        <div className="inline-stat-divider"></div>
                        <div className="inline-stat">
                            <span className="inline-stat-number"><CountUp end={99} duration={2} enableScrollSpy scrollSpyOnce />.9%</span>
                            <span className="inline-stat-label">Uptime SLA</span>
                        </div>
                        <div className="inline-stat-divider"></div>
                        <div className="inline-stat">
                            <span className="inline-stat-number"><CountUp end={2} duration={1.5} enableScrollSpy scrollSpyOnce />M+</span>
                            <span className="inline-stat-label">Check-ins Logged</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
