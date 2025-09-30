# Testing Guide for Cleaning Photo App

## Overview

You now have **two versions** of the application:
1. **Original** (`index.html`) - 7,650 lines, fully tested, production-ready
2. **Modular** (`index-modular.html`) - Cleaner structure with extracted utilities

Both versions should work identically. This guide will help you test both.

---

## 🚀 Quick Start

### Step 1: Start a Local Server

The modular version **requires** a local web server (ES6 modules don't work with `file://` protocol).

**Option A: Python** (if you have Python installed)
```bash
cd C:\Users\HP\Desktop\Projects\before-after-photos
python -m http.server 8000
```

**Option B: Node.js** (if you have Node installed)
```bash
cd C:\Users\HP\Desktop\Projects\before-after-photos
npx http-server
```

**Option C: VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` or `index-modular.html`
3. Select "Open with Live Server"

### Step 2: Open in Browser

Once server is running:
- **Original version**: `http://localhost:8000/index.html`
- **Modular version**: `http://localhost:8000/index-modular.html`

---

## ✅ Testing Checklist

### 1. Sign-In Flow
- [ ] Page loads without errors
- [ ] Sign-in form displays correctly
- [ ] Can enter name and select city
- [ ] "Start" button works
- [ ] After sign-in, main app displays

### 2. Camera Functionality

**Before Photo:**
- [ ] Camera opens when clicking camera button
- [ ] Video stream displays correctly
- [ ] Zoom controls work (0.5x, 1x, 2x)
- [ ] Aspect ratio toggle works (4:3 ↔ 2:3)
- [ ] Can capture before photo
- [ ] Photo appears in gallery
- [ ] Photo has "BEFORE" label visible

**After Photo:**
- [ ] After taking before photo, comparison camera opens
- [ ] Can see before photo preview
- [ ] Can capture after photo
- [ ] Combined photo is generated automatically
- [ ] Combined photo has "BEFORE" and "AFTER" labels

### 3. Gallery Features
- [ ] Photos display in grid
- [ ] Can click photo to enlarge
- [ ] Enlarged view shows correctly
- [ ] Can swipe between photos (if on mobile)
- [ ] "All Photos" modal works
- [ ] Photos organized by room

### 4. Photo Management
- [ ] Can delete individual photos
- [ ] Delete confirmation modal appears
- [ ] Deleting combined photo prompts for before/after deletion
- [ ] "Delete All" button works
- [ ] Deleted photos are removed from gallery

### 5. Upload Functionality
- [ ] Upload modal opens
- [ ] Can select upload method (Google Drive, Dropbox, etc.)
- [ ] Can select photo quality
- [ ] Can select formats
- [ ] Upload progress displays
- [ ] Upload completes successfully (if configured)

### 6. Room Tabs
- [ ] Room tabs display (Kitchen, Bathroom, etc.)
- [ ] Can switch between rooms
- [ ] Photos filter by selected room
- [ ] Swipe gestures work (if on mobile)

### 7. Templates & Formats
- [ ] Can change combined photo template
- [ ] Different formats generate correctly:
  - Portrait (9:16)
  - Square (1:1)
  - Landscape (16:9)
  - Blog format
- [ ] Labels positioned correctly in each format

### 8. Data Persistence
- [ ] Close and reopen browser
- [ ] Photos are still there (localStorage)
- [ ] User preferences saved
- [ ] Can clear data and start fresh

---

## 🔍 What to Look For

### Console Errors
Open browser DevTools (F12) and check Console tab for:
- ❌ **Red errors** - Something is broken
- ⚠️ **Yellow warnings** - May or may not be issues
- 💙 **Blue info** - Normal operation

### Common Issues

**Issue**: "Failed to load module" errors
**Solution**: Make sure you're using a web server, not opening file directly

**Issue**: Camera doesn't work
**Solution**:
- Check browser permissions (camera access)
- Use HTTPS or localhost (required for camera API)
- Try different browser (Chrome/Edge recommended)

**Issue**: Photos don't save
**Solution**: Check localStorage isn't full (clear old data)

**Issue**: Upload fails
**Solution**: Check `config.js` has correct API credentials

---

## 🔄 Comparing Both Versions

### Side-by-Side Test

1. Open both versions in different browser tabs:
   - Tab 1: `http://localhost:8000/index.html`
   - Tab 2: `http://localhost:8000/index-modular.html`

2. Perform the same action in both tabs

3. Verify results are identical

### What Should Be Identical
- ✅ UI appearance
- ✅ Camera behavior
- ✅ Photo generation
- ✅ Upload functionality
- ✅ All features and buttons

### What Might Be Different
- Network requests (module loading in modular version)
- Console logs (may have different messages)
- Performance (modular might be slightly slower on first load)

---

## 📱 Mobile Testing

If testing on mobile device:

1. **Find your computer's IP address:**
   ```bash
   # Windows
   ipconfig

   # Mac/Linux
   ifconfig
   ```

2. **Access from mobile:**
   - Replace `localhost` with your IP
   - Example: `http://192.168.1.100:8000/index.html`

3. **Mobile-specific tests:**
   - [ ] Touch gestures work
   - [ ] Camera rear/front switch
   - [ ] Portrait/landscape orientation
   - [ ] Pinch to zoom
   - [ ] Photo quality on mobile camera

---

## 🐛 Debugging Tips

### If Something Doesn't Work

1. **Check browser console** (F12 → Console tab)
   - Look for red errors
   - Note the error message and line number

2. **Check Network tab** (F12 → Network tab)
   - Look for failed requests (red status)
   - Verify all modules loaded (utils.js, storage.js, etc.)

3. **Check localStorage**
   - F12 → Application tab → Local Storage
   - See stored photos and user data
   - Can clear manually if needed

4. **Try original version**
   - If modular version fails, try `index.html`
   - If original works, issue is with modular setup
   - If original also fails, issue is environmental

### Common Error Messages

**"Cannot use import statement outside a module"**
- Solution: Add `type="module"` to script tag (already done in index-modular.html)

**"CORS policy blocked"**
- Solution: Must use web server, not file:// protocol

**"getUserMedia is not defined"**
- Solution: Need HTTPS or localhost for camera access

---

## ✨ Performance Testing

### Load Time
- Original: Should load instantly (single file)
- Modular: May take 200-500ms extra (loading modules)

### Memory Usage
- Open DevTools → Memory tab
- Take heap snapshot
- Both versions should use similar memory (~50-100MB with photos)

### Photo Generation Speed
- Time how long it takes to create combined photo
- Should be < 1 second for both versions

---

## 📊 Test Results Template

Use this template to track your testing:

```
## Test Date: [DATE]
## Browser: [Chrome/Firefox/Safari/Edge + Version]
## Version: [Original / Modular]

### Sign-In: ✅ / ❌
### Camera: ✅ / ❌
### Gallery: ✅ / ❌
### Upload: ✅ / ❌
### Templates: ✅ / ❌
### Data Persistence: ✅ / ❌

### Issues Found:
1. [Description]
2. [Description]

### Notes:
[Any observations]
```

---

## 🚦 Which Version Should You Use?

### Use **Original** (`index.html`) if:
- ✅ You want maximum reliability
- ✅ You're deploying to production
- ✅ You need IE11 support
- ✅ You can't use a build tool

### Use **Modular** (`index-modular.html`) if:
- ✅ You're developing/maintaining code
- ✅ You want better code organization
- ✅ You'll add more features later
- ✅ You're using a modern build tool (Vite/Webpack)

### Recommendation
**For Production**: Use `index.html` (original)
**For Development**: Use `index-modular.html` with modules

---

## 🔧 Troubleshooting Modular Version

### Module Not Loading

Check that all files exist:
```bash
ls src/js/utils.js
ls src/js/storage.js
ls src/js/photoEditor.js
ls src/js/app.js
ls src/css/styles.css
```

### Import Errors

Verify import paths in `app.js`:
```javascript
import * as Utils from './utils.js';        // ✅ Correct
import * as Utils from './utils';           // ❌ Wrong (missing .js)
import * as Utils from '../js/utils.js';    // ❌ Wrong (wrong path)
```

### Missing Functions

If you get "function is not defined":
1. Check the function was exported from module
2. Check it's imported correctly
3. Check you're calling it with correct namespace (Utils.*, Storage.*, etc.)

---

## 📞 Need Help?

If you encounter issues:

1. **Check Console** - Most errors show here
2. **Check Network Tab** - See what's failing to load
3. **Try Original** - Verify it works
4. **Clear Cache** - Shift + F5 to hard refresh
5. **Try Different Browser** - Rule out browser-specific issues

---

## ✅ Sign-Off Checklist

Before considering testing complete:

- [ ] Both versions tested
- [ ] All critical features work
- [ ] No console errors
- [ ] Tested on desktop
- [ ] Tested on mobile (optional)
- [ ] Data persistence verified
- [ ] Upload tested (if configured)
- [ ] Performance acceptable

---

**Last Updated**: 2025-09-30
**App Version**: Modular v1.0
**Original Lines**: 7,650
**Modular Structure**: 5 modules (utils, storage, photoEditor, app, styles)