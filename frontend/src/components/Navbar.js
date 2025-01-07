import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CgLogOut, CgProfile } from "react-icons/cg";
import api from "../services/api";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
    setIsDropdownOpen(false); // Close the dropdown on logout
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/api/auth/${userId}`);
      const { name, email } = response.data;
      setName(name);
      setEmail(email);
    };
    if (isAuthenticated) fetchData();
  }, [userId, isAuthenticated]);

  return (
    <nav className="bg-black p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-3xl font-bold tracking-wide">
          <Link to="/" className="hover:text-red-600">
            EventHub
          </Link>
        </div>

        <div className="space-x-6 relative flex items-center">
          <div className="relative text-white group">
            <CgProfile className="text-2xl cursor-pointer" />
            <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2">
              {(
                <div className="text-sm">
                  <p className="font-bold">{name}</p>
                  <p>{email}</p>
                </div>
              )}
            </div>
          </div>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-white hover:text-red-600">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-red-600">
                Signup
              </Link>
            </>
          ) : (
            <div className="relative inline-block" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="text-white">
                ☰
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                  <Link
                    to="/bookings"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                  >
                    Your Bookings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center rounded-lg transition duration-200 ease-in-out"
                  >
                    Logout
                    <CgLogOut className="ml-2 text-xl" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
