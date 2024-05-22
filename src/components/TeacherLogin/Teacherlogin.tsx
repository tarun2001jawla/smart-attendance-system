import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
  ChakraProvider,
} from '@chakra-ui/react';
import './Teacherlogin.css';

const TeacherLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: 'Warning',
        description: 'Please fill in both fields.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/teachers/login',
        { email, password },
        { withCredentials: true }
      );

      console.log('Login response:', response.data);

      toast({
        title: 'Login Successful',
        description: `Welcome, ${email}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset form data
      setEmail('');
      setPassword('');

      // Redirect to Teacher Dashboard
      navigate('/teacher-dashboard');
    } catch (error) {
      console.error('Login error:', error);

      toast({
        title: 'Login Failed',
        description: 'Invalid email or password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <div className="login-container">
        <Center h="100vh">
          <Box className="login-box" p={8} borderWidth={1} borderRadius={8} boxShadow="lg" fontFamily="Roboto, sans-serif">
            <Heading as="h1" size="xl" mb={6}>
              Teacher Login
            </Heading>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl id="password" mb={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>
            <Button colorScheme="green" size="lg" width="full" onClick={handleLogin}>
              Login
            </Button>
            <Link to="/" className="back-link">&#8592; Back to Home</Link> {/* Link to Home */}
          </Box>
        </Center>
      </div>
    </ChakraProvider>
  );
};

export default TeacherLogin;
