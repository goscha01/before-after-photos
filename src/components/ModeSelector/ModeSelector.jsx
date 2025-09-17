import React from 'react';
import { Camera, Eye, CheckCircle2 } from 'lucide-react';
import Button from '@components/UI/Button';

const ModeSelector = ({
  currentMode = 'before',
  onModeChange,
  roomStatus = {},
  disabled = false,
  layout = 'toggle', // 'toggle' | 'buttons' | 'tabs'
  className = ''
}) => {
  const { hasBefore = false, hasAfter = false } = roomStatus;

  const modes = [
    {
      id: 'before',
      label: 'Before',
      icon: Camera,
      description: 'Take a photo of the current state',
      color: 'blue',
      isComplete: hasBefore
    },
    {
      id: 'after',
      label: 'After',
      icon: CheckCircle2,
      description: 'Take a photo after cleaning',
      color: 'green',
      isComplete: hasAfter
    }
  ];

  if (layout === 'toggle') {
    return (
      <ToggleModeSelector
        currentMode={currentMode}
        onModeChange={onModeChange}
        modes={modes}
        disabled={disabled}
        className={className}
      />
    );
  }

  if (layout === 'buttons') {
    return (
      <ButtonModeSelector
        currentMode={currentMode}
        onModeChange={onModeChange}
        modes={modes}
        disabled={disabled}
        className={className}
      />
    );
  }

  if (layout === 'tabs') {
    return (
      <TabModeSelector
        currentMode={currentMode}
        onModeChange={onModeChange}
        modes={modes}
        disabled={disabled}
        className={className}
      />
    );
  }

  return null;
};

const ToggleModeSelector = ({
  currentMode,
  onModeChange,
  modes,
  disabled,
  className
}) => {
  const containerClasses = [
    'inline-flex',
    'bg-gray-100',
    'rounded-lg',
    'p-1',
    'gap-1',
    className
  ].join(' ');

  return (
    <div className={containerClasses}>
      {modes.map((mode) => {
        const isActive = currentMode === mode.id;
        const IconComponent = mode.icon;

        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            disabled={disabled}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200
              ${isActive
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <IconComponent
              size={16}
              className={mode.isComplete ? `text-${mode.color}-500` : ''}
            />
            <span>{mode.label}</span>

            {mode.isComplete && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

const ButtonModeSelector = ({
  currentMode,
  onModeChange,
  modes,
  disabled,
  className
}) => {
  const containerClasses = [
    'flex',
    'gap-3',
    className
  ].join(' ');

  return (
    <div className={containerClasses}>
      {modes.map((mode) => {
        const isActive = currentMode === mode.id;
        const IconComponent = mode.icon;

        return (
          <Button
            key={mode.id}
            variant={isActive ? 'primary' : 'outline'}
            size="medium"
            icon={IconComponent}
            onClick={() => onModeChange(mode.id)}
            disabled={disabled}
            className={`
              relative flex-1
              ${mode.isComplete ? `border-${mode.color}-500` : ''}
            `}
          >
            {mode.label}

            {mode.isComplete && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 size={10} className="text-white" />
              </div>
            )}
          </Button>
        );
      })}
    </div>
  );
};

const TabModeSelector = ({
  currentMode,
  onModeChange,
  modes,
  disabled,
  className
}) => {
  const containerClasses = [
    'border-b',
    'border-gray-200',
    className
  ].join(' ');

  return (
    <div className={containerClasses}>
      <nav className="flex space-x-8">
        {modes.map((mode) => {
          const isActive = currentMode === mode.id;
          const IconComponent = mode.icon;

          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              disabled={disabled}
              className={`
                relative flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                ${isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <IconComponent
                size={16}
                className={mode.isComplete ? `text-${mode.color}-500` : ''}
              />
              <span>{mode.label}</span>

              {mode.isComplete && (
                <div className="ml-1 w-2 h-2 bg-green-500 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// Compact mode selector for mobile
export const CompactModeSelector = ({
  currentMode,
  onModeChange,
  roomStatus = {},
  disabled = false,
  className = ''
}) => {
  const { hasBefore = false, hasAfter = false } = roomStatus;

  const getNextMode = () => {
    if (currentMode === 'before') return 'after';
    return 'before';
  };

  const getCurrentModeData = () => {
    if (currentMode === 'before') {
      return {
        label: 'Before',
        icon: Camera,
        color: 'blue',
        isComplete: hasBefore,
        next: 'After'
      };
    } else {
      return {
        label: 'After',
        icon: CheckCircle2,
        color: 'green',
        isComplete: hasAfter,
        next: 'Before'
      };
    }
  };

  const modeData = getCurrentModeData();
  const IconComponent = modeData.icon;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`
        flex items-center gap-2 px-3 py-2 rounded-lg
        ${currentMode === 'before' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}
      `}>
        <IconComponent size={16} />
        <span className="font-medium text-sm">{modeData.label}</span>
        {modeData.isComplete && (
          <CheckCircle2 size={14} className="text-green-500" />
        )}
      </div>

      <Button
        variant="ghost"
        size="small"
        onClick={() => onModeChange(getNextMode())}
        disabled={disabled}
        className="text-gray-600"
      >
        Switch to {modeData.next}
      </Button>
    </div>
  );
};

// Mode selector with preview
export const PreviewModeSelector = ({
  currentMode,
  onModeChange,
  roomStatus = {},
  referenceImage = null,
  disabled = false,
  className = ''
}) => {
  const { hasBefore = false, hasAfter = false } = roomStatus;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Mode selector */}
      <ModeSelector
        currentMode={currentMode}
        onModeChange={onModeChange}
        roomStatus={roomStatus}
        disabled={disabled}
        layout="toggle"
      />

      {/* Preview area */}
      {currentMode === 'after' && referenceImage && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye size={16} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Before Reference</span>
          </div>

          <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={referenceImage}
              alt="Before reference"
              className="w-full h-full object-cover opacity-75"
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            This reference will be overlaid on your camera view to help match the angle
          </p>
        </div>
      )}

      {/* Progress indicator */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Progress:</span>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${hasBefore ? 'bg-blue-500' : 'bg-gray-300'}`} />
          <span className={hasBefore ? 'text-blue-600' : 'text-gray-400'}>Before</span>
          <div className={`w-3 h-3 rounded-full ${hasAfter ? 'bg-green-500' : 'bg-gray-300'}`} />
          <span className={hasAfter ? 'text-green-600' : 'text-gray-400'}>After</span>
        </div>
      </div>
    </div>
  );
};

// CSS-in-JS styles for React Native compatibility
const styles = `
  /* Layout */
  .inline-flex { display: inline-flex; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .flex-1 { flex: 1; }

  /* Spacing */
  .gap-1 { gap: var(--spacing-1); }
  .gap-2 { gap: var(--spacing-2); }
  .gap-3 { gap: var(--spacing-3); }
  .space-x-8 > * + * { margin-left: var(--spacing-8); }
  .space-y-4 > * + * { margin-top: var(--spacing-4); }

  .p-1 { padding: var(--spacing-1); }
  .p-4 { padding: var(--spacing-4); }
  .px-1 { padding-left: var(--spacing-1); padding-right: var(--spacing-1); }
  .px-3 { padding-left: var(--spacing-3); padding-right: var(--spacing-3); }
  .px-4 { padding-left: var(--spacing-4); padding-right: var(--spacing-4); }
  .py-2 { padding-top: var(--spacing-2); padding-bottom: var(--spacing-2); }
  .py-3 { padding-top: var(--spacing-3); padding-bottom: var(--spacing-3); }

  .mb-2 { margin-bottom: var(--spacing-2); }
  .mt-2 { margin-top: var(--spacing-2); }
  .ml-1 { margin-left: var(--spacing-1); }

  /* Positioning */
  .relative { position: relative; }
  .absolute { position: absolute; }
  .-top-1 { top: -4px; }
  .-right-1 { right: -4px; }

  /* Sizing */
  .w-2 { width: 0.5rem; }
  .h-2 { height: 0.5rem; }
  .w-3 { width: 0.75rem; }
  .h-3 { height: 0.75rem; }
  .w-4 { width: 1rem; }
  .h-4 { height: 1rem; }
  .w-full { width: 100%; }
  .h-full { height: 100%; }

  /* Aspect ratio */
  .aspect-\\[4\\/3\\] { aspect-ratio: 4/3; }

  /* Background colors */
  .bg-gray-100 { background-color: var(--color-gray-100); }
  .bg-gray-50 { background-color: var(--color-gray-50); }
  .bg-gray-200 { background-color: var(--color-gray-200); }
  .bg-gray-300 { background-color: var(--color-gray-300); }
  .bg-white { background-color: var(--color-white); }
  .bg-blue-50 { background-color: #eff6ff; }
  .bg-green-50 { background-color: #f0fdf4; }
  .bg-blue-500 { background-color: var(--color-info); }
  .bg-green-500 { background-color: var(--color-success); }

  /* Text colors */
  .text-gray-900 { color: var(--color-gray-900); }
  .text-gray-700 { color: var(--color-gray-700); }
  .text-gray-600 { color: var(--color-gray-600); }
  .text-gray-500 { color: var(--color-gray-500); }
  .text-gray-400 { color: var(--color-gray-400); }
  .text-white { color: var(--color-white); }
  .text-primary { color: var(--color-primary); }
  .text-blue-700 { color: #1d4ed8; }
  .text-blue-600 { color: #2563eb; }
  .text-blue-500 { color: var(--color-info); }
  .text-green-700 { color: #15803d; }
  .text-green-600 { color: #16a34a; }
  .text-green-500 { color: var(--color-success); }

  /* Typography */
  .text-sm { font-size: var(--font-size-sm); }
  .text-xs { font-size: var(--font-size-xs); }
  .font-medium { font-weight: var(--font-weight-medium); }

  /* Borders */
  .border-b { border-bottom-width: var(--border-width-1); }
  .border-b-2 { border-bottom-width: var(--border-width-2); }
  .border-gray-200 { border-color: var(--color-gray-200); }
  .border-gray-300 { border-color: var(--color-gray-300); }
  .border-primary { border-color: var(--color-primary); }
  .border-transparent { border-color: transparent; }
  .border-blue-500 { border-color: var(--color-info); }
  .border-green-500 { border-color: var(--color-success); }

  /* Border radius */
  .rounded-lg { border-radius: var(--border-radius-lg); }
  .rounded-md { border-radius: var(--border-radius-md); }
  .rounded-full { border-radius: var(--border-radius-full); }

  /* Shadow */
  .shadow-sm { box-shadow: var(--shadow-sm); }

  /* Overflow */
  .overflow-hidden { overflow: hidden; }

  /* Object fit */
  .object-cover { object-fit: cover; }

  /* Cursor */
  .cursor-pointer { cursor: pointer; }
  .cursor-not-allowed { cursor: not-allowed; }

  /* Opacity */
  .opacity-50 { opacity: 0.5; }
  .opacity-75 { opacity: 0.75; }

  /* Transitions */
  .transition-all { transition-property: all; }
  .transition-colors { transition-property: color, background-color, border-color; }
  .duration-200 { transition-duration: 200ms; }

  /* Hover states */
  .hover\\:text-gray-900:hover { color: var(--color-gray-900); }
  .hover\\:text-gray-700:hover { color: var(--color-gray-700); }
  .hover\\:border-gray-300:hover { border-color: var(--color-gray-300); }

  /* Focus states for accessibility */
  button:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Disabled states */
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Mobile optimizations */
  @media (max-width: 640px) {
    .space-x-8 > * + * { margin-left: var(--spacing-4); }
  }
`;

// Inject styles (for React Native compatibility)
if (typeof document !== 'undefined' && !document.getElementById('mode-selector-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'mode-selector-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default ModeSelector;