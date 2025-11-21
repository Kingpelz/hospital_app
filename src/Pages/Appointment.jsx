import React, { useState, useContext, useEffect } from "react";
import { storeContext } from "../Context/StoreContext";
import Loading from "../Layout/Loading";
import { Link } from "react-router-dom";

function Appointments() {
  const { surgeries, isLoading, setIsLoading } = useContext(storeContext);
  const [filter, setFilter] = useState("upcoming"); // upcoming or past
  const [filteredSurgeries, setFilteredSurgeries] = useState([]);

  useEffect(() => {
    const now = new Date();

    if (filter === "upcoming") {
      setFilteredSurgeries(
        surgeries.filter(
          (s) => new Date(s.surgeryDate + " " + s.time) >= now
        )
      );
    } else {
      setFilteredSurgeries(
        surgeries.filter(
          (s) => new Date(s.surgeryDate + " " + s.time) < now
        )
      );
    }
  }, [filter, surgeries]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-bold">My Appointments</h2>
      </header>

      {/* Navbar */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            filter === "upcoming"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setFilter("upcoming")}
        >
          Upcoming Appointments
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filter === "past"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setFilter("past")}
        >
          Past Appointments
        </button>
      </div>

      {/* Appointment List */}
      <div className="bg-white shadow rounded-lg p-6">
        {filteredSurgeries.length === 0 ? (
          <p className="text-center py-6 text-gray-500">
            No {filter} appointments.
          </p>
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Surgery</th>
                <th className="px-6 py-3 text-left">Doctor</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Time</th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSurgeries.map((surgery) => (
                <tr key={surgery.id}>
                  <td className="px-6 py-4">{surgery.surgeryType}</td>
                  <td className="px-6 py-4">{surgery.doctor?.name}</td>
                  <td className="px-6 py-4">{surgery.surgeryDate}</td>
                  <td className="px-6 py-4">{surgery.time}</td>
                  <td className="px-6 py-4">
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Appointments;
