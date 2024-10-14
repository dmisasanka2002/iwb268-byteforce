import React from "react";
import { Link } from "react-router-dom";
import ElectionList from "./ElectionList";

const AdminDashboard = () => {
  return (
    <>
        <div className="h-[65px] bg-blue-800 shadow-lg rounded-b-xl">
          <div className="container flex items-center justify-between px-6 py-4 mx-auto">
            <h1 className="font-sans text-2xl font-bold tracking-wide text-white">
              E-Voting System
            </h1>
            <nav className="space-x-6">
              <Link
                to="/election/new"
                className="px-5 py-2 text-center text-white transition duration-300 ease-in-out border border-transparent rounded-full bg-white/10 hover:bg-white hover:text-gray-800 hover:shadow-lg"
              >
                Create New Election
              </Link>
            </nav>
          </div>
        </div>


      <div className="py-8 bg-white">
        <div className="container mx-auto">
        <div className="relative max-w-full p-8 mx-auto bg-center bg-no-repeat bg-cover rounded-lg shadow-lg mb-9" style={{ backgroundImage: `url('/images/banner.jpg')` }}>
        <div className="p-8 rounded-lg bg-white/40 backdrop-blur-sm">
          <h1 className="text-3xl font-semibold text-center text-black mb-7">
            Welcome to Administrative Control
          </h1>
          <h2 className="px-4 text-lg font-normal text-center text-black">
            The Online Voting System is a secure and user-friendly platform designed to streamline the electoral process. It enables voters to cast their votes conveniently from any location using their devices, ensuring accessibility and inclusivity. The system incorporates advanced security measures, including encryption and authentication, to safeguard voter data and maintain the integrity of the election. With real-time tracking and transparent results, the Online Voting System enhances voter engagement and trust in the electoral process, making it an efficient solution for modern democracies.
          </h2>
        </div>
      </div>


          <ElectionList />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
