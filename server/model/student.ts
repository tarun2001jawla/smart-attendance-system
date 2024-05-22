import mongoose, { Schema, Document } from 'mongoose';

interface IStudent extends Document {
  name: string;
  email: string;
  rollNo: string;
  age: number;
  program: string;
  batch: string;
  password: string;
  // faceEmbedding: number[]; // Array to store the face embeddings
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNo: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  program: { type: String, required: true },
  batch: { type: String, required: true },
  password: { type: String, required: true },
  // faceEmbedding: { type: [Number], required: false }, // Add faceEmbedding field
});

export const Student = mongoose.model<IStudent>('Student', StudentSchema);
