import React from 'react';
import { Check, Circle } from 'lucide-react';
import { ROOMS } from '@utils/constants';
import Button from '@components/UI/Button';

const RoomSelector = ({
  selectedRoom,
  onRoomSelect,
  roomStatuses = {},
  showProgress = true,
  layout = 'grid',
  className = ''
}) => {
  const containerClasses = [
    layout === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-2',
    className
  ].join(' ');

  return (
    <div className={containerClasses}>
      {ROOMS.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          isSelected={selectedRoom === room.id}
          status={roomStatuses[room.id]}
          onSelect={() => onRoomSelect(room.id)}
          showProgress={showProgress}
          layout={layout}
        />
      ))}
    </div>
  );
};

const RoomCard = ({
  room,
  isSelected,
  status = {},
  onSelect,
  showProgress,
  layout
}) => {
  const { hasBefore = false, hasAfter = false, isComplete = false } = status;

  // Calculate progress
  const progress = isComplete ? 100 : (hasBefore || hasAfter) ? 50 : 0;

  // Determine card styling based on state
  const getCardClasses = () => {
    const baseClasses = [
      'relative',
      'p-4',
      'rounded-lg',
      'border-2',
      'transition-all',
      'duration-200',
      'cursor-pointer',
      'touch-feedback'
    ];

    if (isSelected) {
      baseClasses.push('border-primary', 'bg-primary', 'bg-opacity-10');
    } else if (isComplete) {
      baseClasses.push('border-green-200', 'bg-green-50', 'hover:border-green-300');
    } else if (hasBefore || hasAfter) {
      baseClasses.push('border-yellow-200', 'bg-yellow-50', 'hover:border-yellow-300');
    } else {
      baseClasses.push('border-gray-200', 'bg-white', 'hover:border-gray-300');
    }

    if (layout === 'list') {
      baseClasses.push('flex', 'items-center', 'gap-4');
    } else {
      baseClasses.push('text-center');
    }

    return baseClasses.join(' ');
  };

  const getStatusIcon = () => {
    if (isComplete) {
      return <Check size={16} className="text-green-600" />;
    } else if (hasBefore || hasAfter) {
      return <Circle size={16} className="text-yellow-600" />;
    } else {
      return <Circle size={16} className="text-gray-400" />;
    }
  };

  const getStatusText = () => {
    if (isComplete) return 'Complete';
    if (hasBefore && !hasAfter) return 'Before only';
    if (!hasBefore && hasAfter) return 'After only';
    return 'Not started';
  };

  return (
    <div className={getCardClasses()} onClick={onSelect}>
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Check size={14} className="text-white" />
          </div>
        </div>
      )}

      {/* Room content */}
      <div className={layout === 'list' ? 'flex-1' : ''}>
        {/* Room icon and name */}
        <div className={layout === 'list' ? 'flex items-center gap-3' : 'mb-3'}>
          <div className={`
            flex items-center justify-center rounded-lg
            ${layout === 'list' ? 'w-12 h-12' : 'w-16 h-16 mx-auto mb-2'}
            ${isSelected ? 'bg-primary bg-opacity-20' : 'bg-gray-100'}
          `}>
            <span className={`
              ${layout === 'list' ? 'text-2xl' : 'text-3xl'}
            `}>
              {room.icon}
            </span>
          </div>

          <div className={layout === 'list' ? 'flex-1' : ''}>
            <h3 className={`
              font-medium text-gray-900
              ${layout === 'list' ? 'text-base' : 'text-sm'}
            `}>
              {room.label}
            </h3>

            {showProgress && (
              <div className={`
                flex items-center gap-2 mt-1
                ${layout === 'list' ? 'text-sm' : 'text-xs'}
                text-gray-600
              `}>
                {getStatusIcon()}
                <span>{getStatusText()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        {showProgress && layout === 'grid' && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isComplete ? 'bg-green-500' : progress > 0 ? 'bg-yellow-500' : 'bg-gray-300'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* List layout progress */}
      {showProgress && layout === 'list' && (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isComplete ? 'bg-green-500' : progress > 0 ? 'bg-yellow-500' : 'bg-gray-300'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 w-8">
            {progress}%
          </span>
        </div>
      )}
    </div>
  );
};

// Quick room selector for mobile
export const QuickRoomSelector = ({
  selectedRoom,
  onRoomSelect,
  roomStatuses = {},
  className = ''
}) => {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-2 ${className}`}>
      {ROOMS.slice(0, 6).map((room) => {
        const status = roomStatuses[room.id] || {};
        const isSelected = selectedRoom === room.id;
        const isComplete = status.isComplete;

        return (
          <Button
            key={room.id}
            variant={isSelected ? 'primary' : 'ghost'}
            size="small"
            onClick={() => onRoomSelect(room.id)}
            className={`
              flex-shrink-0 relative min-w-[80px] h-16 flex-col gap-1
              ${isComplete ? 'border-green-500' : ''}
            `}
          >
            <span className="text-lg">{room.icon}</span>
            <span className="text-xs">{room.label.split(' ')[0]}</span>

            {isComplete && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <Check size={10} className="text-white" />
              </div>
            )}
          </Button>
        );
      })}
    </div>
  );
};

// Room selector with search
export const SearchableRoomSelector = ({
  selectedRoom,
  onRoomSelect,
  roomStatuses = {},
  onSearch,
  searchValue = '',
  className = ''
}) => {
  const filteredRooms = ROOMS.filter(room =>
    room.label.toLowerCase().includes(searchValue.toLowerCase()) ||
    room.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className={className}>
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search rooms..."
          value={searchValue}
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Filtered results */}
      <RoomSelector
        selectedRoom={selectedRoom}
        onRoomSelect={onRoomSelect}
        roomStatuses={roomStatuses}
        layout="list"
      />

      {filteredRooms.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No rooms found matching "{searchValue}"</p>
        </div>
      )}
    </div>
  );
};

// CSS-in-JS styles for React Native compatibility
const styles = `
  /* Grid layout */
  .grid { display: grid; }
  .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .gap-3 { gap: var(--spacing-3); }
  .gap-2 { gap: var(--spacing-2); }
  .gap-4 { gap: var(--spacing-4); }

  /* Flexbox */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .flex-1 { flex: 1; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .flex-shrink-0 { flex-shrink: 0; }

  /* Spacing */
  .space-y-2 > * + * { margin-top: var(--spacing-2); }
  .p-4 { padding: var(--spacing-4); }
  .px-4 { padding-left: var(--spacing-4); padding-right: var(--spacing-4); }
  .py-3 { padding-top: var(--spacing-3); padding-bottom: var(--spacing-3); }
  .mb-3 { margin-bottom: var(--spacing-3); }
  .mb-2 { margin-bottom: var(--spacing-2); }
  .mb-4 { margin-bottom: var(--spacing-4); }
  .mt-1 { margin-top: var(--spacing-1); }
  .mt-3 { margin-top: var(--spacing-3); }
  .mx-auto { margin-left: auto; margin-right: auto; }

  /* Positioning */
  .relative { position: relative; }
  .absolute { position: absolute; }
  .top-2 { top: var(--spacing-2); }
  .right-2 { right: var(--spacing-2); }
  .-top-1 { top: -4px; }
  .-right-1 { right: -4px; }

  /* Sizing */
  .w-6 { width: 1.5rem; }
  .h-6 { height: 1.5rem; }
  .w-12 { width: 3rem; }
  .h-12 { height: 3rem; }
  .w-16 { width: 4rem; }
  .h-16 { height: 4rem; }
  .w-4 { width: 1rem; }
  .h-4 { height: 1rem; }
  .w-8 { width: 2rem; }
  .h-2 { height: 0.5rem; }
  .w-full { width: 100%; }
  .min-w-\\[80px\\] { min-width: 80px; }

  /* Background colors */
  .bg-primary { background-color: var(--color-primary); }
  .bg-white { background-color: var(--color-white); }
  .bg-gray-100 { background-color: var(--color-gray-100); }
  .bg-gray-200 { background-color: var(--color-gray-200); }
  .bg-gray-300 { background-color: var(--color-gray-300); }
  .bg-green-50 { background-color: #f0fdf4; }
  .bg-green-500 { background-color: var(--color-success); }
  .bg-yellow-50 { background-color: #fefce8; }
  .bg-yellow-500 { background-color: var(--color-warning); }

  /* Background opacity */
  .bg-opacity-10 { background-color: rgba(var(--color-primary-rgb), 0.1); }
  .bg-opacity-20 { background-color: rgba(var(--color-primary-rgb), 0.2); }

  /* Text colors */
  .text-white { color: var(--color-white); }
  .text-gray-900 { color: var(--color-gray-900); }
  .text-gray-600 { color: var(--color-gray-600); }
  .text-gray-500 { color: var(--color-gray-500); }
  .text-gray-400 { color: var(--color-gray-400); }
  .text-green-600 { color: #16a34a; }
  .text-yellow-600 { color: #ca8a04; }

  /* Typography */
  .text-base { font-size: var(--font-size-base); }
  .text-sm { font-size: var(--font-size-sm); }
  .text-xs { font-size: var(--font-size-xs); }
  .text-lg { font-size: var(--font-size-lg); }
  .text-2xl { font-size: var(--font-size-2xl); }
  .text-3xl { font-size: var(--font-size-3xl); }
  .font-medium { font-weight: var(--font-weight-medium); }
  .text-center { text-align: center; }

  /* Borders */
  .border-2 { border-width: var(--border-width-2); }
  .border { border-width: var(--border-width-1); }
  .border-primary { border-color: var(--color-primary); }
  .border-gray-200 { border-color: var(--color-gray-200); }
  .border-gray-300 { border-color: var(--color-gray-300); }
  .border-green-200 { border-color: #bbf7d0; }
  .border-green-300 { border-color: #86efac; }
  .border-green-500 { border-color: var(--color-success); }
  .border-yellow-200 { border-color: #fde68a; }
  .border-yellow-300 { border-color: #fcd34d; }

  /* Border radius */
  .rounded-lg { border-radius: var(--border-radius-lg); }
  .rounded-full { border-radius: var(--border-radius-full); }

  /* Cursor */
  .cursor-pointer { cursor: pointer; }

  /* Overflow */
  .overflow-x-auto { overflow-x: auto; }

  /* Scrollbar styling for overflow */
  .overflow-x-auto::-webkit-scrollbar { height: 4px; }
  .overflow-x-auto::-webkit-scrollbar-track { background: transparent; }
  .overflow-x-auto::-webkit-scrollbar-thumb { background: var(--color-gray-300); border-radius: 2px; }

  /* Transitions */
  .transition-all { transition-property: all; }
  .duration-200 { transition-duration: 200ms; }
  .duration-300 { transition-duration: 300ms; }

  /* Hover states */
  .hover\\:border-gray-300:hover { border-color: var(--color-gray-300); }
  .hover\\:border-green-300:hover { border-color: #86efac; }
  .hover\\:border-yellow-300:hover { border-color: #fcd34d; }

  /* Focus states */
  .focus\\:ring-2:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
  .focus\\:ring-primary:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
  .focus\\:border-transparent:focus {
    border-color: transparent;
  }

  /* Padding for mobile scroll */
  .pb-2 { padding-bottom: var(--spacing-2); }
  .py-8 { padding-top: var(--spacing-8); padding-bottom: var(--spacing-8); }

  /* Touch feedback */
  .touch-feedback:active {
    transform: scale(0.98);
  }

  /* Mobile responsive adjustments */
  @media (max-width: 640px) {
    .grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 768px) {
    .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
`;

// Inject styles (for React Native compatibility)
if (typeof document !== 'undefined' && !document.getElementById('room-selector-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'room-selector-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default RoomSelector;