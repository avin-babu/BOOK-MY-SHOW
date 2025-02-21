const express = require('express');
const {addMovieHandler,getAllMovieHandler,updateMovieHandler, getMovieById, deleteMovieById} = require('../CONTROLLER/movieController');
const authMiddleWare = require('../MIDDLEWARE/authMiddleWare')
const movieRoute = express.Router();

movieRoute.post('/add-movie',authMiddleWare,addMovieHandler);
movieRoute.get('/get-all-movies',authMiddleWare, getAllMovieHandler);
movieRoute.post('/update-movie',authMiddleWare, updateMovieHandler);
movieRoute.post('/get-movie-by-id',authMiddleWare, getMovieById);
movieRoute.post('/delete-movie-by-id',authMiddleWare, deleteMovieById);


module.exports = movieRoute;
