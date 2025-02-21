const theatreModel = require('../MODEL/theatreModel')

const addTheatreHandler = async (req,res)=>{
    try{
        const body = req.body;
        const newtheatre = new theatreModel(body);
        await newtheatre.save();
        res.status(200).json({
            'success': true,
            'message': 'Theatre added successfully!'
        })
    }
    catch(err){
        res.status(500).json({
            'success': false,
            'err':err
        }
        )
    }
}

const getAllTheatreHandler = async (req,res)=>{
    try{
        const allTheatre = await theatreModel.find().populate({path: 'owner',select:'-password'});
        res.status(200).send({
            success : true,
            message : "Fetched all theatres!",
            theatres: allTheatre
        })
    }
    catch(err){
        res.status(500).send({
            success : false,
            message : 'Error occured while fetching the theatres list!'
        })
    }
}


const updateTheatreHandler = async (req,res)=>{
    try{
        const updatedTheatre = await theatreModel.findByIdAndUpdate(req.body.theatreId,req.body);
        res.status(200).send({
            success : true,
            message : "Theatre updated!",
            updatedTheatre: updatedTheatre
        })
    }
    catch(err){
        res.status(500).send({
            success : false,
            message : 'Error occured while updating the theatres list!'
        })
    }
}

const deleteTheatreHandler = async (req,res)=>{
    try{
        console.log('deleteHandler : ',req.params);
        await theatreModel.findByIdAndDelete(req.params.theatreId);
        res.status(200).send({
            success : true,
            message : "The theatre has been deleted!",
        })
    }
    catch(err){
        res.status(500).send({
            success : false,
            message : 'Error occured while deleting the theatre!'
        })
    }
}

const getTheatreById = async (req,res)=>{
    try{
        // console.log('requested body: ',req.params.ownerId);
        
        const getTheatreByUserId = await theatreModel.find({
            owner: req.params.ownerId
        })

        res.status(200).send({
            success: true,
            message: "Fetched the theatre",
            theatre: getTheatreByUserId
        })
    }
    catch(err){
        res.status(500).send({
            success : false,
            message : `Error occured while fetching the theatre! ${err}`
        })
    }
}


module.exports = {
    addTheatreHandler,
    updateTheatreHandler,
    getAllTheatreHandler,
    deleteTheatreHandler,
    getTheatreById
}