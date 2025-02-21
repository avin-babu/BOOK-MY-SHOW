const { default: mongoose } = require("mongoose");
const showModel = require("../MODEL/showModel")

const addShowHandler = async (req,res)=>{
    try{
        const newShow = new showModel(req.body);
        const newShowResponse = await newShow.save();
        res.send(
            {
                success : true,
                message : "New Show has been added!",
                newShow: newShowResponse
            }
        )
    }
    catch(err){
        res.send({
            success: false,
            message: "Error occured while adding a new show",
            err
        })
    }
}

const deleteShowHandler = async (req,res)=>{
    try{
        await showModel.findByIdAndDelete(req.body.showId);
        res.send({
            success: true,
            message: 'Show has been deleted Successfully!'
        })
    }
    catch(err){
        res.send({
            success: false,
            message: "Error occured while deleting the show"
        })
    }
}

const updateShowHandler = async (req,res)=>{
    try{
        const updatedShow = await showModel.findByIdAndUpdate({_id:req.body.showId},req.body);
        res.send({
            success: true,
            message: 'Show has been updated!',
            updatedShow: updatedShow
        })
    }
    catch(err){
        res.send({
            success: false,
            message: 'Updating the show has failed!',
            err
        })
    }
}

const getAllShowsByTheatre = async (req,res)=>{
    try{
        const getResponse = await showModel.find({ theatre: req.body.theatreId }).populate('movies');
        res.send({
            success: true,
            message: 'Fetched the shows!',
            allShows: getResponse
        })
    }
    catch(err){
        res.send({
            success: false,
            message: 'Error occured while Fetching the shows!'
        })
    }
}

const getAllTheatresByMovie = async (req,res)=>{
    try{
        const { movie,date } = req.body;
        console.log('date:',typeof(date));
        console.log('movie:',movie);
        const shows = await showModel.find({movies:movie,date:date}).populate("theatre");
        
        let uniqueTheatres = [];
        // console.log('shows:',shows);

        shows.forEach((show)=>{
            // console.log('show:',show);
            let isTheatre = uniqueTheatres.find((theatre)=>{
                return theatre._id === show.theatre._id;
            })

            if(!isTheatre){
                const showsOfThisTheatre = shows.filter((showObj)=>{
                    return showObj.theatre._id === show.theatre._id;
                })
                
                uniqueTheatres.push({
                    ...show.theatre._doc,
                    shows: showsOfThisTheatre
                })
            }
        })

        

        res.send({
            success: true,
            message: 'Movies  fetched!',
            shows: uniqueTheatres
        })
    }
    catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
}

const getShowById = async (req,res)=>{
    try {
        const show = await showModel.findById({_id:req.body.showId})
          .populate("movies")
          .populate("theatre");
        res.send({
          success: true,
          message: "Show fetched!",
          data: show,
        });
      } catch (err) {
        res.send({
          success: false,
          message: err.message,
        });
      }
    
}

module.exports = {
    addShowHandler,
    deleteShowHandler,
    updateShowHandler,
    getAllShowsByTheatre,
    getAllTheatresByMovie,
    getShowById
}