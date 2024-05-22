import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, ChakraProvider, useToast, Flex } from '@chakra-ui/react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';
import './QRCodeGenerator.css';

const QRCodeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [trimmedEmail, setTrimmedEmail] = useState(''); 
  const [rollNo, setRollNo] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [program, setProgram] = useState('');
  const [batch, setBatch] = useState('');
  const [qrData, setQrData] = useState('');
  const [date, setDate] = useState('');
  const toast = useToast();

  useEffect(() => {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const generateRandomId = (): string => {
    // Generate a random 4-digit ID
    const randomId = Math.floor(1000 + Math.random() * 9000).toString();
    return randomId;
  };

  const handleGenerateQR = () => {
    if (!name || !trimmedEmail || !rollNo || !age || !program || !batch || !date) {
      toast({
        title: 'Warning',
        description: 'Please fill in all fields.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Generate random ID
    const studentId = generateRandomId();

    // Combine student details with ID
    const studentDetails = { id: studentId, name, email: trimmedEmail, rollNo, age, program, batch, date };
    setQrData(JSON.stringify(studentDetails));

    toast({
      title: 'QR Code Generated',
      description: 'The QR code has been successfully generated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Reset form fields except date
    setName('');
    setEmail('');
    setTrimmedEmail(''); // Reset the trimmed email state
    setRollNo('');
    setAge('');
    setProgram('');
    setBatch('');
  };

  const handleDownloadQR = async () => {
    const qrCodeElement = document.getElementById('qr-code');
    if (qrCodeElement) {
      const dataUrl = await toPng(qrCodeElement);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${name}_QRCode.png`;
      link.click();
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    const trimmedEmail = inputEmail.trim(); // Trim the email
    setEmail(inputEmail);
    setTrimmedEmail(trimmedEmail);
  };

  return (
     <ChakraProvider>
      <div className="form-container">
        <Box className="form-box" p={8} borderWidth={1} borderRadius={8} boxShadow="lg" fontFamily="Roboto, sans-serif">
          <Heading as="h1" size="xl" mb={6} textAlign="center">
            Generate QR Code
          </Heading>
          <FormControl id="name" mb={4}>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter student name" />
          </FormControl>
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input value={email} onChange={handleEmailChange} placeholder="Enter student email" />
          </FormControl>
          <Flex mb={4}>
            <FormControl id="rollNo" mr={2}>
              <FormLabel>Roll No</FormLabel>
              <Input value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Enter roll number" />
            </FormControl>
            <FormControl id="age">
              <FormLabel>Age</FormLabel>
              <Input value={age} onChange={(e) => setAge(Number(e.target.value))} placeholder="Enter age" type="number" />
            </FormControl>
          </Flex>
          <Flex mb={4}>
            <FormControl id="program" mr={2}>
              <FormLabel>Program</FormLabel>
              <Input value={program} onChange={(e) => setProgram(e.target.value)} placeholder="Enter program" />
            </FormControl>
            <FormControl id="batch">
              <FormLabel>Batch</FormLabel>
              <Input value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="Enter batch" />
            </FormControl>
          </Flex>
          <FormControl id="date" mb={4}>
            <FormLabel>Date</FormLabel>
            <Input type="date" value={date} readOnly />
          </FormControl>
          <Button colorScheme="blue" size="lg" width="full" onClick={handleGenerateQR}>
            Generate QR Code
          </Button>
        </Box>
        {qrData && (
          <Box className="qr-box" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
            <Heading as="h2" size="md" mb={4} textAlign="center">
              Generated QR Code for {name}
            </Heading>
            <Box id="qr-code" className="qr-code" bg="white" p={4} borderRadius={8}>
              <QRCode value={qrData} size={256} fgColor="#6A0DAD" bgColor="#FFD700" />
            </Box>
            <Button mt={4} colorScheme="green" onClick={handleDownloadQR}>
              Download QR Code
            </Button>
          </Box>
        )}
      </div>
    </ChakraProvider>
  );
};

export default QRCodeForm;