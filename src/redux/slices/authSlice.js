import { createSlice } from '@reduxjs/toolkit';

const storedAuth = localStorage.getItem("auth");
const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;

const initialState = {
    user: parsedAuth?.user || null,
    token: parsedAuth?.token || null,
    role: parsedAuth?.role || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.role;

            localStorage.setItem("auth", JSON.stringify({
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role
            }));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;

            localStorage.removeItem("auth");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
