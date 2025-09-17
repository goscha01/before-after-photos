console.log('🚀 Debug: main.jsx starting...');

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

console.log('🚀 Debug: Imports loaded successfully');

// Test basic functionality first
try {
  console.log('🧪 Debug: Testing basic functionality...');
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  console.log('✅ Debug: Root element found');
  
  // Show a simple message first
  rootElement.innerHTML = '<div style="padding: 20px; color: blue; font-family: Arial, sans-serif;"><h1>🧪 Bundled React Loading...</h1><p>React is being initialized...</p></div>';
  console.log('✅ Debug: Basic DOM manipulation successful');
  
} catch (error) {
  console.log('❌ Debug: Basic test failed:', error);
  
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: Arial, sans-serif;">
        <h1>❌ Basic Test Failed</h1>
        <p><strong>Error:</strong> ${error.message}</p>
      </div>
    `;
  }
}

// Initialize React
try {
  console.log('🚀 Debug: Creating React root...');
  const rootElement = document.getElementById('root');
  const root = ReactDOM.createRoot(rootElement);
  console.log('✅ Debug: React root created');
  
  console.log('🚀 Debug: Rendering App component...');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  console.log('✅ Debug: App rendered successfully');
  
} catch (error) {
  console.log('❌ Debug: React initialization failed:', error);
  
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: Arial, sans-serif;">
        <h1>❌ React Initialization Failed</h1>
        <p><strong>Error:</strong> ${error.message}</p>
        <p><strong>Stack:</strong> ${error.stack}</p>
      </div>
    `;
  }
}

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