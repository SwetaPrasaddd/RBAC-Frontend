import React, { useState } from "react";
import { useDispatch } from "react-redux";
import API from "../services/api";
import { loginSuccess } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }

        try {
            const response = await API.post('/auth/login', { email, password });

            dispatch(loginSuccess({
                user: response.data.user,
                token: response.data.token,
                role: response.data.role
            }));

            toast.success("Login Successful!");
            setTimeout(() => {
                navigate('/Home');
            }, 400);
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="backdrop-blur-md bg-white/10 border border-gray-600 rounded-xl shadow-2xl p-10 w-full max-w-md animate-fade-in">
                <h2 className="text-3xl font-extrabold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-gray-400 text-center mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-indigo-400 hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
