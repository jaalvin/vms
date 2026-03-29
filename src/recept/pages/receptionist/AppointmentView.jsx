import React, { useState, useEffect } from 'react';
import NotificationBell from '../../components/NotificationBell.jsx';

const AppointmentView = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    visitor: '',
    host: '',
    time: '',
    purpose: '',
    status: 'confirmed',
  });

  // Mock data for demonstration
  const todayAppointments = [
    { id: 1, visitor: 'James Wilson', host: 'Sarah Mensah', time: '09:00 AM', purpose: 'Business Meeting', status: 'confirmed' },
    { id: 2, visitor: 'Elena Rodriguez', host: 'Kofi Owusu', time: '10:30 AM', purpose: 'Interview', status: 'arrived' },
    { id: 3, visitor: 'Chen Wei', host: 'Noah Petrov', time: '11:00 AM', purpose: 'Delivery', status: 'pending' },
    { id: 4, visitor: 'Ama Asante', host: 'Sarah Mensah', time: '02:00 PM', purpose: 'Client Visit', status: 'confirmed' },
    { id: 5, visitor: 'David Okafor', host: 'Sophia Adebayo', time: '03:30 PM', purpose: 'Maintenance', status: 'cancelled' },
  ];

  const upcomingAppointments = [
    { id: 6, visitor: 'Fatima Al-Rashid', host: 'Noah Petrov', date: 'Mar 19', time: '10:00 AM', purpose: 'Board Meeting', status: 'confirmed' },
    { id: 7, visitor: 'Michael Brown', host: 'Kofi Owusu', date: 'Mar 20', time: '09:30 AM', purpose: 'Audit', status: 'pending' },
    { id: 8, visitor: 'Lisa Park', host: 'Sarah Mensah', date: 'Mar 21', time: '02:00 PM', purpose: 'Interview', status: 'confirmed' },
  ];

  useEffect(() => {
    // In production: fetch('/api/appointments?date=today')
    setAppointments(todayAppointments);
  }, []);

  const getStatusBadge = (status) => {
    const map = {
      confirmed: 'confirmed',
      arrived: 'arrived',
      pending: 'pending',
      cancelled: 'cancelled',
    };
    return (
      <span className={`badge ${map[status] || 'pending'}`}>
        <span className="bdot"></span> {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleMarkArrived = (id) => {
    setAppointments(prev => prev.map(a => a.id === id ? {...a, status: 'arrived'} : a));
  };

  const handleNewAppointmentInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAppointment = (e) => {
    e.preventDefault();

    if (!newAppointment.visitor || !newAppointment.host || !newAppointment.time || !newAppointment.purpose) {
      alert('Please fill in all appointment details.');
      return;
    }

    const createdAppointment = {
      id: Date.now(),
      visitor: newAppointment.visitor,
      host: newAppointment.host,
      time: newAppointment.time,
      purpose: newAppointment.purpose,
      status: newAppointment.status,
    };

    setAppointments((prev) => [createdAppointment, ...prev]);
    setShowNewAppointmentModal(false);
    setNewAppointment({
      visitor: '',
      host: '',
      time: '',
      purpose: '',
      status: 'confirmed',
    });
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">Appointment View</div>
        <div className="topbar-right">
          <div className="topbar-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" placeholder="Search..." />
          </div>
          <NotificationBell />
          <div className="topbar-avatar">RA</div>
        </div>
      </div>

      <div className="app-content">
        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card s-brown">
            <div className="stat-label">Today's Appointments</div>
            <div className="stat-value">{appointments.length}</div>
            <div className="stat-sub">Scheduled for today</div>
          </div>
          <div className="stat-card s-purple">
            <div className="stat-label">Upcoming (7 days)</div>
            <div className="stat-value">{upcomingAppointments.length}</div>
            <div className="stat-sub">Next 7 days</div>
          </div>
          <div className="stat-card s-green">
            <div className="stat-label">Arrived Today</div>
            <div className="stat-value">{appointments.filter(a => a.status === 'arrived').length}</div>
            <div className="stat-sub">Checked in</div>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="card mb">
          <div className="card-head">
            <div>
              <div className="card-title">Today's Appointments</div>
              <div className="card-sub">Manage and track today's visitors</div>
            </div>
            <button className="btn btn-primary" onClick={() => setShowNewAppointmentModal(true)}>+ New Appointment</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Host</th>
                <th>Time</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appt => (
                <tr key={appt.id} onClick={() => setSelectedAppt(appt)}>
                  <td className="fw">{appt.visitor}</td>
                  <td>{appt.host}</td>
                  <td className="mono">{appt.time}</td>
                  <td>{appt.purpose}</td>
                  <td>{getStatusBadge(appt.status)}</td>
                  <td>
                    {appt.status === 'confirmed' && (
                      <button className="btn btn-sm btn-success" onClick={(e) => { e.stopPropagation(); handleMarkArrived(appt.id); }}>
                        Mark Arrived
                      </button>
                    )}
                    {appt.status === 'arrived' && <span className="badge arrived"><span className="bdot"></span> Arrived</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upcoming */}
        <div className="card mb">
          <div className="card-head">
            <div>
              <div className="card-title">Upcoming Appointments</div>
              <div className="card-sub">Next 7 days advance planning</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Host</th>
                <th>Date</th>
                <th>Time</th>
                <th>Purpose</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map(appt => (
                <tr key={appt.id}>
                  <td className="fw">{appt.visitor}</td>
                  <td>{appt.host}</td>
                  <td className="mono">{appt.date}</td>
                  <td className="mono">{appt.time}</td>
                  <td>{appt.purpose}</td>
                  <td>{getStatusBadge(appt.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Appointment Detail Preview */}
        {selectedAppt && (
          <div className="card mb">
            <div className="card-head">
              <div className="card-title">Appointment Details</div>
              <button className="btn btn-sm btn-ghost" onClick={() => setSelectedAppt(null)}>✕ Close</button>
            </div>
            <div className="card-body">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Visitor Name</label>
                  <div style={{fontSize: 15, fontWeight: 700, color: 'var(--t1)'}}>{selectedAppt.visitor}</div>
                </div>
                <div className="form-group">
                  <label>Host</label>
                  <div style={{fontSize: 15, fontWeight: 700, color: 'var(--t1)'}}>{selectedAppt.host}</div>
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <div className="mono" style={{fontSize: 15}}>{selectedAppt.time}</div>
                </div>
                <div className="form-group">
                  <label>Purpose</label>
                  <div style={{fontSize: 14, color: 'var(--t2)'}}>{selectedAppt.purpose}</div>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  {getStatusBadge(selectedAppt.status)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showNewAppointmentModal && (
        <div className="modal-overlay">
          <div className="modal-inner appointment-modal">
            <div className="modal-title">New Appointment</div>
            <div className="modal-body" style={{ marginBottom: '14px' }}>
              Fill in the visitor details to schedule a new appointment.
            </div>

            <form onSubmit={handleCreateAppointment}>
              <div className="form-group" style={{ marginBottom: '10px', textAlign: 'left' }}>
                <label>Visitor Name</label>
                <input
                  className="form-input"
                  type="text"
                  name="visitor"
                  value={newAppointment.visitor}
                  onChange={handleNewAppointmentInputChange}
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div className="form-group" style={{ marginBottom: '10px', textAlign: 'left' }}>
                <label>Host</label>
                <input
                  className="form-input"
                  type="text"
                  name="host"
                  value={newAppointment.host}
                  onChange={handleNewAppointmentInputChange}
                  placeholder="e.g. Sarah Mensah"
                />
              </div>
              <div className="form-group" style={{ marginBottom: '10px', textAlign: 'left' }}>
                <label>Time</label>
                <input
                  className="form-input"
                  type="time"
                  name="time"
                  value={newAppointment.time}
                  onChange={handleNewAppointmentInputChange}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '10px', textAlign: 'left' }}>
                <label>Purpose</label>
                <input
                  className="form-input"
                  type="text"
                  name="purpose"
                  value={newAppointment.purpose}
                  onChange={handleNewAppointmentInputChange}
                  placeholder="e.g. Business Meeting"
                />
              </div>
              <div className="form-group" style={{ marginBottom: '16px', textAlign: 'left' }}>
                <label>Status</label>
                <select
                  className="form-input"
                  name="status"
                  value={newAppointment.status}
                  onChange={handleNewAppointmentInputChange}
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowNewAppointmentModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentView;
