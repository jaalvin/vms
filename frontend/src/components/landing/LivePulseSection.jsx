import { FiUsers, FiGlobe, FiActivity, FiTrendingUp } from 'react-icons/fi';
import CountUp from 'react-countup';

const LivePulseSection = () => {
    return (
        <section className="live-pulse-section">
            <div className="container">
                <div className="pulse-grid">
                    <div className="pulse-card reveal-on-scroll">
                        <div className="live-indicator">
                            <span className="pulse-dot"></span> Live
                        </div>
                        <div className="pulse-icon-wrap"><FiUsers /></div>
                        <span className="pulse-num"><CountUp end={850} duration={3} enableScrollSpy scrollSpyOnce />+</span>
                        <span className="pulse-label">Companies</span>
                        <p className="pulse-desc">Organizations trust VMS to secure their premises every single day.</p>
                    </div>

                    <div className="pulse-card reveal-on-scroll delay-1">
                        <div className="pulse-icon-wrap"><FiTrendingUp /></div>
                        <span className="pulse-num"><CountUp end={12} duration={2.5} enableScrollSpy scrollSpyOnce />M+</span>
                        <span className="pulse-label">Check-ins</span>
                        <p className="pulse-desc">Total visitor interactions processed with zero data loss or breach.</p>
                    </div>

                    <div className="pulse-card reveal-on-scroll delay-2">
                        <div className="live-indicator">
                            <span className="pulse-dot"></span> Active
                        </div>
                        <div className="pulse-icon-wrap"><FiGlobe /></div>
                        <span className="pulse-num"><CountUp end={24} duration={2} enableScrollSpy scrollSpyOnce />/7</span>
                        <span className="pulse-label">Uptime</span>
                        <p className="pulse-desc">Guaranteed system availability across all regions and deployments.</p>
                    </div>

                    <div className="pulse-card reveal-on-scroll delay-3">
                        <div className="pulse-icon-wrap"><FiActivity /></div>
                        <span className="pulse-num"><CountUp end={98} duration={2.8} enableScrollSpy scrollSpyOnce />%</span>
                        <span className="pulse-label">Efficiency</span>
                        <p className="pulse-desc">Average reduction in reception processing time for manual check-ins.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LivePulseSection;
