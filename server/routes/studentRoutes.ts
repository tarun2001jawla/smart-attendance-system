import express from 'express';
import { studentSignup, studentLogin } from '../controller/studentController';

const router = express.Router();

router.post('/signup', studentSignup);
router.post('/login', studentLogin);

export default router;