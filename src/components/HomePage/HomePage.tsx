import React from 'react';
import { Box, Button, Center, Heading, ChakraProvider } from '@chakra-ui/react';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <ChakraProvider>
      <div className="container">
        <Center h="100vh">
          <Box textAlign="center">
            <Heading as="h1" size="2xl" mb={8} fontFamily="Roboto, sans-serif" color="white">
              Welcome to University Portal
            </Heading>
            <Link to="/studentLogin">
              <Button
                leftIcon={<FaUserGraduate />}
                className="custom-button"
                fontFamily="Roboto, sans-serif"
                colorScheme="blue"
                variant="solid"
                size="lg"
                mr={4}
                mb={4}
              >
                Login as Student
              </Button>
            </Link>
            <Link to="/teacherLogin">
              <Button
                fontFamily="Roboto, sans-serif"
                leftIcon={<FaChalkboardTeacher />}
                className="custom-button"
                colorScheme="green"
                variant="solid"
                size="lg"
                ml={4}
                mb={4}
              >
                Login as Teacher
              </Button>
            </Link>
          </Box>
        </Center>
      </div>
    </ChakraProvider>
  );
};

export default HomePage;
