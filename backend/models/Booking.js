const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seats: Number,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);