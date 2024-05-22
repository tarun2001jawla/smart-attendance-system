import { Request, Response } from 'express';
import {Teacher} from '../model/teacher';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
// Teacher Sign-up
export const teacherSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if the teacher already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new teacher
    const newTeacher = new Teacher({
      name,
      email,
      password: hashedPassword,
    });

    // Save the teacher to the database
    const savedTeacher = await newTeacher.save();

    // Generate a JWT token
    const token = jwt.sign({ id: savedTeacher._id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Teacher Login
export const teacherLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the teacher exists
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};