import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import global styles
import '@styles/global.css';

// Import screens
import LoginScreen from '@screens/LoginScreen';
import PropertySelectionScreen from '@screens/PropertySelectionScreen';
import PhotoCaptureScreen from '@screens/PhotoCaptureScreen';
import UploadStatusScreen from '@screens/UploadStatusScreen';

// Import store
import useAppStore from '@store/useAppStore';

function App() {
  const { isAuthenticated } = useAppStore();

  return (
    <Router>
      <div className="App">
        <Routes>
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
            element={<Navigate to={isAuthenticated ? "/properties" : "/login"} replace />}
          />

          {/* 404 fallback */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/properties" : "/login"} replace />}
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