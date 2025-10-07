import React, { useState } from 'react';
import Solicitudes from './Solicitudes';
import Quejas from './Quejas';

const Dashboard = () => {
  const [showSolicitudes, setShowSolicitudes] = useState(true); // Controla si mostrar Solicitudes o Quejas

  return (
    <div className="dashboard-container">
      <div className="toggle-container">
        <button onClick={() => setShowSolicitudes(true)} className={`toggle-btn ${showSolicitudes ? 'active' : ''}`}>
          Solicitudes
        </button>
        <button onClick={() => setShowSolicitudes(false)} className={`toggle-btn ${!showSolicitudes ? 'active' : ''}`}>
          Quejas
        </button>
      </div>

      {showSolicitudes ? (
        <Solicitudes />
      ) : (
        <Quejas />
      )}
    </div>
  );
};

export default Dashboard;

