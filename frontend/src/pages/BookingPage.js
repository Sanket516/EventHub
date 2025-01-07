import React, { useEffect, useState } from 'react';
import api from '../services/api';

const BookingPage = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get(`/api/bookings/${userId}`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        });
        setBookings(response.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  const handleDelete = async (bookingId) => {
    try {
      await api.delete(`/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
    } catch (err) {
      console.error('Failed to delete booking:', err);
      alert('Failed to delete booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-500">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-600 mx-auto my-12"></div>
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <h1 className="text-indigo-800 text-3xl font-extrabold text-center mb-12">
        Your Event Bookings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-indigo-950 shadow-lg rounded-3xl overflow-hidden border border-gray-200 transform hover:scale-105 transition-all duration-300 ease-in-out max-w-xs mx-auto"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-white">{booking.eventId.name}</h2>
                <p className="text-lg text-white mt-2">
                  <strong>Date:</strong>{' '}
                  {new Date(booking.eventId.date).toLocaleString()}
                </p>
                <p className="text-lg text-white">
                  <strong>Location:</strong> {booking.eventId.location}
                </p>
                <p className="text-base text-white mt-2">{booking.eventId.description}</p>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-white">Seats: {booking.seats}</p>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300"
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-500 col-span-4">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
