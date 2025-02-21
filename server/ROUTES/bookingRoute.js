const express = require('express');
const authMiddleWare = require('../MIDDLEWARE/authMiddleWare');
const { makePayment, bookShow } = require('../CONTROLLER/bookingController');

const bookingRoute = express.Router();

bookingRoute.post('/make-payment',authMiddleWare,makePayment);
bookingRoute.post('/book-show',authMiddleWare,bookShow);

module.exports = bookingRoute;