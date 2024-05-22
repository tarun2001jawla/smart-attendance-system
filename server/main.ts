import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes';
import teacherRoutes from './routes/teacherRoutes';
import attendanceRoutes from './routes/attendanceRoutes'
import attendanceHistoryRoute from './routes/attendanceHistory'
import checkAttendanceRoute from './routes/lastAttendanceRoute'
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;


// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// MongoDB connection
mongoose
  .connect(process.env.MONGO_DB_URL!, {
    
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB', error));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/mark_attendance', attendanceRoutes);
app.use('/api/check_attendance_time',checkAttendanceRoute);
app.use('/api',attendanceHistoryRoute)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});