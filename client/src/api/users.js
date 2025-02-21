import {axiosInstance} from './index'

export const registerHanlder = async (value)=>{
    try{
        // console.log('value:',value);
        // console.log('axiosInstance:',axiosInstance);
        
        const response = await axiosInstance.post('api/users/register',value)
        
        return response.data;
    }
    catch(err){
        console.log('Error:', err.message); // Log the message instead of the entire error object
        throw new Error('Registration failed. Please try again.');
    }
}

export const loginApi = async (value)=>{
    try{
        const response = await axiosInstance.post('api/users/login',value);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const getCurrentUser = async ()=>{
    try{
        const response = await axiosInstance.get('/api/users/get-current-user');
        return response.data;
    }
    catch(err){
        console.log(err);
    }
    
}

export const forgetPassword = async (value)=>{
    try{
        const response = await axiosInstance.post('/api/users/forget-password',value);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const otpChecker = async (value)=>{
    try{
        const response = await axiosInstance.post('/api/users/otp-validator',value);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const resetPassword = async (value)=>{
    try{
        const response = await axiosInstance.post('/api/users/reset-password',value);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const emailHandler = async (value)=>{
    try{
        const response = await axiosInstance.post('/api/users/reset-password',value);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}