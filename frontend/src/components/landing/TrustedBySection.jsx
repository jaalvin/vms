import { useRef, useEffect } from 'react';

// Importing local logos
import accraBrewery from '../../assets/images/logos/mradot-GHBestLogos-AccraBrewery-1-1400x1400.png';
import alliedOil from '../../assets/images/logos/mradot-GHBestLogos-Allied-1-1400x1400.png';
import goil from '../../assets/images/logos/mradot-GHBestLogos-Goil_new-1-1400x1400.png';
import icgc from '../../assets/images/logos/mradot-GHBestLogos-ICGC-2-1400x1400.png';
import vanguard from '../../assets/images/logos/mradot-GHBestLogos-Vanguard-1-1400x1400.png';
import gua from '../../assets/images/logos/mradot-GHBestLogos-GUA-1-1400x1400.png';
import darling from '../../assets/images/logos/mradot-GHBestLogos-Darling-1-1400x1400.png';
import prudential from '../../assets/images/logos/mradot-GHBestLogos-Prudential-1-1400x1400.png';
import logoGeneric2 from '../../assets/images/logos/images.png';

const TrustedBySection = () => {
    const allPartners = [
        { src: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ecobank_Logo_EN.png", name: "Ecobank" },
        { src: "https://static.cdnlogo.com/logos/m/18/mtn-new_800.png", name: "MTN Group" },
        { src: accraBrewery, name: "Accra Brewery" },
        { src: alliedOil, name: "Allied Oil" },
        { src: goil, name: "GOIL" },
        { src: icgc, name: "ICGC" },
        { src: vanguard, name: "Vanguard Assurance" },
        { src: gua, name: "GUA" },
        { src: darling, name: "Darling" },
        { src: prudential, name: "Prudential Life" },
        { src: logoGeneric2, name: "Innovative Services" }
    ];

    const marqueeRef = useRef(null);
    const scrollSpeed = useRef(0);
    const baseSpeed = 1;

    useEffect(() => {
        let frameId;
        const scroll = () => {
            if (marqueeRef.current) {
                marqueeRef.current.scrollLeft += (baseSpeed + scrollSpeed.current);

                if (marqueeRef.current.scrollLeft >= marqueeRef.current.scrollWidth / 2) {
                    marqueeRef.current.scrollLeft = 0;
                }
            }
            frameId = requestAnimationFrame(scroll);
        };
        frameId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(frameId);
    }, []);

    const handleMarqueeHover = (e) => {
        if (!marqueeRef.current) return;
        const rect = marqueeRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const threshold = rect.width * 0.25;

        if (x < threshold) {
            scrollSpeed.current = -((threshold - x) / 80) - baseSpeed;
        } else if (x > rect.width - threshold) {
            scrollSpeed.current = ((x - (rect.width - threshold)) / 88);
        } else {
            scrollSpeed.current = 0;
        }
    };

    return (
        <section className="trusted-by-section reveal-on-scroll">
            <div className="container-fluid p-0">
                <p className="trusted-label">Trusted by Africa's leading institutions & enterprises</p>
                <div
                    className="logo-marquee"
                    ref={marqueeRef}
                    onMouseMove={handleMarqueeHover}
                    onMouseLeave={() => { scrollSpeed.current = 0; }}
                >
                    <div className="logo-marquee-track">
                        {[...allPartners, ...allPartners].map((partner, index) => (
                            <div key={index} className="logo-card">
                                <img
                                    src={partner.src}
                                    alt={partner.name}
                                    className="partner-logo"
                                    title={partner.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedBySection;
