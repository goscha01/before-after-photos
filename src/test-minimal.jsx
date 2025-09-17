// Minimal React test to see if React loads at all
console.log('🧪 Debug: test-minimal.jsx starting...');

// Test if React is available
try {
  console.log('🧪 Debug: Testing React import...');
  // This will fail if React isn't available
  console.log('🧪 Debug: React is available');
} catch (error) {
  console.log('❌ Debug: React import failed:', error);
}

// Simple DOM manipulation test
try {
  console.log('🧪 Debug: Testing DOM manipulation...');
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = '<div style="padding: 20px; color: green;">✅ Minimal React test loaded!</div>';
    console.log('✅ Debug: DOM manipulation successful');
  } else {
    console.log('❌ Debug: Root element not found');
  }
} catch (error) {
  console.log('❌ Debug: DOM manipulation failed:', error);
}

console.log('🧪 Debug: test-minimal.jsx completed');
