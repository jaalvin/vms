import React, { useState } from 'react';

const EmergencyMode = () => {
  const [isActive, setIsActive] = useState(true);
  const [accounted, setAccounted] = useState({
    1: false, 2: false, 3: false, 4: false, 5: false
  });

  const visitors = [
    { id: 1, idNo: 'GHA-001-2024', name: 'Emily Smith', host: 'Aria Sharma', checkIn: '10:00 AM', duration: '2h 15m', status: 'inside', overdue: false },
    { id: 2, idNo: 'GHA-002-2024', name: 'Mike Brown', host: 'Liam Chen', checkIn: '11:00 AM', duration: '1h 15m', status: 'inside', overdue: false },
    { id: 3, idNo: 'GHA-003-2024', name: 'Mary Jane', host: 'Isabella Garcia', checkIn: '08:00 AM', duration: '4h 30m', status: 'overdue', overdue: true },
    { id: 4, idNo: 'GHA-004-2024', name: 'Chris Stephens', host: 'Sophia Adebayo', checkIn: '09:20 AM', duration: '3h 05m', status: 'overdue', overdue: true },
    { id: 5, idNo: 'GHA-005-2024', name: 'Ama Asante', host: 'Noah Petrov', checkIn: '12:00 PM', duration: '30m', status: 'inside', overdue: false },
  ];

  const toggleAccounted = (id) => {
    setAccounted(prev => ({...prev, [id]: !prev[id]}));
  };

  const handleExportPDF = () => {
    window.print();
  };

  if (!isActive) {
    return (
      <>
        <header className="topbar emergency-topbar">
          <div className="topbar-left">
            <h1 className="topbar-title" style={{color: '#DC2626'}}>🚨 Emergency Mode</h1>
          </div>
          <div className="topbar-right">
            <button className="btn btn-danger" onClick={() => setIsActive(true)}>🔴 Activate Emergency</button>
            <div className="topbar-avatar" style={{background: '#7B3F1E'}}>KT</div>
          </div>
        </header>

        <div className="app-content">
          <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🚨</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--t1)', marginBottom: 10 }}>Emergency Evacuation Mode</h2>
            <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 30, lineHeight: 1.8 }}>
              Activate this mode during emergency situations to get a full list of all visitors currently inside the building, total visitor count, and a print-friendly evacuation list.
            </p>
            <button
              className="btn btn-danger"
              style={{ padding: '16px 40px', fontSize: 16, borderRadius: 30 }}
              onClick={() => setIsActive(true)}
            >
              🚨 ACTIVATE EMERGENCY MODE
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <header className="topbar emergency-topbar">
        <div className="topbar-left">
          <h1 className="topbar-title" style={{color: '#DC2626'}}>🚨 Emergency Mode</h1>
        </div>
        <div className="topbar-right">
          <button className="btn btn-danger" onClick={() => setIsActive(false)}>🔴 Deactivate Emergency</button>
          <div className="topbar-avatar" style={{background: '#7B3F1E'}}>KT</div>
        </div>
      </header>

      <div className="app-content">
        <div className="emergency-banner">
          <div>
            <div className="emerg-title">🚨 EMERGENCY MODE ACTIVE</div>
            <div className="emerg-sub">Activated at 2:15 PM · March 18, 2026 · By: Kojo Tieku</div>
          </div>
          <button className="emerg-toggle" onClick={() => setIsActive(false)}>🔴 Deactivate</button>
        </div>

        <div className="emerg-count-card">
          <div className="emerg-number">{visitors.length}</div>
          <div className="emerg-count-info">
            <div className="emerg-count-title">People Currently Inside the Premises</div>
            <div className="emerg-count-sub">All visitors below must be accounted for during evacuation</div>
          </div>
          <div style={{marginLeft: 'auto', display: 'flex', gap: 10, flexShrink: 0}}>
            <button className="btn btn-ghost" onClick={handleExportPDF}>🖨 Print List</button>
            <button className="btn btn-primary" onClick={handleExportPDF}>⬇ Export PDF</button>
          </div>
        </div>

        <div className="alert alert-warning mb">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <span><strong>Protocol:</strong> Print this list immediately · Verify each person has evacuated · Report missing persons to emergency services · Do NOT deactivate until all are accounted for.</span>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Full Occupancy List</div>
              <div className="card-sub">All persons currently inside the premises</div>
            </div>
            <span className="badge overdue" style={{fontSize: 12, padding: '6px 14px'}}>⚠ {visitors.length} People Inside</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Visitor Name</th>
                <th>ID Number</th>
                <th>Host</th>
                <th>Check-In</th>
                <th>Duration</th>
                <th>Status</th>
                <th className="text-center">Accounted</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v, i) => (
                <tr key={v.id} className={v.overdue ? 'overdue-row' : ''}>
                  <td className="mono muted">{i + 1}</td>
                  <td className={`fw ${v.overdue ? 'overdue-text' : ''}`}>{v.name} {v.overdue && '⚠'}</td>
                  <td className="mono">{v.idNo}</td>
                  <td>{v.host}</td>
                  <td className={`mono ${v.overdue ? 'overdue-text' : ''}`}>{v.checkIn}</td>
                  <td className={`mono fw ${v.overdue ? 'overdue-text' : ''}`}>{v.duration} {v.overdue && '⚠'}</td>
                  <td>
                    <span className={`badge ${v.overdue ? 'overdue' : 'inside'}`}>
                      <span className="bdot"></span> {v.overdue ? 'Overdue' : 'Inside'}
                    </span>
                  </td>
                  <td style={{textAlign: 'center'}}>
                    <input 
                      type="checkbox" 
                      style={{width: 18, height: 18, accentColor: '#7B3F1E', cursor: 'pointer'}} 
                      checked={accounted[v.id]}
                      onChange={() => toggleAccounted(v.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card-footer">
            <button className="btn btn-ghost" onClick={handleExportPDF}>🖨 Print This List</button>
            <button className="btn btn-primary" onClick={handleExportPDF}>⬇ Export as PDF</button>
            <button className="btn btn-danger" onClick={() => setIsActive(false)}>✅ All Accounted — Deactivate</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmergencyMode;