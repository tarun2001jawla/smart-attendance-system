import express from 'express';
import { checkAttendanceTime } from '../controller/lastAttendance'
const router = express.Router();

router.post('/', checkAttendanceTime);

export default router;