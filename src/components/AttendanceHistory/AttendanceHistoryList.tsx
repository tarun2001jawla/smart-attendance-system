import React from 'react';
import { Box, Heading, ChakraProvider, SimpleGrid } from '@chakra-ui/react';
import AttendanceHistoryCard from './AttendanceHistoryCard';

interface AttendanceHistoryListProps {
  attendanceHistory: {
    name: string;
    rollNo: string;
    email: string;
    date: string;
  }[];
}

const AttendanceHistoryList: React.FC<AttendanceHistoryListProps> = ({ attendanceHistory }) => {
  return (
    <ChakraProvider>
      <Box fontFamily="Roboto, sans-serif" p={4}>
        <Heading as="h2" size="lg" mb="4" mt={10} textAlign="center">Attendance History</Heading>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} mt={10}>
          {attendanceHistory.map((record, index) => (
            <AttendanceHistoryCard
              key={index}
              name={record.name}
              rollNo={record.rollNo}
              email={record.email}
              date={record.date}
            />
          ))}
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
};

export default AttendanceHistoryList;
