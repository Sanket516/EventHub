import React from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function EventCard({ event }) {
  const removeEvent = async () => {
    try {
      await api.delete(`api/events/${event._id}`);
      alert('Event removed successfully');
    } catch (error) {
      console.error('Failed to remove event:', error);
      alert('An error occurred while removing the event');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 hover:text-indigo-600 transition duration-300">
          {event.name}
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 text-sm mt-1">{event.location}</p>
        <p className="text-gray-700 font-semibold mt-4">
          Seats Remaining: <span className="text-red-500">{event.availableSeats}</span>
        </p>
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <Link
          to={`/book/${event._id}`}
          className="flex-grow text-center max-w-xs px-6 py-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-xl hover:bg-gradient-to-l hover:from-teal-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Book Tickets
        </Link>
        <button
          className="flex-grow text-center max-w-xs ml-4 px-6 py-1 bg-red-600 text-white font-medium rounded-xl border-2 border-red-600 hover:bg-red-700 hover:border-red-700 transition-all duration-300 transform hover:scale-105"
          onClick={removeEvent}
        >
          Remove Event
        </button>
      </div>
    </div>
  );
}

export default EventCard;
