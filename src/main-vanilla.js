console.log('🚀 Debug: main-vanilla.js starting...');

// Test basic functionality first
try {
  console.log('🧪 Debug: Testing basic functionality...');
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  console.log('✅ Debug: Root element found');
  
  // Show a simple message first
  rootElement.innerHTML = '<div style="padding: 20px; color: blue; font-family: Arial, sans-serif;"><h1>🧪 Vanilla JS Test</h1><p>main-vanilla.js is running!</p><p>This proves JavaScript execution works on iOS Safari.</p></div>';
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

console.log('✅ Debug: main-vanilla.js completed');
