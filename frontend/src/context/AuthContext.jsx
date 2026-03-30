import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Auto-login on page refresh
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('vms_user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        // Basic validation: ensure it's an object and has required properties
        if (parsed && typeof parsed === 'object' && parsed.token && parsed.role) {
          setUser(parsed);
        } else {
          // If malformed, clear it
          localStorage.removeItem('vms_user');
          localStorage.removeItem('vms_token');
        }
      }
    } catch (error) {
      console.error('Error parsing stored user:', error);
      localStorage.removeItem('vms_user');
      localStorage.removeItem('vms_token');
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('vms_token', userData.token);
    localStorage.setItem('vms_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vms_token');
    localStorage.removeItem('vms_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
