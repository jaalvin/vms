// Mock data to simulate backend response

export const initialStaffData = [
    { id: 1, name: 'Alice brown', role: 'Admin', email: 'alice@example.com', status: true, lastLogin: 'Mar 25, 2026, 09:30 AM' },
    { id: 2, name: 'Robert Lee', role: 'Receptionist', email: 'robert@example.com', status: true, lastLogin: 'Mar 25, 2026, 09:30 AM' },
    { id: 3, name: 'Patra Sannan', role: 'Security', email: 'patra@example.com', status: false, lastLogin: 'Mar 25, 2026, 09:30 AM' },
    { id: 4, name: 'Janan Camon', role: 'Receptionist', email: 'janan@example.com', status: true, lastLogin: 'Mar 25, 2026, 09:30 AM' },
    { id: 5, name: 'Smiter Lulrier', role: 'Security', email: 'smiter@example.com', status: true, lastLogin: 'Mar 25, 2026, 09:30 AM' },
];

export const visitorChartData = {
    labels: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'],
    data: [12, 18, 15, 25, 10, 8]
};

export const dashboardStats = {
    activeVisitors: 5,
    overdueVisitors: 2,
};
