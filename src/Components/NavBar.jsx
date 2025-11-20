import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHospitalUser } from "react-icons/fa";
import { FaHospital } from "react-icons/fa6";
import { useContext } from "react";
import { storeContext } from "../Context/StoreContext";

function NavBar() {
  const { isAuth } = useContext(storeContext);
  return (
    <>
     <nav className="navBar">
  {/* Logo / Brand */}
  <div>
    <h2 className="text-3xl font-bold text-gray-300 hover:text-amber-300 flex items-center gap-2">
      <FaHospitalUser />
      <Link to="/">CareLink</Link>
      <FaHospital />
    </h2>
  </div>

  {/* Navigation Links */}
  <div className="md:flex md:items-center md:space-x-4">
   

    {isAuth ? (
      <>
        <NavLink
          to="/dashboard"
          activeclassname="active"
          className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-md font-medium"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/profile"
          activeclassname="active"
          className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-md font-medium"
        >
          Profile
        </NavLink>

        <NavLink
          to="/logout"
          activeclassname="active"
          className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-md font-medium"
        >
          Sign Out
        </NavLink>
      </>
    ) : (
      <div className="flex space-x-2">
         <NavLink
      to="/"
      activeclassname="active"
      className="text-white hover:text-yellow-300 text-md px-3 py-2 rounded-md font-medium"
    >
      Home
    </NavLink>
        <NavLink
          to="/login"
          activeclassname="active"
          className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-md font-medium"
        >
          Sign In
        </NavLink>

        <NavLink
          to="/about"
          activeclassname="active"
          className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-md font-medium"
        >
          About
        </NavLink>
      </div>
    )}
  </div>
</nav>
    </>
  );
}

export default NavBar;
