import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BookPage = () => {
  const { id } = useParams();
  const [seats, setSeats] = useState('');
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        alert('Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/api/bookings`,
        { userId, eventId: id, seats },
        {
          headers: {
            'Authorization': `${localStorage.getItem('token')}`,
          }
        }
      );
      navigate("/");
      alert('Booking successful!');

    } catch (err) {
      if (err.response && err.response.data.message)
        alert(err.response.data.message);
    }
  };

  if (loading) return <p className="text-center text-gray-700">Loading event details...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Book Tickets for <span className="text-indigo-600">{event?.name}</span>
      </h1>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-medium text-gray-700">Event Details</h2>
        <p className="text-gray-600 mt-2">Date: {new Date(event?.date).toLocaleDateString()}</p>
        <p className="text-gray-600">Location: {event?.location}</p>
        <p className="text-gray-600">Seats Available: <span className="text-red-500 font-semibold">{event?.availableSeats}</span></p>
      </div>

      <form onSubmit={handleBooking} className="space-y-6">
        <div>
          <label htmlFor="seats" className="block text-sm font-medium text-gray-700">
            Number of Seats
          </label>
          <input
            type="number"
            id="seats"
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            min="1"
            max={event?.availableSeats}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookPage;
