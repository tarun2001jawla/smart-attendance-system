import React from 'react';
import { Box, Text, Badge } from '@chakra-ui/react';

interface AttendanceHistoryCardProps {
  name: string;
  rollNo: string;
  email: string;
  date: string;
}

const AttendanceHistoryCard: React.FC<AttendanceHistoryCardProps> = ({ name, rollNo, email, date }) => {
  
  const backgroundColors = ['#FFFAF0', '#E6FFFA', '#FFF5F5', '#F0FFF4', '#EBF8FF', '#FAF5FF'];
  
  const randomBackgroundColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

  return (
    <Box fontFamily="Roboto, sans-serif"
      borderWidth="1px"
      borderRadius="md"
      p="4"
      maxW="sm"
      overflow="hidden"
      boxShadow="md"
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.02)' }}
      backgroundColor={randomBackgroundColor}
    >
      <Text fontSize="lg" fontWeight="bold" mb="2">
        {name}
      </Text>
      <Text fontSize="sm" mb="1">
        Roll No: {rollNo}
      </Text>
      <Text fontSize="sm" mb="1">
        Email: {email}
      </Text>
      <Text fontSize="sm" mb="1">
        Date: {date}
      </Text>
      <Badge colorScheme="green" fontSize="sm">
        Present
      </Badge>
    </Box>
  );
};

export default AttendanceHistoryCard;
