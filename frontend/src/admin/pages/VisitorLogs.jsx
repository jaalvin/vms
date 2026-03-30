import { useState, useCallback } from 'react';
import { Search, Download, X, Phone, MapPin, CheckCircle, Eye, LogOut, Trash2, Calendar, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { visitors as mockVisitors, hosts } from '../data/mockData.js';
import { StatusBadge } from '../components/StatusBadge.jsx';
import '../admin-pages.css';

export default function VisitorLogs() {
  const [searchQuery, setSearchQuery]   = useState('');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [dateRange, setDateRange]       = useState('This week');
  const [hostFilter, setHostFilter]     = useState('');
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [showModal, setShowModal]       = useState(false);
  const [visitorsList, setVisitorsList] = useState(mockVisitors);
  const [sortKey, setSortKey]           = useState(null);
  const [sortDir, setSortDir]           = useState(null);

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

  const filteredVisitors = (() => {
    let list = visitorsList.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.purpose.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All status' || v.status === statusFilter;
      const matchesHost   = !hostFilter || v.host === hostFilter;
      return matchesSearch && matchesStatus && matchesHost;
    });
    if (sortKey && sortDir) {
      list = [...list].sort((a, b) => {
        const cmp = String(a[sortKey] ?? '').localeCompare(String(b[sortKey] ?? ''));
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return list;
  })();

  const openModal  = (v) => { setSelectedVisitor(v); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setSelectedVisitor(null); };

  const handleCheckOut = useCallback((visitor, e) => {
    e?.stopPropagation?.();
    setVisitorsList(prev => prev.map(v => v.id === visitor.id ? { ...v, status: 'Checked Out' } : v));
    setSelectedVisitor(sv => sv?.id === visitor.id ? { ...sv, status: 'Checked Out' } : sv);
  }, []);

  const handleDelete = useCallback((visitor, e) => {
    e?.stopPropagation?.();
    setVisitorsList(prev => prev.filter(v => v.id !== visitor.id));
    if (selectedVisitor?.id === visitor.id) closeModal();
  }, [selectedVisitor]);

  const exportToCSV = () => {
    const headers = ['Visitor Name','Contact','Host','Purpose','Check-in','Check-out','Status','Date'];
    const csv = [
      headers.join(','),
      ...filteredVisitors.map(v => [v.name,v.contact,v.host,v.purpose,v.checkInTime,v.checkOutTime,v.status,v.date].map(c => `"${c}"`).join(','))
    ].join('\n');
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv],{type:'text/csv'})), download: `visitor_logs_${new Date().toISOString().split('T')[0]}.csv` });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const columns = [
    { key: 'name',         label: 'Visitor Name', sortable: true },
    { key: 'contact',      label: 'Contact',      sortable: false },
    { key: 'host',         label: 'Host',         sortable: true },
    { key: 'purpose',      label: 'Purpose',      sortable: false },
    { key: 'checkInTime',  label: 'Check-in',     sortable: true },
    { key: 'checkOutTime', label: 'Check-out',    sortable: true },
    { key: 'status',       label: 'Status',       sortable: true },
    { key: 'actions',      label: 'Actions',      sortable: false },
  ];

  return (
    <div>
      <div className="ap-header" style={{ alignItems: 'center' }}>
        <div>
          <h1 className="ap-title">Visitor Logs</h1>
          <p className="ap-sub">Complete history of all visitor activity.</p>
        </div>
      </div>

      <div className="ap-card ap-card-p">
        {/* Filters Row 1 */}
        <div className="ap-filters">
          <div className="ap-search-wrap" style={{ minWidth: 280 }}>
            <Search className="ap-search-icon" size={18} />
            <input type="text" placeholder="Search visitors, host, purpose..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="ap-search-input" style={{ paddingLeft: 40 }} />
          </div>
          <div className="ap-filter-pill-group">
            {['All status', 'Inside', 'Checked Out', 'Overdue'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`ap-filter-pill ${statusFilter === s ? 'active' : ''}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Row 2 */}
        <div className="ap-filters-2">
          <div className="ap-filter-date">
            <Calendar size={15} style={{ color: '#6b7280' }} />
            <select value={dateRange} onChange={e => setDateRange(e.target.value)}>
              <option>This week</option><option>This month</option><option>Last 7 days</option><option>Last 30 days</option>
            </select>
          </div>
          <select value={hostFilter} onChange={e => setHostFilter(e.target.value)} className="ap-filter-select">
            <option value="">Filter by Host...</option>
            {hosts.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
          <div className="ap-ml-auto">
            <button onClick={exportToCSV} className="ap-btn-ghost">
              <Download size={15} /> Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="ap-table-wrap">
          <table className="ap-table">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.key}
                    className={col.sortable ? 'sortable' : ''}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}>
                    {col.label}
                    {col.sortable && <SortIcon col={col.key} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '48px 0', color: '#9ca3af' }}>No visitors match your filters.</td></tr>
              ) : filteredVisitors.map(visitor => (
                <tr key={visitor.id} onClick={() => openModal(visitor)}>
                  <td className="td-name">{visitor.name}</td>
                  <td className="td-muted">{visitor.contact}</td>
                  <td>{visitor.host}</td>
                  <td className="td-trunc">{visitor.purpose}</td>
                  <td>{visitor.checkInTime}</td>
                  <td>{visitor.checkOutTime}</td>
                  <td><StatusBadge status={visitor.status} /></td>
                  <td>
                    <div className="td-actions-center" onClick={e => e.stopPropagation()}>
                      <button onClick={() => openModal(visitor)} className="ap-btn-icon" title="View"><Eye size={15} /></button>
                      {visitor.status === 'Inside' && (
                        <button onClick={e => handleCheckOut(visitor, e)} className="ap-btn-icon blue" title="Check out"><LogOut size={15} /></button>
                      )}
                      <button onClick={e => handleDelete(visitor, e)} className="ap-btn-icon red" title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
          <p style={{ fontSize: 13, color: '#6b7280' }}>{filteredVisitors.length} record{filteredVisitors.length !== 1 ? 's' : ''} found</p>
          {sortKey && (
            <button onClick={() => { setSortKey(null); setSortDir(null); }}
              style={{ fontSize: 11, color: '#7B3F1E', background: 'none', border: 'none', cursor: 'pointer' }}>
              Clear sort
            </button>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedVisitor && (
        <div className="ap-modal-overlay">
          <div className="ap-modal ap-modal-lg">
            <div className="ap-modal-head">
              <h2 className="ap-modal-head-title">Visitor Details</h2>
              <button type="button" onClick={closeModal} className="ap-modal-close"><X size={22} /></button>
            </div>
            <div className="ap-modal-body">
              <div className="ap-detail-top">
                <div className="ap-detail-avatar">
                  <span>{selectedVisitor.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</span>
                </div>
                <div className="ap-detail-info">
                  <h3 className="ap-detail-name">{selectedVisitor.name}</h3>
                  <div className="ap-detail-meta"><Phone size={14} /><span>{selectedVisitor.contact}</span></div>
                  <div className="ap-detail-meta"><MapPin size={14} /><span>{selectedVisitor.purpose}</span></div>
                </div>
                <StatusBadge status={selectedVisitor.status} />
              </div>
              <div className="ap-detail-grid">
                {[
                  { label: 'Host',       value: selectedVisitor.host },
                  { label: 'Visit Date', value: selectedVisitor.date },
                  { label: 'Check-in',   value: selectedVisitor.checkInTime },
                  { label: 'Check-out',  value: selectedVisitor.checkOutTime },
                ].map(({ label, value }) => (
                  <div key={label} className="ap-detail-cell">
                    <p className="ap-detail-cell-label">{label}</p>
                    <p className="ap-detail-cell-value">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="ap-modal-foot">
              <button type="button" onClick={closeModal} className="ap-btn-ghost" style={{ flex: 1 }}>Close</button>
              {selectedVisitor.status === 'Inside' && (
                <button type="button" onClick={() => { handleCheckOut(selectedVisitor); closeModal(); }}
                  className="ap-btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <CheckCircle size={16} /> Check Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
