// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Center,
//   FormControl,
//   FormLabel,
//   Input,
//   Heading,
//   useToast,
//   ChakraProvider,
// } from "@chakra-ui/react";
// import * as faceapi from "face-api.js";
// import "./Signup.css";

// const StudentSignup: React.FC = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [rollNo, setRollNo] = useState("");
//   const [age, setAge] = useState("");
//   const [program, setProgram] = useState("");
//   const [batch, setBatch] = useState("");
//   const [password, setPassword] = useState("");
//   const [faceEmbedding, setFaceEmbedding] = useState<number[] | null>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isCapturing, setIsCapturing] = useState(false);
//   const [permissionGranted, setPermissionGranted] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const toast = useToast();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadModelsAndDetectFace = async () => {
//       const MODEL_URL = "/MODELS";
//       try {
//         console.log("Loading models...");
//         const loadedModels = await Promise.all([
//           faceapi.nets.ssdMobilenetv1.loadFromUri(
//             `${MODEL_URL}/ssd_mobilenetv1_model`
//           ),
//           faceapi.nets.faceRecognitionNet.loadFromUri(
//             `${MODEL_URL}/face_recognition_model`
//           ),
//           faceapi.nets.faceLandmark68Net.loadFromUri(
//             `${MODEL_URL}/face_landmark_68_model`
//           ),
//         ])

//           .then(async () => {
//             console.log("Models loaded.");
//             // Log the loaded models
//             console.log("Loaded models:", loadedModels);
//             // Perform face detection after the models have loaded
//             if (videoRef.current) {
//               console.log("Starting face detection...");
//               const detection = await faceapi
//                 .detectSingleFace(videoRef.current)
//                 .withFaceLandmarks()
//                 .withFaceDescriptor();
//               if (detection) {
//                 setFaceEmbedding(Array.from(detection.descriptor));
//                 toast({
//                   title: "Face Captured",
//                   description: "Face embedding captured successfully.",
//                   status: "success",
//                   duration: 3000,
//                   isClosable: true,
//                 });
//                 console.log("Face detected.");
//               } else {
//                 console.log("Failed to capture face");
//                 toast({
//                   title: "Face Capture Failed",
//                   description: "Unable to capture face. Please try again.",
//                   status: "error",
//                   duration: 3000,
//                   isClosable: true,
//                 });
//               }
//             } else {
//               console.error("Video element not found");
//             }
//           })
//           .catch((error) => {
//             console.error("Error loading models or detecting face:", error);
//           });
//       } catch (error) {
//         console.error("Error loading models or detecting face:", error);
//       }
//     };

//     const handlePermission = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           console.log("Video stream available.");
//         }
//         setPermissionGranted(true);
//         setIsLoading(false);
//       } catch (err) {
//         console.error("Error accessing camera:", err);
//         toast({
//           title: "Error",
//           description:
//             "Unable to access camera. Please check your device settings.",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//         setIsLoading(false);
//       }
//     };

//     loadModelsAndDetectFace();
//     handlePermission();
//   }, [toast]);

//   const detectFace = async () => {
//     if (videoRef.current && canvasRef.current && !isLoading) {
//       console.log("Detecting face...");
//       const detection = await faceapi
//         .detectSingleFace(videoRef.current)
//         .withFaceLandmarks()
//         .withFaceDescriptor();

//       if (detection) {
//         setFaceEmbedding(Array.from(detection.descriptor));
//         // Inside the try block of loadModelsAndDetectFace function
//         console.log("Model loading response:", detection);
//         toast({
//           title: "Face Captured",
//           description: "Face embedding captured successfully.",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });
//         console.log("Face detected.");
//       } else {
//         console.log("Failed to capture face");
//         toast({
//           title: "Face Capture Failed",
//           description: "Unable to capture face. Please try again.",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//       }
//     }
//   };

//   const handleSignup = async () => {
//     if (
//       !name ||
//       !email ||
//       !rollNo ||
//       !age ||
//       !program ||
//       !batch ||
//       !password ||
//       !faceEmbedding
//     ) {
//       console.log("Missing required fields");
//       toast({
//         title: "Warning",
//         description: "Please fill in all fields and capture your face.",
//         status: "warning",
//         duration: 3000,
//         isClosable: true,
//       });
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/students/signup",
//         { name, email, rollNo, age, program, batch, password, faceEmbedding },
//         { withCredentials: true }
//       );

//       console.log("Signup response:", response.data);

//       toast({
//         title: "Signup Successful",
//         description: `Welcome, ${name}`,
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//       navigate("/studentDashboard");
//       // Reset form data
//       setName("");
//       setEmail("");
//       setRollNo("");
//       setAge("");
//       setProgram("");
//       setBatch("");
//       setPassword("");
//       setFaceEmbedding(null);
//     } catch (error) {
//       console.error("Signup error:", error);

//       toast({
//         title: "Signup Failed",
//         description:
//           "There was an error creating your account. Please try again.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <ChakraProvider>
//       <div className="signup-container">
//         <Center h="100vh">
//           <Box
//             className="signup-box"
//             p={8}
//             borderWidth={1}
//             borderRadius={8}
//             boxShadow="lg"
//           >
//             <Heading as="h1" size="xl" mb={6}>
//               Student Signup
//             </Heading>
//             <FormControl id="name" mb={4}>
//               <FormLabel>Name</FormLabel>
//               <Input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your name"
//               />
//             </FormControl>
//             <FormControl id="email" mb={4}>
//               <FormLabel>Email</FormLabel>
//               <Input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//               />
//             </FormControl>
//             <FormControl id="rollNo" mb={4}>
//               <FormLabel>Roll Number</FormLabel>
//               <Input
//                 type="text"
//                 value={rollNo}
//                 onChange={(e) => setRollNo(e.target.value)}
//                 placeholder="Enter your roll number"
//               />
//             </FormControl>
//             <FormControl id="age" mb={4}>
//               <FormLabel>Age</FormLabel>
//               <Input
//                 type="number"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//                 placeholder="Enter your age"
//               />
//             </FormControl>
//             <FormControl id="program" mb={4}>
//               <FormLabel>Program</FormLabel>
//               <Input
//                 type="text"
//                 value={program}
//                 onChange={(e) => setProgram(e.target.value)}
//                 placeholder="Enter your program"
//               />
//             </FormControl>
//             <FormControl id="batch" mb={4}>
//               <FormLabel>Batch</FormLabel>
//               <Input
//                 type="text"
//                 value={batch}
//                 onChange={(e) => setBatch(e.target.value)}
//                 placeholder="Enter your batch"
//               />
//             </FormControl>
//             <FormControl id="password" mb={6}>
//               <FormLabel>Password</FormLabel>
//               <Input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//               />
//             </FormControl>
//             {isCapturing ? (
//               <>
//                 <video
//                   ref={videoRef}
//                   autoPlay
//                   style={{ width: "100%", height: "auto" }}
//                 />
//                 <canvas ref={canvasRef} style={{ display: "none" }} />
//                 <Button
//                   colorScheme="blue"
//                   size="lg"
//                   width="full"
//                   onClick={detectFace}
//                   mt={4}
//                 >
//                   Capture Face
//                 </Button>
//               </>
//             ) : (
//               <Button
//                 colorScheme="blue"
//                 size="lg"
//                 width="full"
//                 onClick={() => setIsCapturing(true)}
//                 mt={4}
//                 disabled={isLoading || !permissionGranted}
//               >
//                 Enroll Face
//               </Button>
//             )}
//             <Button
//               colorScheme="blue"
//               size="lg"
//               width="full"
//               onClick={handleSignup}
//               mt={4}
//             >
//               Signup
//             </Button>
//             <Link to="/studentLogin" className="back-link">
//               &#8592; Back to Login
//             </Link>
//           </Box>
//         </Center>
//       </div>
//     </ChakraProvider>
//   );
// };

// export default StudentSignup;
