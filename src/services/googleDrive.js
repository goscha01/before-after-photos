import apiService, { retryRequest, offlineQueue } from './api.js';
import { dataURLToBlob, generatePhotoFilename } from '@utils/photoHelpers';
import { APP_CONFIG, DRIVE_FOLDER_STRUCTURE } from '@utils/constants';

/**
 * Google Drive integration service
 * Handles uploading photos to Google Drive via Google Apps Script
 */

/**
 * Upload photos to Google Drive
 * @param {Object} uploadData - Upload data containing property, cleaner, and photos
 * @param {Function} onProgress - Progress callback function
 * @returns {Promise<Object>} - Upload result
 */
export const uploadPhotos = async (uploadData, onProgress = () => {}) => {
  try {
    // Validate input data
    if (!uploadData || !uploadData.photos || uploadData.photos.length === 0) {
      throw new Error('No photos to upload');
    }

    if (!APP_CONFIG.GOOGLE_SCRIPT_URL) {
      throw new Error('Google Apps Script URL not configured');
    }

    // Create folder name
    const folderName = createFolderName(uploadData.property, uploadData.cleaner);

    // Prepare photos for upload
    const processedPhotos = await preparePhotosForUpload(uploadData.photos, onProgress);

    // Create the upload payload
    const payload = {
      action: 'uploadPhotos',
      folderName,
      property: {
        name: uploadData.property.name,
        address: uploadData.property.address
      },
      cleaner: {
        name: uploadData.cleaner.name
      },
      photos: processedPhotos,
      uploadDate: uploadData.captureDate || new Date().toISOString()
    };

    // Attempt upload with retry mechanism
    const result = await retryRequest(
      () => uploadToGoogleScript(payload, onProgress),
      3, // Max retries
      2000 // Base delay
    );

    return {
      success: true,
      folderUrl: result.folderUrl,
      uploadedCount: processedPhotos.length,
      totalCount: uploadData.photos.length,
      folderName
    };
  } catch (error) {
    console.error('Upload failed:', error);

    // Add to offline queue if network error
    if (!navigator.onLine || error.message.includes('Network error')) {
      addToOfflineQueue(uploadData, onProgress);
    }

    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Create folder name for Google Drive
 */
const createFolderName = (property, cleaner) => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 16).replace('T', '_').replace(/:/g, '-');
  const cleanerName = cleaner.name.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');

  return `${dateStr}_${cleanerName}`;
};

/**
 * Prepare photos for upload by converting to proper format
 */
const preparePhotosForUpload = async (photos, onProgress) => {
  const processedPhotos = [];

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];

    try {
      // Update progress
      onProgress(i, 10, 'preparing');

      // Convert data URL to blob
      const blob = dataURLToBlob(photo.data);

      // Generate filename
      const filename = generatePhotoFilename(photo.room, photo.type);

      // Convert blob to base64 for Google Apps Script
      const base64Data = await blobToBase64(blob);

      // Create processed photo object
      const processedPhoto = {
        filename,
        data: base64Data,
        room: photo.room,
        type: photo.type,
        timestamp: photo.timestamp,
        size: blob.size,
        mimeType: blob.type
      };

      processedPhotos.push(processedPhoto);

      // Update progress
      onProgress(i, 30, 'prepared');
    } catch (error) {
      console.error(`Failed to prepare photo ${i}:`, error);
      onProgress(i, 0, 'error');
      throw new Error(`Failed to prepare photo: ${error.message}`);
    }
  }

  return processedPhotos;
};

/**
 * Upload to Google Apps Script
 */
const uploadToGoogleScript = async (payload, onProgress) => {
  try {
    // Update progress for all photos to uploading
    payload.photos.forEach((_, index) => {
      onProgress(index, 50, 'uploading');
    });

    const response = await apiService.post(APP_CONFIG.GOOGLE_SCRIPT_URL, payload, {
      timeout: 120000 // 2 minutes for large uploads
    });

    if (!response.success) {
      throw new Error(response.error || 'Upload failed');
    }

    // Update progress for all photos to completed
    payload.photos.forEach((_, index) => {
      onProgress(index, 100, 'completed');
    });

    return response;
  } catch (error) {
    // Update progress for all photos to error
    payload.photos.forEach((_, index) => {
      onProgress(index, 0, 'error');
    });

    throw error;
  }
};

/**
 * Convert blob to base64
 */
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      // Remove data URL prefix
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error('Failed to convert blob to base64'));
    };

    reader.readAsDataURL(blob);
  });
};

/**
 * Add upload to offline queue
 */
const addToOfflineQueue = (uploadData, onProgress) => {
  const requestFn = () => uploadPhotos(uploadData, onProgress);

  const metadata = {
    type: 'photo_upload',
    propertyName: uploadData.property.name,
    cleanerName: uploadData.cleaner.name,
    photoCount: uploadData.photos.length
  };

  offlineQueue.add(requestFn, metadata);
};

/**
 * Test Google Apps Script connection
 */
export const testConnection = async () => {
  try {
    if (!APP_CONFIG.GOOGLE_SCRIPT_URL) {
      throw new Error('Google Apps Script URL not configured');
    }

    const payload = {
      action: 'test',
      timestamp: new Date().toISOString()
    };

    const response = await apiService.post(APP_CONFIG.GOOGLE_SCRIPT_URL, payload, {
      timeout: 10000 // 10 seconds for test
    });

    return {
      success: true,
      response
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get Google Drive folder structure info
 */
export const getFolderStructure = () => {
  return {
    rootFolder: DRIVE_FOLDER_STRUCTURE.ROOT_FOLDER,
    dateFormat: DRIVE_FOLDER_STRUCTURE.DATE_FORMAT,
    filenameFormat: DRIVE_FOLDER_STRUCTURE.FILENAME_FORMAT,
    example: {
      path: `${DRIVE_FOLDER_STRUCTURE.ROOT_FOLDER}/123_Main_St/2025-01-15_14-30_John_Doe/`,
      files: [
        'kitchen_before.jpg',
        'kitchen_after.jpg',
        'bathroom_before.jpg',
        'bathroom_after.jpg'
      ]
    }
  };
};

/**
 * Create a sample Google Apps Script code
 */
export const getSampleGoogleScript = () => {
  return `
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
`;
};

/**
 * Estimate upload time based on photo count and sizes
 */
export const estimateUploadTime = (photos) => {
  if (!photos || photos.length === 0) return 0;

  // Rough estimation: 2 seconds per photo + 1 second per MB
  const baseTimePerPhoto = 2000; // ms
  const timePerMB = 1000; // ms

  let totalSize = 0;
  photos.forEach(photo => {
    if (photo.data) {
      // Estimate size from data URL
      const base64Length = photo.data.split(',')[1]?.length || 0;
      const sizeInBytes = base64Length * 0.75; // Base64 to binary conversion
      totalSize += sizeInBytes;
    }
  });

  const totalSizeMB = totalSize / (1024 * 1024);
  const estimatedMs = (photos.length * baseTimePerPhoto) + (totalSizeMB * timePerMB);

  return Math.max(estimatedMs, 5000); // Minimum 5 seconds
};

/**
 * Validate upload data
 */
export const validateUploadData = (uploadData) => {
  const errors = [];

  if (!uploadData) {
    errors.push('Upload data is required');
    return { isValid: false, errors };
  }

  if (!uploadData.property) {
    errors.push('Property information is required');
  } else {
    if (!uploadData.property.name && !uploadData.property.address) {
      errors.push('Property name or address is required');
    }
  }

  if (!uploadData.cleaner) {
    errors.push('Cleaner information is required');
  } else {
    if (!uploadData.cleaner.name) {
      errors.push('Cleaner name is required');
    }
  }

  if (!uploadData.photos || !Array.isArray(uploadData.photos)) {
    errors.push('Photos array is required');
  } else {
    if (uploadData.photos.length === 0) {
      errors.push('At least one photo is required');
    }

    uploadData.photos.forEach((photo, index) => {
      if (!photo.data) {
        errors.push(\`Photo \${index + 1} is missing data\`);
      }
      if (!photo.room) {
        errors.push(\`Photo \${index + 1} is missing room information\`);
      }
      if (!photo.type) {
        errors.push(\`Photo \${index + 1} is missing type information\`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export default {
  uploadPhotos,
  testConnection,
  getFolderStructure,
  getSampleGoogleScript,
  estimateUploadTime,
  validateUploadData
};