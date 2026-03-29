import { useState, useEffect, useRef } from 'react';
import { Plus, X, CalendarDays, TrendingUp, CheckCircle, Edit2, Eye, MoreVertical, Check, AlertCircle, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, parseISO } from 'date-fns';
import { appointments as initialAppointments, hosts } from '../data/mockData.js';
import { StatusBadge } from '../components/StatusBadge.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import '../admin-pages.css';

const ITEMS_PER_PAGE = 10;

export default function AppointmentsAdmin() {
  const { addNotification } = useAppContext();
  const [appointments, setAppointments] = useState(initialAppointments);
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 2, 1));
  const [selectedDay, setSelectedDay]   = useState(null);
  const [page, setPage]                 = useState(1);
  const [showScheduleModal, setShowScheduleModal]   = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [viewingAppointment, setViewingAppointment] = useState(null);
  const [menuOpenId, setMenuOpenId]                 = useState(null);
  const menuRef = useRef(null);
  const [formData, setFormData] = useState({ visitorName: '', visitorContact: '', host: hosts[0], date: '', time: '', purpose: '' });
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState(null);

  const handleSort = (key) => {
    if (sortKey === key) {
      if (sortDir === 'asc') setSortDir('desc');
      else { setSortKey(null); setSortDir(null); }
    } else { setSortKey(key); setSortDir('asc'); }
  };

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ArrowUpDown size={11} className="ap-sort-icon" />;
    return sortDir === 'asc'
      ? <ArrowUp size={11} className="ap-sort-icon active" />
      : <ArrowDown size={11} className="ap-sort-icon active" />;
  };

  const monthStart     = startOfMonth(calendarDate);
  const monthEnd       = endOfMonth(calendarDate);
  const daysInMonth    = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);
  const datesWithAppts = new Set(appointments.map(a => a.date));

  const todayStr       = format(new Date(2026, 2, 10), 'yyyy-MM-dd');
  const todayAppts     = appointments.filter(a => a.date === todayStr);
  const upcomingAppts  = appointments.filter(a => new Date(a.date) > new Date(2026, 2, 4));
  const completedAppts = appointments.filter(a => a.status === 'Arrived' || a.hasArrived);

  const displayedAppts = (() => {
    let list = selectedDay
      ? appointments.filter(a => a.date === format(selectedDay, 'yyyy-MM-dd'))
      : appointments;
    if (sortKey && sortDir) {
      list = [...list].sort((a, b) => {
        const cmp = String(a[sortKey] ?? '').localeCompare(String(b[sortKey] ?? ''), undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return list;
  })();

  const totalPages = Math.max(1, Math.ceil(displayedAppts.length / ITEMS_PER_PAGE));
  const pageSlice  = displayedAppts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => { setPage(1); }, [selectedDay]);
  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpenId(null); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openSchedule = () => {
    setEditingAppointment(null);
    setFormData({ visitorName: '', visitorContact: '', host: hosts[0], date: '', time: '', purpose: '' });
    setShowScheduleModal(true);
  };

  const openEdit = (apt) => {
    setEditingAppointment(apt);
    const rawTime = apt.time.match(/(\d+):(\d+)\s*(AM|PM)/i)
      ? (() => {
          const m = apt.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
          let h = parseInt(m[1]); const min = m[2]; const period = m[3].toUpperCase();
          if (period === 'PM' && h !== 12) h += 12;
          if (period === 'AM' && h === 12) h = 0;
          return `${String(h).padStart(2,'0')}:${min}`;
        })()
      : apt.time;
    setFormData({ visitorName: apt.visitorName, visitorContact: apt.visitorContact, host: apt.host, date: apt.date, time: rawTime, purpose: apt.purpose });
    setShowScheduleModal(true);
  };

  const toTimeDisplay = (raw) => {
    if (raw.length !== 5) return raw;
    const [h, m] = raw.split(':').map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2,'0')} ${h >= 12 ? 'PM' : 'AM'}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeDisplay = toTimeDisplay(formData.time);
    if (editingAppointment) {
      setAppointments(prev => prev.map(a => a.id === editingAppointment.id ? { ...a, ...formData, time: timeDisplay } : a));
      addNotification(`Appointment updated: ${formData.visitorName}`);
    } else {
      const newApt = { id: Math.max(...appointments.map(a => a.id), 0) + 1, ...formData, time: timeDisplay, status: 'Confirmed', hasArrived: false };
      setAppointments(prev => [...prev, newApt].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)));
      setPage(1);
      addNotification(`New appointment: ${formData.visitorName} on ${formData.date} at ${timeDisplay}`);
    }
    setShowScheduleModal(false); setEditingAppointment(null);
    setFormData({ visitorName: '', visitorContact: '', host: hosts[0], date: '', time: '', purpose: '' });
  };

  const markCompleted = (id, name) => { setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Arrived', hasArrived: true } : a)); addNotification(`Completed: ${name}`); };
  const cancelApt     = (id, name) => { setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a)); addNotification(`Cancelled: ${name}`); };
  const deleteApt     = (id, name) => { setAppointments(prev => prev.filter(a => a.id !== id)); addNotification(`Deleted: ${name}`); };

  return (
    <div>
      {/* Header */}
      <div className="ap-header">
        <div>
          <h2 className="ap-title">Appointments</h2>
          {selectedDay && (
            <p style={{ fontSize: 13, color: '#7B3F1E', marginTop: 4, fontWeight: 600 }}>
              Showing: {format(selectedDay, 'MMMM d, yyyy')} ·{' '}
              <button onClick={() => setSelectedDay(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7B3F1E', textDecoration: 'underline', fontFamily: 'inherit', fontSize: 13 }}>Show all</button>
            </p>
          )}
        </div>
        <button type="button" onClick={openSchedule} className="ap-btn-primary">
          <Plus size={20} /> Schedule Appointment
        </button>
      </div>

      {/* Stat Cards */}
      <div className="ap-stats-3">
        <div className="ap-stat-card">
          <div><p className="ap-stat-label">Today's Appointments</p><p className="ap-stat-value" style={{ fontSize: 44 }}>{todayAppts.length}</p></div>
          <div className="ap-stat-icon ap-icon-orange"><CalendarDays size={30} /></div>
        </div>
        <div className="ap-stat-card">
          <div><p className="ap-stat-label">Upcoming</p><p className="ap-stat-value" style={{ fontSize: 44 }}>{upcomingAppts.length}</p></div>
          <div className="ap-stat-icon ap-icon-blue"><TrendingUp size={30} /></div>
        </div>
        <div className="ap-stat-card">
          <div><p className="ap-stat-label">Completed</p><p className="ap-stat-value" style={{ fontSize: 44 }}>{completedAppts.length}</p></div>
          <div className="ap-stat-icon ap-icon-green"><CheckCircle size={30} /></div>
        </div>
      </div>

      {/* Table */}
      <div className="ap-card ap-mb">
        <table className="ap-table">
          <thead>
            <tr>
              <th className="sortable" onClick={() => handleSort('visitorName')} style={{ width: '22%' }}>Visitor Name<SortIcon col="visitorName" /></th>
              <th className="sortable" onClick={() => handleSort('host')} style={{ width: '22%' }}>Host<SortIcon col="host" /></th>
              <th className="sortable" onClick={() => handleSort('date')} style={{ width: '14%' }}>Date<SortIcon col="date" /></th>
              <th className="sortable" onClick={() => handleSort('time')} style={{ width: '12%' }}>Time<SortIcon col="time" /></th>
              <th className="sortable" onClick={() => handleSort('status')} style={{ width: '14%' }}>Status<SortIcon col="status" /></th>
              <th style={{ width: '16%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageSlice.length === 0
              ? <tr><td colSpan={6} style={{ textAlign: 'center', padding: '48px 0', color: '#9ca3af' }}>
                  {selectedDay ? `No appointments on ${format(selectedDay, 'MMMM d, yyyy')}` : 'No appointments to display.'}
                </td></tr>
              : pageSlice.map(app => (
                <tr key={app.id}>
                  <td className="td-name">{app.visitorName}</td>
                  <td className="td-muted">{app.host}</td>
                  <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{app.date ? format(parseISO(app.date), 'MMM d, yyyy') : app.date}</td>
                  <td className="td-muted">{app.time}</td>
                  <td><StatusBadge status={app.status} /></td>
                  <td>
                    <div className="td-actions" ref={menuOpenId === app.id ? menuRef : null}>
                      <button type="button" onClick={() => openEdit(app)} className="ap-btn-icon" title="Edit"><Edit2 size={16} /></button>
                      <button type="button" onClick={() => setViewingAppointment(app)} className="ap-btn-icon" title="View"><Eye size={16} /></button>
                      <div className="ap-menu-wrap">
                        <button type="button" onClick={() => setMenuOpenId(id => id === app.id ? null : app.id)} className="ap-btn-icon">
                          <MoreVertical size={16} />
                        </button>
                        {menuOpenId === app.id && (
                          <div className="ap-menu-dropdown">
                            <button onClick={() => { markCompleted(app.id, app.visitorName); setMenuOpenId(null); }} className="ap-menu-item">
                              <Check size={13} style={{ color: '#16a34a' }} /> Mark Completed
                            </button>
                            <button onClick={() => { cancelApt(app.id, app.visitorName); setMenuOpenId(null); }} className="ap-menu-item">
                              <AlertCircle size={13} style={{ color: '#ca8a04' }} /> Cancel
                            </button>
                            <button onClick={() => { deleteApt(app.id, app.visitorName); setMenuOpenId(null); }} className="ap-menu-item red">
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="ap-pagination">
          <span className="ap-pagination-info">{displayedAppts.length} appointment{displayedAppts.length !== 1 ? 's' : ''}</span>
          <div className="ap-pagination-btns">
            <button className="ap-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ width: 'auto', padding: '0 6px' }}>‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)} className={`ap-page-btn ${n === page ? 'active' : ''}`}>{n}</button>
            ))}
            <button className="ap-page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ width: 'auto', padding: '0 6px' }}>›</button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="ap-cal-card">
        <div className="ap-cal-head">
          <h3 className="ap-cal-title">Filter by Date</h3>
          {selectedDay && <button onClick={() => setSelectedDay(null)} className="ap-cal-clear">Clear · Show all</button>}
        </div>
        {selectedDay && <p className="ap-cal-selected-label">Showing: {format(selectedDay, 'MMMM d, yyyy')}</p>}
        <div className="ap-cal-nav">
          <button onClick={() => setCalendarDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))} className="ap-cal-nav-btn">‹</button>
          <span className="ap-cal-month">{format(calendarDate, 'MMMM yyyy')}</span>
          <button onClick={() => setCalendarDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))} className="ap-cal-nav-btn">›</button>
        </div>
        <div className="ap-cal-weekdays">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="ap-cal-weekday">{d}</div>)}
        </div>
        <div className="ap-cal-grid">
          {Array.from({ length: startDayOfWeek }).map((_, i) => <div key={`e-${i}`} className="ap-cal-day empty" />)}
          {daysInMonth.map(day => {
            const isSelected = selectedDay && isSameDay(day, selectedDay);
            const dateStr    = format(day, 'yyyy-MM-dd');
            const hasAppts   = datesWithAppts.has(dateStr);
            return (
              <button key={day.toISOString()} type="button"
                onClick={() => setSelectedDay(prev => prev && isSameDay(prev, day) ? null : day)}
                className={`ap-cal-day ${isSelected ? 'selected' : hasAppts ? 'has-appts' : 'no-appts'}`}>
                {format(day, 'd')}
                {hasAppts && <span className={`ap-cal-dot ${isSelected ? 'white' : 'brown'}`} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Schedule/Edit Modal */}
      {showScheduleModal && (
        <div className="ap-modal-overlay">
          <div className="ap-modal ap-modal-lg ap-modal-scroll">
            <div className="ap-modal-head">
              <h2 className="ap-modal-head-title">{editingAppointment ? 'Edit Appointment' : 'Schedule Appointment'}</h2>
              <button type="button" onClick={() => { setShowScheduleModal(false); setEditingAppointment(null); }} className="ap-modal-close"><X size={22} /></button>
            </div>
            <form onSubmit={handleSubmit} className="ap-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="ap-form-group">
                <label className="ap-label">Visitor Name</label>
                <input type="text" required value={formData.visitorName} onChange={e => setFormData({ ...formData, visitorName: e.target.value })} className="ap-input" placeholder="Enter visitor name" />
              </div>
              <div className="ap-form-group">
                <label className="ap-label">Visitor Contact</label>
                <input type="tel" value={formData.visitorContact} onChange={e => setFormData({ ...formData, visitorContact: e.target.value })} className="ap-input" placeholder="+233 24 123 4567" />
              </div>
              <div className="ap-form-group">
                <label className="ap-label">Host</label>
                <select value={formData.host} onChange={e => setFormData({ ...formData, host: e.target.value })} className="ap-input ap-select">
                  {hosts.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div className="ap-form-row-2">
                <div className="ap-form-group">
                  <label className="ap-label">Date</label>
                  <input type="date" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="ap-input" />
                </div>
                <div className="ap-form-group">
                  <label className="ap-label">Time</label>
                  <input type="time" required value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} className="ap-input" />
                </div>
              </div>
              <div className="ap-form-group">
                <label className="ap-label">Purpose</label>
                <textarea required value={formData.purpose} onChange={e => setFormData({ ...formData, purpose: e.target.value })} className="ap-input ap-textarea" placeholder="Purpose of visit" />
              </div>
              <div className="ap-form-flex">
                <button type="button" onClick={() => { setShowScheduleModal(false); setEditingAppointment(null); }} className="ap-btn-ghost">Cancel</button>
                <button type="submit" className="ap-btn-primary" style={{ justifyContent: 'center' }}>
                  {editingAppointment ? 'Save Changes' : 'Create Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingAppointment && (
        <div className="ap-modal-overlay">
          <div className="ap-modal ap-modal-sm">
            <div className="ap-modal-head">
              <h2 className="ap-modal-head-title">Appointment Details</h2>
              <button onClick={() => setViewingAppointment(null)} className="ap-modal-close"><X size={18} /></button>
            </div>
            <div className="ap-modal-body">
              {[
                ['Visitor', viewingAppointment.visitorName],
                ['Contact', viewingAppointment.visitorContact || '—'],
                ['Host', viewingAppointment.host],
                ['Date', viewingAppointment.date ? format(parseISO(viewingAppointment.date), 'MMM d, yyyy') : '—'],
                ['Time', viewingAppointment.time],
                ['Purpose', viewingAppointment.purpose],
              ].map(([label, value]) => (
                <div key={label} className="ap-view-row">
                  <span className="ap-view-label">{label}</span>
                  <span className="ap-view-value">{value}</span>
                </div>
              ))}
              <div className="ap-view-row">
                <span className="ap-view-label">Status</span>
                <StatusBadge status={viewingAppointment.status} />
              </div>
            </div>
            <div className="ap-modal-foot">
              <button onClick={() => setViewingAppointment(null)} className="ap-btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
