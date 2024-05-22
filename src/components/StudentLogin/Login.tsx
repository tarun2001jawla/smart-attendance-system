import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
import './Login.css';

const StudentLogin: React.FC = () => {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
    if (!rollNo || !password) {
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
        'http://localhost:8000/api/students/login',
        { rollNo, password },
        { withCredentials: true }
      );

      console.log('Login response:', response.data);

      toast({
        title: 'Login Successful',
        description: `Welcome, Roll Number: ${rollNo}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/studentDashboard');
      
      setRollNo('');
      setPassword('');
    } catch (error) {
      console.error('Login error:', error);

      toast({
        title: 'Login Failed',
        description: 'Invalid roll number or password.',
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
          <Box className="login-box" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
            <Heading as="h1" size="xl" mb={6}>
              Student Login
            </Heading>
            <FormControl id="rollNo" mb={4}>
              <FormLabel>Roll Number</FormLabel>
              <Input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="Enter your roll number"
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
            <Button colorScheme="blue" size="lg" width="full" onClick={handleLogin}>
              Login
            </Button>
            <Link to="/" className="back-link">&#8592; Back to Home</Link> {/* Link to Home */}
          </Box>
          
        </Center>
      </div>
    </ChakraProvider>
  );
};

export default StudentLogin;
