import React, { useContext, useState } from "react";
// import "../styles/VoterLogin.css"; // Import custom styles
import { GoogleLogin } from "@react-oauth/google";
import HappeningElections from "./HappeningElections";
import { ElectionContext } from "../contexts/ElectionContext";
import { verifyVoterEmail, verifyVoterNIC } from "../services/authService";
import { toast } from "react-toastify";

const VoterLogin = () => {
  const [isNICVerified, setIsNICVerified] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(""); // For error handling

  const { nic, setNic, fetchElectionList } = useContext(ElectionContext);

  const handleLogin = async (credentialResponse) => {
    setError(""); // Reset error message

    //TODO: Fix the bug of vote function. If there are more elections with same voter, then some errrs occured

    const res = await verifyVoterEmail({
      ...credentialResponse,
      nic: nic.toString(),
    });

    if (res.data.isSuccess || res.status == 200) {
      fetchElectionList(nic);
      setIsVerified(true);
    } else {
      setError("Verification failed. Please check your email and NIC."); // Display error
      toast.error(
        `Verification failed. Please check your email .  \n${res.data.message}`
      );
    }
  };

  const handleNICLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    //TODO: Replace with actual verification logic
    if (!nic) {
      setError("Please enter NIC."); // Display error
      return;
    }

    const res = await verifyVoterNIC(nic);

    if (res.data.isSuccess || res.status == 200) {
      toast.success(res.statusText);
      setIsNICVerified(true);
    } else {
      setError(res.data.message); // Display error
      toast.error(res.data.message);
    }
  };

  return (
    // TODO: Should be added to google signIn or proper signin options
    <div
      className="relative min-h-screen bg-center bg-cover"
      style={{ backgroundImage: "url('/images/bg-login-II.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
      {/* Dark overlay */}
      {/* Flexbox and centering */}
      <div className="relative z-10 flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-md p-8 bg-white shadow-lg bg-opacity-20 backdrop-blur-md rounded-xl">
          <h1 className="pt-4 mb-6 text-3xl font-bold text-center text-white">
            Voter Login
          </h1>
          {!isNICVerified ? (
            <form className="space-y-4" onSubmit={handleNICLogin}>
              <input
                type="text"
                onChange={(e) => setNic(e.target.value)}
                placeholder="Enter Your NIC Number Here"
                required
                className="w-full px-4 py-3 text-black placeholder-gray-500 bg-white bg-opacity-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-sm text-red-500 ">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </form>
          ) : !isVerified && isNICVerified ? (
            <>
              <p className="mb-4 text-xl text-center text-green-200">
                Sign With Your Email that You provide in Registration Process.
              </p>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleLogin(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </>
          ) : (
            <div className="text-center text-white">
              <p className="mb-4 text-xl text-green-200">
                You are verified! You can now vote.
              </p>

              <HappeningElections />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoterLogin;
