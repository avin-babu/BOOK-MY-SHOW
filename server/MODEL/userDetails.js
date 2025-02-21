const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        required: true,
        default: "user",
    },
    otp: {
        type: String,
    },
    otpExpiry : {
        type : Date
    }
})

// userSchema.pre('save',function(next){
//     this.confirmPassword = undefined;
//     next();
// })

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;