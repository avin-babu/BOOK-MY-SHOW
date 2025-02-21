const movieModel = require("../MODEL/movieModel")


const addMovieHandler = async (req,res)=>{
    try{
        const addMovie = new movieModel(req.body);
        await addMovie.save();
        
        return res.status(200).send({
            success:true,
            message: "Movie added successfully!",
        })
    }catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Internal Server error."
        })
    }
    
}

const getAllMovieHandler = async (req,res)=>{
    try{
        const allMovies = await movieModel.find();

        return res.send({
            success: true,
            message: "All movies Fetched succesfully!",
            movies: allMovies
        })
    }catch(err){
        console.log(err);
       return res.send({
            success: false,
            message: `Internal Server error `,
            error: err
        })
    }
}

const updateMovieHandler = async (req,res)=>{
    try{
        const updateMovie = await movieModel.findOneAndUpdate({_id:req.body.movieId},req.body,{new:true});

        return res.status(200).send({
            success: true,
            message: "Movie got updated!",
            updateMovie
        })
    }catch(err){
        return res.status(500).send({
            body: req.body,
            movieId: req.body.movieId,
            success: false,
            message: "Internal Server error",
            error:err
        })
    }
}

const getMovieById = async (req,res)=>{
    try{
        const id = req.body.movieId;
        const allMovies = await movieModel.findById(id);

        return res.status(200).send({
            success: true,
            message: "Movie Fetched succesfully!",
            movies: allMovies
        })
    }catch(err){
        console.log(err);
       return  res.status(500).send({
            success: false,
            message: `Internal Server error `,
            error: err
        })
    }
}

const deleteMovieById = async (req,res)=>{
    try{
        const id = req.body.movieId;
        const allMovies = await movieModel.findByIdAndDelete({_id:id});

        return res.send({
            success: true,
            message: "Movie deleted succesfully!",
            allMovies
        })
    }catch(err){
        console.log(err);
        return res.send({
            success: false,
            message: `Internal Server error `,
            error: err
        })
    }
}

module.exports = {
    addMovieHandler,
    getAllMovieHandler,
    updateMovieHandler,
    getMovieById,
    deleteMovieById
};