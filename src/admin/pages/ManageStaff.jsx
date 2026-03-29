import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X, Mail, Users, UserCheck, UserX, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { staffMembers as mockStaff } from '../data/mockData.js';
import StatusBadge from '../components/StatusBadge.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import '../admin-pages.css';

function formatDate(iso) { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
function formatTime(iso) { return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); }

const ITEMS_PER_PAGE = 5;

export default function ManageStaff() {
  const { addNotification } = useAppContext();
  const [staffList, setStaffList]       = useState(mockStaff);
  const [searchQuery, setSearchQuery]   = useState('');
  const [roleFilter, setRoleFilter]     = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage]   = useState(1);
  const [showModal, setShowModal]       = useState(false);
  const [editingId, setEditingId]       = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [formData, setFormData]         = useState({ name: '', role: 'Receptionist', email: '', status: true });
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

  const filteredStaff = (() => {
    let list = staffList.filter(m => {
      const matchSearch = [m.name, m.email, m.role].some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchRole   = roleFilter === 'All Roles' || m.role === roleFilter;
      const matchStatus = statusFilter === 'All Status' || (statusFilter === 'Active' ? m.status : !m.status);
      return matchSearch && matchRole && matchStatus;
    });
    if (sortKey && sortDir) {
      list = [...list].sort((a, b) => {
        let av = a[sortKey]; let bv = b[sortKey];
        if (typeof av === 'boolean') { av = av ? 1 : 0; bv = bv ? 1 : 0; }
        const cmp = String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return list;
  })();

  const totalPages = Math.max(1, Math.ceil(filteredStaff.length / ITEMS_PER_PAGE));
  const paginated  = filteredStaff.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  useEffect(() => { setCurrentPage(1); }, [searchQuery, roleFilter, statusFilter]);

  const openAdd  = () => { setEditingId(null); setFormData({ name: '', role: 'Receptionist', email: '', status: true }); setShowModal(true); };
  const openEdit = (m) => { setEditingId(m.id); setFormData({ name: m.name, role: m.role, email: m.email, status: m.status }); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditingId(null); setFormData({ name: '', role: 'Receptionist', email: '', status: true }); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setStaffList(staffList.map(m => m.id === editingId ? { ...m, ...formData } : m));
      addNotification(`Staff record updated: ${formData.name}`);
    } else {
      const newMember = { id: Math.max(...staffList.map(s => s.id)) + 1, ...formData, lastLogin: new Date().toISOString() };
      setStaffList([...staffList, newMember]);
      addNotification(`New staff member added: ${formData.name}`);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    const member = staffList.find(m => m.id === id);
    setStaffList(staffList.filter(m => m.id !== id));
    setDeleteConfirmId(null);
    addNotification(`Staff member removed: ${member?.name}`);
  };

  const getRoleCls = (role) => {
    if (role === 'Admin') return 'ap-role-admin';
    if (role === 'Receptionist') return 'ap-role-recept';
    return 'ap-role-sec';
  };

  const activeCount   = staffList.filter(s => s.status).length;
  const inactiveCount = staffList.filter(s => !s.status).length;

  return (
    <div>
      {/* Header */}
      <div className="ap-header">
        <div>
          <h1 className="ap-title">Manage Staff</h1>
          <p className="ap-sub">Add, edit and manage system users.</p>
        </div>
        <button onClick={openAdd} className="ap-btn-primary">
          <Plus size={18} /> Add Staff Member
        </button>
      </div>

      {/* Stat Cards */}
      <div className="ap-stats-3">
        {[
          { label: 'Total Staff', value: staffList.length, Icon: Users,     iconCls: 'ap-icon-blue' },
          { label: 'Active',      value: activeCount,      Icon: UserCheck, iconCls: 'ap-icon-green' },
          { label: 'Inactive',    value: inactiveCount,    Icon: UserX,     iconCls: 'ap-icon-gray' },
        ].map(({ label, value, Icon, iconCls }) => (
          <div key={label} className="ap-stat-card">
            <div>
              <p className="ap-stat-label">{label}</p>
              <p className="ap-stat-value">{value}</p>
            </div>
            <div className={`ap-stat-icon ${iconCls}`}><Icon size={28} /></div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="ap-filters" style={{ marginBottom: 20 }}>
        <div className="ap-search-wrap">
          <Search className="ap-search-icon" size={16} />
          <input type="text" placeholder="Search staff..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)} className="ap-search-input" />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="ap-filter-select">
          <option>All Roles</option><option>Admin</option><option>Receptionist</option><option>Security</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="ap-filter-select">
          <option>All Status</option><option>Active</option><option>Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="ap-card">
        <div className="ap-table-wrap" style={{ borderRadius: 0, border: 'none' }}>
          <table className="ap-table">
            <thead>
              <tr>
                <th className="sortable" onClick={() => handleSort('name')}>Name<SortIcon col="name" /></th>
                <th className="sortable" onClick={() => handleSort('role')}>Role<SortIcon col="role" /></th>
                <th className="sortable" onClick={() => handleSort('status')}>Status<SortIcon col="status" /></th>
                <th className="sortable" onClick={() => handleSort('lastLogin')}>Last Login<SortIcon col="lastLogin" /></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(member => (
                <tr key={member.id}>
                  <td>
                    <div className="ap-visitor-row">
                      <div className="ap-visitor-avatar">
                        <span>{member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                      </div>
                      <div>
                        <div className="ap-visitor-name">{member.name}</div>
                        <div className="ap-visitor-email">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`ap-role-badge ${getRoleCls(member.role)}`}>{member.role}</span></td>
                  <td><StatusBadge status={member.status ? 'Active' : 'Inactive'} /></td>
                  <td className="td-muted">
                    {formatDate(member.lastLogin)}
                    <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 6 }}>{formatTime(member.lastLogin)}</span>
                  </td>
                  <td>
                    <div className="td-actions">
                      <button onClick={() => openEdit(member)} className="ap-btn-icon" title="Edit"><Edit2 size={15} /></button>
                      <button onClick={() => setDeleteConfirmId(member.id)} className="ap-btn-icon red" title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>No staff members found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="ap-pagination">
          <p className="ap-pagination-info">
            Showing {filteredStaff.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredStaff.length)} of {filteredStaff.length} staff members
          </p>
          <div className="ap-pagination-btns">
            <button className="ap-page-prev" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setCurrentPage(n)} className={`ap-page-btn ${n === currentPage ? 'active' : ''}`}>{n}</button>
            ))}
            <button className="ap-page-next" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="ap-modal-overlay">
          <div className="ap-modal ap-modal-lg">
            <div className="ap-modal-head">
              <h2 className="ap-modal-head-title">{editingId !== null ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
              <button onClick={closeModal} className="ap-modal-close"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="ap-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="ap-form-group">
                <label className="ap-label">Full Name</label>
                <input type="text" required value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="ap-input" placeholder="Enter full name" />
              </div>
              <div className="ap-form-group">
                <label className="ap-label">Email</label>
                <div className="ap-input-icon-wrap">
                  <Mail size={16} style={{ color: '#9ca3af', flexShrink: 0 }} />
                  <input type="email" required value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address" />
                </div>
              </div>
              <div className="ap-form-group">
                <label className="ap-label">Role</label>
                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="ap-input ap-select">
                  <option value="Admin">Admin</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Security">Security</option>
                </select>
              </div>
              <div className="ap-toggle-row">
                <button type="button" role="switch" aria-checked={formData.status}
                  onClick={() => setFormData({ ...formData, status: !formData.status })}
                  className={`ap-toggle ${formData.status ? 'on' : 'off'}`}>
                  <span className="ap-toggle-thumb" />
                </button>
                <span className="ap-toggle-label">{formData.status ? 'Active' : 'Inactive'}</span>
              </div>
              <div className="ap-form-flex" style={{ marginTop: 8 }}>
                <button type="button" onClick={closeModal} className="ap-btn-ghost">Cancel</button>
                <button type="submit" className="ap-btn-primary" style={{ justifyContent: 'center' }}>
                  {editingId !== null ? 'Save Changes' : 'Add Staff Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmId !== null && (
        <div className="ap-modal-overlay">
          <div className="ap-modal ap-modal-sm">
            <div className="ap-modal-center">
              <div className="ap-modal-danger-icon"><Trash2 size={22} /></div>
              <div className="ap-modal-center-title">Remove Staff Member?</div>
              <div className="ap-modal-center-body">This action cannot be undone.</div>
              <div className="ap-form-flex">
                <button onClick={() => setDeleteConfirmId(null)} className="ap-btn-ghost">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirmId)} className="ap-btn-danger" style={{ justifyContent: 'center' }}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
