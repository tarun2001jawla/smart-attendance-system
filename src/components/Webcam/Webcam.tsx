import React, { useState, useRef, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useToast } from '@chakra-ui/react';
import jsQR from 'jsqr';
import './Webcam.css';
import scanSound from '/Barcode-scanner-beep-sound.mp3';

const WebcamPreview: React.FC<{ onClose: () => void, onQRCodeScanned: (data: string) => void }> = ({ onClose, onQRCodeScanned }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);
  const streamRef = useRef<MediaStream | null>(null); // New ref to store the camera stream

  useEffect(() => {
    const handlePermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream; // Store the stream in the ref
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setPermissionGranted(true);
        setIsLoading(false);

        const qrCodeDetectorTask = setInterval(async () => {
          if (videoRef.current) {
            try {
              const canvas = document.createElement('canvas');
              canvas.width = videoRef.current.videoWidth;
              canvas.height = videoRef.current.videoHeight;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                  onQRCodeScanned(code.data);
                  playScanSound();
                }
              }
            } catch (err) {
              console.error('Error detecting QR code:', err);
            }
          }
        }, 500);

        return () => {
          clearInterval(qrCodeDetectorTask);
          stopStream(); // Call the stopStream function when the component unmounts
        };
      } catch (err) {
        console.error('Error accessing camera:', err);
        setIsLoading(false);
      }
    };

    handlePermission();
  }, [onQRCodeScanned]);

  // Function to stop the camera stream
  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    // Clean up the camera stream when the modal is closed
    return () => {
      stopStream();
    };
  }, []);

  const capture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        const capturedImage = canvas.toDataURL('image/png');
        setCapturedImage(capturedImage);
      }
    }
  };

  const isValidDate = () => {
    const today = new Date().toISOString().split('T')[0];
    const qrDate = capturedImage?.split('_')[1]?.split('.')[0];
    return qrDate === today;
  };

  const handleCapture = () => {
    if (!permissionGranted || isLoading) {
      toast({
        title: 'Error',
        description: 'Please wait for camera permissions to be granted.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!isValidDate()) {
      toast({
        title: 'Error',
        description: 'QR code is expired. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    capture();
  };

  const playScanSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="modal-content" fontFamily="Roboto, sans-serif">
        <ModalHeader className="modal-header">Show QR to mark attendance</ModalHeader>
        <ModalCloseButton className="modal-close-button" />
        <ModalBody className="modal-body">
          {capturedImage ? (
            <img src={capturedImage} alt="Captured" className="captured-image" />
          ) : isLoading ? (
            <p>Loading camera...</p>
          ) : permissionGranted ? (
            <div className="video-container">
              <video ref={videoRef} autoPlay className="video-preview" />
              <div className="scanner-overlay">
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
                <div className="scanning-line"></div>
              </div>
            </div>
          ) : (
            <p>Waiting for camera permissions...</p>
          )}
          <button onClick={handleCapture} disabled={!permissionGranted || isLoading} className="capture-button">
            Capture Photo
          </button>
        </ModalBody>
        
        <audio ref={audioRef} src={scanSound} />
      </ModalContent>
    </Modal>
  );
};

export default WebcamPreview;
