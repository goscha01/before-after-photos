# Claude Code Prompt: Cleaning Photo App

Create a complete standalone React web application for cleaning professionals to document their work with before/after photos. The app should be mobile-first and designed for easy conversion to React Native later.

## PROJECT REQUIREMENTS

### Core Features:
- Mobile-first responsive design for cleaners
- Camera integration for taking before/after photos  
- Google Drive upload with automatic folder organization
- Property management and room-based photo organization
- PWA capabilities (installable, offline support)
- Clean architecture for React Native conversion

### Technology Stack:
- React 18 + Vite
- Zustand for state management (RN compatible)
- React Router v6 (converts to React Navigation)  
- CSS Variables (converts to StyleSheet)
- Lucide React for icons
- React Toastify for notifications
- Vite PWA plugin

## PROJECT STRUCTURE

Create this exact folder structure:

```
cleaning-photo-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── icons/ (placeholder)
├── src/
│   ├── components/
│   │   ├── Camera/
│   │   │   ├── CameraView.jsx
│   │   │   └── CameraControls.jsx
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   └── Container.jsx
│   │   ├── UI/
│   │   │   ├── Button.jsx
│   │   │   └── StatusMessage.jsx
│   │   ├── PhotoGallery/
│   │   │   ├── PhotoGrid.jsx
│   │   │   └── PhotoPair.jsx
│   │   ├── RoomSelector/
│   │   │   └── RoomSelector.jsx
│   │   └── ModeSelector/
│   │       └── ModeSelector.jsx
│   ├── screens/
│   │   ├── LoginScreen.jsx
│   │   ├── PropertySelectionScreen.jsx
│   │   ├── PhotoCaptureScreen.jsx
│   │   └── UploadStatusScreen.jsx
│   ├── hooks/
│   │   ├── usePhotoCapture.js
│   │   ├── useCamera.js
│   │   └── useGoogleDriveUpload.js
│   ├── services/
│   │   ├── googleDrive.js
│   │   └── api.js
│   ├── store/
│   │   └── useAppStore.js
│   ├── styles/
│   │   ├── global.css
│   │   └── components/
│   ├── utils/
│   │   ├── photoHelpers.js
│   │   └── constants.js
│   └── App.jsx
├── package.json
├── vite.config.js
├── .env.example
└── README.md
```

## KEY IMPLEMENTATION DETAILS

### 1. State Management (Zustand):
```javascript
// Store structure for src/store/useAppStore.js
const useAppStore = create(persist(
  (set, get) => ({
    // Authentication
    cleaner: null,
    isAuthenticated: false,
    
    // Current session
    currentProperty: null,
    uploadData: null,
    
    // Actions
    setCleaner: (cleaner) => set({ cleaner, isAuthenticated: !!cleaner }),
    logout: () => set({ cleaner: null, isAuthenticated: false }),
    setCurrentProperty: (property) => set({ currentProperty: property })
  })
));
```

### 2. Navigation Structure:
```javascript
// Routes for App.jsx
<Routes>
  <Route path="/" element={<Navigate to="/login" replace />} />
  <Route path="/login" element={<LoginScreen />} />
  <Route path="/properties" element={<PropertySelectionScreen />} />
  <Route path="/capture/:propertyId" element={<PhotoCaptureScreen />} />
  <Route path="/upload" element={<UploadStatusScreen />} />
</Routes>
```

### 3. Photo Capture Hook:
```javascript
// Core logic for src/hooks/usePhotoCapture.js
export const usePhotoCapture = () => {
  const [photoStorage, setPhotoStorage] = useState({});
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentMode, setCurrentMode] = useState('before');
  
  const capturePhoto = (room, mode) => {
    // Camera capture logic
    // Store in format: { [room]: { before: dataURL, after: dataURL } }
  };
  
  return { photoStorage, capturePhoto, selectedRoom, currentMode, ... };
};
```

### 4. CSS Variables (RN conversion ready):
```css
/* src/styles/global.css */
:root {
  --color-primary: #667eea;
  --spacing-md: 16px;
  --font-size-base: 16px;
  --border-radius-md: 8px;
  --touch-target-size: 44px;
}
```

### 5. Rooms Configuration:
```javascript
// src/utils/constants.js
export const ROOMS = [
  { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { id: 'bathroom', label: 'Bathroom', icon: '🛁' },
  { id: 'bedroom', label: 'Bedroom', icon: '🛏️' },
  { id: 'living-room', label: 'Living Room', icon: '🛋️' },
  { id: 'dining-room', label: 'Dining Room', icon: '🍽️' },
  { id: 'other', label: 'Other', icon: '🏠' }
];
```

## SCREEN SPECIFICATIONS

### LoginScreen.jsx:
- Simple name input for cleaner identification
- Store cleaner data in Zustand + localStorage
- Navigate to properties screen after login
- Display app features and version info

### PropertySelectionScreen.jsx:
- Add new property with address input
- Show recent properties list
- Store properties in localStorage
- Navigation to photo capture with property selection

### PhotoCaptureScreen.jsx:
- Room selector with completion status indicators
- Before/After mode toggle
- Camera view with reference overlay for "after" shots
- Photo gallery showing captured pairs
- Upload button with photo count
- Real-time camera feed using MediaDevices API

### UploadStatusScreen.jsx:
- Display upload progress
- Show Google Drive folder organization
- Success/error handling with retry options
- Navigation back to main workflow

## COMPONENT SPECIFICATIONS

### CameraView.jsx:
```javascript
// Key features:
- video element with mobile-optimized controls
- Reference image overlay for matching "after" shots
- Capture button with touch-friendly size (44px minimum)
- Camera permission handling and error states
- Auto-focus and flash controls if available
```

### Button.jsx:
```javascript
// Reusable button component:
- Variants: primary, secondary, outline, ghost
- Icons support with Lucide React
- Loading states
- Disabled states
- Touch-friendly sizing (44px minimum height)
- Accessible focus states
```

### Header.jsx:
```javascript
// Navigation header:
- Title and subtitle display
- Back button with navigation
- Right action button (logout, etc.)
- Mobile-optimized spacing
```

## TECHNICAL REQUIREMENTS

### Package.json dependencies:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "zustand": "^4.4.1",
    "lucide-react": "^0.263.1",
    "react-toastify": "^9.1.3"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.3",
    "vite": "^4.4.5",
    "vite-plugin-pwa": "^0.16.4"
  }
}
```

### Vite Configuration:
- PWA plugin setup with manifest
- HTTPS dev server for camera access
- Build optimization for mobile
- Alias setup for clean imports (@components, @screens, etc.)

### Environment Variables:
```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_APP_NAME=Cleaning Photo App
VITE_VERSION=1.0.0
```

## MOBILE OPTIMIZATION

### Touch Interactions:
- Minimum 44px touch targets
- Touch feedback with CSS transitions
- Gesture support for photo gallery
- Prevent zoom on inputs

### Camera Integration:
- Use MediaDevices.getUserMedia with environment facing mode
- Handle camera permissions gracefully
- Compress images before storage (85% JPEG quality)
- Show reference image overlay for "after" shots

### PWA Features:
- Service worker for offline caching
- Install prompt for home screen
- App icons and splash screen
- Offline photo storage with sync when online

### Performance:
- Code splitting by screen
- Lazy loading of components  
- Image compression before upload
- Local storage for persistence

## GOOGLE DRIVE INTEGRATION

### Upload Logic:
```javascript
// src/services/googleDrive.js
const uploadPhotos = async (uploadData) => {
  // Format: { property, cleaner, photos: [{ room, type, data }] }
  // POST to Google Apps Script URL
  // Handle success/error states
  // Return folder information
};
```

### Folder Structure:
```
Google Drive/Cleaning Photos/
├── Property_Address_1/
│   └── 2025-01-15_14-30_Cleaner_Name/
│       ├── kitchen_before.jpg
│       ├── kitchen_after.jpg
│       └── bathroom_before.jpg
└── Property_Address_2/
```

## FUTURE REACT NATIVE CONVERSION

### Design Patterns:
- Screen-based navigation (maps to RN Stack Navigator)
- Component props similar to RN components
- CSS Variables → StyleSheet conversion ready
- Zustand state works identically in RN
- Hook structure remains the same

### API Changes Needed:
- MediaDevices → Expo Camera
- fetch → Expo FileSystem  
- localStorage → Expo SecureStore
- CSS → StyleSheet

## TESTING & DEPLOYMENT

### Development:
- Vite dev server with HTTPS
- Hot reload for fast development
- Console logging for debugging

### Build & Deploy:
- Optimized production build
- Vercel/Netlify deployment ready
- PWA build with service worker

## SUCCESS CRITERIA

The generated app should:
1. ✅ Work on mobile browsers with camera access
2. ✅ Allow cleaners to take before/after photos by room
3. ✅ Upload photos to Google Drive in organized folders
4. ✅ Work offline with sync when online
5. ✅ Install as PWA on phone home screens
6. ✅ Have clean, mobile-optimized interface
7. ✅ Be ready for React Native conversion

Generate all files following this specification exactly. Focus on mobile-first responsive design, clean component architecture, and React Native conversion compatibility.