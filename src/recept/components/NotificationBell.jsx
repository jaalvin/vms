import React, { useEffect, useRef, useState } from 'react';

const defaultNotifications = [
  { id: 1, message: 'New visitor check-in recorded.', time: 'Just now' },
  { id: 2, message: 'Upcoming appointment in 30 minutes.', time: '5 min ago' },
  { id: 3, message: 'Security alert channel is active.', time: '12 min ago' },
];

const NotificationBell = ({ notifications = defaultNotifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="notification-wrap" ref={containerRef}>
      <button
        type="button"
        className="topbar-bell"
        aria-label="Open notifications"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {notifications.length > 0 && <div className="bell-dot"></div>}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-title">Notifications</div>
          {notifications.length === 0 ? (
            <div className="notification-empty">No new notifications.</div>
          ) : (
            notifications.map((item) => (
              <div key={item.id} className="notification-item">
                <div className="notification-message">{item.message}</div>
                <div className="notification-time">{item.time}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

