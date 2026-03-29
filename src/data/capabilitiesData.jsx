// Importing generated preview images
import liveBoardImg from '../assets/images/capabilities/live-board.png';
import photoCaptureImg from '../assets/images/capabilities/photo-capture.png';
import analyticsImg from '../assets/images/capabilities/analytics.png';
import appointmentsImg from '../assets/images/capabilities/appointments.png';
import emergencyImg from '../assets/images/capabilities/emergency.png';
import accessControlImg from '../assets/images/capabilities/access-control.png';

import { RiDashboard3Fill, RiUserLocationFill, RiPieChart2Fill, RiCalendarCheckFill, RiAlarmWarningFill, RiShieldUserFill } from 'react-icons/ri';

export const capabilitiesData = [
    {
        id: "live-visitor-board",
        icon: <RiDashboard3Fill />,
        previewImage: liveBoardImg,
        title: "Real-time Live Visitor Board",
        shortDesc: "Live tracking of active, checked-out, and overdue visitors.",
        heroText: "Total Visibility at Every Second.",
        fullDesc: "Our Real-time Live Visitor Board revolutionizes front-desk operations by providing immediate, visually-coded awareness of your entire facility's occupancy. It automatically updates at set polling intervals without requiring manual page refreshes, guaranteeing your security and administrative teams are never acting on stale data. The dashboard elegantly sorts visitors into distinct visual categories using color-coded badges to instantly distinguish between active visitors, those who have completed their check-out process, and individuals who are overdue for departure.",
        keyFeatures: [
            "Automatic Real-Time Polling (30-second intervals)",
            "Color-Coded Status Modules (Active, Checked-out, Overdue)",
            "Dynamic Row Filtering and Immediate Search",
            "Centralized Dashboard Architecture Interface"
        ],
        benefits: "Enhances situational awareness, immediately identifies lingering guests unauthorized to exceed their timeline, and eliminates the ambiguity of physical logbooks completely."
    },
    {
        id: "check-in-photo-capture",
        icon: <RiUserLocationFill />,
        previewImage: photoCaptureImg,
        title: "Check-In & Photo Capture",
        shortDesc: "Rapid registration with ID logging and webcam photo capture.",
        heroText: "Secure Check-Ins in Seconds.",
        fullDesc: "Eliminate front-desk bottlenecks while enforcing stringent compliance protocols. Our check-in module features an intuitive, fast-paced interface where receptionists securely log visitor details, assign them to authorized internal hosts, and mandate the completion of digital forms or Non-Disclosure Agreements (NDAs). For facilities demanding heightened security, the module integrates directly with standard web cameras, automatically capturing and attaching a high-resolution portrait photograph of the visitor directly onto their secure digital profile and printable badge.",
        keyFeatures: [
            "Integrated Hardware Web Camera Support",
            "Automatic Internal Host Dropdown Assignment",
            "Custom Visit Purpose Identification Field",
            "Rapid Onboarding and Profile Creation"
        ],
        benefits: "Drastically speeds up the onboarding process while guaranteeing that physical identity matching is enforced through photographic evidence before building access is granted."
    },
    {
        id: "analytics-reporting",
        icon: <RiPieChart2Fill />,
        previewImage: analyticsImg,
        title: "Advanced Reporting & Analytics",
        shortDesc: "Visual statistics, custom date-range reports and CSV/PDF export.",
        heroText: "Data-Driven Security Intelligence.",
        fullDesc: "Data is only as valuable as the insights it provides. The VMS platform is equipped with an integrated analytics and reporting engine that meticulously tracks facility usage. Using sophisticated visualization libraries, administrators are presented with comprehensive trend charts comparing peak visitation hours, monthly throughputs, and host activity density. For auditing and administrative reviews, the robust reporting framework effortlessly generates detailed custom reports spanning arbitrary date ranges, immediately exportable to universal formats like PDF and CSV spreadsheets.",
        keyFeatures: [
            "Interactive Visual Charts for Trend Tracking",
            "Custom Date-Range Parametric Filtering",
            "One-Click PDF Document Generation",
            "Complete Raw-Data CSV Exporting"
        ],
        benefits: "Supercharges administrative planning, identifies heavy-traffic bottlenecks for staff scaling, and dramatically simplifies historical compliance auditing and legal discovery."
    },
    {
        id: "pre-registration-appointments",
        icon: <RiCalendarCheckFill />,
        previewImage: appointmentsImg,
        title: "Pre-Registration & Appointments",
        shortDesc: "Secure scheduling allowing hosts to pre-register expected guests.",
        heroText: "Anticipate Every Arrival.",
        fullDesc: "Modern organizations cannot wait for visitors to arrive before beginning security protocols. Our Pre-Registration and Appointments module proactively empowers designated hosts and administrators to schedule visits well in advance. Visitors receive calendar invitations while security teams are notified immediately of expected daily traffic. When a pre-registered visitor eventually arrives, their profile is instantly recalled by the receptionist—bypassing the entire registration phase and reducing the check-in interaction to a single, seamless confirmation click.",
        keyFeatures: [
            "Proactive Visitor Scheduling Workflows",
            "Direct Host-to-Visitor Pre-Registration",
            "Daily Expected Arrivals Reception Manifest",
            "One-Click 'Mark Arrived' Rapid Intake"
        ],
        benefits: "Fosters a premium, 'VIP' welcome experience for guests while preventing unauthorized or surprise walk-ins from compromising workplace operations."
    },
    {
        id: "emergency-response",
        icon: <RiAlarmWarningFill />,
        previewImage: emergencyImg,
        title: "Emergency Response Mode",
        shortDesc: "Rapid, print-friendly occupancy list generation for evacuations.",
        heroText: "Certainty During Critical Incidents.",
        fullDesc: "When every single second is a matter of absolute safety, panic and confusion are the enemy. The VMS platform features a dedicated, single-button protocol known as Emergency Response Mode. When triggered, the interface radically shifts into a high-visibility, red-alert state that automatically strips away unnecessary UI elements and instantly generates a master evacuation roster. This document specifically lists all individuals currently registered inside the perimeter and offers an explicit, high-contrast 'Print-Friendly' layout allowing safety wardens to immediately grab a physical roll-call ledger.",
        keyFeatures: [
            "Single-Button Emergency Mode Activation",
            "Instantaneous Live-Occupancy Roster Extraction",
            "Optimized Print-Friendly UI Formatting",
            "High-Visibility Red Alert Aesthetic State"
        ],
        benefits: "Transforms chaotic building evacuations into structured, accountable safety sweeps, ensuring no visitor is left unaccounted for during fire drills or genuine emergencies."
    },
    {
        id: "role-based-access",
        icon: <RiShieldUserFill />,
        previewImage: accessControlImg,
        title: "Role-Based Access Control",
        shortDesc: "Segregated access for Admins, Receptionists, and Security.",
        heroText: "Uncompromising Internal Security.",
        fullDesc: "We recognize that the principle of 'least privilege' is a cornerstone of enterprise security. The Visitor Management System doesn't just manage the general public—it manages your staff through stringent Role-Based Access Control (RBAC). The architecture rigidly segregates the application into distinct, role-specific environments. Administrators govern system-wide settings and data analytics; Receptionists exclusively access the daily scheduling and check-in workflows; Security Personnel are isolated to real-time monitoring and emergency protocols. Routes and APIs actively verify credentials at every phase.",
        keyFeatures: [
            "Strict Interface and Route Segregation",
            "Role-Specific Intelligent Redirections",
            "Hierarchical Control Topologies",
            "Dedicated Security Monitoring Views"
        ],
        benefits: "Protects highly sensitive analytical and configurational parameters from unauthorized staff manipulation while maintaining streamlined, distraction-free workspaces for operational teams."
    }
];
