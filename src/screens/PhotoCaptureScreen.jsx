import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, Grid3X3, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import Container, { ScreenContainer } from '@components/Layout/Container';
import Header from '@components/Layout/Header';
import Button from '@components/UI/Button';
import CameraView from '@components/Camera/CameraView';
import RoomSelector, { QuickRoomSelector } from '@components/RoomSelector/RoomSelector';
import ModeSelector from '@components/ModeSelector/ModeSelector';
import PhotoGrid from '@components/PhotoGallery/PhotoGrid';
import useAppStore from '@store/useAppStore';
import usePhotoCapture from '@hooks/usePhotoCapture';

const PhotoCaptureScreen = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [showRoomSelector, setShowRoomSelector] = useState(false);
  const [showPhotoGrid, setShowPhotoGrid] = useState(false);

  // Zustand store
  const {
    currentProperty,
    currentRoom,
    currentMode,
    setCurrentProperty,
    setCurrentRoom,
    setCurrentMode,
    getRoomPhotoStatus,
    getPhotoCount,
    deletePhoto,
    properties
  } = useAppStore();

  // Photo capture hook
  const {
    captureAndAdvance,
    getReferencePhoto,
    getCurrentPropertyPhotos,
    getPhotoSummary,
    isReadyToUpload
  } = usePhotoCapture();

  // Find current property
  useEffect(() => {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      setCurrentProperty(property);
    } else {
      navigate('/properties');
    }
  }, [propertyId, properties, setCurrentProperty, navigate]);

  // Auto-select first room if none selected
  useEffect(() => {
    if (!currentRoom && currentProperty) {
      setCurrentRoom('kitchen'); // Default to kitchen
    }
  }, [currentRoom, currentProperty, setCurrentRoom]);

  const handlePhotoCapture = async (videoElement) => {
    if (!currentProperty || !currentRoom) {
      toast.error('Please select a room first');
      return;
    }

    await captureAndAdvance(videoElement);
  };

  const handleRoomSelect = (roomId) => {
    setCurrentRoom(roomId);
    setShowRoomSelector(false);
  };

  const handleUpload = () => {
    if (!isReadyToUpload()) {
      toast.warning('Take some photos before uploading');
      return;
    }
    navigate('/upload');
  };

  const handlePhotoDelete = (photo) => {
    deletePhoto(photo.roomId, photo.room, photo.type);
    toast.success('Photo deleted');
  };

  const photoSummary = getPhotoSummary();
  const currentRoomStatus = getRoomPhotoStatus(currentProperty?.id, currentRoom);
  const referencePhoto = getReferencePhoto();
  const propertyPhotos = getCurrentPropertyPhotos();

  if (!currentProperty) {
    return null;
  }

  return (
    <ScreenContainer>
      <Header
        title={currentProperty.name}
        subtitle={`${photoSummary.total} photos • ${photoSummary.complete} rooms complete`}
        showBackButton
        onBackPress={() => navigate('/properties')}
        rightAction={
          <Button
            variant="ghost"
            size="small"
            icon={Upload}
            onClick={handleUpload}
            disabled={!isReadyToUpload()}
          />
        }
      />

      <div className="flex flex-col h-full">
        {/* Room selector */}
        <div className="p-4 border-b border-gray-200">
          <QuickRoomSelector
            selectedRoom={currentRoom}
            onRoomSelect={handleRoomSelect}
            roomStatuses={Object.fromEntries(
              Object.keys(propertyPhotos).map(roomId => [
                roomId,
                getRoomPhotoStatus(currentProperty.id, roomId)
              ])
            )}
          />
        </div>

        {/* Mode selector */}
        <div className="px-4 py-3 border-b border-gray-200">
          <ModeSelector
            currentMode={currentMode}
            onModeChange={setCurrentMode}
            roomStatus={currentRoomStatus}
            layout="toggle"
          />
        </div>

        {/* Camera view */}
        <div className="flex-1 bg-black">
          <CameraView
            onPhotoCapture={handlePhotoCapture}
            referenceImage={referencePhoto}
            showControls={true}
            onError={(error) => toast.error(error)}
          />
        </div>

        {/* Bottom controls */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="medium"
              onClick={() => setShowPhotoGrid(true)}
              className="flex-1"
            >
              View Photos ({photoSummary.total})
            </Button>

            <Button
              variant="primary"
              size="medium"
              icon={Upload}
              onClick={handleUpload}
              disabled={!isReadyToUpload()}
              className="flex-1"
            >
              Upload Photos
            </Button>
          </div>
        </div>
      </div>

      {/* Photo grid modal */}
      {showPhotoGrid && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <Header
            title="Photos"
            subtitle={`${photoSummary.total} photos taken`}
            showBackButton
            onBackPress={() => setShowPhotoGrid(false)}
          />
          <Container>
            <PhotoGrid
              photos={propertyPhotos}
              onPhotoDelete={handlePhotoDelete}
              showControls={true}
            />
          </Container>
        </div>
      )}
    </ScreenContainer>
  );
};

export default PhotoCaptureScreen;