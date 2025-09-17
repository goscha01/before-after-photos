import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import useAppStore from '@store/useAppStore';
import { uploadPhotos } from '@services/googleDrive';
import { UPLOAD_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@utils/constants';

/**
 * Custom hook for Google Drive upload operations
 * Handles photo uploads, progress tracking, and error handling
 */
const useGoogleDriveUpload = () => {
  const [uploadProgress, setUploadProgress] = useState({});
  const [currentUpload, setCurrentUpload] = useState(null);

  // Zustand store actions
  const {
    uploadStatus,
    setUploadStatus,
    setUploadData,
    setUploadProgress: setStoreUploadProgress,
    clearUploadData,
    clearPropertyPhotos
  } = useAppStore();

  /**
   * Upload photos for a specific property
   */
  const uploadPropertyPhotos = useCallback(async (propertyId) => {
    try {
      setUploadStatus(UPLOAD_STATUS.PREPARING);

      // Get upload data from store
      const uploadData = useAppStore.getState().getAllPhotosForUpload(propertyId);

      if (!uploadData || !uploadData.photos || uploadData.photos.length === 0) {
        throw new Error(ERROR_MESSAGES.NO_PHOTOS_TO_UPLOAD);
      }

      // Store upload data
      setUploadData(uploadData);
      setCurrentUpload(uploadData);

      // Initialize progress tracking
      const initialProgress = {};
      uploadData.photos.forEach((photo, index) => {
        initialProgress[`photo_${index}`] = {
          status: 'pending',
          progress: 0,
          filename: `${photo.room}_${photo.type}.jpg`
        };
      });

      setUploadProgress(initialProgress);
      setStoreUploadProgress(initialProgress);

      setUploadStatus(UPLOAD_STATUS.UPLOADING);

      // Create progress callback
      const onProgress = (photoIndex, progress, status) => {
        const progressKey = `photo_${photoIndex}`;

        setUploadProgress(prev => ({
          ...prev,
          [progressKey]: {
            ...prev[progressKey],
            progress,
            status
          }
        }));

        setStoreUploadProgress(prevStore => ({
          ...prevStore,
          [progressKey]: {
            ...prevStore[progressKey],
            progress,
            status
          }
        }));
      };

      // Perform upload
      const result = await uploadPhotos(uploadData, onProgress);

      if (result.success) {
        setUploadStatus(UPLOAD_STATUS.SUCCESS);
        toast.success(SUCCESS_MESSAGES.PHOTOS_UPLOADED);

        // Clear uploaded photos from local storage
        clearPropertyPhotos(propertyId);

        return {
          success: true,
          folderUrl: result.folderUrl,
          uploadedCount: result.uploadedCount,
          totalCount: uploadData.photos.length
        };
      } else {
        throw new Error(result.error || ERROR_MESSAGES.UPLOAD_FAILED);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus(UPLOAD_STATUS.ERROR);
      toast.error(error.message || ERROR_MESSAGES.UPLOAD_FAILED);

      return {
        success: false,
        error: error.message
      };
    }
  }, [
    setUploadStatus,
    setUploadData,
    setStoreUploadProgress,
    clearUploadData,
    clearPropertyPhotos
  ]);

  /**
   * Retry failed upload
   */
  const retryUpload = useCallback(async () => {
    if (!currentUpload) {
      toast.error('No upload to retry');
      return;
    }

    // Reset failed items to pending
    setUploadProgress(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        if (updated[key].status === 'error') {
          updated[key] = {
            ...updated[key],
            status: 'pending',
            progress: 0
          };
        }
      });
      return updated;
    });

    // Retry upload with current data
    const propertyId = currentUpload.property.id;
    return await uploadPropertyPhotos(propertyId);
  }, [currentUpload, uploadPropertyPhotos]);

  /**
   * Cancel current upload
   */
  const cancelUpload = useCallback(() => {
    setUploadStatus(UPLOAD_STATUS.IDLE);
    clearUploadData();
    setCurrentUpload(null);
    setUploadProgress({});
    toast.info('Upload cancelled');
  }, [setUploadStatus, clearUploadData]);

  /**
   * Get overall upload progress percentage
   */
  const getOverallProgress = useCallback(() => {
    const progressValues = Object.values(uploadProgress);
    if (progressValues.length === 0) return 0;

    const totalProgress = progressValues.reduce((sum, item) => sum + item.progress, 0);
    return Math.round(totalProgress / progressValues.length);
  }, [uploadProgress]);

  /**
   * Get upload statistics
   */
  const getUploadStats = useCallback(() => {
    const progressValues = Object.values(uploadProgress);

    const stats = {
      total: progressValues.length,
      pending: 0,
      uploading: 0,
      completed: 0,
      failed: 0
    };

    progressValues.forEach(item => {
      switch (item.status) {
        case 'pending':
          stats.pending++;
          break;
        case 'uploading':
          stats.uploading++;
          break;
        case 'completed':
          stats.completed++;
          break;
        case 'error':
          stats.failed++;
          break;
        default:
          stats.pending++;
      }
    });

    return stats;
  }, [uploadProgress]);

  /**
   * Check if upload is in progress
   */
  const isUploading = useCallback(() => {
    return uploadStatus === UPLOAD_STATUS.UPLOADING || uploadStatus === UPLOAD_STATUS.PREPARING;
  }, [uploadStatus]);

  /**
   * Check if upload can be retried
   */
  const canRetry = useCallback(() => {
    return uploadStatus === UPLOAD_STATUS.ERROR && currentUpload !== null;
  }, [uploadStatus, currentUpload]);

  /**
   * Get failed upload items
   */
  const getFailedItems = useCallback(() => {
    return Object.entries(uploadProgress)
      .filter(([, item]) => item.status === 'error')
      .map(([key, item]) => ({ key, ...item }));
  }, [uploadProgress]);

  /**
   * Get successful upload items
   */
  const getSuccessfulItems = useCallback(() => {
    return Object.entries(uploadProgress)
      .filter(([, item]) => item.status === 'completed')
      .map(([key, item]) => ({ key, ...item }));
  }, [uploadProgress]);

  /**
   * Reset upload state
   */
  const resetUploadState = useCallback(() => {
    setUploadStatus(UPLOAD_STATUS.IDLE);
    clearUploadData();
    setCurrentUpload(null);
    setUploadProgress({});
  }, [setUploadStatus, clearUploadData]);

  /**
   * Get estimated time remaining
   */
  const getEstimatedTimeRemaining = useCallback(() => {
    const stats = getUploadStats();
    const overallProgress = getOverallProgress();

    if (stats.total === 0 || overallProgress === 0) return null;

    // Rough estimation based on current progress
    // Assumes average upload time of 2 seconds per photo
    const avgTimePerPhoto = 2000; // milliseconds
    const remainingPhotos = stats.total - stats.completed;
    const estimatedMs = remainingPhotos * avgTimePerPhoto;

    return {
      totalMs: estimatedMs,
      minutes: Math.floor(estimatedMs / 60000),
      seconds: Math.floor((estimatedMs % 60000) / 1000)
    };
  }, [getUploadStats, getOverallProgress]);

  return {
    // State
    uploadStatus,
    uploadProgress,
    currentUpload,

    // Core upload methods
    uploadPropertyPhotos,
    retryUpload,
    cancelUpload,

    // Progress and statistics
    getOverallProgress,
    getUploadStats,
    getFailedItems,
    getSuccessfulItems,
    getEstimatedTimeRemaining,

    // Utility checks
    isUploading,
    canRetry,

    // State management
    resetUploadState
  };
};

export default useGoogleDriveUpload;