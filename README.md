# Cleaning Photo App

A mobile-first React application for cleaning professionals to document their work with before/after photos. Features camera integration, Google Drive upload, and PWA capabilities.

## 🚀 Features

- **Mobile-Optimized Design**: Touch-friendly interface designed for smartphones
- **Camera Integration**: Take before/after photos with reference overlays
- **Room-Based Organization**: Organize photos by room type (kitchen, bathroom, etc.)
- **Google Drive Integration**: Automatic upload with organized folder structure
- **PWA Support**: Install on home screen, offline functionality
- **React Native Ready**: Clean architecture for easy conversion to mobile app

## 📋 Prerequisites

- Node.js 18+ and npm
- Modern web browser with camera support
- Google Drive account (for photo storage)
- HTTPS development environment (required for camera access)

## 🛠️ Installation

1. **Clone or extract the project**
   ```bash
   cd cleaning-photo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   VITE_APP_NAME=Cleaning Photo App
   VITE_VERSION=1.0.0
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The app will be available at `https://localhost:3000` (HTTPS required for camera access).

## 📱 Google Drive Setup

To enable photo uploads, you need to set up Google Apps Script:

### 1. Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Replace the default code with the provided script:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.action === 'test') {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, message: 'Connection successful' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (data.action === 'uploadPhotos') {
      return handlePhotoUpload(data);
    }

    throw new Error('Unknown action');
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handlePhotoUpload(data) {
  // Create root folder if it doesn't exist
  const rootFolderName = 'Cleaning Photos';
  let rootFolder = getFolderByName(rootFolderName);
  if (!rootFolder) {
    rootFolder = DriveApp.createFolder(rootFolderName);
  }

  // Create property folder
  const propertyFolderName = data.property.address.replace(/[^a-zA-Z0-9\\s]/g, '').replace(/\\s+/g, '_');
  let propertyFolder = getFolderByName(propertyFolderName, rootFolder);
  if (!propertyFolder) {
    propertyFolder = rootFolder.createFolder(propertyFolderName);
  }

  // Create session folder
  const sessionFolder = propertyFolder.createFolder(data.folderName);

  // Upload photos
  let uploadedCount = 0;

  data.photos.forEach(photo => {
    try {
      const blob = Utilities.newBlob(
        Utilities.base64Decode(photo.data),
        photo.mimeType,
        photo.filename
      );

      sessionFolder.createFile(blob);
      uploadedCount++;
    } catch (error) {
      console.error('Failed to upload photo:', photo.filename, error);
    }
  });

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      folderUrl: sessionFolder.getUrl(),
      uploadedCount: uploadedCount
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getFolderByName(name, parent = null) {
  const folders = parent ? parent.getFoldersByName(name) : DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : null;
}
```

### 2. Deploy the Script

1. Click "Deploy" > "New deployment"
2. Choose "Web app" as the type
3. Set execute as: "Me"
4. Set access to: "Anyone"
5. Click "Deploy"
6. Copy the deployment URL and add it to your `.env` file

## 🏗️ Project Structure

```
cleaning-photo-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── icons/
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
│   │   └── global.css
│   ├── utils/
│   │   ├── photoHelpers.js
│   │   └── constants.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## 📱 Usage Guide

### 1. Login
- Enter cleaner name on the login screen
- Name is stored locally for session management

### 2. Property Management
- Add new properties with name and address
- Search existing properties
- Properties are stored locally with usage history

### 3. Photo Capture
- Select a room from the grid
- Toggle between "Before" and "After" mode
- Take photos using the camera interface
- Reference overlay helps match angles for "After" shots

### 4. Photo Upload
- Upload photos to Google Drive when ready
- Photos are organized in folders by property and date
- Automatic retry for failed uploads

## 🔧 Development

### Available Scripts

```bash
# Development server with HTTPS
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Key Technologies

- **React 18**: Modern React with hooks and concurrent features
- **Vite**: Fast build tool with HMR
- **Zustand**: Lightweight state management
- **React Router**: Client-side routing
- **Lucide React**: Icon library
- **React Toastify**: Notifications

### Camera Integration

The app uses the MediaDevices API for camera access:

- Requires HTTPS in production
- Supports front/back camera switching
- Includes photo compression and optimization
- Reference image overlay for consistent angles

### State Management

Zustand store handles:
- Authentication state
- Photo storage (localStorage persistence)
- Upload queue management
- Property management

## 🌐 PWA Features

The app includes Progressive Web App capabilities:

- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Basic functionality works offline
- **Service Worker**: Caches static assets
- **App Manifest**: Native app-like experience

## 🔄 React Native Conversion

The architecture is designed for easy React Native conversion:

### Ready for Conversion:
- ✅ Screen-based navigation structure
- ✅ Zustand state management (RN compatible)
- ✅ Component props similar to RN patterns
- ✅ CSS Variables → StyleSheet ready
- ✅ Hook-based architecture

### Conversion Requirements:
- Camera: MediaDevices → Expo Camera
- Storage: localStorage → Expo SecureStore
- Navigation: React Router → React Navigation
- Styling: CSS → StyleSheet
- File uploads: fetch → Expo FileSystem

## 🐛 Troubleshooting

### Camera Issues
- **"Camera not supported"**: Use HTTPS and modern browser
- **"Permission denied"**: Enable camera permissions in browser
- **"Camera in use"**: Close other apps using camera

### Upload Issues
- **"Upload failed"**: Check Google Apps Script URL in .env
- **"Network error"**: Photos queue for retry when online
- **"Script error"**: Verify Google Apps Script deployment

### Performance
- **Slow loading**: Check image compression settings
- **Memory issues**: Limit concurrent photo storage
- **Touch lag**: Reduce animation complexity

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on mobile devices
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check the troubleshooting section above
- Review browser console for errors
- Ensure HTTPS and camera permissions
- Test Google Apps Script deployment

---

**Built with ❤️ for cleaning professionals**