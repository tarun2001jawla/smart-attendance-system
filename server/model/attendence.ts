// Model
import mongoose, { Schema, Document } from 'mongoose';

interface IAttendance extends Document {
  id: string; // Add unique ID field
  name: string;
  email: string;
  rollNo: string;
  age: number;
  program: string;
  batch: string;
  date: Date;
}

const AttendanceSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    email: { type: String, required: false, unique: false },
    rollNo: { type: String, required: false, unique: false },
    age: { type: Number, required: false },
    program: { type: String, required: false },
    batch: { type: String, required: false },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);
