import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const BlogDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const blog = state?.blog;

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <p>No blog data found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl p-8 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-indigo-400">{blog.title}</h1>
                    <Button
                        startIcon={<ArrowBack />}
                        variant="outlined"
                        onClick={() => navigate(-1)}
                        sx={{
                            color: "#a5b4fc",
                            borderColor: "#a5b4fc",
                            ":hover": { backgroundColor: "#4f46e5", color: "#fff" }
                        }}
                    >
                        Back
                    </Button>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">{blog.content}</p>
                <div className="text-right">
                    <span className="text-sm text-gray-400 italic">— By {blog.author?.name || "Unknown"}</span>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
