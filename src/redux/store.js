import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import myBlogsReducer from './slices/myBlogsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        myBlogs: myBlogsReducer,
    },
});
