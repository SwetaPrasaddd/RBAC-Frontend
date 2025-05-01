import React from 'react';
import { Typography } from '@mui/material';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-10">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold text-indigo-400 mb-6">About</h1>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    Welcome to <span className="text-indigo-300 font-semibold">RBAC Blog</span> – a vibrant space where ideas meet expression.
                    Whether you're a seasoned writer or just starting your journey, this platform empowers you to share your thoughts,
                    explore others' perspectives, and be part of a growing community of passionate storytellers.
                </p>

                <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-8">
                    <Typography variant="h6" className="text-indigo-300 mb-2">🌟 Features:</Typography>
                    <ul className="list-disc text-left list-inside text-gray-300 space-y-2">
                        <li>Create, read, update, and delete blogs effortlessly.</li>
                        <li>Role-based access for users and admins.</li>
                        <li>Interactive and modern UI built with React, Tailwind, and MUI.</li>
                        <li>Secure login and user authentication using JWT.</li>
                        <li>Personalized dashboard to manage your blogs.</li>
                    </ul>
                </div>

                <div className="text-sm text-gray-400 italic">
                    Built with ❤️ using MERN stack, TailwindCSS, and Material UI.
                </div>
            </div>
        </div>
    );
};

export default About;
