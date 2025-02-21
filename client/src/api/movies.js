import {axiosInstance} from './index'

export const getAllMovies = async (req, res)=>{
    try{
        const response = await axiosInstance.get('/api/movies/get-all-movies');
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const addMovie = async (value)=>{
    try{
        const response = await axiosInstance.post('/api/movies/add-movie',value);
        return response.data;
    }
    catch(err){
        throw err;
    }
}

export const updateMovie = async (value)=>{
    try{
        console.log(value);
        
        const response = await axiosInstance.post('/api/movies/update-movie',value);
        return response.data;
    }
    catch(err){
        throw err;
    }
}

export const getMovieById = async (value)=>{
    try{
        // console.log(value);
        
        const response = await axiosInstance.post('/api/movies/get-movie-by-id',value);
        return response.data;
    }
    catch(err){
        throw err;
    }
}

export const deleteMovieById = async (value)=>{
    try{
        const response = await axiosInstance.post('/api/movies/delete-movie-by-id',value);
        return response.data;
    }
    catch(err){
        throw err;
    }
}
