const express = require('express');

const {loginDetailsHandler,userRegistrationDetail, getCurrentUser} = require('../CONTROLLER/userDetailController');
const authMiddleWare = require('../MIDDLEWARE/authMiddleWare');

const userRouter =express.Router();

userRouter.post('/login',loginDetailsHandler);
userRouter.post('/register',userRegistrationDetail);
userRouter.get('/get-current-user',authMiddleWare,getCurrentUser);

module.exports = userRouter;