// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import emailjs from "emailjs-com";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, firestore } from "../../index"; // Adjust to your Firebase config
// import { addDoc, collection, getDocs } from "firebase/firestore";
// import bcrypt from "bcryptjs"; // Import bcrypt
// import "./Signup.css";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [generatedOtp, setGeneratedOtp] = useState(null);
//   const [showOtpPopup, setShowOtpPopup] = useState(false);
//   const [error, setError] = useState("");
//   const [requiredDomain, setRequiredDomain] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRequiredDomain = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(firestore, "Universities"));
//         const domains = querySnapshot.docs.map((doc) => doc.data().email);
//         if (domains.length > 0) {
//           setRequiredDomain(domains[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching required domain:", error);
//         setError("Failed to fetch required email domain. Please try again.");
//       }
//     };
//     fetchRequiredDomain();
//   }, []);

//   const validateEmail = (email) => {
//     const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
//     const emailDomain = email.split("@")[1];

//     if (!emailPattern.test(email)) {
//       return "Invalid email format. Please enter a valid email.";
//     }

//     if (emailDomain !== requiredDomain) {
//       return `Please use your university email ending with @${requiredDomain}.`;
//     }

//     return null;
//   };

//   const sendOtp = async () => {
//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     setGeneratedOtp(otpCode);

//     const templateParams = {
//       to_email: email,
//       otp: otpCode,
//     };

//     try {
//       await emailjs.send(
//         "service_hk9n4fh",
//         "template_6x9s01a",
//         templateParams,
//         "iC2xMIi8s1n79MzdT"
//       );
//       console.log("OTP sent successfully to", email);
//       setShowOtpPopup(true);
//     } catch (error) {
//       console.error("Failed to send OTP:", error);
//       setError("Failed to send OTP. Please try again.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!requiredDomain) {
//       setError("Required email domain not available. Please try again later.");
//       return;
//     }

//     const emailError = validateEmail(email);
//     if (emailError) {
//       setError(emailError);
//       return;
//     }

//     sendOtp();
//   };

//   const handleOtpVerification = async () => {
//     if (otp === generatedOtp) {
//       try {
//         const hashedPassword = bcrypt.hashSync(password, 10); // Hash password

//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         const studentsCollectionRef = collection(firestore, "students");

//         await addDoc(studentsCollectionRef, {
//           email: user.email,
//           username: username,
//           password: hashedPassword, // Save hashed password
//           userId: user.uid,
//         });

//         console.log("Student registered successfully");
//         setShowOtpPopup(false);
//         navigate("/");
//       } catch (error) {
//         console.error("Error creating student:", error);
//         setError("An error occurred while registering. Please try again.");
//       }
//     } else {
//       setError("Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="left-panel">
//         <h2>Student Career Hub</h2>
//         <p>New Here?</p>
//         <p>Sign Up and Discover a great amount of new opportunities</p>
//       </div>
//       <div className="form-container">
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           <label className="label">Username</label>
//           <input
//             className="input-field2"
//             type="text"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />

//           <label className="label">Email</label>
//           <input
//             className="input-field2"
//             type="email"
//             placeholder="your@email.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label className="label">Password</label>
//           <input
//             className="input-field2"
//             type="password"
//             placeholder="••••••••"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           {error && <div className="error-message">{error}</div>}

//           <button type="submit" className="signin-button">
//             Sign Up
//           </button>
//         </form>

//         {showOtpPopup && (
//           <div className="otp-popup">
//             <div className="otp-content">
//               <h3>Enter OTP</h3>
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//               <div className="otp-buttons">
//                 <button className="form-button" onClick={handleOtpVerification}>
//                   Verify OTP
//                 </button>
//                 <button
//                   className="form-button cancel-button"
//                   onClick={() => setShowOtpPopup(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="link-section">
//           Already have an account? <a href="/">Login</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../index"; // Adjust to your Firebase config
import { addDoc, collection, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs"; // Import bcrypt
import "./Signup.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [error, setError] = useState("");
  const [requiredDomain, setRequiredDomain] = useState(null);
  const [universities, setUniversities] = useState([]); // List of universities
  const [selectedUniversity, setSelectedUniversity] = useState(""); // Selected university
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Universities"));
        const universitiesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
        }));
        setUniversities(universitiesList);

        if (universitiesList.length > 0) {
          setRequiredDomain(universitiesList[0].email);
        }
      } catch (error) {
        console.error("Error fetching universities:", error);
        setError("Failed to fetch universities. Please try again.");
      }
    };
    fetchUniversities();
  }, []);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    const emailDomain = email.split("@")[1];

    if (!emailPattern.test(email)) {
      return "Invalid email format. Please enter a valid email.";
    }

    if (emailDomain !== requiredDomain) {
      return `Please use your university email ending with @${requiredDomain}.`;
    }

    return null;
  };

  const sendOtp = async () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);

    const templateParams = {
      to_email: email,
      otp: otpCode,
    };

    try {
      await emailjs.send(
        "service_hk9n4fh",
        "template_6x9s01a",
        templateParams,
        "iC2xMIi8s1n79MzdT"
      );
      console.log("OTP sent successfully to", email);
      setShowOtpPopup(true);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!requiredDomain) {
      setError("Required email domain not available. Please try again later.");
      return;
    }

    if (!selectedUniversity) {
      setError("Please select a university.");
      return;
    }

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    sendOtp();
  };

  const handleOtpVerification = async () => {
    if (otp === generatedOtp) {
      try {
        const hashedPassword = bcrypt.hashSync(password, 10); // Hash password

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const studentsCollectionRef = collection(firestore, "students");

        await addDoc(studentsCollectionRef, {
          email: user.email,
          username: username,
          password: hashedPassword, // Save hashed password
          userId: user.uid,
          university: selectedUniversity, // Save selected university
        });

        console.log("Student registered successfully");
        setShowOtpPopup(false);
        navigate("/");
      } catch (error) {
        console.error("Error creating student:", error);
        setError("An error occurred while registering. Please try again.");
      }
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="left-panel">
        <h2>Student Career Hub</h2>
        <p>New Here?</p>
        <p>Sign Up and Discover a great amount of new opportunities</p>
      </div>
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label className="label">Username</label>
          <input
            className="input-field2"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="label">Email</label>
          <input
            className="input-field2"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label">Password</label>
          <input
            className="input-field2"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="label">Select University</label>
          <select
            className="input-field2"
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            required
          >
            <option value="" disabled>
              Select your university
            </option>
            {universities.map((uni) => (
              <option key={uni.id} value={uni.name}>
                {uni.name}
              </option>
            ))}
          </select>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="signin-button">
            Sign Up
          </button>
        </form>

        {showOtpPopup && (
          <div className="otp-popup">
            <div className="otp-content">
              <h3>Enter OTP</h3>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <div className="otp-buttons">
                <button className="form-button" onClick={handleOtpVerification}>
                  Verify OTP
                </button>
                <button
                  className="form-button cancel-button"
                  onClick={() => setShowOtpPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="link-section">
          Already have an account? <a href="/">Login</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
