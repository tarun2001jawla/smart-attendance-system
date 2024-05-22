import { Request, Response } from "express";
import Attendance from "../model/attendence";

export const submitAttendance = async (req: Request, res: Response) => {
  try {
    const { name, email, rollNo, age, program, batch,date,id } = req.body;

    const newAttendance = new Attendance({
      name,
      email,
      rollNo,
      age,
      program,
      batch,
      date,
      id
    });

    await newAttendance.save();
    console.log('Response object:', res); 

    res.status(201).json({ message: "Attendance submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting attendance" });
  }
};
