import React from 'react';
import { Camera, RotateCcw, Zap, ZapOff, Grid3X3, Eye, EyeOff, Settings } from 'lucide-react';
import Button from '@components/UI/Button';

const CameraControls = ({
  onCapture,
  onSwitchCamera,
  onToggleFlash,
  onToggleGrid,
  onToggleOverlay,
  onSettings,
  isFlashOn = false,
  isGridVisible = false,
  isOverlayVisible = true,
  hasFlash = false,
  canSwitchCamera = true,
  hasReferenceImage = false,
  disabled = false,
  className = ''
}) => {
  const controlsClasses = [
    'flex',
    'items-center',
    'justify-between',
    'p-4',
    'bg-black',
    'bg-opacity-80',
    'text-white',
    className
  ].join(' ');

  return (
    <div className={controlsClasses}>
      {/* Left controls */}
      <div className="flex items-center gap-2">
        {/* Flash toggle */}
        {hasFlash && (
          <Button
            variant="ghost"
            size="small"
            icon={isFlashOn ? Zap : ZapOff}
            onClick={onToggleFlash}
            disabled={disabled}
            className="text-white hover:bg-white hover:bg-opacity-20"
            aria-label={isFlashOn ? 'Turn off flash' : 'Turn on flash'}
          />
        )}

        {/* Grid toggle */}
        <Button
          variant="ghost"
          size="small"
          icon={Grid3X3}
          onClick={onToggleGrid}
          disabled={disabled}
          className={`text-white hover:bg-white hover:bg-opacity-20 ${
            isGridVisible ? 'bg-white bg-opacity-20' : ''
          }`}
          aria-label={isGridVisible ? 'Hide grid' : 'Show grid'}
        />

        {/* Reference overlay toggle */}
        {hasReferenceImage && (
          <Button
            variant="ghost"
            size="small"
            icon={isOverlayVisible ? Eye : EyeOff}
            onClick={onToggleOverlay}
            disabled={disabled}
            className={`text-white hover:bg-white hover:bg-opacity-20 ${
              isOverlayVisible ? 'bg-white bg-opacity-20' : ''
            }`}
            aria-label={isOverlayVisible ? 'Hide reference overlay' : 'Show reference overlay'}
          />
        )}
      </div>

      {/* Center capture button */}
      <div className="flex-1 flex justify-center">
        <Button
          variant="primary"
          size="large"
          icon={Camera}
          onClick={onCapture}
          disabled={disabled}
          className="w-16 h-16 rounded-full bg-white text-black shadow-lg hover:scale-105 active:scale-95 transition-transform duration-150"
          aria-label="Take photo"
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Camera switch */}
        {canSwitchCamera && (
          <Button
            variant="ghost"
            size="small"
            icon={RotateCcw}
            onClick={onSwitchCamera}
            disabled={disabled}
            className="text-white hover:bg-white hover:bg-opacity-20"
            aria-label="Switch camera"
          />
        )}

        {/* Settings */}
        {onSettings && (
          <Button
            variant="ghost"
            size="small"
            icon={Settings}
            onClick={onSettings}
            disabled={disabled}
            className="text-white hover:bg-white hover:bg-opacity-20"
            aria-label="Camera settings"
          />
        )}
      </div>
    </div>
  );
};

// Simplified capture button component
export const CaptureButton = ({
  onCapture,
  disabled = false,
  size = 'large',
  className = ''
}) => {
  const sizeClasses = {
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-20 h-20'
  };

  return (
    <Button
      variant="primary"
      size={size}
      icon={Camera}
      onClick={onCapture}
      disabled={disabled}
      className={`${sizeClasses[size]} rounded-full bg-white text-black shadow-lg hover:scale-105 active:scale-95 transition-transform duration-150 ${className}`}
      aria-label="Take photo"
    />
  );
};

// Floating controls component for overlay usage
export const FloatingCameraControls = ({
  position = 'bottom',
  onCapture,
  onSwitchCamera,
  onToggleFlash,
  isFlashOn = false,
  hasFlash = false,
  canSwitchCamera = true,
  disabled = false,
  className = ''
}) => {
  const positionClasses = {
    top: 'top-4',
    bottom: 'bottom-4',
    center: 'top-1/2 transform -translate-y-1/2'
  };

  const controlsClasses = [
    'absolute',
    'left-1/2',
    'transform',
    '-translate-x-1/2',
    positionClasses[position],
    'flex',
    'items-center',
    'gap-3',
    'bg-black',
    'bg-opacity-60',
    'rounded-full',
    'px-4',
    'py-2',
    className
  ].join(' ');

  return (
    <div className={controlsClasses}>
      {/* Flash toggle */}
      {hasFlash && (
        <Button
          variant="ghost"
          size="small"
          icon={isFlashOn ? Zap : ZapOff}
          onClick={onToggleFlash}
          disabled={disabled}
          className="text-white hover:bg-white hover:bg-opacity-20 rounded-full"
          aria-label={isFlashOn ? 'Turn off flash' : 'Turn on flash'}
        />
      )}

      {/* Capture button */}
      <CaptureButton
        onCapture={onCapture}
        disabled={disabled}
        size="medium"
      />

      {/* Camera switch */}
      {canSwitchCamera && (
        <Button
          variant="ghost"
          size="small"
          icon={RotateCcw}
          onClick={onSwitchCamera}
          disabled={disabled}
          className="text-white hover:bg-white hover:bg-opacity-20 rounded-full"
          aria-label="Switch camera"
        />
      )}
    </div>
  );
};

// CSS-in-JS styles for React Native compatibility
const styles = `
  /* Layout */
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .flex-1 { flex: 1; }

  /* Positioning */
  .absolute { position: absolute; }
  .relative { position: relative; }
  .top-4 { top: var(--spacing-4); }
  .bottom-4 { bottom: var(--spacing-4); }
  .left-1\\/2 { left: 50%; }
  .top-1\\/2 { top: 50%; }

  /* Transform */
  .transform { transform: var(--tw-transform); }
  .-translate-x-1\\/2 { transform: translateX(-50%); }
  .-translate-y-1\\/2 { transform: translateY(-50%); }

  /* Spacing */
  .gap-2 { gap: var(--spacing-2); }
  .gap-3 { gap: var(--spacing-3); }
  .p-4 { padding: var(--spacing-4); }
  .px-4 { padding-left: var(--spacing-4); padding-right: var(--spacing-4); }
  .py-2 { padding-top: var(--spacing-2); padding-bottom: var(--spacing-2); }

  /* Colors */
  .bg-black { background-color: #000000; }
  .bg-white { background-color: var(--color-white); }
  .text-white { color: var(--color-white); }
  .text-black { color: #000000; }

  /* Background opacity */
  .bg-opacity-80 { background-color: rgba(0, 0, 0, 0.8); }
  .bg-opacity-60 { background-color: rgba(0, 0, 0, 0.6); }
  .bg-opacity-20 { background-color: rgba(255, 255, 255, 0.2); }

  /* Sizing */
  .w-12 { width: 3rem; }
  .h-12 { height: 3rem; }
  .w-16 { width: 4rem; }
  .h-16 { height: 4rem; }
  .w-20 { width: 5rem; }
  .h-20 { height: 5rem; }

  /* Border radius */
  .rounded-full { border-radius: var(--border-radius-full); }

  /* Shadow */
  .shadow-lg { box-shadow: var(--shadow-lg); }

  /* Transitions */
  .transition-transform { transition-property: transform; }
  .duration-150 { transition-duration: 150ms; }

  /* Hover and active states */
  .hover\\:bg-white:hover { background-color: var(--color-white); }
  .hover\\:bg-opacity-20:hover { background-color: rgba(255, 255, 255, 0.2); }
  .hover\\:scale-105:hover { transform: scale(1.05); }
  .active\\:scale-95:active { transform: scale(0.95); }

  /* Control state indicators */
  .bg-white.bg-opacity-20 {
    background-color: rgba(255, 255, 255, 0.2);
  }

  /* Accessibility improvements */
  button[aria-label] {
    position: relative;
  }

  /* Focus styles */
  button:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  /* Disabled state */
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Mobile touch improvements */
  @media (max-width: 768px) {
    .gap-2 { gap: var(--spacing-3); }
    .gap-3 { gap: var(--spacing-4); }

    button {
      min-width: var(--touch-target-size);
      min-height: var(--touch-target-size);
    }
  }

  /* Dark theme optimizations */
  @media (prefers-color-scheme: dark) {
    .bg-black { background-color: rgba(0, 0, 0, 0.9); }
  }
`;

// Inject styles (for React Native compatibility)
if (typeof document !== 'undefined' && !document.getElementById('camera-controls-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'camera-controls-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default CameraControls;