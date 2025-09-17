import React from 'react';
import { X, Eye, Download } from 'lucide-react';
import Button from '@components/UI/Button';
import { formatFileSize, estimateImageSize } from '@utils/photoHelpers';

const PhotoGrid = ({
  photos = {},
  onPhotoClick,
  onPhotoDelete,
  showControls = true,
  maxPhotos = 20,
  className = ''
}) => {
  // Convert photos object to array for easier handling
  const photoArray = Object.entries(photos).flatMap(([roomId, roomData]) => {
    const roomPhotos = [];

    if (roomData.before) {
      roomPhotos.push({
        id: `${roomId}_before`,
        roomId,
        type: 'before',
        dataURL: roomData.before,
        timestamp: roomData.beforeTimestamp,
        room: roomId
      });
    }

    if (roomData.after) {
      roomPhotos.push({
        id: `${roomId}_after`,
        roomId,
        type: 'after',
        dataURL: roomData.after,
        timestamp: roomData.afterTimestamp,
        room: roomId
      });
    }

    return roomPhotos;
  });

  // Sort photos by timestamp (newest first)
  const sortedPhotos = photoArray
    .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0))
    .slice(0, maxPhotos);

  const containerClasses = [
    'grid',
    'grid-cols-2',
    'gap-3',
    'p-4',
    className
  ].join(' ');

  if (sortedPhotos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
          <Eye size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No photos yet</h3>
        <p className="text-sm text-gray-500">
          Start taking before and after photos to see them here
        </p>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {sortedPhotos.map((photo) => (
        <PhotoGridItem
          key={photo.id}
          photo={photo}
          onPhotoClick={onPhotoClick}
          onPhotoDelete={onPhotoDelete}
          showControls={showControls}
        />
      ))}
    </div>
  );
};

const PhotoGridItem = ({
  photo,
  onPhotoClick,
  onPhotoDelete,
  showControls
}) => {
  const handleClick = () => {
    onPhotoClick?.(photo);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onPhotoDelete?.(photo);
  };

  const fileSize = estimateImageSize(photo.dataURL);
  const formattedSize = formatFileSize(fileSize);

  return (
    <div
      className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      {/* Photo image */}
      <img
        src={photo.dataURL}
        alt={`${photo.room} ${photo.type}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Photo type badge */}
      <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white ${
        photo.type === 'before' ? 'bg-blue-500' : 'bg-green-500'
      }`}>
        {photo.type === 'before' ? 'Before' : 'After'}
      </div>

      {/* Room label */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
        <p className="text-sm font-medium capitalize">
          {photo.room.replace('-', ' ')}
        </p>
        <p className="text-xs opacity-80">
          {formattedSize} • {new Date(photo.timestamp).toLocaleTimeString()}
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
              onClick={handleClick}
              className="bg-white bg-opacity-90 text-gray-900 hover:bg-white"
              aria-label="View photo"
            />
            {onPhotoDelete && (
              <Button
                variant="ghost"
                size="small"
                icon={X}
                onClick={handleDelete}
                className="bg-red-500 bg-opacity-90 text-white hover:bg-red-600"
                aria-label="Delete photo"
              />
            )}
          </div>
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

  /* Layout */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }

  /* Positioning */
  .relative { position: relative; }
  .absolute { position: absolute; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }

  /* Aspect ratio */
  .aspect-square { aspect-ratio: 1/1; }

  /* Spacing */
  .p-4 { padding: var(--spacing-4); }
  .p-2 { padding: var(--spacing-2); }
  .py-12 { padding-top: var(--spacing-12); padding-bottom: var(--spacing-12); }
  .px-2 { padding-left: var(--spacing-2); padding-right: var(--spacing-2); }
  .py-1 { padding-top: var(--spacing-1); padding-bottom: var(--spacing-1); }
  .mb-4 { margin-bottom: var(--spacing-4); }
  .mb-2 { margin-bottom: var(--spacing-2); }

  /* Positioning values */
  .top-2 { top: var(--spacing-2); }
  .left-2 { left: var(--spacing-2); }
  .right-0 { right: 0; }
  .bottom-0 { bottom: 0; }
  .left-0 { left: 0; }

  /* Sizing */
  .w-full { width: 100%; }
  .h-full { height: 100%; }
  .w-16 { width: 4rem; }
  .h-16 { height: 4rem; }

  /* Background colors */
  .bg-gray-100 { background-color: var(--color-gray-100); }
  .bg-gray-200 { background-color: var(--color-gray-200); }
  .bg-black { background-color: #000000; }
  .bg-blue-500 { background-color: var(--color-info); }
  .bg-green-500 { background-color: var(--color-success); }
  .bg-red-500 { background-color: var(--color-error); }
  .bg-white { background-color: var(--color-white); }

  /* Background opacity */
  .bg-opacity-0 { background-color: rgba(0, 0, 0, 0); }
  .bg-opacity-30 { background-color: rgba(0, 0, 0, 0.3); }
  .bg-opacity-60 { background-color: rgba(0, 0, 0, 0.6); }
  .bg-opacity-90 { background-color: rgba(255, 255, 255, 0.9); }

  /* Text colors */
  .text-white { color: var(--color-white); }
  .text-gray-900 { color: var(--color-gray-900); }
  .text-gray-500 { color: var(--color-gray-500); }
  .text-gray-400 { color: var(--color-gray-400); }

  /* Typography */
  .text-lg { font-size: var(--font-size-lg); }
  .text-sm { font-size: var(--font-size-sm); }
  .text-xs { font-size: var(--font-size-xs); }
  .font-medium { font-weight: var(--font-weight-medium); }
  .text-center { text-align: center; }
  .capitalize { text-transform: capitalize; }

  /* Border radius */
  .rounded-lg { border-radius: var(--border-radius-lg); }
  .rounded { border-radius: var(--border-radius-md); }

  /* Overflow */
  .overflow-hidden { overflow: hidden; }

  /* Object fit */
  .object-cover { object-fit: cover; }

  /* Cursor */
  .cursor-pointer { cursor: pointer; }

  /* Opacity */
  .opacity-0 { opacity: 0; }
  .opacity-80 { opacity: 0.8; }

  /* Shadow */
  .shadow-md { box-shadow: var(--shadow-md); }

  /* Hover shadow */
  .hover\\:shadow-md:hover { box-shadow: var(--shadow-md); }

  /* Transitions */
  .transition-shadow { transition-property: box-shadow; }
  .transition-all { transition-property: all; }
  .duration-200 { transition-duration: 200ms; }

  /* Group hover states */
  .group:hover .group-hover\\:bg-opacity-30 { background-color: rgba(0, 0, 0, 0.3); }
  .group:hover .group-hover\\:opacity-100 { opacity: 1; }

  /* Hover states */
  .hover\\:bg-white:hover { background-color: var(--color-white); }
  .hover\\:bg-red-600:hover { background-color: #dc2626; }

  /* Responsive grid */
  @media (min-width: 768px) {
    .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  @media (min-width: 1024px) {
    .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }

  /* Loading states */
  img[loading="lazy"] {
    background-color: var(--color-gray-200);
  }

  /* Photo grid responsive improvements */
  @media (max-width: 640px) {
    .grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--spacing-2);
    }
  }
`;

// Inject styles (for React Native compatibility)
if (typeof document !== 'undefined' && !document.getElementById('photo-grid-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'photo-grid-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default PhotoGrid;