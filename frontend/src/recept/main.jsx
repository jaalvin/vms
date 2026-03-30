import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles.css';

// Layouts
import ReceptionistLayout from './layouts/ReceptionistLayout.jsx';
import SecurityLayout from './layouts/SecurityLayout.jsx';

// Receptionist Pages
import AppointmentView from './pages/receptionist/AppointmentView.jsx';
import CheckIn from './pages/receptionist/CheckIn.jsx';
import CheckOut from './pages/receptionist/Checkout.jsx';
import LiveBoard from './pages/receptionist/LiveBoard.jsx';

// Security Pages
import RealTimeMonitor from './pages/security/RealTimeMonitor.jsx';
import EmergencyMode from './pages/security/EmergencyMode.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/receptionist/appointments" replace />} />

        {/* Receptionist Panel */}
        <Route path="/receptionist" element={<ReceptionistLayout />}>
          <Route index element={<Navigate to="appointments" replace />} />
          <Route path="appointments" element={<AppointmentView />} />
          <Route path="check-in" element={<CheckIn />} />
          <Route path="check-out" element={<CheckOut />} />
          <Route path="live-board" element={<LiveBoard />} />
        </Route>

        {/* Security Panel */}
        <Route path="/security" element={<SecurityLayout />}>
          <Route index element={<Navigate to="monitor" replace />} />
          <Route path="monitor" element={<RealTimeMonitor />} />
          <Route path="emergency" element={<EmergencyMode />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
