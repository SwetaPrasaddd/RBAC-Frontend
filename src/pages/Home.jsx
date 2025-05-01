// src/pages/Home.jsx
import React from 'react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
            <div className="flex-grow max-w-5xl mx-auto text-center py-20">
                <h1 className="text-5xl font-extrabold mb-6 text-indigo-400">
                    Welcome {user ? user.name : "to Our Blog App"} 🚀
                </h1>
                <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                    Discover and share amazing stories. Write blogs, read thoughts, and get inspired by a vibrant community of storytellers.
                </p>

                {/* CTA Buttons */}
                <div className="flex justify-center gap-6">
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#6366f1',
                            paddingX: '2rem',
                            paddingY: '0.75rem',
                            fontSize: '1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: '0.5rem',
                            boxShadow: '0px 3px 10px rgba(99, 102, 241, 0.5)',
                            ':hover': { backgroundColor: '#4f46e5' }
                        }}
                        onClick={() => navigate('/blogs')}
                    >
                        Explore Blogs
                    </Button>

                    {!user && (
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: '#6366f1',
                                color: '#6366f1',
                                fontWeight: 600,
                                paddingX: '2rem',
                                paddingY: '0.75rem',
                                borderRadius: '0.5rem',
                                textTransform: 'none',
                                ':hover': {
                                    borderColor: '#4f46e5',
                                    color: '#4f46e5',
                                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                },
                            }}
                            onClick={() => navigate('/login')}
                        >
                            Login to Start Writing
                        </Button>
                    )}
                </div>

                {/* Add More Sections Here */}
                <div className="mt-16 text-gray-400 text-sm">
                    <p className="italic">"Everyone has a story. What's yours?"</p>
                    <p className="mt-2">Start exploring now and join our community of bloggers.</p>
                </div>
            </div>


        </div>
    );
};

export default Home;
