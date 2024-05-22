import { Request, Response } from "express";
import Attendance from "../model/attendence";

export const checkAttendanceTime = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const lastAttendance = await Attendance.findOne({ email }).sort({ date: -1 });

    if (!lastAttendance) {
      return res.status(200).json({ lastAttendanceTime: null });
    }

    res.status(200).json({ lastAttendanceTime: lastAttendance.date });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error checking attendance time" });
  }
};