const userModel = require('../MODEL/userDetails');
const JWT = require('jsonwebtoken');

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

        if(body.password !== userExist.password){
            return res.send({
                success:false,
                message: "Password is incorrect!",
            })
        }
        
        const token = JWT.sign({userId:userExist._id},process.env.SECRET_KEY,{expiresIn:"1d"});
        res.send({
            success:true,
            message:"User logged in successfully",
            token: token
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

        const newUser = new userModel(body);
        await newUser.save();

        res.send({
            success: true,
            message: "User created successfully!",
            data: newUser
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
module.exports = {
    loginDetailsHandler,
    userRegistrationDetail,
    getCurrentUser
}