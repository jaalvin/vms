import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, BarChart3, UserCog, TrendingUp, LogIn, LogOut, Clock, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { dashboardStats, peakHours, appointments, visitors } from '../data/mockData.js';
import { useAppContext } from '../context/AppContext.jsx';
import '../admin-pages.css';

function buildActivityFeed(visitorList) {
  const feed = [];
  visitorList.forEach((v) => {
    if (v.checkInTime && v.checkInTime !== '—')
      feed.push({ id: v.id * 10, type: 'check-in', name: v.name, host: v.host, time: v.checkInTime });
    if (v.checkOutTime && v.checkOutTime !== '—')
      feed.push({ id: v.id * 10 + 1, type: 'check-out', name: v.name, host: v.host, time: v.checkOutTime });
  });
  return feed.slice(0, 8);
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  const [stats, setStats]           = useState({ ...dashboardStats });
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [activityFeed, setActivityFeed] = useState(() => buildActivityFeed(visitors));
  const todayAppointments = appointments.filter(apt => apt.date === '2026-03-10').slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({ ...prev }));
      setActivityFeed(buildActivityFeed(visitors));
      setLastRefresh(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { label: 'Active Visitors',     value: stats.activeVisitors,     Icon: Users,      iconCls: 'ap-icon-green',  sub: `${stats.overdue} overdue` },
    { label: 'Total Visitors Today', value: stats.totalVisitorsToday, Icon: TrendingUp, iconCls: 'ap-icon-blue' },
    { label: 'Appointments Today',   value: stats.appointmentsToday,  Icon: Calendar,   iconCls: 'ap-icon-orange' },
    { label: 'Total Staff',          value: stats.totalStaff,         Icon: UserCog,    iconCls: 'ap-icon-purple', sub: `${stats.staffOnline} online` },
  ];

  return (
    <div>
      {/* Header */}
      <div className="ap-header">
        <div>
          <h1 className="ap-title">Welcome back, {currentUser.firstName}</h1>
          <p className="ap-sub">Here's what's happening today.</p>
        </div>
        <div className="ap-refresh">
          <RefreshCw size={12} />
          <span>Auto-refreshes every 30s · Last: {lastRefresh.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="ap-stats-4">
        {statCards.map(({ label, value, Icon, iconCls, sub }) => (
          <div key={label} className="ap-stat-card">
            <div>
              <p className="ap-stat-label">{label}</p>
              <p className="ap-stat-value">{value}</p>
              {sub && <p className="ap-stat-sub">{sub}</p>}
            </div>
            <div className={`ap-stat-icon ${iconCls}`}><Icon size={28} /></div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="ap-actions">
        <button onClick={() => navigate('/admin/staff')} className="ap-btn-primary">
          <UserCog size={16} /> Add Staff
        </button>
        <button onClick={() => navigate('/admin/appointments')} className="ap-btn-outline">
          <Calendar size={16} /> New Appointment
        </button>
        <button onClick={() => navigate('/admin/reports')} className="ap-btn-outline">
          <BarChart3 size={16} /> View Reports
        </button>
      </div>

      {/* Chart + Upcoming */}
      <div className="ap-grid-5-3">
        {/* Peak Hours Chart */}
        <div className="ap-card ap-card-p">
          <h2 className="ap-card-title" style={{ marginBottom: 20 }}>Peak Visiting Hours</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={peakHours} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {peakHours.map((_, i) => (
                  <linearGradient key={i} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#7B3F1E" />
                    <stop offset="100%" stopColor="#C4956A" />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e8e0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <YAxis hide />
              <Tooltip cursor={{ fill: '#F5E6DA' }} contentStyle={{ borderRadius: '8px', border: '1px solid #E8D9CF' }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {peakHours.map((_, i) => <Cell key={`cell-${i}`} fill={`url(#grad-${i})`} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Appointments */}
        <div className="ap-card ap-card-p">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 className="ap-card-title">Upcoming Appointments</h2>
            <span style={{ fontSize: 11, color: '#9ca3af' }}>Today</span>
          </div>
          {todayAppointments.map(apt => (
            <div key={apt.id} className="ap-appt-card">
              <div className="ap-appt-icon">
                <Calendar size={18} style={{ color: '#7B3F1E' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="ap-appt-name">Meet with {apt.visitorName}</p>
                <p className="ap-appt-meta">{apt.time} · {apt.host}</p>
              </div>
            </div>
          ))}
          {todayAppointments.length === 0 && (
            <p style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', padding: '16px 0' }}>No appointments today</p>
          )}
          <button className="ap-appt-add" onClick={() => navigate('/admin/appointments')}>
            + Add New Schedule
          </button>
          <button className="ap-appt-view-all" onClick={() => navigate('/admin/appointments')}>
            View all →
          </button>
        </div>
      </div>

      {/* Quick Stats + Recent Activity */}
      <div className="ap-grid-1-2">
        {/* Quick Stats */}
        <div className="ap-card ap-card-p">
          <h2 className="ap-card-title" style={{ marginBottom: 16 }}>Quick Stats</h2>
          <div className={`ap-qstat ap-qstat-brown`}>
            <p className="ap-qstat-label">Appointments Today</p>
            <p className="ap-qstat-value">{stats.appointmentsToday}</p>
          </div>
          <div className={`ap-qstat ap-qstat-green`}>
            <p className="ap-qstat-label">Staff Online</p>
            <p className="ap-qstat-value">{stats.staffOnline}/{stats.totalStaff}</p>
          </div>
          <div className={`ap-qstat ap-qstat-yellow`}>
            <p className="ap-qstat-label">Overdue Visitors</p>
            <p className="ap-qstat-value">{stats.overdue}</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="ap-card ap-card-p">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 className="ap-card-title">Recent Activity</h2>
            <button onClick={() => navigate('/admin/visitor-logs')} style={{ fontSize: 11, color: '#7B3F1E', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>View all logs →</button>
          </div>
          <div className="ap-activity-scroll">
            {activityFeed.length === 0 && (
              <p style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', padding: '24px 0' }}>No recent activity</p>
            )}
            {activityFeed.map(entry => (
              <div key={entry.id} className="ap-activity-item">
                <div className={`ap-activity-dot ${entry.type === 'check-in' ? 'in' : 'out'}`}>
                  {entry.type === 'check-in' ? <LogIn size={14} /> : <LogOut size={14} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="ap-activity-name">{entry.name}</p>
                  <p className="ap-activity-sub">{entry.type === 'check-in' ? 'Checked in' : 'Checked out'} · Host: {entry.host}</p>
                </div>
                <div className="ap-activity-time">
                  <Clock size={11} /><span>{entry.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
