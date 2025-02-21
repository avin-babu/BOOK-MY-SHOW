const express = require('express');
const { addTheatreHandler, getAllTheatreHandler, updateTheatreHandler, deleteTheatreHandler, getTheatreById } = require('../CONTROLLER/theatreController');

const theatreRouter = express.Router();

theatreRouter.post('/add-theatre',addTheatreHandler);
theatreRouter.get('/get-theatre',getAllTheatreHandler);
theatreRouter.put('/update-theatre',updateTheatreHandler);
theatreRouter.delete('/delete-theatre/:theatreId',deleteTheatreHandler);
theatreRouter.get('/get-theatre-with-userId/:ownerId',getTheatreById);


module.exports = theatreRouter;
