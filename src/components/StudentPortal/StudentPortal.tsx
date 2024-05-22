import React, { useState } from 'react';
import { Box, Heading, ChakraProvider, Button, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import WebcamPreview from '../../components/Webcam/Webcam';
import axios from 'axios';
import './StudentPortal.css';

const StudentDashboard: React.FC = () => {
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const toast = useToast();

  const handleMarkAttendance = () => {
    setIsAttendanceModalOpen(true);
  };

  const handleCloseAttendanceModal = () => {
    setIsAttendanceModalOpen(false);
  };

  const handleQRCodeScanned = async (data: string) => {
    try {
      const parsedData = JSON.parse(data);

      console.log("data in QR:", parsedData);

      // Check if parsedData contains the expected fields
      if (!parsedData.name || !parsedData.email || !parsedData.rollNo || !parsedData.age || !parsedData.program || !parsedData.batch || !parsedData.id) {
        throw new Error('Invalid QR code data');
      }

      // Send a request to check last attendance time
      const response = await axios.post(
        'http://localhost:8000/api/check_attendance_time',
        {
          email: parsedData.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const lastAttendanceTime = new Date(response.data.lastAttendanceTime);
      const currentTime = new Date();
      const timeDifference = currentTime.getTime() - lastAttendanceTime.getTime();
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

      if (hoursDifference < 24) {
        // Display toast message indicating attendance already marked
        toast({
          title: 'Info',
          description: 'You have already marked attendance for today.',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Proceed with marking attendance
        const attendanceResponse = await axios.post(
          'http://localhost:8000/api/mark_attendance',
          {
            name: parsedData.name,
            email: parsedData.email,
            rollNo: parsedData.rollNo,
            age: parsedData.age,
            program: parsedData.program,
            batch: parsedData.batch,
            id: parsedData.id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        console.log('Response from server:', attendanceResponse.data);

        toast({
          title: 'Attendance Marked Successfully',
          description: 'Your attendance has been marked successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
      
      toast({
        title: 'Invalid QR Code',
        description: 'The scanned QR code is not valid. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <div className="dashboard-container">
        <Box className="dashboard-box">
          <Heading as="h1">Student Dashboard</Heading>
          <Button onClick={handleMarkAttendance} className="dashboard-button" colorScheme="blue">
            Mark Attendance
          </Button>
          <Button as={Link} to="/attendance-history" className="dashboard-button" colorScheme="teal">
            View Attendance History
          </Button>
        </Box>
        <Button as={Link} to="/" className="logout-button">
          Logout
        </Button>
        {isAttendanceModalOpen && <WebcamPreview onClose={handleCloseAttendanceModal} onQRCodeScanned={handleQRCodeScanned} />}
      </div>
    </ChakraProvider>
  );
};

export default StudentDashboard;
