import { createSlice } from '@reduxjs/toolkit';

const myBlogsSlice = createSlice({
  name: 'myBlogs',
  initialState: {
    blogs: [],
  },
  reducers: {
    setMyBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    addMyBlog: (state, action) => {
      state.blogs.push(action.payload);
    },
    updateMyBlog: (state, action) => {
      const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
    },
    deleteMyBlog: (state, action) => {
      state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
    },
  },
});

export const { setMyBlogs, addMyBlog, updateMyBlog, deleteMyBlog } = myBlogsSlice.actions;

export default myBlogsSlice.reducer;
