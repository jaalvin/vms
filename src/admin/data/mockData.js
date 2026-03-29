export const visitors = [
  { id: 1,  name: 'Grace Abena Sarpong',      contact: '+233 501 234 567', host: 'Celestine Efua Tawiah',   purpose: 'Meeting',      checkInTime: '10:00 AM', checkOutTime: '5:00 PM',  status: 'Inside',      date: '2026-03-10', photoUrl: null },
  { id: 2,  name: 'Emmanuel Kwame Asante',     contact: '+233 271 556 789', host: 'Evelyn Maame Agyeman',    purpose: 'Interview',    checkInTime: '11:00 AM', checkOutTime: '6:00 PM',  status: 'Inside',      date: '2026-03-10', photoUrl: null },
  { id: 3,  name: 'Priscilla Akosua Adjei',    contact: '+233 506 778 901', host: 'Beatrice Naana Nkrumah',  purpose: 'Service',      checkInTime: '9:00 AM',  checkOutTime: '4:30 PM',  status: 'Overdue',     date: '2026-03-10', photoUrl: null },
  { id: 4,  name: 'Daniel Kofi Acheampong',    contact: '+233 541 223 445', host: 'Augustine Komla Gbeve',   purpose: 'Training',     checkInTime: '8:20 AM',  checkOutTime: '3:30 PM',  status: 'Checked Out', date: '2026-03-10', photoUrl: null },
  { id: 5,  name: 'Samuel Yaw Darko',          contact: '+233 271 889 001', host: 'Felicia Dzifa Fiagbe',    purpose: 'Delivery',     checkInTime: '9:20 AM',  checkOutTime: '4:50 PM',  status: 'Inside',      date: '2026-03-10', photoUrl: null },
  { id: 6,  name: 'Victoria Adwoa Asante',     contact: '+233 501 445 667', host: 'Richmond Nii Tagoe',      purpose: 'Meeting',      checkInTime: '2:00 PM',  checkOutTime: '4:00 PM',  status: 'Checked Out', date: '2026-03-09', photoUrl: null },
  { id: 7,  name: 'George Kweku Ofori',        contact: '+233 541 234 890', host: 'Rosemary Akua Boateng',   purpose: 'Consultation', checkInTime: '1:30 PM',  checkOutTime: '3:30 PM',  status: 'Checked Out', date: '2026-03-09', photoUrl: null },
  { id: 8,  name: 'Patricia Afia Wiredu',      contact: '+233 506 556 778', host: 'Prince Fiifi Quansah',    purpose: 'Interview',    checkInTime: '10:30 AM', checkOutTime: '12:00 PM', status: 'Checked Out', date: '2026-03-08', photoUrl: null },
  { id: 9,  name: 'Josephine Yaa Frimpong',    contact: '+233 271 123 445', host: 'Bernard Elikem Agbeko',   purpose: 'Delivery',     checkInTime: '3:00 PM',  checkOutTime: '3:20 PM',  status: 'Checked Out', date: '2026-03-08', photoUrl: null },
  { id: 10, name: 'Charlotte Ama Nyarko',      contact: '+233 501 667 889', host: 'Clement Kwabena Poku',    purpose: 'Meeting',      checkInTime: '11:00 AM', checkOutTime: '1:00 PM',  status: 'Checked Out', date: '2026-03-07', photoUrl: null },
];

export const appointments = [
  { id: 1,  visitorName: 'Sandra Yayra Enyonam',     visitorContact: '+233 501 789 012', host: 'Samuel Osei',             date: '2026-03-04', time: '11:30 AM', purpose: 'Meeting',      status: 'Confirmed', hasArrived: false },
  { id: 2,  visitorName: 'Angela Nana Acheampong',   visitorContact: '+233 271 345 678', host: 'Priscilla Akosua Adjei',  date: '2026-03-04', time: '5:30 PM',  purpose: 'Interview',    status: 'Pending',   hasArrived: false },
  { id: 3,  visitorName: 'Joseph Akwasi Bonsu',      visitorContact: '+233 506 234 567', host: 'Desmond Senam Dzeble',    date: '2026-03-05', time: '10:30 AM', purpose: 'Consultation', status: 'Cancelled', hasArrived: false },
  { id: 4,  visitorName: 'Sandra Yayra Enyonam',     visitorContact: '+233 501 789 012', host: 'Priscilla Akosua Adjei',  date: '2026-03-06', time: '8:15 AM',  purpose: 'Meeting',      status: 'Confirmed', hasArrived: false },
  { id: 5,  visitorName: 'Stephanie Sena Torgbor',   visitorContact: '+233 541 556 789', host: 'Daniel Kofi Acheampong',  date: '2026-03-07', time: '12:40 PM', purpose: 'Training',     status: 'Pending',   hasArrived: false },
  { id: 6,  visitorName: 'Maxwell Dela Tetteh',      visitorContact: '+233 271 667 890', host: 'Christopher Ebo Acquah',  date: '2026-03-08', time: '10:00 AM', purpose: 'Training',     status: 'Confirmed', hasArrived: false },
  { id: 7,  visitorName: 'Abigail Abla Dordor',      visitorContact: '+233 506 445 678', host: 'Priscilla Akosua Adjei',  date: '2026-03-09', time: '2:00 PM',  purpose: 'Interview',    status: 'Pending',   hasArrived: false },
  { id: 8,  visitorName: 'Francis Nana Amponsah',    visitorContact: '+233 501 234 901', host: 'Samuel Osei',             date: '2026-03-10', time: '8:00 AM',  purpose: 'Meeting',      status: 'Confirmed', hasArrived: true  },
  { id: 9,  visitorName: 'Evelyn Maame Agyeman',     visitorContact: '+233 541 789 012', host: 'Desmond Senam Dzeble',    date: '2026-03-10', time: '9:30 AM',  purpose: 'Interview',    status: 'Pending',   hasArrived: false },
  { id: 10, visitorName: 'Theodore Kojo Frimpong',   visitorContact: '+233 271 234 556', host: 'Priscilla Akosua Adjei',  date: '2026-03-10', time: '10:00 AM', purpose: 'Delivery',     status: 'Confirmed', hasArrived: false },
  { id: 11, visitorName: 'Celestine Efua Tawiah',    visitorContact: '+233 506 890 123', host: 'Daniel Kofi Acheampong',  date: '2026-03-10', time: '11:00 AM', purpose: 'Consultation', status: 'Arrived',   hasArrived: true  },
  { id: 12, visitorName: 'Prince Fiifi Quansah',     visitorContact: '+233 501 556 889', host: 'Augustine Komla Gbeve',   date: '2026-03-10', time: '2:00 PM',  purpose: 'Service',      status: 'Pending',   hasArrived: false },
  { id: 13, visitorName: 'Rosemary Akua Boateng',    visitorContact: '+233 541 678 901', host: 'Beatrice Naana Nkrumah',  date: '2026-03-10', time: '3:30 PM',  purpose: 'Training',     status: 'Cancelled', hasArrived: false },
];

export const hosts = [
  'Samuel Osei', 'Priscilla Akosua Adjei', 'Desmond Senam Dzeble', 'Daniel Kofi Acheampong',
  'Christopher Ebo Acquah', 'Augustine Komla Gbeve', 'Beatrice Naana Nkrumah', 'Celestine Efua Tawiah',
  'Grace Abena Sarpong', 'Evelyn Maame Agyeman',
];

export const weeklyVisitorData = [
  { day: 'Mon', visitors: 45 }, { day: 'Tue', visitors: 38 },
  { day: 'Wed', visitors: 32 }, { day: 'Thu', visitors: 28 },
  { day: 'Fri', visitors: 42 }, { day: 'Sat', visitors: 18 },
  { day: 'Sun', visitors: 12 },
];

export const monthlyTrendData = [
  { month: 'Jan', visitors: 850  }, { month: 'Feb', visitors: 920  },
  { month: 'Mar', visitors: 1050 }, { month: 'Apr', visitors: 1180 },
  { month: 'May', visitors: 1320 }, { month: 'Jun', visitors: 1450 },
  { month: 'Jul', visitors: 1580 },
];

export const visitorCategories = [
  { name: 'Professional',     value: 60, color: '#7B3F1E' },
  { name: 'Delivery',         value: 20, color: '#A0522D' },
  { name: 'Interview',        value: 15, color: '#CD853F' },
  { name: 'Service Provider', value: 5,  color: '#DEB887' },
];

export const staffMembers = [
  { id: 1, name: 'Victoria Adwoa Asante',   role: 'Admin',        email: 'vaasante@knust.edu.gh',   status: true,  lastLogin: '2026-03-10T09:30:00' },
  { id: 2, name: 'Richmond Nii Tagoe',      role: 'Receptionist', email: 'rntagoe@knust.edu.gh',    status: true,  lastLogin: '2026-03-10T14:15:00' },
  { id: 3, name: 'Patricia Afia Wiredu',    role: 'Security',     email: 'pawiredu@knust.edu.gh',   status: false, lastLogin: '2026-03-08T08:45:00' },
  { id: 4, name: 'Josephine Yaa Frimpong',  role: 'Receptionist', email: 'jyfrimpong@knust.edu.gh', status: true,  lastLogin: '2026-03-10T11:00:00' },
  { id: 5, name: 'Bernard Elikem Agbeko',   role: 'Security',     email: 'beagbeko@knust.edu.gh',   status: true,  lastLogin: '2026-03-09T16:30:00' },
  { id: 6, name: 'Felicia Dzifa Fiagbe',    role: 'Receptionist', email: 'fdfiagbe@knust.edu.gh',   status: true,  lastLogin: '2026-03-09T10:20:00' },
  { id: 7, name: 'Clement Kwabena Poku',    role: 'Security',     email: 'ckpoku@knust.edu.gh',     status: false, lastLogin: '2026-03-07T07:55:00' },
];

export const peakHours = [
  { time: '8AM',  count: 15 }, { time: '9AM',  count: 35 },
  { time: '10AM', count: 42 }, { time: '11AM', count: 18 },
  { time: '12PM', count: 45 }, { time: '1PM',  count: 25 },
];

export const dashboardStats = {
  activeVisitors:    3,
  overdue:           1,
  totalVisitorsToday:28,
  appointmentsToday: 5,
  staffOnline:       4,
  totalStaff:        7,
};
