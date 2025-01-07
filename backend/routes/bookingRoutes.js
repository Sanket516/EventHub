const express = require('express');
const { bookEvent, getBookings, deleteBooking } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', bookEvent);
router.get('/:id', getBookings);
router.delete('/:id', deleteBooking);

module.exports = router;
