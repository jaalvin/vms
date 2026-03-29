import '../admin-pages.css';

export function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`ap-toggle ${enabled ? 'on' : 'off'}`}
    >
      <span className="ap-toggle-thumb" />
    </button>
  );
}
