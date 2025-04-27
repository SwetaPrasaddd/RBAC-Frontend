import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 py-4 px-8 shadow-md">
            <div className="flex items-center justify-between">
                <div className="text-white font-bold text-2xl">
                    RBAC App💻
                </div>
                <div className="flex space-x-5">
                    <a href="/" className="text-gray-300 hover:text-white transition">
                        Home
                    </a>
                    <a href="/login" className="text-gray-300 hover:text-white transition">
                        Login
                    </a>
                    <a href="/signup" className="text-gray-300 hover:text-white transition">
                        Signup
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
