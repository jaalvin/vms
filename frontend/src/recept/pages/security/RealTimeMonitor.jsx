import React, { useState, useEffect } from 'react';
import NotificationBell from '../../components/NotificationBell.jsx';

const RealTimeMonitor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const visitors = [
    { id: 'V-001', name: 'James Wilson', idNo: 'GHA-001', host: 'Sarah Mensah', checkIn: '09:15 AM', department: 'HR', status: 'inside' },
    { id: 'V-002', name: 'Elena Rodriguez', idNo: 'GHA-002', host: 'Kofi Owusu', checkIn: '10:30 AM', department: 'IT', status: 'inside' },
    { id: 'V-003', name: 'Chen Wei', idNo: 'GHA-003', host: 'Noah Petrov', checkIn: '11:05 AM', department: 'Executive', status: 'inside' },
    { id: 'V-004', name: 'Chris Stephens', idNo: 'GHA-004', host: 'Sophia Adebayo', checkIn: '09:20 AM', department: 'Finance', status: 'overdue' },
    { id: 'V-005', name: 'Ama Asante', idNo: 'GHA-005', host: 'Noah Petrov', checkIn: '12:00 PM', department: 'Executive', status: 'inside' },
    { id: 'V-006', name: 'David Okafor', idNo: 'GHA-006', host: 'Sarah Mensah', checkIn: '08:30 AM', department: 'HR', status: 'overdue' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredVisitors = visitors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.idNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filter === 'all' || v.status === filter;
    return matchSearch && matchFilter;
  });

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">Real-Time Visitor Monitor</div>
        <div className="topbar-right">
          <div className="topbar-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><span>Search...</span></div>
          <NotificationBell />
          <div className="topbar-avatar">KT</div>
        </div>
      </div>

      <div className="app-content">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12}}>
          <div className="live-pill large"><span className="live-dot"></span>Live · Auto-refresh ON</div>
        </div>
        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card s-purple">
            <div className="stat-label">Total Inside</div>
            <div className="stat-value">{visitors.length}</div>
            <div className="stat-sub">All visitors on site</div>
          </div>
          <div className="stat-card s-green">
            <div className="stat-label">Normal</div>
            <div className="stat-value">{visitors.filter(v => v.status === 'inside').length}</div>
            <div className="stat-sub">Within time</div>
          </div>
          <div className="stat-card s-red">
            <div className="stat-label">Overdue</div>
            <div className="stat-value">{visitors.filter(v => v.status === 'overdue').length}</div>
            <div className="stat-sub">Exceeded stay</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="search-row-big">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input type="text" placeholder="Search by name or ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <div style={{display: 'flex', gap: 6}}>
            <button className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter('all')}>All</button>
            <button className={`btn btn-sm ${filter === 'inside' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter('inside')}>Inside</button>
            <button className={`btn btn-sm ${filter === 'overdue' ? 'btn-danger' : 'btn-ghost'}`} onClick={() => setFilter('overdue')}>Overdue</button>
          </div>
        </div>

        {/* Visitor Cards */}
        <div className="card mb">
          <div className="card-head">
            <div>
              <div className="card-title">Visitor Cards</div>
              <div className="card-sub">{filteredVisitors.length} visitors matching</div>
            </div>
          </div>
          <div className="card-body">
            <div className="visitor-cards-grid">
              {filteredVisitors.map(v => (
                <div key={v.id} className={`visitor-card ${v.status === 'overdue' ? 'overdue-card' : ''}`}>
                  <div className={`vc-avatar ${v.status === 'overdue' ? 'ov-av' : ''}`}>{getInitials(v.name)}</div>
                  <div className="vc-name">{v.name}</div>
                  <div className="vc-host">Host: {v.host}</div>
                  <div className="vc-time">In: {v.checkIn}</div>
                  <span className={`badge ${v.status === 'overdue' ? 'overdue' : 'inside'}`}>
                    <span className="bdot"></span> {v.status === 'overdue' ? 'Overdue' : 'Inside'}
                  </span>
                  <div className="vc-dur">ID: {v.idNo}</div>
                </div>
              ))}
              {filteredVisitors.length === 0 && (
                <div style={{gridColumn: '1/-1', textAlign: 'center', color: 'var(--t4)', padding: 40}}>No visitors matching your criteria.</div>
              )}
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="card mb">
          <div className="card-head">
            <div className="card-title">Detailed Table View</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Visitor</th>
                <th>ID No</th>
                <th>Host</th>
                <th>Time In</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map(v => (
                <tr key={v.id} className={v.status === 'overdue' ? 'overdue-row' : ''}>
                  <td className="fw">{v.name}</td>
                  <td className="mono">{v.idNo}</td>
                  <td>{v.host}</td>
                  <td className="mono">{v.checkIn}</td>
                  <td>
                    <span className={`badge ${v.status === 'overdue' ? 'overdue' : 'inside'}`}>
                      <span className="bdot"></span> {v.status === 'overdue' ? 'Overdue' : 'Inside'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RealTimeMonitor;