import { useState } from 'react';

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How does VMS ensure visitor data privacy?",
            answer: "We employ enterprise-grade 256-bit encryption for all data at rest and in transit. Our system is fully GDPR and NDPR compliant, ensuring that visitor information is only accessible to authorized personnel and is automatically purged based on your institution's retention policy."
        },
        {
            question: "Can VMS integrate with our existing security hardware?",
            answer: "Absolutely. VMS is designed for seamless integration with thermal scanners, turnstiles, and biometric systems. Our API-first architecture allows for custom connections to most modern security infrastructure used across Africa."
        },
        {
            question: "Is there an offline mode for remote locations?",
            answer: "Yes, VMS features a robust 'Sync-Later' capability. Your front desk can continue checking in visitors during internet outages; the data will securely synchronize with the central cloud database the moment connectivity is restored."
        },
        {
            question: "How long does it take to deploy VMS in our organization?",
            answer: "Our 'Express Deployment' protocol allows most organizations to go live within 48 to 72 hours. This includes station setup, staff training, and custom branding of your visitor badges and digital kiosks."
        },
        {
            question: "Does VMS support multi-branch management?",
            answer: "Indeed. VMS provides a centralized global dashboard that allows you to manage security and visitor flows across multiple locations, cities, or even countries from a single administrative interface."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section reveal-on-scroll">
            <div className="faq-container">
                <div className="faq-header">
                    <h2>Got Questions?</h2>
                    <p>Everything you need to know about the VMS ecosystem.</p>
                </div>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                        >
                            <button 
                                className="faq-question" 
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={activeIndex === index}
                            >
                                <h4>{faq.question}</h4>
                                <div className="faq-icon">+</div>
                            </button>
                            <div className="faq-answer-wrapper">
                                <div className="faq-answer">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
