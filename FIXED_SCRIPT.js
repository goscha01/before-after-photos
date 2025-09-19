function doPost(e) {
  try {
    console.log('=== UPLOAD REQUEST RECEIVED ===');
    console.log('Parameters:', Object.keys(e.parameter));

    // Get parameters from the request
    const folderId = e.parameter.folderId;
    const filename = e.parameter.filename;
    const room = e.parameter.room;
    const type = e.parameter.type;
    const timestamp = e.parameter.timestamp;
    const location = e.parameter.location;
    const imageData = e.parameter.image;
    const cleanerName = e.parameter.cleanerName;

    console.log('Folder ID:', folderId);
    console.log('Filename:', filename);
    console.log('Room:', room);
    console.log('Type:', type);
    console.log('Cleaner Name:', cleanerName);
    console.log('Image data length:', imageData ? imageData.length : 'undefined');

    // Validate required parameters
    if (!folderId) {
      throw new Error('Missing folderId parameter');
    }
    if (!filename) {
      throw new Error('Missing filename parameter');
    }
    if (!imageData) {
      throw new Error('Missing image data parameter');
    }
    if (!cleanerName) {
      throw new Error('Missing cleanerName parameter');
    }

    // Get the main location folder
    console.log('Getting main folder...');
    const mainFolder = DriveApp.getFolderById(folderId);
    console.log('Main folder found:', mainFolder.getName());

    // Use lock to prevent race conditions during folder creation
    const lock = LockService.getScriptLock();
    try {
      lock.waitLock(30000); // Wait up to 30 seconds for the lock
    } catch (e) {
      console.log('Could not obtain lock, proceeding without lock');
    }

    try {
      // Create date folder (YYYY-MM-DD format) - FIRST LEVEL
      const today = new Date();
      const dateString = today.getFullYear() + '-' +
                        String(today.getMonth() + 1).padStart(2, '0') + '-' +
                        String(today.getDate()).padStart(2, '0');

      console.log('Creating/finding date folder:', dateString);
      let dateFolder = getOrCreateFolder(mainFolder, dateString);

      // Create cleaner folder inside date folder - SECOND LEVEL
      const sanitizedCleanerName = cleanerName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
      console.log('Creating/finding cleaner folder:', sanitizedCleanerName);
      let cleanerFolder = getOrCreateFolder(dateFolder, sanitizedCleanerName);

      // Create the three type folders: combined, before, after - THIRD LEVEL
      const folderNames = ['combined', 'before', 'after'];
      const typeFolders = {};

      console.log('Creating/finding type folders...');
      folderNames.forEach(folderName => {
        typeFolders[folderName] = getOrCreateFolder(cleanerFolder, folderName);
      });

      // Determine which folder to save to based on photo type
      let targetFolder;
      if (type === 'before') {
        targetFolder = typeFolders['before'];
      } else if (type === 'after') {
        targetFolder = typeFolders['after'];
      } else if (type === 'combined') {
        targetFolder = typeFolders['combined'];
      } else {
        // Default to 'combined' if type is unclear
        targetFolder = typeFolders['combined'];
        console.log('Unknown type "' + type + '", defaulting to combined folder');
      }

      console.log('Target folder selected:', targetFolder.getName());
      console.log('Photo type received:', type);

    } finally {
      // Always release the lock
      if (lock) {
        try {
          lock.releaseLock();
        } catch (e) {
          console.log('Lock already released');
        }
      }
    }

    // Convert base64 to blob (outside the lock to minimize lock time)
    console.log('Processing image data...');
    let base64Data;
    if (imageData.startsWith('data:')) {
      // Remove data URL prefix if present (data:image/jpeg;base64,)
      base64Data = imageData.split(',')[1];
      console.log('Removed data URL prefix');
    } else {
      // Assume it's already base64 without prefix
      base64Data = imageData;
      console.log('Using raw base64 data');
    }

    if (!base64Data || base64Data.length === 0) {
      throw new Error('No valid base64 data found in image parameter');
    }

    console.log('Base64 data length:', base64Data.length);

    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64Data),
      'image/jpeg',
      filename
    );

    console.log('Created blob successfully');

    // Save to Drive
    console.log('Saving file to Drive...');
    const file = targetFolder.createFile(blob);
    console.log('File saved successfully!');
    console.log('File name:', file.getName());
    console.log('File ID:', file.getId());

    // Return success response
    console.log('Returning success response');
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        fileId: file.getId(),
        fileName: filename,
        room: room,
        type: type,
        location: location,
        cleanerName: cleanerName,
        dateString: dateString,
        folderPath: `${location}/${dateString}/${sanitizedCleanerName}/${type}/`,
        message: 'Photo uploaded successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('=== UPLOAD ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'Upload failed: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper function to get or create a folder (reduces duplicate code and race conditions)
function getOrCreateFolder(parentFolder, folderName) {
  const existingFolders = parentFolder.getFoldersByName(folderName);

  if (existingFolders.hasNext()) {
    console.log('Using existing folder:', folderName);
    return existingFolders.next();
  } else {
    console.log('Creating new folder:', folderName);
    return parentFolder.createFolder(folderName);
  }
}