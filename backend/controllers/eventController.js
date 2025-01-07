const Event = require('../models/Event');

const getAllEvents = async (req, res) => {
    const events = await Event.find();
    res.status(200).json(events);
};

const getEvent = async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id);
    res.status(200).json(event);
}

const createEvent = async (req, res) => {
    const { name, date, location, description, availableSeats } = req.body;
    const event = new Event({ name, date, location, description, availableSeats });
    await event.save();
    res.status(201).json(event);
};

const deleteEvent = async (req, res) => {
    const {id} = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({message:"Successfully deleted"});
}

module.exports = { getAllEvents, createEvent, getEvent, deleteEvent };