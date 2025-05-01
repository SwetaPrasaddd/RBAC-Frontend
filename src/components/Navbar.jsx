import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Navbar = () => {
    const { user } = useSelector((state) => state.auth); // Fetching user from redux store
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from localStorage and dispatch logout to clear redux state
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/home"); // Redirect to home after logout
    };

    // MUI Menu control for profile avatar dropdown
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleEditProfile = () => {
        navigate("/profile");
        handleMenuClose();
    };

    return (
        <nav className="bg-gray-950 py-4 px-8 shadow-md">
            <div className="flex items-center justify-between">
                <div className="text-white font-bold text-2xl">RBACBlog App🖥️</div>

                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-300 hover:text-white transition">
                        Home
                    </Link>
                    {user && (
                        <Link to="/my-blogs" className="text-gray-300 hover:text-white transition">
                            My Blogs
                        </Link>
                    )}

                    {user?.role === "admin" && (
                        <Link to="/admin-dashboard" className="text-gray-300 hover:text-white transition">
                            Admin Dashboard
                        </Link>
                    )}

                    {!user ? (
                        <>
                            <Link to="/login" className="text-gray-300 hover:text-white transition">
                                Login
                            </Link>
                            <Link to="/signup" className="text-gray-300 hover:text-white transition">
                                Signup
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Avatar and Dropdown for logged-in user */}
                            <Tooltip title="Account settings">
                                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                                    <Avatar
                                        alt={user?.name}
                                        src={user?.photo || ""}
                                        sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
                                    >
                                        {user.name?.[0]?.toUpperCase()}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                onClick={handleMenuClose}
                                PaperProps={{
                                    elevation: 3,
                                    sx: {
                                        mt: 1.5,
                                        minWidth: 150,
                                    },
                                }}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                            >
                                <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    )}


                </div>
            </div>
        </nav>
    );
};

export default Navbar;
