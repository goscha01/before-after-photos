/**
 * Photo Editor Module
 * Handles photo combining, canvas operations, and image processing
 */

import { drawCanvasLabel } from './utils.js';

/**
 * Add BEFORE/AFTER labels to a combined photo canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} canvasWidth - Canvas width
 * @param {number} canvasHeight - Canvas height
 * @param {string} splitType - 'vertical' for stack, else side-by-side
 */
export function addPhotoLabels(ctx, canvasWidth, canvasHeight, splitType) {
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const padding = 20;
  const labelWidth = 120;
  const labelHeight = 40;

  if (splitType === 'vertical' || splitType === 'horizontal-line') {
    // Stack Mode - labels at top-left corners of each section

    // BEFORE label (top-left of top section)
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(padding, padding, labelWidth, labelHeight);
    ctx.fillStyle = 'white';
    ctx.fillText('BEFORE', padding + labelWidth/2, padding + labelHeight/2);

    // AFTER label (top-left of bottom section)
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(padding, canvasHeight/2 + padding, labelWidth, labelHeight);
    ctx.fillStyle = 'white';
    ctx.fillText('AFTER', padding + labelWidth/2, canvasHeight/2 + padding + labelHeight/2);
  } else {
    // Side-by-Side Mode - labels at top-left corners of each section

    // BEFORE label (top-left of left section)
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(padding, padding, labelWidth, labelHeight);
    ctx.fillStyle = 'white';
    ctx.fillText('BEFORE', padding + labelWidth/2, padding + labelHeight/2);

    // AFTER label (top-left of right section)
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(canvasWidth/2 + padding, padding, labelWidth, labelHeight);
    ctx.fillStyle = 'white';
    ctx.fillText('AFTER', canvasWidth/2 + padding + labelWidth/2, padding + labelHeight/2);
  }
}

/**
 * Get template size definitions
 * @returns {Object} Template sizes object
 */
export function getTemplateSizes() {
  return {
    'stack-portrait': { width: 1080, height: 1920, splitType: 'horizontal-line', ratio: '9:16', label: '9:16 Portrait' },
    'stack-square': { width: 1080, height: 1080, splitType: 'horizontal-line', ratio: '1:1', label: '1:1 Square' },
    'stack-landscape': { width: 1920, height: 1080, splitType: 'horizontal-line', ratio: '16:9', label: '16:9 Landscape' },
    'sidebyside-landscape': { width: 1920, height: 1080, splitType: 'vertical-line', ratio: '16:9', label: '16:9 Landscape' },
    'sidebyside-square': { width: 1080, height: 1080, splitType: 'vertical-line', ratio: '1:1', label: '1:1 Square' },
    'sidebyside-wide': { width: 2160, height: 1080, splitType: 'vertical-line', ratio: '2:1', label: '2:1 Wide' }
  };
}

/**
 * Draws horizontal split (stack mode) on canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {HTMLImageElement} beforeImg - Before image
 * @param {HTMLImageElement} afterImg - After image
 * @param {Object} dimensions - Template dimensions
 */
export function drawHorizontalSplit(ctx, beforeImg, afterImg, dimensions) {
  const halfHeight = dimensions.targetHeight / 2;

  // Calculate crop for before image (top half)
  const beforeCrop = calculateCrop(beforeImg.width, beforeImg.height, dimensions.targetWidth, halfHeight);
  ctx.drawImage(
    beforeImg,
    beforeCrop.sx, beforeCrop.sy, beforeCrop.sWidth, beforeCrop.sHeight,
    0, 0, dimensions.targetWidth, halfHeight
  );

  // Calculate crop for after image (bottom half)
  const afterCrop = calculateCrop(afterImg.width, afterImg.height, dimensions.targetWidth, halfHeight);
  ctx.drawImage(
    afterImg,
    afterCrop.sx, afterCrop.sy, afterCrop.sWidth, afterCrop.sHeight,
    0, halfHeight, dimensions.targetWidth, halfHeight
  );
}

/**
 * Draws vertical split (side-by-side mode) on canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {HTMLImageElement} beforeImg - Before image
 * @param {HTMLImageElement} afterImg - After image
 * @param {Object} dimensions - Template dimensions
 */
export function drawVerticalSplit(ctx, beforeImg, afterImg, dimensions) {
  const halfWidth = dimensions.targetWidth / 2;

  // Calculate crop for before image (left half)
  const beforeCrop = calculateCrop(beforeImg.width, beforeImg.height, halfWidth, dimensions.targetHeight);
  ctx.drawImage(
    beforeImg,
    beforeCrop.sx, beforeCrop.sy, beforeCrop.sWidth, beforeCrop.sHeight,
    0, 0, halfWidth, dimensions.targetHeight
  );

  // Calculate crop for after image (right half)
  const afterCrop = calculateCrop(afterImg.width, afterImg.height, halfWidth, dimensions.targetHeight);
  ctx.drawImage(
    afterImg,
    afterCrop.sx, afterCrop.sy, afterCrop.sWidth, afterCrop.sHeight,
    halfWidth, 0, halfWidth, dimensions.targetHeight
  );
}

/**
 * Calculate center crop coordinates
 * @param {number} srcWidth - Source width
 * @param {number} srcHeight - Source height
 * @param {number} targetWidth - Target width
 * @param {number} targetHeight - Target height
 * @returns {Object} Crop coordinates {sx, sy, sWidth, sHeight}
 */
function calculateCrop(srcWidth, srcHeight, targetWidth, targetHeight) {
  const targetRatio = targetWidth / targetHeight;
  const srcRatio = srcWidth / srcHeight;

  let sWidth, sHeight, sx, sy;

  if (srcRatio > targetRatio) {
    // Source is wider, crop width
    sHeight = srcHeight;
    sWidth = srcHeight * targetRatio;
    sx = (srcWidth - sWidth) / 2;
    sy = 0;
  } else {
    // Source is taller, crop height
    sWidth = srcWidth;
    sHeight = srcWidth / targetRatio;
    sx = 0;
    sy = (srcHeight - sHeight) / 2;
  }

  return { sx, sy, sWidth, sHeight };
}

/**
 * Creates a combined before/after photo
 * @param {string} beforeDataUrl - Before photo data URL
 * @param {string} afterDataUrl - After photo data URL
 * @param {string} templateType - Template type
 * @param {Object} beforePhoto - Before photo object (for aspect ratio)
 * @param {Object} afterPhoto - After photo object (for aspect ratio)
 * @param {Function} callback - Callback with combined data URL
 * @param {boolean} labelsEnabled - Whether to add BEFORE/AFTER labels (default: true)
 */
export function createCombinedPhotoInMemory(beforeDataUrl, afterDataUrl, templateType, beforePhoto, afterPhoto, callback, labelsEnabled = true) {
  const beforeImg = new Image();
  const afterImg = new Image();

  let imagesLoaded = 0;
  const totalImages = 2;

  const onImageLoad = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      // Determine layout based on actual image dimensions
      const beforeAspectRatio = beforeImg.width / beforeImg.height;
      const afterAspectRatio = afterImg.width / afterImg.height;
      const avgAspectRatio = (beforeAspectRatio + afterAspectRatio) / 2;

      // Debug logging
      console.log('=== Photo Orientation Debug ===');
      console.log('Before image:', beforeImg.width, 'x', beforeImg.height, '=', beforeAspectRatio);
      console.log('After image:', afterImg.width, 'x', afterImg.height, '=', afterAspectRatio);
      console.log('Average aspect ratio:', avgAspectRatio);
      console.log('Template type requested:', templateType);

      // Use actual image dimensions to determine orientation
      // If average aspect ratio > 1.0, images are wider than tall (horizontal/landscape)
      // If average aspect ratio <= 1.0, images are taller than wide (vertical/portrait)
      const isHorizontalPhoto = avgAspectRatio > 1.0;

      console.log('Is horizontal photo?', isHorizontalPhoto);
      console.log('Base mode:', isHorizontalPhoto ? 'sidebyside' : 'stack');

      const baseMode = isHorizontalPhoto ? 'sidebyside' : 'stack';

      // Get template definition
      const templates = getTemplateSizes();
      let templateKey = templateType || 'default';

      // Map legacy template names to new format
      // Respect actual image orientation for better results
      if (templateType === 'default') {
        templateKey = baseMode === 'stack' ? 'stack-portrait' : 'sidebyside-landscape';
      } else if (templateType === 'portrait') {
        // For vertical originals, use side-by-side layout; for horizontal, use stack
        templateKey = baseMode === 'stack' ? 'stack-portrait' : 'sidebyside-landscape';
      } else if (templateType === 'square') {
        templateKey = baseMode === 'stack' ? 'stack-square' : 'sidebyside-square';
      } else if (templateType === 'square_stack') {
        templateKey = 'stack-square';
      } else if (templateType === 'square_side') {
        templateKey = 'sidebyside-square';
      } else if (templateType === 'landscape') {
        // For horizontal originals, stack them; for vertical, use side-by-side
        templateKey = baseMode === 'stack' ? 'stack-landscape' : 'sidebyside-landscape';
      } else if (templateType === 'sidebyside_landscape') {
        templateKey = 'sidebyside-wide';
      } else if (templateType === 'blog') {
        templateKey = 'sidebyside-landscape';
      }

      console.log('Template key selected:', templateKey);

      const template = templates[templateKey] || templates['stack-portrait'];
      console.log('Final template:', template);
      console.log('================================');

      const templateDimensions = {
        targetWidth: template.width,
        targetHeight: template.height,
        splitType: template.splitType,
        ratio: template.ratio,
        baseMode: baseMode
      };

      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = templateDimensions.targetWidth;
      canvas.height = templateDimensions.targetHeight;

      // Apply cropping and positioning
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.clip();

      if (templateDimensions.splitType === 'horizontal-line') {
        drawHorizontalSplit(ctx, beforeImg, afterImg, templateDimensions);
      } else {
        drawVerticalSplit(ctx, beforeImg, afterImg, templateDimensions);
      }

      ctx.restore();

      // Add labels only if enabled
      if (labelsEnabled) {
        addPhotoLabels(ctx, canvas.width, canvas.height, templateDimensions.splitType);
      }

      // Convert to data URL and return via callback
      const combinedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      callback(combinedDataUrl);
    }
  };

  // Load images
  beforeImg.onload = onImageLoad;
  afterImg.onload = onImageLoad;
  beforeImg.src = beforeDataUrl;
  afterImg.src = afterDataUrl;
}