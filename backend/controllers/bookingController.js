const Booking = require('../models/Booking');
const Event = require('../models/Event');

const bookEvent = async (req, res) => {
    const { userId, eventId, seats } = req.body;
    const event = await Event.findById(eventId);
    const existingBooking = await Booking.findOne({ userId, eventId });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.availableSeats < seats) return res.status(400).json({ message: 'Not enough seats available' });
    event.availableSeats -= seats;
    await event.save();
    const booking = new Booking({ userId, eventId, seats });
    await booking.save();
    res.status(201).json(booking);
};

const getBookings = async (req, res) => {
    const { userId } = req.params;
    const bookings = await Booking.find(userId)
        .populate('eventId', 'name date location description').exec();
    if (bookings.length === 0) return res.status(404).json({ message: 'No bookings found for this user.' });
    res.status(201).json(bookings);
};

const deleteBooking = async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) res.status(404).json({ message: "Booking not found" });
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: "Successfully deleted" });
};

module.exports = { bookEvent, getBookings, deleteBooking };