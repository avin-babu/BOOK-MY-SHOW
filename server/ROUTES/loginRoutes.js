const express = require('express');

const {loginDetailsHandler,userRegistrationDetail, getCurrentUser, forgetPassword, otpChecker, resetPassword} = require('../CONTROLLER/userDetailController');
const authMiddleWare = require('../MIDDLEWARE/authMiddleWare');

const userRouter =express.Router();

userRouter.post('/login',loginDetailsHandler);
userRouter.post('/register',userRegistrationDetail);
userRouter.get('/get-current-user',authMiddleWare,getCurrentUser);
userRouter.post('/forget-password',forgetPassword);
userRouter.post('/otp-validator',otpChecker);
userRouter.post('/reset-password',resetPassword);

module.exports = userRouter;