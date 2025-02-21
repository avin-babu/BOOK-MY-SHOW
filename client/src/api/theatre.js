import axiosInstance from ".";

export const addTheatre = async (value)=>{
    try{
        const response = await axiosInstance.post('/api/theatres/add-theatre',value);
        return response.data;
    }
    catch(err){
        throw  err;
    }
}

export const getAllTheatre = async ()=>{
    try{
        const response = await axiosInstance.get('/api/theatres/get-theatre');
        return response.data;
    }
    catch(err){
        throw  err;
    }
}

export const updateTheatre = async (value)=>{
    try{
        const response = await axiosInstance.put('/api/theatres/update-theatre',value);
        return response.data;
    }
    catch(err){
        throw  err;
    }
}

export const deleteTheatre = async (value)=>{
    try{
        console.log('vAlue from deletehandler:', value);
        
        const response = await axiosInstance.delete(`/api/theatres/delete-theatre/${value._id}`);
        return response.data;
    }
    catch(err){
        throw  err;
    }
}

export const getTheatreByOwner = async (value)=>{
    try{
        // console.log('value: ',value);
        
        const response = await axiosInstance.get(`/api/theatres/get-theatre-with-userId/${value.owner}`);
        return response.data;
    }
    catch(err){
        throw  err;
    }
}