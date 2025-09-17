import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

console.log('🚀 Debug: main.jsx loaded');

// Create root and render app
console.log('🚀 Debug: Creating React root...');
const root = ReactDOM.createRoot(document.getElementById('root'));

console.log('🚀 Debug: Rendering App component...');
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('🚀 Debug: App rendered successfully');

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}