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
    // confirmPassword:{
    //     type: String,
    //     required: true,
    //     validate:{
    //         validator: function(value){
    //             return this.password==value;
    //         },
    //         message:"Passwords do not match!"
    //     }
    // },
    isAdmin: {
        type: Boolean,
        required:true,
        default: false
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user", "partner"],
        default: "user",
      },
})

// userSchema.pre('save',function(next){
//     this.confirmPassword = undefined;
//     next();
// })

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;