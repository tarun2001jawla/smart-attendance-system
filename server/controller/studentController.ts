import { Request, Response } from 'express';
import {Student} from '../model/student';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Student Sign-up
export const studentSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, rollNo, age, program, batch, password } = req.body;

    // Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new student
    const newStudent = new Student({
      name,
      email,
      rollNo,
      age,
      program,
      batch,
      password: hashedPassword,
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();

    // Generate a JWT token
    const token = jwt.sign({ id: savedStudent._id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Student Login
export const studentLogin = async (req: Request, res: Response) => {
  try {
    const { rollNo, password} = req.body;

    // Check if the student exists
    const student = await Student.findOne({ rollNo });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};