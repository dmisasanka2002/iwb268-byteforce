import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAdmin } from "../services/authService";
import { useContext } from "react";
import { ElectionContext } from "../contexts/ElectionContext";

// import "../styles/AdminLogin.css"; // Import CSS for styling

/**
 * A React component that handles the admin login process.
 *
 * It displays a login form with fields for email and password.
 * When the form is submitted, it performs basic validation and
 * redirects to the admin dashboard if the credentials are valid.
 *
 * @returns {JSX.Element} The JSX element representing the admin login component.
 */
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setIsVerified } = useContext(ElectionContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform basic validation
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    const loginData = {
      email,
      password,
    };

    const res = await loginAdmin(loginData);
    console.log(res);

    // Check if the login was successful
    if (res.isSuccess) {
      toast.success(res.message);
      setIsVerified(true);
      localStorage.setItem("verify", true);
      // Redirect to the dashboard after successful login
      navigate("/admin-dashboard"); // Use navigate instead of history.push
    } else {
      // Set the error message if login fails
      toast.error(res.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center max-h-screen min-h-screen bg-slate-950 ">
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
      <div className="absolute bottom-0 right-[-20%] top-[-10%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
      <div className="rounded-lg shadow-lg bg-white/30 backdrop-blur-lg p-7 w-96">
        <h2 className="mb-6 text-3xl font-bold text-center text-white">
          Admin Login
        </h2>
        {errorMessage && (
          <p className="mb-4 text-center text-red-500">{errorMessage}</p>
        )}
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
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
          {/* <div className="mt-4 text-center">
            <a
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
