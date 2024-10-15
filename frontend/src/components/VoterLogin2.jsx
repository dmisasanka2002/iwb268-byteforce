import React, { useContext, useState } from "react";
// import "../styles/VoterLogin.css"; // Import custom styles
import { GoogleLogin } from "@react-oauth/google";
import HappeningElections from "./HappeningElections";
import { ElectionContext } from "../contexts/ElectionContext";
import { verifyVoterEmail, verifyVoterNIC } from "../services/authService";

/**
 * A React component that handles the login process for voters.
 *
 * It uses the Google One Tap library to sign in with a Google account.
 * If the voter is not verified, it will show a form to enter the NIC number.
 * If the voter is verified, it will show a button to vote.
 *
 * This component will also display a list of elections that the voter can vote in.
 *
 * @returns {JSX.Element} The JSX element representing the voter login component.
 */

const VoterLogin = () => {
  const [isNICVerified, setIsNICVerified] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(""); // For error handling

  const { nic, setNic, setVorterId, fetchElectionList } =
    useContext(ElectionContext);

  /**
   * Handles the login process after a user has signed in with Google One Tap.
   *
   * It takes the credentialResponse object as a parameter, which contains the user's email and other information.
   *
   * If the response is successful (200 status code), it will fetch the list of elections for the voter and set the isVerified state to true.
   * If the response is not successful, it will display an error message and set the isVerified state to false.
   *
   * @param {Object} credentialResponse The credentialResponse object returned by Google One Tap.
   */
  const handleLogin = async (credentialResponse) => {
    setError(""); // Reset error message

    //TODO: Replace with actual verification logic

    const res = await verifyVoterEmail({
      ...credentialResponse,
      nic: nic.toString(),
    });

    if (res) {
      setVorterId(res.data.id);
      fetchElectionList(nic);
      setIsVerified(true);
    } else {
      setError("Verification failed. Please check your email and NIC."); // Display error
    }
  };

  /**
   * Handles the submission of the NIC form.
   *
   * If the NIC is empty, it will show an error message.
   * If the NIC is not empty, it will send a request to the server to verify the NIC.
   * If the response is successful (200 status code), it will show a success message and set the isNICVerified state to true.
   * If the response is not successful, it will show an error message and set the isNICVerified state to false.
   *
   * @param {Event} e The event object, which is the submission of the form.
   */
  const handleNICLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    //TODO: Replace with actual verification logic
    if (!nic) {
      setError("Please enter NIC."); // Display error
      return;
    }

    const res = await verifyVoterNIC(nic);
    if (res.status == 200) {
      setIsNICVerified(true);
    } else if (res.status == 404) {
      setError("You haven't registerd"); // Display error
    } else {
      setError("Verification failed. Please check your NIC."); // Display error
    }
  };

  return (
    // TODO: Should be added to google signIn or proper signin options
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-login-II.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
      {/* Dark overlay */}
      {/* Flexbox and centering */}
      <div className="relative z-10 flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-md p-8 bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-white mb-6 pt-4">
            Voter Login
          </h1>
          {!isNICVerified ? (
            <form className="space-y-4" onSubmit={handleNICLogin}>
              <input
                type="text"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                placeholder="Enter Your NIC Number Here"
                required
                className="w-full px-4 py-3 bg-white bg-opacity-50 text-black rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-red-500 text-sm ">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </form>
          ) : !isVerified && isNICVerified ? (
            <>
              <p className="text-xl mb-4 text-green-200 text-center">
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
              <p className="text-xl mb-4 text-green-200">
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
