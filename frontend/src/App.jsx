import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  [
    // Define your routes here
  ],
  {
    future: {
      v7_startTransition: true, // Enable the future flag here
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;