import { Request, Response } from 'express';
import attendence from '../model/attendence';
export const getAttendanceHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const attendanceHistory = await attendence.find().sort({ date: -1 });
    res.status(200).json(attendanceHistory);
  } catch (error) {
    console.error('Error fetching attendance history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
