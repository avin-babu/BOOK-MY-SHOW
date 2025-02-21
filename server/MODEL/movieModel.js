const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    poster:{
        type: String,
        required: true
    },
    movieName : {
        type : String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    language:{
        type : String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    }
})


const movieModel = mongoose.model("movies",movieSchema);

module.exports = movieModel;