import mongoose, { Schema, Document } from 'mongoose';

interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
}

const TeacherSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Teacher = mongoose.model<ITeacher>('Teacher', TeacherSchema);

