import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import useAppStore from '@store/useAppStore';
import { captureAndCompressImage, extractImageMetadata } from '@utils/photoHelpers';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@utils/constants';

/**
 * Custom hook for photo capture operations
 * Handles taking, storing, and managing before/after photos
 */
const usePhotoCapture = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [lastCapturedPhoto, setLastCapturedPhoto] = useState(null);

  // Zustand store actions
  const {
    currentProperty,
    currentRoom,
    currentMode,
    storePhoto,
    setCurrentMode,
    getRoomPhotoStatus,
    getPhotoCount
  } = useAppStore();

  /**
   * Capture photo from video element
   */
  const capturePhoto = useCallback(async (videoElement, options = {}) => {
    if (!videoElement || !currentProperty || !currentRoom) {
      toast.error('Invalid capture parameters');
      return null;
    }

    setIsCapturing(true);

    try {
      // Ensure video is ready
      if (videoElement.readyState !== videoElement.HAVE_ENOUGH_DATA) {
        throw new Error('Video not ready for capture');
      }

      // Capture and compress the image
      const compressedImage = await captureAndCompressImage(videoElement, options);

      if (!compressedImage) {
        throw new Error('Failed to compress captured image');
      }

      // Extract metadata
      const metadata = extractImageMetadata(compressedImage);

      // Create photo object
      const photoData = {
        dataURL: compressedImage,
        metadata,
        capturedAt: new Date().toISOString(),
        room: currentRoom,
        mode: currentMode,
        propertyId: currentProperty.id
      };

      // Store in Zustand store
      storePhoto(currentProperty.id, currentRoom, currentMode, compressedImage);

      // Update last captured photo
      setLastCapturedPhoto(photoData);

      // Show success message
      toast.success(SUCCESS_MESSAGES.PHOTO_CAPTURED);

      return photoData;
    } catch (error) {
      console.error('Photo capture failed:', error);
      toast.error(error.message || ERROR_MESSAGES.PHOTO_CAPTURE_FAILED);
      return null;
    } finally {
      setIsCapturing(false);
    }
  }, [currentProperty, currentRoom, currentMode, storePhoto]);

  /**
   * Capture photo and automatically advance to next state
   */
  const captureAndAdvance = useCallback(async (videoElement, options = {}) => {
    const photo = await capturePhoto(videoElement, options);

    if (photo && currentMode === 'before') {
      // Auto-advance to 'after' mode after capturing 'before'
      setCurrentMode('after');
    }

    return photo;
  }, [capturePhoto, currentMode, setCurrentMode]);

  /**
   * Get reference photo for overlay (before photo when in after mode)
   */
  const getReferencePhoto = useCallback(() => {
    if (!currentProperty || !currentRoom || currentMode !== 'after') {
      return null;
    }

    const roomStatus = getRoomPhotoStatus(currentProperty.id, currentRoom);
    return roomStatus.hasBefore ?
      useAppStore.getState().photoStorage[currentProperty.id]?.[currentRoom]?.before :
      null;
  }, [currentProperty, currentRoom, currentMode, getRoomPhotoStatus]);

  /**
   * Get all photos for current property
   */
  const getCurrentPropertyPhotos = useCallback(() => {
    if (!currentProperty) return {};

    return useAppStore.getState().photoStorage[currentProperty.id] || {};
  }, [currentProperty]);

  /**
   * Get photo count summary for current property
   */
  const getPhotoSummary = useCallback(() => {
    if (!currentProperty) {
      return { total: 0, rooms: 0, complete: 0 };
    }

    return getPhotoCount(currentProperty.id);
  }, [currentProperty, getPhotoCount]);

  /**
   * Check if current room has photos
   */
  const getCurrentRoomStatus = useCallback(() => {
    if (!currentProperty || !currentRoom) {
      return { hasBefore: false, hasAfter: false, isComplete: false };
    }

    return getRoomPhotoStatus(currentProperty.id, currentRoom);
  }, [currentProperty, currentRoom, getRoomPhotoStatus]);

  /**
   * Get the next recommended action
   */
  const getNextAction = useCallback(() => {
    if (!currentProperty || !currentRoom) {
      return { action: 'select_room', message: 'Select a room to begin' };
    }

    const roomStatus = getCurrentRoomStatus();

    if (!roomStatus.hasBefore) {
      return {
        action: 'capture_before',
        message: `Take a "before" photo of ${currentRoom}`
      };
    }

    if (!roomStatus.hasAfter) {
      return {
        action: 'capture_after',
        message: `Take an "after" photo of ${currentRoom}`
      };
    }

    return {
      action: 'room_complete',
      message: `${currentRoom} photos are complete`
    };
  }, [currentProperty, currentRoom, getCurrentRoomStatus]);

  /**
   * Validate current capture state
   */
  const validateCaptureState = useCallback(() => {
    const errors = [];

    if (!currentProperty) {
      errors.push('No property selected');
    }

    if (!currentRoom) {
      errors.push('No room selected');
    }

    if (!currentMode) {
      errors.push('No capture mode selected');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [currentProperty, currentRoom, currentMode]);

  /**
   * Reset capture state
   */
  const resetCaptureState = useCallback(() => {
    setIsCapturing(false);
    setLastCapturedPhoto(null);
  }, []);

  /**
   * Get progress percentage for current property
   */
  const getProgressPercentage = useCallback(() => {
    const summary = getPhotoSummary();
    if (summary.rooms === 0) return 0;

    // Calculate based on completed room pairs
    return Math.round((summary.complete / Math.max(summary.rooms, 1)) * 100);
  }, [getPhotoSummary]);

  /**
   * Check if ready to upload
   */
  const isReadyToUpload = useCallback(() => {
    const summary = getPhotoSummary();
    return summary.total > 0 && summary.complete > 0;
  }, [getPhotoSummary]);

  /**
   * Get upload-ready photos
   */
  const getUploadData = useCallback(() => {
    if (!currentProperty) return null;

    return useAppStore.getState().getAllPhotosForUpload(currentProperty.id);
  }, [currentProperty]);

  return {
    // State
    isCapturing,
    lastCapturedPhoto,

    // Core capture methods
    capturePhoto,
    captureAndAdvance,

    // Data retrieval
    getReferencePhoto,
    getCurrentPropertyPhotos,
    getCurrentRoomStatus,
    getPhotoSummary,
    getNextAction,
    getProgressPercentage,
    getUploadData,

    // Validation and utilities
    validateCaptureState,
    resetCaptureState,
    isReadyToUpload,

    // Current state info
    currentProperty,
    currentRoom,
    currentMode
  };
};

export default usePhotoCapture;