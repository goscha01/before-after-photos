import { IMAGE_SETTINGS } from './constants.js';

/**
 * Converts a canvas element to a compressed data URL
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {number} quality - Compression quality (0-1)
 * @param {string} format - Image format (image/jpeg, image/png)
 * @returns {string} - Data URL of the compressed image
 */
export const canvasToDataURL = (canvas, quality = IMAGE_SETTINGS.QUALITY, format = IMAGE_SETTINGS.FORMAT) => {
  return canvas.toDataURL(format, quality);
};

/**
 * Compresses and resizes an image from a video stream
 * @param {HTMLVideoElement} video - Video element showing camera feed
 * @param {Object} options - Compression options
 * @returns {Promise<string>} - Promise resolving to compressed image data URL
 */
export const captureAndCompressImage = async (video, options = {}) => {
  const {
    maxWidth = IMAGE_SETTINGS.MAX_WIDTH,
    maxHeight = IMAGE_SETTINGS.MAX_HEIGHT,
    quality = IMAGE_SETTINGS.QUALITY,
    format = IMAGE_SETTINGS.FORMAT
  } = options;

  return new Promise((resolve, reject) => {
    try {
      // Create canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Get video dimensions
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Calculate new dimensions maintaining aspect ratio
      const { width, height } = calculateOptimalDimensions(videoWidth, videoHeight, maxWidth, maxHeight);

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, width, height);

      // Convert to compressed data URL
      const dataURL = canvasToDataURL(canvas, quality, format);

      resolve(dataURL);
    } catch (error) {
      reject(new Error(`Image capture failed: ${error.message}`));
    }
  });
};

/**
 * Calculates optimal dimensions for image resizing while maintaining aspect ratio
 * @param {number} originalWidth - Original image width
 * @param {number} originalHeight - Original image height
 * @param {number} maxWidth - Maximum allowed width
 * @param {number} maxHeight - Maximum allowed height
 * @returns {Object} - Object with width and height properties
 */
export const calculateOptimalDimensions = (originalWidth, originalHeight, maxWidth, maxHeight) => {
  let { width, height } = { width: originalWidth, height: originalHeight };

  // If image is smaller than max dimensions, keep original size
  if (width <= maxWidth && height <= maxHeight) {
    return { width, height };
  }

  // Calculate aspect ratio
  const aspectRatio = width / height;

  // Resize based on the larger dimension
  if (width > height) {
    // Landscape orientation
    width = Math.min(width, maxWidth);
    height = width / aspectRatio;

    // Check if height exceeds max height
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }
  } else {
    // Portrait orientation
    height = Math.min(height, maxHeight);
    width = height * aspectRatio;

    // Check if width exceeds max width
    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }
  }

  return {
    width: Math.round(width),
    height: Math.round(height)
  };
};

/**
 * Estimates the file size of an image data URL
 * @param {string} dataURL - Image data URL
 * @returns {number} - Estimated size in bytes
 */
export const estimateImageSize = (dataURL) => {
  try {
    // Remove data URL prefix
    const base64String = dataURL.split(',')[1];

    // Calculate base64 size
    const base64Size = base64String.length;

    // Convert to bytes (base64 is ~33% larger than binary)
    const sizeInBytes = Math.round(base64Size * 0.75);

    return sizeInBytes;
  } catch (error) {
    console.warn('Failed to estimate image size:', error);
    return 0;
  }
};

/**
 * Formats file size in human readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} - Formatted size string
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Validates if a string is a valid data URL
 * @param {string} dataURL - String to validate
 * @returns {boolean} - True if valid data URL
 */
export const isValidDataURL = (dataURL) => {
  try {
    return typeof dataURL === 'string' && dataURL.startsWith('data:image/');
  } catch (error) {
    return false;
  }
};

/**
 * Extracts metadata from an image data URL
 * @param {string} dataURL - Image data URL
 * @returns {Object} - Metadata object
 */
export const extractImageMetadata = (dataURL) => {
  try {
    const metadata = {
      format: 'unknown',
      size: estimateImageSize(dataURL),
      timestamp: new Date().toISOString(),
      isValid: isValidDataURL(dataURL)
    };

    // Extract format from data URL
    const formatMatch = dataURL.match(/data:image\/([^;]+)/);
    if (formatMatch) {
      metadata.format = formatMatch[1];
    }

    return metadata;
  } catch (error) {
    console.warn('Failed to extract image metadata:', error);
    return {
      format: 'unknown',
      size: 0,
      timestamp: new Date().toISOString(),
      isValid: false
    };
  }
};

/**
 * Creates a thumbnail from an image data URL
 * @param {string} dataURL - Original image data URL
 * @param {number} size - Thumbnail size (width/height for square)
 * @returns {Promise<string>} - Promise resolving to thumbnail data URL
 */
export const createThumbnail = async (dataURL, size = 150) => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set thumbnail dimensions
        canvas.width = size;
        canvas.height = size;

        // Calculate crop dimensions for center crop
        const { cropX, cropY, cropWidth, cropHeight } = calculateCenterCrop(img.width, img.height, size);

        // Draw cropped image
        ctx.drawImage(
          img,
          cropX, cropY, cropWidth, cropHeight,
          0, 0, size, size
        );

        // Convert to data URL with reduced quality for smaller size
        const thumbnailDataURL = canvasToDataURL(canvas, 0.7, 'image/jpeg');
        resolve(thumbnailDataURL);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for thumbnail creation'));
      };

      img.src = dataURL;
    } catch (error) {
      reject(new Error(`Thumbnail creation failed: ${error.message}`));
    }
  });
};

/**
 * Calculates center crop dimensions
 * @param {number} width - Original width
 * @param {number} height - Original height
 * @param {number} targetSize - Target square size
 * @returns {Object} - Crop dimensions
 */
export const calculateCenterCrop = (width, height, targetSize) => {
  const minDimension = Math.min(width, height);
  const scale = targetSize / minDimension;

  const cropWidth = minDimension;
  const cropHeight = minDimension;
  const cropX = (width - cropWidth) / 2;
  const cropY = (height - cropHeight) / 2;

  return { cropX, cropY, cropWidth, cropHeight, scale };
};

/**
 * Converts data URL to Blob for uploading
 * @param {string} dataURL - Image data URL
 * @returns {Blob} - Image blob
 */
export const dataURLToBlob = (dataURL) => {
  try {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  } catch (error) {
    throw new Error(`Failed to convert data URL to blob: ${error.message}`);
  }
};

/**
 * Generates a filename for a photo
 * @param {string} room - Room ID
 * @param {string} type - Photo type (before/after)
 * @param {string} format - File format extension
 * @returns {string} - Generated filename
 */
export const generatePhotoFilename = (room, type, format = 'jpg') => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${room}_${type}_${timestamp}.${format}`;
};

/**
 * Batch processes multiple images for upload
 * @param {Array} images - Array of image data URLs
 * @param {Object} options - Processing options
 * @returns {Promise<Array>} - Promise resolving to processed images array
 */
export const batchProcessImages = async (images, options = {}) => {
  const {
    maxConcurrent = 3,
    quality = IMAGE_SETTINGS.QUALITY,
    createThumbnails = false
  } = options;

  const processImage = async (imageData) => {
    try {
      const metadata = extractImageMetadata(imageData.dataURL);
      const processed = {
        ...imageData,
        metadata,
        processed: true
      };

      if (createThumbnails) {
        processed.thumbnail = await createThumbnail(imageData.dataURL);
      }

      return processed;
    } catch (error) {
      console.error('Failed to process image:', error);
      return {
        ...imageData,
        error: error.message,
        processed: false
      };
    }
  };

  // Process images in batches to avoid overwhelming the browser
  const batches = [];
  for (let i = 0; i < images.length; i += maxConcurrent) {
    batches.push(images.slice(i, i + maxConcurrent));
  }

  const results = [];
  for (const batch of batches) {
    const batchResults = await Promise.all(batch.map(processImage));
    results.push(...batchResults);
  }

  return results;
};