import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Heading,
  ChakraProvider,
} from '@chakra-ui/react';
import './TeacherDashboard.css';

const TeacherDashboard: React.FC = () => {
  return (
    <ChakraProvider>
      <div className="dashboard-container">
        <Center h="100vh" fontFamily="Roboto, sans-serif">
          <Box className="dashboard-box" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
            <Heading as="h1" size="xl" mb={6} textAlign="center">
              Teacher Dashboard
            </Heading>
            <Button as={Link} to="/attendance-history" colorScheme="teal" size="lg" width="full" mb={4}>
              View Attendance Records
            </Button>
            <Button as={Link} to="/generate-qr" colorScheme="blue" size="lg" width="full">
              Generate QR Code
            </Button>
          </Box>
        </Center>
      </div>
    </ChakraProvider>
  );
};

export default TeacherDashboard;
