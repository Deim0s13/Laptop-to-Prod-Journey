import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Welcome to My Webstore</h1> {/* Only keep it here */}
      <Outlet /> {/* This renders the child components like Home */}
    </div>
  );
}

export default App;