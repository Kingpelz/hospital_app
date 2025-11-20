import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div
      className="  min-h-screen bg-cover bg-center text-white flex flex-col justify-center items-center px-6"
      style={{
        backgroundImage: "url('https://template.canva.com/EAGz0hh5Kxo/1/0/1600w-6Y6qQRgRyT0.jpg')",
      }}
    >
      {/* Overlay */}
      <div className= "m-8">
      <div className="bg-black bg-opacity-60 p-6 rounded-lg text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to Carelink Hospital</h1>
        <p className="text-lg mb-6">Expert Care, Compassionate Healing</p>
        <div className="flex justify-center gap-4">
         <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            Login
          </Link>
        </div>
      </div>
     
      </div>
    </div>
  );
}

export default Home;