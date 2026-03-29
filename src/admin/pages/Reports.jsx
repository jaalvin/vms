import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Clock, Download, AlertCircle, FileText } from 'lucide-react';
import { weeklyVisitorData, monthlyTrendData, visitorCategories, visitors } from '../data/mockData.js';
import '../admin-pages.css';

const BRAND       = '#7B3F1E';
const BRAND_LIGHT = '#F5E6DA';

export default function Reports() {
  const [reportType, setReportType] = useState('Daily');
  const [startDate, setStartDate]   = useState('');
  const [endDate, setEndDate]       = useState('');

  const overdueCount = visitors.filter(v => v.status === 'Overdue').length;

  const handleExportCSV = () => {
    const headers = ['Type', 'Period', 'Visitors'];
    const weeklyRows  = weeklyVisitorData.map(d  => ['Weekly',  d.day,   d.visitors]);
    const monthlyRows = monthlyTrendData.map(d   => ['Monthly', d.month, d.visitors]);
    const csv = [headers.join(','), ...[...weeklyRows, ...monthlyRows].map(r => r.join(','))].join('\n');
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })),
      download: `report_${reportType.toLowerCase().replace(/\s+/g, '_')}.csv`,
    });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  return (
    <div>
      <div className="ap-header" style={{ alignItems: 'center' }}>
        <div>
          <h1 className="ap-title">Reports & Analytics</h1>
          <p className="ap-sub">Insights on visitor trends and activity.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="ap-stats-3">
        <div className="ap-stat-card">
          <div>
            <p className="ap-stat-label">Total Visitors</p>
            <p className="ap-stat-value">2,500</p>
            <p className="ap-stat-sub">Total since Jan 1st</p>
          </div>
          <div className="ap-stat-icon ap-icon-blue"><Users size={28} /></div>
        </div>
        <div className="ap-stat-card">
          <div>
            <p className="ap-stat-label">Monthly Growth</p>
            <p className="ap-stat-value green">+15%</p>
            <p className="ap-stat-sub">Vs Last Month</p>
          </div>
          <div className="ap-stat-icon ap-icon-green"><TrendingUp size={28} /></div>
        </div>
        <div className="ap-stat-card">
          <div>
            <p className="ap-stat-label">Peak Check-In Hours</p>
            <p className="ap-stat-value" style={{ fontSize: 22 }}>9:00 – 11:00 AM</p>
            <p className="ap-stat-sub">Daily Average</p>
          </div>
          <div className="ap-stat-icon ap-icon-orange"><Clock size={28} /></div>
        </div>
      </div>

      {/* Two charts */}
      <div className="ap-grid-2">
        <div className="ap-chart-card">
          <h3 className="ap-chart-title">Weekly Visits (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyVisitorData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={BRAND} />
                  <stop offset="100%" stopColor="#C4956A" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e8e0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <Tooltip cursor={{ fill: BRAND_LIGHT }} contentStyle={{ borderRadius: '8px', border: '1px solid #E8D9CF', fontSize: 12 }} />
              <Bar dataKey="visitors" fill="url(#barGrad)" radius={[6, 6, 0, 0]} name="Visitors" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="ap-chart-card">
          <h3 className="ap-chart-title">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e8e0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E8D9CF', fontSize: 12 }} />
              <Line type="monotone" dataKey="visitors" stroke={BRAND} strokeWidth={2.5}
                dot={{ r: 4, fill: BRAND, strokeWidth: 0 }} activeDot={{ r: 6 }} name="Visitors" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie + Overdue */}
      <div className="ap-grid-2">
        <div className="ap-chart-card">
          <h3 className="ap-chart-title">Visitor Categories</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={visitorCategories} cx="50%" cy="50%" labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={85} dataKey="value">
                {visitorCategories.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={val => [`${val}%`, 'Share']} contentStyle={{ borderRadius: '8px', border: '1px solid #E8D9CF', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="ap-legend">
            {visitorCategories.map(c => (
              <div key={c.name} className="ap-legend-item">
                <div className="ap-legend-dot" style={{ backgroundColor: c.color }} />
                <span className="ap-legend-name">{c.name}</span>
                <span className="ap-legend-val">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ap-chart-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="ap-chart-title">Current Overdue Visitors</h3>
          <div className="ap-overdue-circle">
            <div className={`ap-overdue-icon ${overdueCount > 0 ? 'red' : 'green'}`}>
              <AlertCircle size={44} />
            </div>
            <p className={`ap-overdue-count ${overdueCount > 0 ? 'red' : 'green'}`}>{overdueCount}</p>
            <p className="ap-overdue-label">
              {overdueCount > 0 ? 'Visitors require attention' : 'All visitors on schedule'}
            </p>
          </div>
        </div>
      </div>

      {/* Generate Report */}
      <div className="ap-chart-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <FileText size={18} style={{ color: BRAND }} />
          <h3 className="ap-chart-title" style={{ margin: 0 }}>Generate Report</h3>
        </div>
        <div className="ap-generate-row">
          <div className="ap-generate-field">
            <label>Report Type</label>
            <select value={reportType} onChange={e => setReportType(e.target.value)} className="ap-input ap-select">
              <option>Daily</option><option>Weekly</option><option>Monthly</option><option>Custom Range</option>
            </select>
          </div>
          <div className="ap-generate-field">
            <label>Start Date</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="ap-input" />
          </div>
          <div className="ap-generate-field">
            <label>End Date</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="ap-input" />
          </div>
          <button type="button" onClick={handleExportCSV} className="ap-btn-primary" style={{ alignSelf: 'flex-end', whiteSpace: 'nowrap' }}>
            <Download size={15} /> Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
