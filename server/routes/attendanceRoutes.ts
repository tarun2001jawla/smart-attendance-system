import { Router } from 'express';
import { submitAttendance } from '../controller/attendanceController';

const router = Router();

router.post('/', submitAttendance);

export default router;