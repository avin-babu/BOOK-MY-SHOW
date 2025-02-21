import axios from 'axios'


export const axiosInstance = axios.create({
    baseURL: "https://book-my-show-nptj.onrender.com",
    headers: {
        "Content-Type": "application/json",
    }
})

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
},(error)=>{
    return Promise.reject(error);
})

export default axiosInstance;
