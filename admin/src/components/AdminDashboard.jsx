import React from "react";
import { Link } from "react-router-dom";
import ElectionList from "./ElectionList";

const AdminDashboard = () => {
  return (
    <>
      <div className="h-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container flex flex-col items-center justify-between p-4 mx-auto sm:flex-row">
          <h1 className="mb-2 text-2xl font-bold text-white sm:mb-0">
            E-Voting System
          </h1>
          <nav className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link
              to="/election/new"
              className="px-4 py-2 text-center text-white transition duration-200 border border-white rounded-full hover:bg-white hover:text-gray-800"
            >
              Create New Election
            </Link>
          </nav>
        </div>
      </div>

      <div className="py-8 bg-gray-500">
        <div className="container mx-auto">
          <h1 className="mb-4 text-3xl font-semibold text-center text-white">
            Welcome to Administrative Control
          </h1>
          <h2 className="px-4 mb-32 text-lg font-normal text-center text-white">
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
