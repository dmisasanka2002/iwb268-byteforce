import React from "react";
import { Link } from "react-router-dom";
import ElectionList from "./ElectionList";

const AdminDashboard = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-16">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center p-4">
          <h1 className="text-white text-2xl font-bold mb-2 sm:mb-0">
            E-Voting System
          </h1>
          <nav className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Link
              to="/election/new"
              className="border border-white rounded-full px-4 py-2 text-white hover:bg-white hover:text-gray-800 transition duration-200 text-center"
            >
              Create New Election
            </Link>
          </nav>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-800 via-blue-800 to-blue-800 py-8">
        <div className="container mx-auto">
          <h1 className="text-center text-3xl font-semibold text-white mb-4">
            Welcome to Administrative Control
          </h1>
          <h2 className="text-center text-lg font-normal text-white mb-32 px-4">
            The Online Voting System is a secure and user-friendly platform
            designed to streamline the electoral process. It enables voters to
            cast their votes conveniently from any location using their devices,
            ensuring accessibility and inclusivity. The system incorporates
            advanced security measures, including encryption and authentication,
            to safeguard voter data and maintain the integrity of the election.
            With real-time tracking and transparent results, the Online Voting
            System enhances voter engagement and trust in the electoral process,
            making it an efficient solution for modern democracies.
          </h2>

          <ElectionList />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
