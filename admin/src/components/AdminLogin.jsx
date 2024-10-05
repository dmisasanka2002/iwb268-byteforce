import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
// import "../styles/AdminLogin.css"; // Import CSS for styling

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform basic validation
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    // Simulate admin login (replace with real login logic)
    if (email === "admin@example.com" && password === "admin123") {
      // Redirect to dashboard after successful login
      navigate("/admin-dashboard"); // Use navigate instead of history.push
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    // <div className="login-container">
    //   <div className="login-box">
    //     <h2>Admin Login</h2>
    //     <form onSubmit={handleSubmit}>
    //       {errorMessage && <p className="error-message">{errorMessage}</p>}
    //       <div className="form-group">
    //         <label>Email</label>
    //         <input
    //           type="email"
    //           placeholder="Enter email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label>Password</label>
    //         <input
    //           type="password"
    //           placeholder="Enter password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <button type="submit" className="login-button">
    //         Login
    //       </button>
    //       <div className="forgot-password">
    //         <a href="/forgot-password">Forgot Password?</a>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className="flex items-center justify-center min-h-screen bg-center bg-cover" style={{ backgroundImage: `url('/images/admin-login-bg-I.jpg')` }}>
    <div className="rounded-lg shadow-lg bg-white/30 backdrop-blur-lg p-7 w-96">
      <h2 className="mb-6 text-3xl font-bold text-center text-white">Admin Login</h2>
      {errorMessage && <p className="mb-4 text-center text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-gray-200">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-200">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full py-3 mt-4 text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
          Login
        </button>
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
        </div>
      </form>
    </div>
  </div>
  );
};

export default AdminLogin;
