import React, { useState } from "react";
import { verifyVoter } from "../services/authService";
// import "../styles/VoterLogin.css"; // Import custom styles
import { Link } from "react-router-dom";

const VoterLogin = () => {
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(""); // For error handling

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (email == "test@gmail.com" && nic == "12345678") {
      setIsVerified(true);
    } else {
      setError("Verification failed. Please check your email and NIC."); // Display error
    }
    // const response = await verifyVoter({ email, nic });
    // if (response.success) {
    //   setIsVerified(true);
    // } else {
    //   setError("Verification failed. Please check your email and NIC."); // Display error
    // }

    if (isVerified) {
    }
  };

  return (
    // <div className="voter-login-container">
    //   <h1 className="login-title">Voter Login</h1>
    //   {!isVerified ? (
    //     <form className="login-form" onSubmit={handleLogin}>
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         placeholder="Email"
    //         required
    //         className="login-input"
    //       />
    //       <input
    //         type="text"
    //         value={nic}
    //         onChange={(e) => setNic(e.target.value)}
    //         placeholder="NIC"
    //         required
    //         className="login-input"
    //       />
    //       {error && <p className="error-message">{error}</p>}
    //       <button type="submit" className="login-button">
    //         Login
    //       </button>
    //     </form>
    //   ) : (
    //     <div className="success">
    //       <p className="success-message">You are verified! You can now vote.</p>
    //       <Link to="/voter/vote">Click To Vote</Link>
    //     </div>
    //   )}
    // </div>
<div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/bg-login-II.jpg')" }}>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark overlay */}

  {/* Flexbox and centering */}
  <div className="relative z-10 flex items-center justify-center min-h-screen ">
    <div className="w-full max-w-md p-8 bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-white mb-6 pt-4">Voter Login</h1>
      {!isVerified ? (
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 bg-white bg-opacity-50 text-black rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            placeholder="NIC"
            required
            className="w-full px-4 py-3 bg-white bg-opacity-50 text-black rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm ">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      ) : (
        <div className="text-center text-white">
          <p className="text-xl mb-4 text-green-200">You are verified! You can now vote.</p>
          <Link
            to="/voter/vote"
            className="inline-block px-4 py-3 mt-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Click To Vote
          </Link>
        </div>
      )}
    </div>
  </div>
</div>


  );
};

export default VoterLogin;
