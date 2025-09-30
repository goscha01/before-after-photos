# APP WORKFLOW - Cleaning Photo Documentation

## 1. SIGN-IN & INITIALIZATION

### Sign-In Screen
- User enters their **name** and selects **city** (Tampa, St. Petersburg, Jacksonville, Miami)
- Credentials are stored in localStorage
- URL is updated with `?cleaner=NAME&location=CITY` parameters
- Different cities use different Google Apps Script URLs and folder IDs

### App Initialization
- Loads all photos from localStorage
- Checks device orientation (portrait/landscape)
- Reassigns photo names sequentially (Kitchen 1, Kitchen 2, etc.)
- Shows main app interface

---

## 2. MAIN INTERFACE LAYOUT

### Fixed Header (Top)
- **Left**: "📷 All Photos" button
- **Center**: User name with user change button (👤)
- **Right**: Label toggle (🏷️) and Upload button (📤)

### Fixed Room Tabs (Bottom)
- 6 room categories: Kitchen, Bathroom, Bedroom, Living Room, Dining Room, Office
- Each room has an icon emoji
- Swipeable carousel on mobile
- Selected room is highlighted

### Scrollable Content (Middle)
- Photo grid: 2 columns (portrait) or 5 columns (landscape)
- Shows photos for currently selected room
- Each photo has a name and timestamp

---

## 3. TAKING BEFORE PHOTOS

### Starting the Process
1. User taps camera button (📸) in a room OR clicks dummy photo placeholder
2. Camera modal opens in fullscreen
3. Shows live camera feed with:
   - "BEFORE" label overlay
   - Photo frame guide (90% of screen)
   - Zoom controls (0.5x, 1x, 2x) - hidden, controlled by bottom panel
   - Close button (✕)

### Camera Controls (Bottom Panel)
- **Left**: Aspect ratio selector (4:3 or 2:3)
- **Center**: Capture button (yellow, 60px circle)
- **Right**: Zoom controls

### Capture Flow
1. User selects aspect ratio (4:3 or 2:3)
2. Adjusts zoom if needed
3. Taps capture button
4. Photo is captured with cropping based on aspect ratio
5. "BEFORE" label is drawn on photo (if labels enabled)
6. Photo is saved with:
   - Auto-generated name (e.g., "Kitchen 1")
   - Room assignment
   - Timestamp
   - Aspect ratio
   - Original full-size version
   - Preview version with label

### After Capture
- Camera stays open for next before photo in same room
- Or user closes camera to return to grid
- Photo appears in main grid immediately

---

## 4. TAKING AFTER PHOTOS

### Starting the Process
1. User taps on a before photo thumbnail
2. Comparison modal opens showing:
   - **Left/Top half**: The selected before photo
   - **Right/Bottom half**: Live camera feed for after photo
   - Both halves show the same aspect ratio/orientation

### Visual Guides
- Before photo shows with photo info overlay (name, timestamp, room)
- "BEFORE" label on before photo
- "AFTER" label on camera feed
- Same photo frame overlay to match composition

### Capture Flow
1. User positions camera to match before photo
2. Can adjust zoom if needed
3. Taps capture button
4. After photo is captured with same aspect ratio as before photo
5. "AFTER" label is drawn on photo
6. Photo is saved and linked to before photo via `beforePhotoId`

### Automatic Combined Photo Creation
1. After photo is saved
2. System automatically creates combined photo:
   - Detects orientation (horizontal vs vertical) based on aspect ratio
   - Horizontal photos (ratio > 1.0) → side-by-side layout
   - Vertical photos (ratio ≤ 1.0) → stacked layout
   - Selects template: stack-portrait (9:16), sidebyside-landscape (16:9), etc.
   - Draws before/after images side-by-side or stacked
   - Adds "BEFORE" and "AFTER" labels if enabled
   - Saves as 'mix' mode photo

### Auto-Cycling
- After capturing after photo, camera automatically opens for next unpaired before photo
- Continues until all before photos have matching after photos
- Then returns to main grid

---

## 5. PHOTO VIEWING & MANAGEMENT

### Main Grid View
- Shows all photos for selected room
- Photos displayed in chronological order
- Each photo shows name and time
- Click photo to view fullscreen

### All Photos Gallery
- Accessed via "📷 All Photos" button in header
- Shows photos grouped by room
- **3-column layout**: BEFORE | AFTER | COMBINED
- Photos organized by sets (Kitchen 1 set, Kitchen 2 set, etc.)
- Each column shows:
  - **BEFORE**: Yellow border
  - **AFTER**: Blue border
  - **COMBINED**: Green border
- Dummy placeholders show for missing photos
- Click any photo to view fullscreen

### Fullscreen Photo View
- Shows large version of photo
- Photo info overlay (name, room, timestamp)
- Delete button (×) in top-right corner
- Close button to return
- For combined photos: can view in fullscreen

---

## 6. PHOTO DELETION

### Delete Process
1. Click delete button (×) on any photo
2. Confirmation modal appears: "Are you sure?"
3. Options: Cancel or Delete
4. If confirmed:
   - **For combined photo**: Deletes combined photo AND linked after photo (keeps before photo)
   - **For before photo**: Deletes just before photo
   - **For after photo**: Deletes just after photo
5. Photo names are reassigned sequentially after deletion
6. Grid updates immediately

### Delete All
- Available in All Photos gallery
- Shows warning with photo count
- Requires confirmation
- Deletes all photos from all rooms

---

## 7. PHOTO EXPORT & UPLOAD

### Upload Options (📤 button)

#### Google Drive Upload
- Uploads to city-specific Google Drive folder
- Folder ID determined by selected city
- Uses Google Apps Script as backend
- Can upload: Before photos, After photos, or Combined photos

#### Manual Download
- Downloads photos to device
- Can select individual photos or all photos
- Combined photos downloaded as JPEG files

### Template Selection (for Combined Photos)
- **Default**: Auto-detects based on photo orientation
- **Portrait**: 9:16 stacked format
- **Square**: 1:1 formats (stacked or side-by-side)
- **Landscape**: 16:9 formats
- **Wide**: 2:1 side-by-side format
- **Blog**: 16:9 side-by-side format

---

## 8. ADDITIONAL FEATURES

### Label Toggle (🏷️)
- Turns "BEFORE" and "AFTER" labels on/off globally
- Affects future captures and combined photo creation
- Setting saved to localStorage

### User Change (👤)
- Allows switching to different user
- Shows sign-in screen
- Option to clear stored credentials

### Orientation Support
- Automatically detects portrait/landscape
- Adjusts UI layout accordingly
- Maintains photo aspect ratios

### Local Storage
- All photos stored in browser localStorage
- User preferences saved
- Automatic cleanup if storage quota exceeded
- Keeps most recent photos when cleaning up
