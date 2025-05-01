import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useSelector } from 'react-redux';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // for navigation

const BlogPage = () => {
    const { user, token } = useSelector((state) => state.auth);
    const [blogs, setBlogs] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ title: '', content: '', _id: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await API.get('/blogs');
            setBlogs(res.data);
        } catch (err) {
            toast.error("Failed to fetch blogs");
        }
    };

    const handleReadMore = (blog) => {
        return navigate(`/blog/${blog._id}`, { state: { blog } });
    };

    const handleAdd = () => {
        setEditMode(false);
        setFormData({ title: '', content: '' });
        setOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editMode) {
                await API.patch(`/blogs/${formData._id}`, {
                    title: formData.title,
                    content: formData.content
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Blog updated");
            } else {
                await API.post(`/blogs/${user._id}`, {
                    title: formData.title,
                    content: formData.content
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Blog Added Successfully !");
            }
            setOpen(false);
            fetchBlogs();
        } catch (err) {
            toast.error("Failed to save blog");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">🌒 Blogs</h1>
                    {user ? <Button
                        variant="contained"
                        startIcon={<AddCircle />}
                        sx={{ backgroundColor: "#6366f1", ":hover": { backgroundColor: "#4f46e5" } }}
                        onClick={handleAdd}
                    >
                        New Blog
                    </Button> : <div></div>}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="bg-gray-800 rounded-2xl p-8 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex flex-col justify-between min-h-[400px] w-[340px]"
                        >
                            <div>
                                <h3 className="text-2xl font-bold text-indigo-400 mb-3">{blog.title}</h3>
                                <p className="text-gray-300 text-base leading-relaxed">
                                    {blog.content.substring(0, 220)}...
                                </p>
                            </div>
                            <div className="mt-6 flex justify-between items-center">
                                <small className="text-gray-400 italic">By: {blog.author?.name || 'Unknown'}</small>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleReadMore(blog)}
                                    sx={{
                                        color: "#6366f1",
                                        borderColor: "#6366f1",
                                        ":hover": {
                                            borderColor: "#4f46e5",
                                            backgroundColor: "#4f46e5",
                                            color: "white"
                                        }
                                    }}
                                >
                                    Read More
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dialog for New Blog or Edit Blog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editMode ? "Edit Blog" : "New Blog"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        fullWidth
                        margin="dense"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <TextField
                        label="Content"
                        fullWidth
                        multiline
                        rows={4}
                        margin="dense"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BlogPage;
