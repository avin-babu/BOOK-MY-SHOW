const express = require('express');

const showRouter = express.Router();
const authMiddleWare = require('../MIDDLEWARE/authMiddleWare');
const { addShowHandler, deleteShowHandler, updateShowHandler, getAllShowsByTheatre, getAllTheatresByMovie, getShowById } = require('../CONTROLLER/showController');


showRouter.post('/add-show',authMiddleWare,addShowHandler);
showRouter.post('/delete-show',authMiddleWare,deleteShowHandler);
showRouter.put('/update-show',authMiddleWare,updateShowHandler);
showRouter.post('/get-all-shows-by-theatre',authMiddleWare,getAllShowsByTheatre);
showRouter.post('/get-all-shows-by-movies',authMiddleWare,getAllTheatresByMovie);
showRouter.post('/get-show-by-id',authMiddleWare,getShowById);

module.exports = showRouter;