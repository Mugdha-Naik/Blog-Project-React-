import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSlice'; // or wherever your reducer is

const store = configureStore({
    reducer: {
        auth: authReducer,
        //TODO: add more slice here for post (HW)
        // other reducers...
    }
});
 
export default store;
