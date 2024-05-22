import './App.css';
import HomePage from './components/HomePage/HomePage';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentLogin from './components/StudentLogin/Login';
import TeacherLogin from './components/TeacherLogin/Teacherlogin';
import StudentDashboard from './components/StudentPortal/StudentPortal';
// import StudentSignup from './components/StudentSignup/Signup';
import TeacherDashboard from './components/TeacherDashboard/TeacherDashboard';
import QRCodeForm from './components/QRCodeGenerator/QRCodeGenerator';
import AttendanceHistory from './components/AttendanceHistory/AttendanceHistory';
function App() {
  return (
    <BrowserRouter >
      <ChakraProvider  >
        <Routes>
          <Route path="/" element={<HomePage />}  />
          <Route path="/studentLogin" element={<StudentLogin />} />
          {/* <Route path="/studentSignup" element={<StudentSignup />} /> */}
          <Route path="/teacherLogin" element={<TeacherLogin/>} />
          <Route path="/studentDashboard" element={<StudentDashboard/>} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/generate-qr" element={<QRCodeForm />} />
          <Route path="/attendance-history" element={<AttendanceHistory />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
