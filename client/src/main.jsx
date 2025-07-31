// File: client/src/main.jsx

import React from 'react';
// 1. You are already importing createRoot correctly!
import { createRoot } from 'react-dom/client'; 
import App from './App.jsx';
// 2. Make sure this path is correct. Based on your folder structure, it should be:
import { AuthProvider } from './components/context/AuthContext.jsx';
 // Assuming you have this file for global styles

// 3. Use createRoot directly and get the root element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// 4. Call render on the root object you just created
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);


