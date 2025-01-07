import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const EventCreatePage = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/events/', 
        { name, date, location, description, availableSeats }, 
        {
          headers: {
            'Authorization': `${localStorage.getItem('token')}`,
          }
        }
      );
      
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Create New Event</h2>

        <div className="space-y-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Event Name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            />
          </div>

          <div className="relative">
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            />
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="Location" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            />
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="Event Description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            />
          </div>

          <div className="relative">
            <input 
              type="number" 
              placeholder="Available Seats" 
              value={availableSeats} 
              onChange={(e) => setAvailableSeats(e.target.value)} 
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventCreatePage;
