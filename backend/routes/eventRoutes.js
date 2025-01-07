const express = require('express');
const { getAllEvents, createEvent, getEvent, deleteEvent } = require('../controllers/eventController');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');

router.get('/', getAllEvents);
router.get('/:id', getEvent);
router.post('/', authenticate, createEvent);
router.delete('/:id', deleteEvent);

module.exports = router;