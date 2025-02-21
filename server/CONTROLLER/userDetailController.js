const { off } = require('../MODEL/movieModel');
const userModel = require('../MODEL/userDetails');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const emailHandler = require('../CONFIG/emailHandler');

const SALT_ROUNDS = 12;
function otpGenerator(){
    return Math.floor((Math.random()*100000)+900000);
}

const loginDetailsHandler = async (req,res)=>{
    try{
        const body = req.body;
        const userExist = await userModel.findOne({email:body.email});
        console.log('userExist:',userExist);

        if(!userExist){
            return res.send({
                success:false,
                message: " User is not registered!"
            })
        }
        const isPasswordValid = await  bcrypt.compare(req.body.password, userExist.password);
        if(!isPasswordValid){
            return res.send({
                success:false,
                message: "Password is incorrect!",
            })
        }
        
        const token = JWT.sign({userId:userExist._id},process.env.SECRET_KEY,{expiresIn:"1d"});
        res.send({
            success:true,
            message:"User logged in successfully",
            token: token,
            role: userExist.role
        })
        

    }
    catch(err){
        res.status(404).json({message: err.message});
    }

}

const userRegistrationDetail = async (req,res)=>{
    try{
        const body = req.body;
        const userExist = await userModel.findOne({email:body.email});

        if(userExist){
            return res.send({
                success: false,
                message: "User already present!"
            })
        }

        // Create a new User object locally
        const user = new userModel(req.body)

        //Generating salt and hashing our password

        const salt = await bcrypt.genSalt(SALT_ROUNDS)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        user.password = hashedPassword

        // Then save it to Database
        await user.save()
        return res.send({
            success: true,
            message: "registration is successful",
            user
        })

    }
    catch(err){
        res.status(404).json({message: err.message});
    }

}

const getCurrentUser = async (req,res)=>{
    try{
        const user = await userModel.findById(req.body.userId).select("-password");
        // console.log('tokens:',response);
        res.send({
            success: true,
            message: "You are autherized to go to the Protected route!",
            data:user
        })
    }
    catch(err){
        res.send({
            message: "You are not authorized to go to the Protected Route!"
        })
    }
}

const forgetPassword = async (req,res)=>{
    try{
        const body = req.body;
        if(body.emailId === undefined){
            return res.send({
                success: false,
                message: "Please enter the email for forget Password"

            })
        }

        let user = await userModel.findOne({email : body.emailId});
        console.log('user',user)
        if(user===null){
            return res.send({
                success: false,
                message : "user not found for this email",
                
            })
        }

        let otp = otpGenerator();
        console.log('otp before', otp);
        
        user.otp = otp;
        user.otpExpiry = Date.now() + 60*60*1000
        await user.save();

        await emailHandler('OTP.html',user.email,{
            name:user.userName,
            otp:otp
        })

        res.send({
            success: true
        })
        
        
        
    }
    catch(err){
        res.send({
            message: err.message
        })
    }
}


const otpChecker = async (req,res)=>{
   try{
        const body = req.body;
        const otp = await userModel.findOne({otp: body.otp,email:body.emailId}).lean();
        // console.log('otp value:', otp);
        
        if(otp==null){
           return res.send({
                success: false,
                message: "OTP is not correct!"
            })
        }
        if(otp.otpExpiry < Date.now()){
           return res.send({
                success: false,
                message: "OTP is Expired!"
            })
        }
        return res.send({
             success: true,
            message: "OTP is valid!"
        }) 
   }
   catch(err){
        console.log(err)
   }     
}

const resetPassword = async (req,res)=>{
    try{
        const userDetails = await userModel.findOne({otp:req.body.otp});
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await  bcrypt.hash(req.body.password,salt);

        userDetails.password = hashedPassword;
        userDetails.otp = undefined;
        userDetails.otpExpiry = undefined;
        await userDetails.save();

        res.send({
            success: true,
            message: "password reset successfully"
        })


    }
    catch (err) {
        res.send({
            message: err.message,
            success: false
        })
    }


}

module.exports = {
    loginDetailsHandler,
    userRegistrationDetail,
    getCurrentUser,
    forgetPassword,
    otpChecker,
    resetPassword
}