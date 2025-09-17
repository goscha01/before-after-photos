import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Upload, ArrowLeft, RefreshCw } from 'lucide-react';
import Container, { ScreenContainer } from '@components/Layout/Container';
import Header from '@components/Layout/Header';
import Button from '@components/UI/Button';
import StatusMessage from '@components/UI/StatusMessage';
import useAppStore from '@store/useAppStore';
import useGoogleDriveUpload from '@hooks/useGoogleDriveUpload';
import { UPLOAD_STATUS } from '@utils/constants';

const UploadStatusScreen = () => {
  const navigate = useNavigate();

  // Zustand store
  const { currentProperty, uploadStatus } = useAppStore();

  // Upload hook
  const {
    uploadPropertyPhotos,
    retryUpload,
    getOverallProgress,
    getUploadStats,
    isUploading,
    canRetry,
    resetUploadState
  } = useGoogleDriveUpload();

  // Auto-start upload when screen loads
  useEffect(() => {
    if (currentProperty && uploadStatus === UPLOAD_STATUS.IDLE) {
      uploadPropertyPhotos(currentProperty.id);
    }
  }, [currentProperty, uploadStatus, uploadPropertyPhotos]);

  const handleRetry = () => {
    if (currentProperty) {
      retryUpload();
    }
  };

  const handleDone = () => {
    resetUploadState();
    navigate('/properties');
  };

  const handleStartNew = () => {
    resetUploadState();
    navigate('/properties');
  };

  const progress = getOverallProgress();
  const stats = getUploadStats();

  if (!currentProperty) {
    navigate('/properties');
    return null;
  }

  return (
    <ScreenContainer>
      <Header
        title="Upload Status"
        subtitle={currentProperty.name}
        showBackButton
        onBackPress={() => navigate(`/capture/${currentProperty.id}`)}
      />

      <Container className="flex-1 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full space-y-6">
          {/* Upload status */}
          <div className="text-center">
            {uploadStatus === UPLOAD_STATUS.SUCCESS ? (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} className="text-green-600" />
              </div>
            ) : uploadStatus === UPLOAD_STATUS.ERROR ? (
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={40} className="text-red-600" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload size={40} className="text-blue-600 animate-pulse" />
              </div>
            )}

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {uploadStatus === UPLOAD_STATUS.SUCCESS && 'Upload Complete!'}
              {uploadStatus === UPLOAD_STATUS.ERROR && 'Upload Failed'}
              {uploadStatus === UPLOAD_STATUS.UPLOADING && 'Uploading Photos...'}
              {uploadStatus === UPLOAD_STATUS.PREPARING && 'Preparing Upload...'}
            </h1>

            <p className="text-gray-600">
              {uploadStatus === UPLOAD_STATUS.SUCCESS && 'Your photos have been uploaded to Google Drive'}
              {uploadStatus === UPLOAD_STATUS.ERROR && 'Something went wrong with the upload'}
              {(uploadStatus === UPLOAD_STATUS.UPLOADING || uploadStatus === UPLOAD_STATUS.PREPARING) &&
                'Please wait while we upload your photos'}
            </p>
          </div>

          {/* Progress bar */}
          {isUploading() && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-center text-sm text-gray-500">
                {stats.completed} of {stats.total} photos uploaded
              </div>
            </div>
          )}

          {/* Upload statistics */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Upload Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total photos:</span>
                <span className="font-medium">{stats.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completed:</span>
                <span className="font-medium text-green-600">{stats.completed}</span>
              </div>
              {stats.failed > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Failed:</span>
                  <span className="font-medium text-red-600">{stats.failed}</span>
                </div>
              )}
            </div>
          </div>

          {/* Status messages */}
          {uploadStatus === UPLOAD_STATUS.SUCCESS && (
            <StatusMessage
              type="success"
              title="Upload Successful"
              message="All photos have been uploaded to your Google Drive"
            />
          )}

          {uploadStatus === UPLOAD_STATUS.ERROR && (
            <StatusMessage
              type="error"
              title="Upload Failed"
              message="There was an error uploading your photos. Please try again."
            />
          )}

          {/* Action buttons */}
          <div className="space-y-3">
            {uploadStatus === UPLOAD_STATUS.SUCCESS && (
              <>
                <Button
                  variant="primary"
                  size="large"
                  fullWidth
                  onClick={handleStartNew}
                >
                  Start New Session
                </Button>
                <Button
                  variant="outline"
                  size="large"
                  fullWidth
                  onClick={handleDone}
                >
                  Back to Properties
                </Button>
              </>
            )}

            {uploadStatus === UPLOAD_STATUS.ERROR && canRetry && (
              <>
                <Button
                  variant="primary"
                  size="large"
                  fullWidth
                  icon={RefreshCw}
                  onClick={handleRetry}
                >
                  Retry Upload
                </Button>
                <Button
                  variant="outline"
                  size="large"
                  fullWidth
                  onClick={() => navigate(`/capture/${currentProperty.id}`)}
                >
                  Back to Camera
                </Button>
              </>
            )}

            {isUploading() && (
              <Button
                variant="outline"
                size="large"
                fullWidth
                onClick={() => navigate(`/capture/${currentProperty.id}`)}
              >
                Continue Taking Photos
              </Button>
            )}
          </div>
        </div>
      </Container>
    </ScreenContainer>
  );
};

export default UploadStatusScreen;