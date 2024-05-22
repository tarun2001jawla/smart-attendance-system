/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceHistoryList from './AttendanceHistoryList';

const AttendanceHistory: React.FC = () => {
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchAttendanceHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/attendance/history');
        setAttendanceHistory(response.data);
      } catch (error) {
        console.error('Error fetching attendance history:', error);
      }
    };

    fetchAttendanceHistory();
  }, []);

  return (
    <div>
      <AttendanceHistoryList attendanceHistory={attendanceHistory} />
    </div>
  );
};

export default AttendanceHistory;
