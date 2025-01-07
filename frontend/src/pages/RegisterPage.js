import React, { useState, useContext } from 'react';
import api from '../services/api';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserId } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/register', { name, email, password });
      const { user } = response.data;
      setUserId(user._id);
      navigate('/');
      setIsAuthenticated(true);
    } catch (err) {
      alert('Registration failed');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Register</h2>

        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {passwordVisible ? (
              <FiEyeOff className="h-6 w-6" />
            ) : (
              <FiEye className="h-6 w-6" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Register
        </button>

        <div className='flex justify-center gap-2 text-gray-600'>
          <p>Already have an account?</p>
          <Link to="/login" className='text-indigo-600 hover:underline'>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
