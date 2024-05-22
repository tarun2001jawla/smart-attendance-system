import { Router } from 'express';
import { getAttendanceHistory } from '../controller/attendanceHistoryController';

const router = Router();

router.get('/attendance/history', getAttendanceHistory);

export default router;
