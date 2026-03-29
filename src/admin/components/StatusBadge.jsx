import '../admin-pages.css';

const statusMap = {
  Confirmed:     'ap-status-confirmed',
  Pending:       'ap-status-pending',
  Cancelled:     'ap-status-cancelled',
  Arrived:       'ap-status-arrived',
  Inside:        'ap-status-inside',
  'Checked Out': 'ap-status-checkedout',
  Overdue:       'ap-status-overdue',
  Active:        'ap-status-active',
  Inactive:      'ap-status-inactive',
};

export default function StatusBadge({ status }) {
  const cls = statusMap[status] ?? 'ap-status-cancelled';
  return (
    <span className={`ap-status-badge ${cls}`}>
      <span className="ap-status-dot" />
      {status}
    </span>
  );
}

export { StatusBadge };
