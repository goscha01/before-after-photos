import { useState, useRef, useEffect, useCallback } from 'react';
import { CAMERA_CONSTRAINTS, ERROR_MESSAGES } from '@utils/constants';

/**
 * Custom hook for camera operations
 * Handles camera initialization, permissions, and cleanup
 */
const useCamera = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  /**
   * Initialize camera with given constraints
   */
  const initializeCamera = useCallback(async (customConstraints = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(ERROR_MESSAGES.CAMERA_NOT_SUPPORTED);
      }

      // Merge custom constraints with defaults
      const constraints = {
        ...CAMERA_CONSTRAINTS,
        video: {
          ...CAMERA_CONSTRAINTS.video,
          facingMode,
          ...customConstraints.video
        }
      };

      // iOS Safari compatibility: remove constraints that might cause issues
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        // Simplify constraints for iOS Safari
        constraints.video = {
          facingMode: facingMode,
          ...customConstraints.video
        };
      }

      // Get user media stream
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

      // Store stream reference
      streamRef.current = mediaStream;
      setStream(mediaStream);

      // Attach stream to video element if available
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setIsInitialized(true);
    } catch (error) {
      console.error('Camera initialization failed:', error);

      // Handle specific error types
      let errorMessage = ERROR_MESSAGES.CAMERA_PERMISSION_DENIED;

      if (error.name === 'NotAllowedError') {
        errorMessage = ERROR_MESSAGES.CAMERA_PERMISSION_DENIED;
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No camera found on this device';
      } else if (error.name === 'NotReadableError') {
        errorMessage = ERROR_MESSAGES.CAMERA_IN_USE;
      } else if (error.name === 'OverconstrainedError') {
        errorMessage = 'Camera does not support the requested settings';
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [facingMode]);

  /**
   * Switch between front and back camera
   */
  const switchCamera = useCallback(async () => {
    const newFacingMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newFacingMode);

    // Stop current stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    // Initialize with new facing mode
    await initializeCamera();
  }, [facingMode, initializeCamera]);

  /**
   * Stop camera stream and cleanup
   */
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsInitialized(false);
  }, []);

  /**
   * Get available camera devices
   */
  const getCameraDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter(device => device.kind === 'videoinput');
    } catch (error) {
      console.error('Failed to enumerate camera devices:', error);
      return [];
    }
  }, []);

  /**
   * Check if camera has flash capability
   */
  const hasFlash = useCallback(() => {
    if (!streamRef.current) return false;

    const videoTrack = streamRef.current.getVideoTracks()[0];
    if (!videoTrack) return false;

    const capabilities = videoTrack.getCapabilities();
    return capabilities && capabilities.torch === true;
  }, []);

  /**
   * Toggle camera flash/torch
   */
  const toggleFlash = useCallback(async (enabled) => {
    if (!streamRef.current) return false;

    const videoTrack = streamRef.current.getVideoTracks()[0];
    if (!videoTrack) return false;

    try {
      await videoTrack.applyConstraints({
        advanced: [{ torch: enabled }]
      });
      return true;
    } catch (error) {
      console.error('Failed to toggle flash:', error);
      return false;
    }
  }, []);

  /**
   * Get current camera settings
   */
  const getCameraSettings = useCallback(() => {
    if (!streamRef.current) return null;

    const videoTrack = streamRef.current.getVideoTracks()[0];
    if (!videoTrack) return null;

    return videoTrack.getSettings();
  }, []);

  /**
   * Get camera capabilities
   */
  const getCameraCapabilities = useCallback(() => {
    if (!streamRef.current) return null;

    const videoTrack = streamRef.current.getVideoTracks()[0];
    if (!videoTrack) return null;

    return videoTrack.getCapabilities();
  }, []);

  /**
   * Take a photo from the current video stream
   */
  const takePhoto = useCallback(() => {
    if (!videoRef.current || !isInitialized) {
      throw new Error('Camera not initialized');
    }

    const video = videoRef.current;
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      throw new Error('Video not ready');
    }

    // Create canvas to capture the frame
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas dimensions to video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to data URL
    return canvas.toDataURL('image/jpeg', 0.85);
  }, [isInitialized]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  /**
   * Update video element when stream changes
   */
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return {
    // State
    isInitialized,
    isLoading,
    error,
    stream,
    facingMode,

    // Refs
    videoRef,

    // Methods
    initializeCamera,
    stopCamera,
    switchCamera,
    takePhoto,
    getCameraDevices,
    getCameraSettings,
    getCameraCapabilities,
    hasFlash,
    toggleFlash,

    // Utility
    isReady: isInitialized && !isLoading && !error,
    canTakePhoto: isInitialized && !isLoading && !error && videoRef.current?.readyState === 4
  };
};

export default useCamera;