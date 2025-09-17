console.log('🚀 Debug: main.jsx starting...');

(async () => {
  try {
    console.log('🚀 Debug: Importing React...');
    const React = await import('react');
    console.log('✅ Debug: React imported successfully');
    
    console.log('🚀 Debug: Importing ReactDOM...');
    const ReactDOM = await import('react-dom/client');
    console.log('✅ Debug: ReactDOM imported successfully');
    
    console.log('🚀 Debug: Importing App...');
    const App = await import('./App.jsx');
    console.log('✅ Debug: App imported successfully');
    
    console.log('🚀 Debug: Creating React root...');
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }
    console.log('✅ Debug: Root element found');
    
    const root = ReactDOM.createRoot(rootElement);
    console.log('✅ Debug: React root created');
    
    console.log('🚀 Debug: Rendering App component...');
    root.render(
      React.createElement(React.StrictMode, null,
        React.createElement(App.default)
      )
    );
    
    console.log('✅ Debug: App rendered successfully');
    
  } catch (error) {
    console.log('❌ Debug: Error in main.jsx:', error);
    
    // Show error in the page
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; color: red; font-family: Arial, sans-serif;">
          <h1>❌ React Error</h1>
          <p><strong>Error:</strong> ${error.message}</p>
          <p><strong>Stack:</strong> ${error.stack}</p>
        </div>
      `;
    }
  }
})();

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