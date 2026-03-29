import React, { useState } from 'react';
import NotificationBell from '../../components/NotificationBell.jsx';

const CheckOut = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const [visitors, setVisitors] = useState([
    { id: 'V-001', name: 'James Wilson', phone: '0201234567', host: 'Sarah Mensah', checkIn: '09:15 AM', status: 'inside' },
    { id: 'V-002', name: 'Elena Rodriguez', phone: '0209876543', host: 'Kofi Owusu', checkIn: '10:30 AM', status: 'inside' },
    { id: 'V-003', name: 'Chen Wei', phone: '0241112233', host: 'Noah Petrov', checkIn: '11:05 AM', status: 'inside' },
    { id: 'V-004', name: 'Ama Asante', phone: '0551234567', host: 'Sophia Adebayo', checkIn: '12:00 PM', status: 'inside' },
  ]);

  const filteredVisitors = visitors.filter(v =>
    v.status === 'inside' && (
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.phone.includes(searchTerm)
    )
  );

  const handleCheckOutClick = (visitor) => {
    setSelectedVisitor(visitor);
    setShowModal(true);
  };

  const confirmCheckOut = () => {
    // In production: PUT /api/visitors/:id
    setVisitors(prev => prev.map(v => v.id === selectedVisitor.id ? {...v, status: 'checked-out'} : v));
    setShowModal(false);
    setSelectedVisitor(null);
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">Visitor Check-Out</div>
        <div className="topbar-right">
          <NotificationBell />
        </div>
      </div>

      <div className="app-content">
        {/* Search */}
        <div className="search-row-big">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input type="text" placeholder="Search visitor by name or phone number..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {/* Active Visitors */}
        <div className="card mb">
          <div className="card-head">
            <div>
              <div className="card-title">Active Visitors — Currently Checked In</div>
              <div className="card-sub">{filteredVisitors.length} visitors currently inside</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Phone</th>
                <th>Host</th>
                <th>Check-In Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map(v => (
                <tr key={v.id}>
                  <td className="fw">{v.name}</td>
                  <td className="mono">{v.phone}</td>
                  <td>{v.host}</td>
                  <td className="mono">{v.checkIn}</td>
                  <td><span className="badge inside"><span className="bdot"></span> Inside</span></td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => handleCheckOutClick(v)}>
                      Check Out
                    </button>
                  </td>
                </tr>
              ))}
              {filteredVisitors.length === 0 && (
                <tr><td colSpan="6" style={{textAlign: 'center', color: 'var(--t4)', padding: 40}}>No active visitors found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Confirmation Modal */}
        {showModal && selectedVisitor && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-inner" onClick={e => e.stopPropagation()}>
              <div className="modal-icon-wrap danger-bg">🚪</div>
              <div className="modal-title">Confirm Check-Out</div>
              <div className="modal-body">
                Are you sure you want to check out<br/>
                <strong>{selectedVisitor.name}</strong>?<br/>
                Host: {selectedVisitor.host} · Check-in: {selectedVisitor.checkIn}
              </div>
              <div className="modal-actions">
                <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={confirmCheckOut}>Confirm Check-Out</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckOut;