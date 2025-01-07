const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    location: String,
    description: String,
    availableSeats: Number
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);