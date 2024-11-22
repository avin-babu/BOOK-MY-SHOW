import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice";
import userSlice from "./userSlice";

const store= configureStore({
    reducer:{
        loading: loaderSlice,
        user: userSlice
    }
})

export default store;