// Room types for cleaning documentation
export const ROOMS = [
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: '🍳',
    description: 'Kitchen areas including counters, appliances, and cabinets'
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    icon: '🛁',
    description: 'Bathrooms, powder rooms, and washrooms'
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    icon: '🛏️',
    description: 'Bedrooms, master suites, and sleeping areas'
  },
  {
    id: 'living-room',
    label: 'Living Room',
    icon: '🛋️',
    description: 'Living rooms, family rooms, and common areas'
  },
  {
    id: 'dining-room',
    label: 'Dining Room',
    icon: '🍽️',
    description: 'Dining rooms and eating areas'
  },
  {
    id: 'office',
    label: 'Office/Study',
    icon: '📚',
    description: 'Home offices, studies, and workspaces'
  },
  {
    id: 'laundry',
    label: 'Laundry Room',
    icon: '🧺',
    description: 'Laundry rooms and utility areas'
  },
  {
    id: 'hallway',
    label: 'Hallway',
    icon: '🚪',
    description: 'Hallways, entryways, and corridors'
  },
  {
    id: 'staircase',
    label: 'Staircase',
    icon: '🪜',
    description: 'Staircases and stairwells'
  },
  {
    id: 'garage',
    label: 'Garage',
    icon: '🚗',
    description: 'Garages and storage areas'
  },
  {
    id: 'basement',
    label: 'Basement',
    icon: '🏠',
    description: 'Basements and lower levels'
  },
  {
    id: 'other',
    label: 'Other',
    icon: '📦',
    description: 'Other areas not listed above'
  }
];

// Photo capture modes
export const PHOTO_MODES = {
  BEFORE: 'before',
  AFTER: 'after'
};

// Camera constraints for mobile optimization
export const CAMERA_CONSTRAINTS = {
  video: {
    facingMode: 'environment', // Use back camera by default
    width: { ideal: 1280 },
    height: { ideal: 960 }
  },
  audio: false
};

// Image compression settings
export const IMAGE_SETTINGS = {
  QUALITY: 0.85,
  MAX_WIDTH: 1280,
  MAX_HEIGHT: 960,
  FORMAT: 'image/jpeg'
};

// Upload status constants
export const UPLOAD_STATUS = {
  IDLE: 'idle',
  PREPARING: 'preparing',
  UPLOADING: 'uploading',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Navigation routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PROPERTIES: '/properties',
  CAPTURE: '/capture/:propertyId',
  UPLOAD: '/upload'
};

// Local storage keys
export const STORAGE_KEYS = {
  APP_DATA: 'cleaning-app-storage',
  CAMERA_PERMISSIONS: 'camera-permissions-granted',
  FIRST_VISIT: 'first-visit-completed'
};

// Error messages
export const ERROR_MESSAGES = {
  CAMERA_NOT_SUPPORTED: 'Camera is not supported on this device',
  CAMERA_PERMISSION_DENIED: 'Camera permission was denied. Please enable camera access in your browser settings.',
  CAMERA_IN_USE: 'Camera is already in use by another application',
  PHOTO_CAPTURE_FAILED: 'Failed to capture photo. Please try again.',
  UPLOAD_FAILED: 'Failed to upload photos. Please check your connection and try again.',
  INVALID_PROPERTY: 'Invalid property selected',
  NO_PHOTOS_TO_UPLOAD: 'No photos available to upload'
};

// Success messages
export const SUCCESS_MESSAGES = {
  PHOTO_CAPTURED: 'Photo captured successfully',
  PHOTOS_UPLOADED: 'Photos uploaded successfully to Google Drive',
  PROPERTY_ADDED: 'Property added successfully',
  LOGIN_SUCCESS: 'Logged in successfully'
};

// App configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Cleaning Photo App',
  VERSION: import.meta.env.VITE_VERSION || '1.0.0',
  GOOGLE_SCRIPT_URL: import.meta.env.VITE_GOOGLE_SCRIPT_URL,
  MAX_PROPERTIES: 50,
  MAX_PHOTOS_PER_PROPERTY: 100,
  PHOTO_STORAGE_EXPIRY_DAYS: 7,
  OFFLINE_SYNC_RETRY_ATTEMPTS: 3
};

// UI constants
export const UI_CONSTANTS = {
  TOUCH_TARGET_SIZE: 44, // Minimum touch target size in pixels
  MOBILE_BREAKPOINT: 768,
  CAMERA_ASPECT_RATIO: 4/3,
  HEADER_HEIGHT: 56,
  BOTTOM_NAV_HEIGHT: 64,
  ANIMATION_DURATION: 250
};

// Validation rules
export const VALIDATION_RULES = {
  CLEANER_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z\s]+$/
  },
  PROPERTY_ADDRESS: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 200
  },
  PROPERTY_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100
  }
};

// Default property template
export const DEFAULT_PROPERTY = {
  id: null,
  name: '',
  address: '',
  type: 'residential', // 'residential' | 'commercial'
  notes: '',
  createdAt: null,
  lastUsed: null
};

// Google Drive folder structure template
export const DRIVE_FOLDER_STRUCTURE = {
  ROOT_FOLDER: 'Cleaning Photos',
  DATE_FORMAT: 'YYYY-MM-DD_HH-mm',
  FILENAME_FORMAT: '{room}_{type}.jpg' // e.g., kitchen_before.jpg
};

// PWA constants
export const PWA_CONFIG = {
  THEME_COLOR: '#667eea',
  BACKGROUND_COLOR: '#ffffff',
  DISPLAY: 'standalone',
  ORIENTATION: 'portrait-primary'
};

// Performance constants
export const PERFORMANCE = {
  IMAGE_CACHE_SIZE: 50, // Number of images to keep in memory
  LAZY_LOAD_THRESHOLD: 100, // Pixels before element enters viewport
  DEBOUNCE_DELAY: 300, // Milliseconds for input debouncing
  TOAST_DURATION: 3000 // Toast notification duration
};

// Feature flags for gradual rollout
export const FEATURE_FLAGS = {
  OFFLINE_MODE: true,
  ADVANCED_CAMERA_CONTROLS: true,
  BULK_UPLOAD: true,
  PROPERTY_TEMPLATES: false,
  VOICE_NOTES: false
};