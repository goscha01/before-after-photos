import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import global styles
import '@styles/global.css';

// Import screens
import DebugScreen from '@screens/DebugScreen';
import LoginScreen from '@screens/LoginScreen';
import PropertySelectionScreen from '@screens/PropertySelectionScreen';
import PhotoCaptureScreen from '@screens/PhotoCaptureScreen';
import UploadStatusScreen from '@screens/UploadStatusScreen';

// Import store
import useAppStore from '@store/useAppStore';

function App() {
  console.log('🚀 Debug: App component loaded');
  
  const { isAuthenticated } = useAppStore();
  console.log('🚀 Debug: Store loaded, isAuthenticated:', isAuthenticated);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Debug route - always accessible */}
          <Route path="/debug" element={<DebugScreen />} />

          {/* Public routes */}
          <Route path="/login" element={<LoginScreen />} />

          {/* Protected routes */}
          <Route
            path="/properties"
            element={isAuthenticated ? <PropertySelectionScreen /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/capture/:propertyId"
            element={isAuthenticated ? <PhotoCaptureScreen /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/upload"
            element={isAuthenticated ? <UploadStatusScreen /> : <Navigate to="/login" replace />}
          />

          {/* Default redirect */}
          <Route
            path="/"
            element={<Navigate to="/debug" replace />}
          />

          {/* 404 fallback */}
          <Route
            path="*"
            element={<Navigate to="/debug" replace />}
          />
        </Routes>

        {/* Toast notifications */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="toast-custom"
          bodyClassName="toast-body-custom"
        />
      </div>
    </Router>
  );
}

export default App;