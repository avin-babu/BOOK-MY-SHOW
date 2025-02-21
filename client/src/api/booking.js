import axiosInstance from ".";


export const makePayment = async (value)=>{
    try{
        const response = await axiosInstance.post('/api/bookings/make-payment',value);
        return response.data;
    }
    catch(err){
        return err.message;
    }
}

export const bookShow = async (value)=>{
    try{
        const bookShowResponse = await axiosInstance.post('/api/bookings/book-show',value);
        return bookShowResponse.data;
    }
    catch(err){
        return err.message;
    }
}