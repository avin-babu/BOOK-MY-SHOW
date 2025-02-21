const { default: axiosInstance } = require(".");

export const addShow = async (value)=>{
    try{
        const response = await axiosInstance.post('/api/shows/add-show',value);
        return response.data;
    }
    catch(err){
        return err.message;
    }
}

export const updateShow = async (value)=>{
    try{
        const response = await axiosInstance.put('/api/shows/update-show',value);
        return response.data;
    }
    catch(err){
        return err.message;
    }
}

export const getAllShowsByTheatre = async (value)=>{
    try{
        const response = await axiosInstance.post('/api/shows/get-all-shows-by-theatre',value);
        return response.data;
    }
    catch(err){
        return err.message;
    }
}

export const deleteShows = async (value)=>{
    try{
        const response = await axiosInstance.post('/api/shows/delete-show',value);
        return response.data;
    }
    catch(err){
        return err.message;
    }
}

export const getAllShowsByMovie = async (value)=>{
    try{
        const response = await axiosInstance.post('/api/shows/get-all-shows-by-movies',value);
        return response.data;
    }
    catch(err){
        return err.message;
    }
}

export const getAllShowsById = async (value)=>{
    try{
        const response = await axiosInstance.post('/api/shows/get-show-by-id',value);
        return response.data;
    }
    catch(err){
        return err.message;
    }
}