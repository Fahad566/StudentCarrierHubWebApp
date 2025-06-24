// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../index";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { firestore } from "../../index";
// import "./Login.css";
// import universityImage from "../../assets/samford-hall-1614183_640.jpg";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       // Step 1: Authenticate the user with Firebase Authentication
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       console.log("Authenticated user:", user);

//       // Step 2: Fetch user details from Firestore
//       let userDetails = null;
//       let role = null;

//       // Check Main Admin
//       if (email === "fahadaziz2806@gmail.com") {
//         userDetails = { username: "Main Admin", email };
//         role = "mainAdmin";
//       } else {
//         // Check "students" collection
//         const studentQuery = query(collection(firestore, "students"), where("email", "==", email));
//         const studentSnapshot = await getDocs(studentQuery);

//         if (!studentSnapshot.empty) {
//           userDetails = studentSnapshot.docs[0].data();
//           role = "student";
//         } else {
//           // Check "UniAdmins" collection
//           const uniAdminQuery = query(collection(firestore, "UniAdmins"), where("email", "==", email));
//           const uniAdminSnapshot = await getDocs(uniAdminQuery);

//           if (!uniAdminSnapshot.empty) {
//             userDetails = uniAdminSnapshot.docs[0].data();
//             role = "uniAdmin";
//           } else {
//             // Check "teachers" collection
//             const teacherQuery = query(collection(firestore, "Teachers"), where("email", "==", email));
//             const teacherSnapshot = await getDocs(teacherQuery);

//             if (!teacherSnapshot.empty) {
//               userDetails = teacherSnapshot.docs[0].data();
//               role = "teacher";
//             }
//           }
//         }
//       }

//       // Step 3: Store user details locally and redirect based on role
//       if (userDetails && role) {
//         localStorage.setItem("authToken", user.accessToken);
//         localStorage.setItem("userDetails", JSON.stringify(userDetails));
//         console.log("User details stored:", userDetails);

//         // Redirect to the appropriate dashboard
//         switch (role) {
//           case "mainAdmin":
//             navigate("/dashboard"); // Main Admin Dashboard
//             break;
//           case "student":
//             navigate("/student-dashboard"); // Student Dashboard
//             break;
//           case "uniAdmin":
//             navigate("/uniadmin-dashboard"); // UniAdmin Dashboard
//             break;
//           case "teacher":
//             navigate("/teacher-dashboard"); // Teacher Dashboard
//             break;
//           default:
//             throw new Error("Unexpected role");
//         }
//       } else {
//         console.error("No user details found in Firestore.");
//         setError("You are not authorized to access this platform.");
//       }
//     } catch (error) {
//       console.error("Error during login:", error.message);

//       // Handle Firebase Authentication errors
//       if (error.code === "auth/user-not-found") {
//         setError("No user found with this email.");
//       } else if (error.code === "auth/wrong-password") {
//         setError("Incorrect password. Please try again.");
//       } else {
//         setError("Invalid email or password. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       {/* Left Side - Image */}
//       <div className="image-section">
//         <img src={universityImage} alt="University" className="university-image" />
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="form-section">
//         <h1 className="login-title">Login</h1>
//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="input-field"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="input-field"
//           />
//           <p className="forgot-password">Forgot Password?</p>
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//         <p className="signup-link">
//           Don’t Have An Account? <a href="Signup">Sign Up</a>
//         </p>
//         {error && <p className="error-message">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth , firestore } from "../../index";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./Login.css";
import universityImage from "../../assets/samford-hall-1614183_640.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Step 1: Authenticate the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Authenticated user:", user);

      // Step 2: Fetch user details from Firestore
      let userDetails = null;
      let role = null;

      // Check Main Admin
      if (email === "fahadaziz2806@gmail.com") {
        userDetails = { username: "Main Admin", email };
        role = "mainAdmin";
      } else {
        // Check "students" collection
        const studentQuery = query(collection(firestore, "students"), where("email", "==", email));
        const studentSnapshot = await getDocs(studentQuery);

        if (!studentSnapshot.empty) {
          userDetails = studentSnapshot.docs[0].data();
          role = "student";
        } else {
          // Check "UniAdmins" collection
          const uniAdminQuery = query(collection(firestore, "UniAdmins"), where("email", "==", email));
          const uniAdminSnapshot = await getDocs(uniAdminQuery);

          if (!uniAdminSnapshot.empty) {
            userDetails = uniAdminSnapshot.docs[0].data();
            role = "uniAdmin";
          } else {
            // Check "teachers" collection
            const teacherQuery = query(collection(firestore, "Teachers"), where("email", "==", email));
            const teacherSnapshot = await getDocs(teacherQuery);

            if (!teacherSnapshot.empty) {
              userDetails = teacherSnapshot.docs[0].data();
              role = "teacher";
            } else {
              // Check "companies" collection
              const companyQuery = query(collection(firestore, "Companies"), where("email", "==", email));
              const companySnapshot = await getDocs(companyQuery);

              if (!companySnapshot.empty) {
                userDetails = companySnapshot.docs[0].data();
                role = "company";
              }
            }
          }
        }
      }

      // Step 3: Store user details locally and redirect based on role
      if (userDetails && role) {
        localStorage.setItem("authToken", user.accessToken);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        console.log("User details stored:", userDetails);

        // Redirect to the appropriate dashboard based on the role
        switch (role) {
          case "mainAdmin":
            navigate("/dashboard"); // Main Admin Dashboard
            break;
          case "student":
            navigate("/student-dashboard"); // Student Dashboard
            break;
          case "uniAdmin":
            navigate("/uniadmin-dashboard"); // UniAdmin Dashboard
            break;
          case "teacher":
            navigate("/teacher-dashboard"); // Teacher Dashboard
            break;
          case "company":
            navigate("/company-dashboard"); // Company Dashboard
            break;
          default:
            throw new Error("Unexpected role");
        }
      } else {
        console.error("No user details found in Firestore.");
        setError("You are not authorized to access this platform.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);

      // Handle Firebase Authentication errors
      if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Side - Image */}
      <div className="image-section">
        <img src={universityImage} alt="University" className="university-image" />
      </div>

      {/* Right Side - Login Form */}
      <div className="form-section">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <p className="forgot-password">Forgot Password?</p>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don’t Have An Account? <a href="Signup">Sign Up</a>
        </p>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
