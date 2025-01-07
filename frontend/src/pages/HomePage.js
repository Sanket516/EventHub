import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import api from '../services/api';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/api/events').then((response) => setEvents(response.data));
  }, [events]);

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 min-h-screen py-16 px-6">
      <h1 className="text-4xl font-extrabold text-center text-white mb-10">
        Available Events
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link
          to="/eventcreate"
          className="py-4 px-8 bg-black text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Create New Event
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
