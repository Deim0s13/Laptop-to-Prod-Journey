import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Welcome to My Webstore</h1>
      {/* Outlet renders the nested routes */}
      <Outlet />
    </div>
  );
}

export default App;