import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppContextProvider({ children, authUser }) {
  // Seed firstName from the logged-in user's name (from AuthContext)
  const seedName = authUser?.fullName
    ? authUser.fullName.split(' ')[0]
    : 'Admin';

  const [currentUser, setCurrentUser] = useState({ firstName: seedName, avatarUrl: null });
  const [notifications, setNotifications] = useState([]);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [customTimeout, setCustomTimeout] = useState(null);

  // Keep firstName in sync if authUser changes (e.g. after re-login)
  useEffect(() => {
    if (authUser?.fullName) {
      setCurrentUser(prev => ({ ...prev, firstName: authUser.fullName.split(' ')[0] }));
    }
  }, [authUser]);

  const addNotification = (message) => {
    setNotifications(prev => [
      ...prev,
      { id: Date.now(), message, timestamp: new Date().toISOString(), read: false },
    ]);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      notifications, addNotification, markAllRead,
      sessionTimeout, setSessionTimeout,
      customTimeout, setCustomTimeout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppContextProvider');
  return ctx;
}
