import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, RotateCcw, Zap, ZapOff } from 'lucide-react';
import Button from '@components/UI/Button';
import StatusMessage from '@components/UI/StatusMessage';
import useCamera from '@hooks/useCamera';

const CameraView = ({
  onPhotoCapture,
  referenceImage = null,
  overlayOpacity = 0.3,
  onError,
  className = '',
  showControls = true,
  autoStart = true,
  fallbackOnError = true
}) => {
  const canvasRef = useRef(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const {
    videoRef,
    isInitialized,
    isLoading,
    error,
    facingMode,
    initializeCamera,
    stopCamera,
    switchCamera,
    takePhoto,
    hasFlash,
    toggleFlash,
    canTakePhoto
  } = useCamera();

  // Initialize camera on mount with delay for iOS compatibility
  useEffect(() => {
    if (autoStart) {
      // Add a small delay to ensure DOM is ready, especially important for iOS
      const timer = setTimeout(() => {
        initializeCamera();
      }, 100);
      
      return () => {
        clearTimeout(timer);
        stopCamera();
      };
    }

    // Cleanup on unmount
    return () => {
      stopCamera();
    };
  }, [autoStart, initializeCamera, stopCamera]);

  // Handle photo capture
  const handlePhotoCapture = async () => {
    try {
      if (!canTakePhoto) {
        throw new Error('Camera not ready for photo capture');
      }

      const photoDataURL = takePhoto();
      onPhotoCapture?.(photoDataURL);
    } catch (error) {
      console.error('Photo capture failed:', error);
      onError?.(error.message);
    }
  };

  // Handle camera switch
  const handleCameraSwitch = async () => {
    try {
      await switchCamera();
    } catch (error) {
      console.error('Camera switch failed:', error);
      onError?.(error.message);
    }
  };

  // Handle flash toggle
  const handleFlashToggle = async () => {
    try {
      const success = await toggleFlash(!isFlashOn);
      if (success) {
        setIsFlashOn(!isFlashOn);
      }
    } catch (error) {
      console.error('Flash toggle failed:', error);
    }
  };

  // Toggle overlay visibility
  const handleOverlayToggle = () => {
    setShowOverlay(!showOverlay);
  };

  const containerClasses = [
    'relative',
    'w-full',
    'bg-black',
    'overflow-hidden',
    'rounded-lg',
    className
  ].join(' ');

  // Show loading state
  if (isLoading) {
    return (
      <div className={containerClasses}>
        <div className="aspect-[4/3] flex items-center justify-center">
          <div className="text-center text-white">
            <Camera size={48} className="mx-auto mb-4 animate-pulse" />
            <p className="text-lg font-medium">Initializing camera...</p>
            <p className="text-sm opacity-75 mt-1">Please allow camera access</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={containerClasses}>
        <div className="aspect-[4/3] flex items-center justify-center p-4">
          <StatusMessage
            type="error"
            title="Camera Error"
            message={error}
            icon={CameraOff}
            className="bg-red-900 border-red-700 text-white"
          >
            <div className="mt-3 space-y-2">
              <Button
                variant="outline"
                size="small"
                onClick={() => initializeCamera()}
                className="text-white border-white hover:bg-white hover:text-red-900"
              >
                Try Again
              </Button>
              {fallbackOnError && (
                <div className="text-center">
                  <p className="text-sm opacity-75 mb-2">Camera not available?</p>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => onPhotoCapture && onPhotoCapture(null)}
                    className="text-white hover:bg-white hover:text-red-900"
                  >
                    Continue Without Camera
                  </Button>
                </div>
              )}
            </div>
          </StatusMessage>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {/* Video element */}
      <div className="relative aspect-[4/3]">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
        />

        {/* Reference image overlay */}
        {referenceImage && showOverlay && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: overlayOpacity }}
          >
            <img
              src={referenceImage}
              alt="Reference for matching"
              className="w-full h-full object-cover"
              style={{
                mixBlendMode: 'overlay',
                transform: facingMode === 'user' ? 'scaleX(-1)' : 'none'
              }}
            />

            {/* Overlay indicator */}
            <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
              Reference Overlay
            </div>
          </div>
        )}

        {/* Camera controls overlay */}
        {showControls && isInitialized && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Top controls */}
            <div className="absolute top-2 right-2 flex gap-2 pointer-events-auto">
              {/* Flash toggle */}
              {hasFlash() && (
                <Button
                  variant="ghost"
                  size="small"
                  icon={isFlashOn ? Zap : ZapOff}
                  onClick={handleFlashToggle}
                  className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                  aria-label={isFlashOn ? 'Turn off flash' : 'Turn on flash'}
                />
              )}

              {/* Camera switch */}
              <Button
                variant="ghost"
                size="small"
                icon={RotateCcw}
                onClick={handleCameraSwitch}
                className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                aria-label="Switch camera"
              />
            </div>

            {/* Reference overlay toggle */}
            {referenceImage && (
              <div className="absolute top-2 left-2 pointer-events-auto">
                <Button
                  variant="ghost"
                  size="small"
                  onClick={handleOverlayToggle}
                  className="bg-black bg-opacity-50 text-white hover:bg-opacity-70 text-xs"
                >
                  {showOverlay ? 'Hide Ref' : 'Show Ref'}
                </Button>
              </div>
            )}

            {/* Center capture button */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
              <Button
                variant="primary"
                size="large"
                icon={Camera}
                onClick={handlePhotoCapture}
                disabled={!canTakePhoto}
                className="w-16 h-16 rounded-full bg-white text-primary shadow-lg hover:scale-105 active:scale-95 transition-transform"
                aria-label="Take photo"
              />
            </div>

            {/* Grid lines for composition */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full opacity-30">
                <defs>
                  <pattern id="grid" width="33.333%" height="33.333%" patternUnits="userSpaceOnUse">
                    <path d="M 33.333 0 L 33.333 100 M 0 33.333 L 100 33.333"
                          fill="none"
                          stroke="white"
                          strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
        )}

        {/* Canvas for photo capture (hidden) */}
        <canvas
          ref={canvasRef}
          className="hidden"
        />
      </div>
    </div>
  );
};

// CSS-in-JS styles for React Native compatibility
const styles = `
  /* Layout and positioning */
  .relative { position: relative; }
  .absolute { position: absolute; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .w-full { width: 100%; }
  .h-full { height: 100%; }

  /* Aspect ratio */
  .aspect-\\[4\\/3\\] { aspect-ratio: 4/3; }

  /* Background and colors */
  .bg-black { background-color: #000000; }
  .bg-white { background-color: var(--color-white); }
  .text-white { color: var(--color-white); }
  .text-primary { color: var(--color-primary); }

  /* Background opacity */
  .bg-opacity-50 { background-color: rgba(0, 0, 0, 0.5); }
  .bg-opacity-60 { background-color: rgba(0, 0, 0, 0.6); }
  .bg-opacity-70 { background-color: rgba(0, 0, 0, 0.7); }

  /* Opacity */
  .opacity-30 { opacity: 0.3; }
  .opacity-75 { opacity: 0.75; }

  /* Overflow */
  .overflow-hidden { overflow: hidden; }

  /* Border radius */
  .rounded-lg { border-radius: var(--border-radius-lg); }
  .rounded-full { border-radius: var(--border-radius-full); }
  .rounded { border-radius: var(--border-radius-md); }

  /* Flexbox */
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }

  /* Spacing */
  .gap-2 { gap: var(--spacing-2); }
  .p-4 { padding: var(--spacing-4); }
  .px-2 { padding-left: var(--spacing-2); padding-right: var(--spacing-2); }
  .py-1 { padding-top: var(--spacing-1); padding-bottom: var(--spacing-1); }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .mb-4 { margin-bottom: var(--spacing-4); }
  .mt-1 { margin-top: var(--spacing-1); }
  .mt-3 { margin-top: var(--spacing-3); }

  /* Positioning */
  .top-2 { top: var(--spacing-2); }
  .right-2 { right: var(--spacing-2); }
  .left-2 { left: var(--spacing-2); }
  .bottom-4 { bottom: var(--spacing-4); }
  .left-1\\/2 { left: 50%; }

  /* Transform */
  .transform { transform: var(--tw-transform); }
  .-translate-x-1\\/2 { transform: translateX(-50%); }

  /* Typography */
  .text-lg { font-size: var(--font-size-lg); }
  .text-sm { font-size: var(--font-size-sm); }
  .text-xs { font-size: var(--font-size-xs); }
  .font-medium { font-weight: var(--font-weight-medium); }
  .text-center { text-align: center; }

  /* Button sizing */
  .w-16 { width: 4rem; }
  .h-16 { height: 4rem; }

  /* Pointer events */
  .pointer-events-none { pointer-events: none; }
  .pointer-events-auto { pointer-events: auto; }

  /* Object fit */
  .object-cover { object-fit: cover; }

  /* Mix blend mode */
  .mix-blend-overlay { mix-blend-mode: overlay; }

  /* Visibility */
  .hidden { display: none; }

  /* Animations */
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* Hover and active states */
  .hover\\:bg-opacity-70:hover { background-color: rgba(0, 0, 0, 0.7); }
  .hover\\:scale-105:hover { transform: scale(1.05); }
  .active\\:scale-95:active { transform: scale(0.95); }

  /* Transitions */
  .transition-transform { transition-property: transform; }

  /* Shadow */
  .shadow-lg { box-shadow: var(--shadow-lg); }

  /* Video element styling */
  video {
    background-color: #000;
    display: block;
  }

  /* Ensure video covers container properly */
  video::-webkit-media-controls {
    display: none !important;
  }

  video::-webkit-media-controls-enclosure {
    display: none !important;
  }

  /* Grid overlay */
  svg {
    pointer-events: none;
  }
`;

// Inject styles (for React Native compatibility)
if (typeof document !== 'undefined' && !document.getElementById('camera-view-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'camera-view-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default CameraView;