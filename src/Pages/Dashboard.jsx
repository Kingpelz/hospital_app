import React, { useState, useEffect, useContext } from "react";
import Loading from "../Layout/Loading.jsx";
import { storeContext } from "../Context/StoreContext.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
    setLocalSurgeries(surgeries);
  }, [surgeries]);

  // CREATE SURGERY
  async function createAppointment() {
    try {
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

  // UPDATE SURGERY
  async function updatehandler(e) {
    e.preventDefault();

    if (!surgeryId) {
      toast.error("No surgery selected for update");
      return;
    }

    try {
      const confirmUpdate = window.confirm("Update this surgery?");
      if (!confirmUpdate) return;

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

  // DELETE SURGERY
  async function deleteSurgery(id) {
    try {
      const confirmDelete = window.confirm("Delete this appointment?");
      if (!confirmDelete) return;

      setIsLoading(true);

      const response = await fetch(`${apiUrl}/surgery/delete/${id}`, {
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

  // SUBMIT CREATE
  function submithandler(e) {
    e.preventDefault();
    createAppointment();
  }

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-cover bg-center">
      <div className="bg-black bg-opacity-70 min-h-screen p-6">
        <main className="mx-auto max-w-6xl bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* FORM */}
          <form
            onSubmit={(e) => (editmode ? updatehandler(e) : submithandler(e))}
            className="space-y-8 bg-gray-50 rounded-xl p-6"
          >
            <h3 className="text-2xl font-bold">📝 Schedule a Surgery</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="font-semibold">Surgery Type</label>
                <select
                  value={surgeryType}
                  required
                  onChange={(e) => setSurgeryType(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">Select Surgery Type</option>
                  <option value="Opthalmic">Opthalmic</option>
                  <option value="Neurosurgery">Neurosurgery</option>
                  <option value="Cardiac Surgery">Cardiac Surgery</option>
                  <option value="Orthopedic Surgery">Orthopedic Surgery</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Doctor</label>
                <select
                  value={doctorId}
                  required
                  onChange={(e) => setDoctorId(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">Select Doctor</option>
                  <option value="1">Dr. Fausat Olayiwola</option>
                  <option value="2">Dr. Adedoyin Odufuwa</option>
                  <option value="3">Dr. Oluwaseun Sodipo</option>
                  <option value="4">Dr. Badmus Opeyemi</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Date</label>
                <input
                  type="date"
                  value={surgeryDate}
                  required
                  onChange={(e) => setSurgeryDate(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="font-semibold">Time</label>
                <input
                  type="time"
                  value={time}
                  required
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full border rounded-lg px-4 py-2"
              ></textarea>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={clearForm}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg"
              >
                Clear
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                {editmode ? "Update Appointment" : "Create Appointment"}
              </button>
            </div>
          </form>

          {/* SURGERY LIST */}
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">
              Scheduled Surgeries
            </h2>

            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Surgery</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Time</th>
                  <th className="px-6 py-3 text-left">Description</th>
                  <th className="px-6 py-3 text-left">Doctor</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {localSurgeries.length === 0 ? (
                  <tr>
                    <td className="text-center py-6" colSpan="6">
                      No surgeries scheduled
                    </td>
                  </tr>
                ) : (
                  localSurgeries.map((surgery) => (
                    <tr key={surgery.id}>
                      <td className="px-6 py-4">{surgery.surgeryType}</td>
                      <td className="px-6 py-4">{surgery.surgeryDate}</td>
                      <td className="px-6 py-4">{surgery.time}</td>
                      <td className="px-6 py-4">{surgery.description}</td>
                      <td className="px-6 py-4">{surgery.doctor?.name}</td>

                      <td className="px-6 py-4 flex gap-2 justify-center">
                        <button
                          onClick={() => {
                            setEditMode(true);
                            setSurgeryId(surgery.id); // FIXED
                            setDescription(surgery.description);
                            setSurgeryDate(surgery.surgeryDate);
                            setDoctorId(surgery.doctor?.id); // FIXED
                            setTime(surgery.time);
                            setSurgeryType(surgery.surgeryType);
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => deleteSurgery(surgery.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
