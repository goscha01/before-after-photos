import React, { useState } from 'react';
import { Eye, X, Download, ArrowLeftRight, Calendar } from 'lucide-react';
import Button from '@components/UI/Button';
import { formatFileSize, estimateImageSize } from '@utils/photoHelpers';

const PhotoPair = ({
  roomId,
  roomData,
  roomLabel,
  onPhotoClick,
  onPhotoDelete,
  showControls = true,
  showComparison = false,
  className = ''
}) => {
  const [comparisonMode, setComparisonMode] = useState(false);
  const [dividerPosition, setDividerPosition] = useState(50);

  const { before, after, beforeTimestamp, afterTimestamp } = roomData;
  const hasBeforePhoto = !!before;
  const hasAfterPhoto = !!after;
  const isComplete = hasBeforePhoto && hasAfterPhoto;

  const containerClasses = [
    'bg-white',
    'rounded-lg',
    'shadow-md',
    'border',
    'border-gray-200',
    'overflow-hidden',
    className
  ].join(' ');

  const handlePhotoClick = (type) => {
    const photoData = {
      id: `${roomId}_${type}`,
      roomId,
      type,
      dataURL: type === 'before' ? before : after,
      timestamp: type === 'before' ? beforeTimestamp : afterTimestamp,
      room: roomId
    };
    onPhotoClick?.(photoData);
  };

  const handlePhotoDelete = (type) => {
    const photoData = {
      id: `${roomId}_${type}`,
      roomId,
      type,
      room: roomId
    };
    onPhotoDelete?.(photoData);
  };

  const toggleComparison = () => {
    setComparisonMode(!comparisonMode);
  };

  const handleDividerMove = (e) => {
    if (!comparisonMode) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setDividerPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            {roomLabel || roomId.replace('-', ' ')}
          </h3>
          <p className="text-sm text-gray-500">
            {isComplete ? 'Complete' : hasBeforePhoto || hasAfterPhoto ? 'In Progress' : 'Not Started'}
          </p>
        </div>

        {isComplete && showComparison && (
          <Button
            variant="ghost"
            size="small"
            icon={ArrowLeftRight}
            onClick={toggleComparison}
            className={comparisonMode ? 'bg-primary text-white' : ''}
            aria-label="Toggle comparison view"
          />
        )}
      </div>

      {/* Photo content */}
      <div className="relative">
        {comparisonMode && isComplete ? (
          <ComparisonView
            beforeImage={before}
            afterImage={after}
            dividerPosition={dividerPosition}
            onDividerMove={handleDividerMove}
          />
        ) : (
          <GridView
            roomId={roomId}
            before={before}
            after={after}
            beforeTimestamp={beforeTimestamp}
            afterTimestamp={afterTimestamp}
            onPhotoClick={handlePhotoClick}
            onPhotoDelete={handlePhotoDelete}
            showControls={showControls}
          />
        )}
      </div>

      {/* Footer with timestamps */}
      {(beforeTimestamp || afterTimestamp) && (
        <div className="p-3 bg-gray-50 text-xs text-gray-600">
          <div className="flex justify-between">
            {beforeTimestamp && (
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>Before: {new Date(beforeTimestamp).toLocaleString()}</span>
              </div>
            )}
            {afterTimestamp && (
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>After: {new Date(afterTimestamp).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const GridView = ({
  roomId,
  before,
  after,
  beforeTimestamp,
  afterTimestamp,
  onPhotoClick,
  onPhotoDelete,
  showControls
}) => {
  return (
    <div className="grid grid-cols-2 gap-0">
      {/* Before photo slot */}
      <PhotoSlot
        type="before"
        image={before}
        timestamp={beforeTimestamp}
        onPhotoClick={() => onPhotoClick('before')}
        onPhotoDelete={() => onPhotoDelete('before')}
        showControls={showControls}
      />

      {/* After photo slot */}
      <PhotoSlot
        type="after"
        image={after}
        timestamp={afterTimestamp}
        onPhotoClick={() => onPhotoClick('after')}
        onPhotoDelete={() => onPhotoDelete('after')}
        showControls={showControls}
      />
    </div>
  );
};

const PhotoSlot = ({
  type,
  image,
  timestamp,
  onPhotoClick,
  onPhotoDelete,
  showControls
}) => {
  const isEmpty = !image;
  const fileSize = image ? estimateImageSize(image) : 0;
  const formattedSize = formatFileSize(fileSize);

  const slotClasses = [
    'relative',
    'aspect-[4/3]',
    'bg-gray-100',
    'flex',
    'items-center',
    'justify-center',
    'group',
    'cursor-pointer',
    isEmpty ? 'border-2 border-dashed border-gray-300' : ''
  ].join(' ');

  return (
    <div className={slotClasses} onClick={isEmpty ? undefined : onPhotoClick}>
      {isEmpty ? (
        <div className="text-center p-4">
          <div className={`w-12 h-12 rounded-lg mb-2 mx-auto flex items-center justify-center ${
            type === 'before' ? 'bg-blue-100' : 'bg-green-100'
          }`}>
            <Eye size={20} className={type === 'before' ? 'text-blue-500' : 'text-green-500'} />
          </div>
          <p className="text-sm font-medium text-gray-600 capitalize">{type}</p>
          <p className="text-xs text-gray-400">No photo</p>
        </div>
      ) : (
        <>
          {/* Photo image */}
          <img
            src={image}
            alt={`${type} photo`}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Type badge */}
          <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white ${
            type === 'before' ? 'bg-blue-500' : 'bg-green-500'
          }`}>
            {type === 'before' ? 'Before' : 'After'}
          </div>

          {/* Photo info */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
            <p className="text-xs">
              {formattedSize}
              {timestamp && (
                <span className="ml-2">
                  {new Date(timestamp).toLocaleTimeString()}
                </span>
              )}
            </p>
          </div>

          {/* Controls overlay */}
          {showControls && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="small"
                  icon={Eye}
                  onClick={onPhotoClick}
                  className="bg-white bg-opacity-90 text-gray-900 hover:bg-white"
                  aria-label="View photo"
                />
                {onPhotoDelete && (
                  <Button
                    variant="ghost"
                    size="small"
                    icon={X}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPhotoDelete();
                    }}
                    className="bg-red-500 bg-opacity-90 text-white hover:bg-red-600"
                    aria-label="Delete photo"
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const ComparisonView = ({
  beforeImage,
  afterImage,
  dividerPosition,
  onDividerMove
}) => {
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden cursor-col-resize"
      onMouseMove={onDividerMove}
    >
      {/* After image (background) */}
      <img
        src={afterImage}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - dividerPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize"
        style={{ left: `${dividerPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <ArrowLeftRight size={16} className="text-gray-600" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded">
        Before
      </div>
      <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
        After
      </div>
    </div>
  );
};

// CSS styles (same pattern as other components - full styles would be included here)
const styles = `
  /* Grid and layout styles */
  .grid { display: grid; }
  .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .gap-0 { gap: 0; }

  /* Aspect ratio */
  .aspect-\\[4\\/3\\] { aspect-ratio: 4/3; }

  /* Cursor styles */
  .cursor-col-resize { cursor: col-resize; }

  /* Clip path for comparison view */
  .overflow-hidden { overflow: hidden; }

  /* Additional styles would continue here following the same pattern... */
`;

if (typeof document !== 'undefined' && !document.getElementById('photo-pair-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'photo-pair-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default PhotoPair;