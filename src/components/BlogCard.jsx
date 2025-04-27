import React from "react";

const BlogCard = ({ post }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-bold text-indigo-700">{post.title}</h2>
            <p className="mt-4 text-gray-600">{post.content}</p>
            <p className="mt-2 text-sm text-gray-400">Author: {post.author}</p>
        </div>
    );
};

export default BlogCard;
