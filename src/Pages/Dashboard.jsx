import React from "react";
import { useState, useEffect } from "react";
import Loading from "../Layout/Loading.jsx";
import { useContext } from "react";
import { storeContext } from "../Context/StoreContext.jsx";
import { toast } from "react-toastify";
import { Await, Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";

function Dashboard() {
  const { apiUrl, isLoading, setIsLoading, getAllSurgeries, token, surgeries } =
    useContext(storeContext);
  const [description, setDescription] = useState("");
  const [editmode, setEditMode] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [time, setTime] = useState("");
  const [surgeryId, setSurgeryId] = useState("");
  const [surgeryType, setSurgeryType] = useState("");
  const [surgeryDate, setSurgeryDate] = useState("");
  const [localSurgeries, setLocalSurgeries] = useState([]);
  const surgeryStatusOptions = ["scheduled", "completed", "Canceled"];
  function clearForm() {
    setDescription("");
    setSurgeryId("");
    setSurgeryType("");
    setTime("");
    setDoctorId("");
    setSurgeryDate("");
    setEditMode(false);
  }

  useEffect(() => {
    console.log(surgeries);
    setLocalSurgeries(surgeries);
  }, [surgeries]);

  async function createAppointment() {
    try {
      console.log(
        surgeryType,
        doctorId,
        description,
        surgeryDate,
        time,
        apiUrl,
        "token",
        token
      );

      setIsLoading(true);
      const response = await fetch(`${apiUrl}/surgery/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          surgeryType,
          doctorId: Number(doctorId),
          description,
          surgeryDate,
          time: String(time),
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 201) {
        toast.success(data.message);
        clearForm();
        getAllSurgeries();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  //   async function updateHandler(id) {
  // try {
  //   const userConfirmed = window.confirm(
  //     "Are you sure you want to update this appointment?"
  //   )
  //   if()
  // } catch (error) {

  // }
  //   }

  async function updatehandler(surgeryId) {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to update this appointment?"
      );
      if (!userConfirmed) {
        toast.error("Appointment updating cancelled");
        return;
      }
      console.log(surgeryId);
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/surgery/update/${surgeryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          surgeryType,
          doctorId: Number(doctorId),
          description,
          surgeryDate,
          time: String(time),
        }),
      });
      const data = await response.json();
      clg;
      if (response.status === 200) {
        toast.success(data.message);
        clearForm();
        getAllSurgeries();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function deleteSurgery(surgeryId) {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this appointment?"
      );
      if (!userConfirmed) {
        toast.error("Appointment deletion cancelled");
        return;
      }
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/surgery/delete/${surgeryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
        getAllSurgeries();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  function submithandler(e) {
    e.preventDefault();
    createAppointment();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://pngtree.com/free-backgrounds-photos/healthcare-appointment')",
      }}
    >
      <div className="bg-black bg-opacity-70 min-h-screen">
        <header className="bg-gray-700 text-white p-6 shadow-lg">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome to your Carelink Hospital 👋 Your health, your schedule —
            all in one place.
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col col-span-1 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6">
            {/* Sidebar Header */}
            <div className="flex items-center justify-center mb-8">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                🏥Carelink
              </span>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col space-y-2 text-base font-medium">
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-700 transition"
              >
                🏠 <span className="ml-2">Dashboard</span>
              </Link>

              <Link
                to="/upcomingAppointments/:id"
                className="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-700 transition"
              >
                📅 <span className="ml-2">Appointments</span>
              </Link>

              <Link
                to="/profile"
                className="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-700 transition"
              >
                👤 <span className="ml-2">Profile</span>
              </Link>

              <Link
                to="/logout"
                className="flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-800 transition"
              >
                🚪 <span className="ml-2">Logout</span>
              </Link>
            </nav>

            {/* Footer */}
            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
              © 2025 Carelink
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-1 lg:col-span-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-8">
            <form
              onSubmit={(e) => {
                editmode ? updatehandler(surgeryId) : submithandler(e);
              }}
              className="space-y-8 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8"
            >
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  📝 Schedule an Appointment
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Please fill in the details below to book your appointment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Surgery Type
                  </label>
                  <select
                    value={surgeryType}
                    required
                    onChange={(e) => setSurgeryType(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Select Surgery Type</option>
                    <option value="Opthalmic">Opthalmic</option>
                    <option value="Neurosurgery">Neurosurgery</option>
                    <option value="Cardiac Surgery">Cardiac Surgery</option>
                    <option value="Orthopedic Surgery">
                      Orthopedic Surgery
                    </option>
                  </select>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Doctor
                  </label>
                  <div className="relative">
                    <select
                      value={doctorId}
                      required
                      onChange={(e) => setDoctorId(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="">Select Doctor</option>
                      <option value="1">Dr. Fausat Olayiwola </option>
                      <option value="2">Dr. Adedoyin Odufuwa </option>
                      <option value="3">Dr. Oluwaseun Sodipo </option>
                      <option value="4">Dr. Badmus Opeyemi </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={surgeryDate}
                    required
                    onChange={(e) => setSurgeryDate(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    required
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  placeholder="Enter description..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={clearForm}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 transition"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
                >
                  {editmode ? "Update Appointment" : "Create Appointment"}
                </button>
              </div>
            </form>
            <div className="text-center text-gray-500">
              <h2 className="text-2xl font-bold">Surgery list</h2>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Surgery Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Doctor Name
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {localSurgeries.length === 0 ? (
                    <>No sugeries scheduled</>
                  ) : (
                    localSurgeries.map((surgery) => {
                      return (
                        <tr
                          key={surgery.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                            {surgery.surgeryType}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                            {surgery.surgeryDate}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                            {surgery.time}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                            {surgery.description}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                            {surgery.doctor?.name}
                          </td>
                          <td className="px-6 py-4 flex flex-wrap gap-2 justify-center">
                            <Link
                              to={`/appointment`}
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            >
                              View More
                            </Link>

                            <button
                              onClick={() => {
                                setEditMode(true);
                                setDescription(surgery.description);
                                setSurgeryDate(surgery.surgeryDate);
                                setDoctorId(surgery.doctor?.name);
                                setTime(surgery.time);
                                setSurgeryType(surgery.surgeryType);
                              }}
                              type="button"
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                            >
                              Update
                            </button>

                            <button
                              onClick={() => deleteSurgery(surgery.id)}
                              type="button"
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
