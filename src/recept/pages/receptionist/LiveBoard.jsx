import React, { useState, useEffect } from 'react';
import NotificationBell from '../../components/NotificationBell.jsx';

const LiveBoard = () => {
  const [visitors, setVisitors] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const mockVisitors = [
    { id: 'V-001', name: 'James Wilson', host: 'Sarah Mensah', checkIn: '09:15 AM', duration: '3h 45m', status: 'inside' },
    { id: 'V-002', name: 'Elena Rodriguez', host: 'Kofi Owusu', checkIn: '10:30 AM', duration: '2h 30m', status: 'overdue' },
    { id: 'V-003', name: 'Chen Wei', host: 'Noah Petrov', checkIn: '11:05 AM', duration: '1h 55m', status: 'inside' },
    { id: 'V-004', name: 'Ama Asante', host: 'Sophia Adebayo', checkIn: '12:00 PM', duration: '1h 00m', status: 'inside' },
    { id: 'V-005', name: 'David Okafor', host: 'Sarah Mensah', checkIn: '08:30 AM', duration: '4h 30m', status: 'overdue' },
    { id: 'V-006', name: 'Maria Santos', host: 'Kofi Owusu', checkIn: '11:45 AM', duration: '1h 15m', status: 'inside' },
  ];

  const recentlyLeft = [
    { id: 'V-010', name: 'Fatima Al-Rashid', host: 'Noah Petrov', checkIn: '08:00 AM', checkOut: '10:30 AM' },
    { id: 'V-011', name: 'Michael Brown', host: 'Sarah Mensah', checkIn: '09:00 AM', checkOut: '11:15 AM' },
  ];

  useEffect(() => {
    // In production: fetch('/api/visitors?status=inside')
    setVisitors(mockVisitors);
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const insideCount = visitors.filter(v => v.status === 'inside').length;
  const overdueCount = visitors.filter(v => v.status === 'overdue').length;

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">Live Visitor Board</div>
        <div className="topbar-right">
          <div className="topbar-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><span>Search...</span></div>
          <NotificationBell />
          <div className="topbar-avatar">RA</div>
        </div>
      </div>

      <div className="app-content">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12}}>
          <div className="live-pill large"><span className="live-dot"></span>Auto-refresh every 30 seconds · {lastRefresh.toLocaleTimeString()}</div>
        </div>
        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card s-purple">
            <div className="stat-label">Visitors Inside</div>
            <div className="stat-value">{insideCount + overdueCount}</div>
            <div className="stat-sub">Currently on premises</div>
          </div>
          <div className="stat-card s-green">
            <div className="stat-label">On-Time</div>
            <div className="stat-value">{insideCount}</div>
            <div className="stat-sub">Within expected duration</div>
          </div>
          <div className="stat-card s-red">
            <div className="stat-label">Overstayed</div>
            <div className="stat-value">{overdueCount}</div>
            <div className="stat-sub">Exceeded expected stay</div>
          </div>
        </div>

        {/* Currently Inside */}
        <div className="card mb">
          <div className="card-head">
            <div>
              <div className="card-title">Currently Inside</div>
              <div className="card-sub">Live visitor status with color-coded badges</div>
            </div>
          </div>
          <div className="card-body">
            <div className="visitor-cards-grid">
              {visitors.map(v => (
                <div key={v.id} className={`visitor-card ${v.status === 'overdue' ? 'overdue-card' : ''}`}>
                  <div className={`vc-avatar ${v.status === 'overdue' ? 'ov-av' : ''}`}>{getInitials(v.name)}</div>
                  <div className="vc-name">{v.name}</div>
                  <div className="vc-host">Host: {v.host}</div>
                  <div className="vc-time">In: {v.checkIn}</div>
                  <span className={`badge ${v.status === 'overdue' ? 'overdue' : 'inside'}`}>
                    <span className="bdot"></span> {v.status === 'overdue' ? 'Overstayed' : 'Inside'}
                  </span>
                  <div className="vc-dur">Duration: {v.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recently Left */}
        <div className="card mb">
          <div className="card-head">
            <div>
              <div className="card-title">Recently Checked Out</div>
              <div className="card-sub">Visitors who left today</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Host</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentlyLeft.map(v => (
                <tr key={v.id}>
                  <td className="fw">{v.name}</td>
                  <td>{v.host}</td>
                  <td className="mono">{v.checkIn}</td>
                  <td className="mono">{v.checkOut}</td>
                  <td><span className="badge checkout"><span className="bdot"></span> Checked Out</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LiveBoard;