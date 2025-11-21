import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../Context/StoreContext";
import { toast } from "react-toastify";

function Profile() {
  const { apiUrl, token, isLoading, setIsLoading } = useContext(storeContext);

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    phoneNumber: "",
   
    bio: "",
  });

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.data);
        setFormData({
          fullName: data.data.fullName || "",
          dob: data.data.dob || "",
          phoneNumber: data.data.phoneNumber || "",
          
          bio: data.data.bio || "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProfile(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!");
        setUser(formData);
        setEditMode(false);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">User Profile</h2>
        <nav className="flex flex-col space-y-2 text-base font-medium">
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100"
          >
            🏠 <span className="ml-2">Dashboard</span>
          </Link>
          <Link
            to="/upcomingAppointments"
            className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100"
          >
            📅 <span className="ml-2">Appointments</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100"
          >
            👤 <span className="ml-2">Profile</span>
          </Link>
          <Link
            to="/logout"
            className="flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-100"
          >
            🚪 <span className="ml-2">Logout</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">My Profile</h1>
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </header>

        <section className="bg-white shadow rounded-lg p-6 max-w-2xl">
          {!user ? (
            <p>Loading profile...</p>
          ) : editMode ? (
            <form className="space-y-4" onSubmit={updateProfile}>
              <div>
                <label className="font-semibold">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="font-semibold">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="font-semibold">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>
              {/* <div>
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div> */}
              <div>
                <label className="font-semibold">Bio</label>
                <textarea
                  rows="4"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <>
              <p>
                <strong>Full Name:</strong> {user.fullName}
              </p>
              <p>
                <strong>Date of Birth:</strong> {user.dob}
              </p>
              <p>
                <strong>Phone Number:</strong> {user.phoneNumber}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Bio:</strong> {user.bio}
              </p>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;
