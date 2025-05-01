import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/signup", {
                name,
                email,
                password,
            });
            toast.success("Signup successful! Please check your email to verify your account.");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="backdrop-blur-md bg-white/10 border border-gray-600 rounded-xl shadow-2xl p-10 w-full max-w-md animate-fade-in">
                <h2 className="text-3xl font-extrabold mb-6 text-center">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-sm text-gray-400 text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-400 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
