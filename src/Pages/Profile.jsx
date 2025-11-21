import React, { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import { storeContext } from "../Context/StoreContext";
import { useContext } from "react";
function Profile() {
   
const [profile, setProfile] = useState([]);
const [user, setUser] = useState(null);
const [isLoading, setIsLoading, apiUrl, token ,Bio, fullName, phoneNumber, email] = useContext(storeContext); 

 useEffect (() => {
  getProfile();

 }, [])
async function getProfile() {
  try {
    setIsLoading(true)
    const response = await fetch(`${apiUrl}/profile/`,{
      method: "GET",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Bio, fullName, phoneNumber, email
      })
    })
  } catch (error) {
    
  }
}


  
  

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">User Profile</h2>
        <nav className="flex flex-col space-y-2 text-base font-medium">
          <Link to="/dashboard" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100">
            🏠 <span className="ml-2">Dashboard</span>
          </Link>
          <Link to="/upcomingAppointments/123" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100">
            📅 <span className="ml-2">Appointments</span>
          </Link>
          <Link to="/profile" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100">
            👤 <span className="ml-2">Profile</span>
          </Link>
          <Link to="/logout" className="flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-100">
            🚪 <span className="ml-2">Logout</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">My Profile</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
        </header>

        {/* Profile Card */}
        <section className="bg-white shadow rounded-lg p-6 max-w-2xl">
          {user ? (
            <>
              <p><strong>Full Name:</strong> {user.fullName}</p>
              <p><strong>Date of Birth:</strong> {user.dob}</p>
              <p><strong>Phone Number:</strong> {user.phone}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Bio:</strong> {user.bio}</p>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;