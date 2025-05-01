import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useSelector } from 'react-redux';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, IconButton
} from '@mui/material';
import { AddCircle, Edit, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {
    const { user, token } = useSelector((state) => state.auth);
    const [blogs, setBlogs] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ title: '', content: '', _id: '' });
    const [deleteId, setDeleteId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user._id) {
            fetchMyBlogs();
        }
    }, [user]);

    const fetchMyBlogs = async () => {
        try {
            const res = await API.get(`/blogs/${user._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setBlogs(res.data);
        } catch (err) {
            toast.error("Failed to fetch your blogs");
        }
    };

    const handleAdd = () => {
        setEditMode(false);
        setFormData({ title: '', content: '' });
        setOpen(true);
    };

    const handleEdit = (blog) => {
        setEditMode(true);
        setFormData(blog);
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
                toast.success("Blog created");
            }
            setOpen(false);
            fetchMyBlogs();
        } catch (err) {
            toast.error("Failed to save blog");
        }
    };

    const handleReadMore = (blog) => {

        return navigate(`/blog/${blog._id}`, { state: { blog } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">📝 My Blogs</h1>
                    {user && (
                        <Button
                            variant="contained"
                            startIcon={<AddCircle />}
                            sx={{ backgroundColor: "#6366f1", ":hover": { backgroundColor: "#4f46e5" } }}
                            onClick={handleAdd}
                        >
                            New Blog
                        </Button>
                    )}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.length === 0 ? (
                        <p className="text-gray-400 col-span-full text-center">No blogs found.</p>
                    ) : (
                        blogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/40 transition-shadow duration-300 flex flex-col justify-between min-h-[300px]"
                            >
                                <div>
                                    <h3 className="text-xl font-bold text-indigo-400 mb-2">{blog.title}</h3>
                                    <p className="text-gray-300 mb-4">{blog.content.substring(0, 150)}...</p>
                                </div>
                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700">
                                    <small className="text-gray-400 italic">By: You</small>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleReadMore(blog)}
                                            sx={{
                                                color: "#60a5fa",
                                                borderColor: "#60a5fa",
                                                ":hover": { backgroundColor: "#1e40af", color: "white", borderColor: "#1e3a8a" }
                                            }}
                                        >
                                            Read More
                                        </Button>
                                        <IconButton
                                            onClick={() => handleEdit(blog)}
                                            sx={{ color: "#93c5fd", ":hover": { color: "#bfdbfe" } }}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => setDeleteId(blog._id)}
                                            sx={{ color: "#f87171", ":hover": { color: "#fca5a5" } }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Dialog for Create/Edit */}
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

            {/* Delete Confirmation Dialog */}
            <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this blog? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancel</Button>
                    <Button
                        onClick={async () => {
                            try {
                                await API.delete(`/blogs/${deleteId}`, {
                                    headers: { Authorization: `Bearer ${token}` }
                                });
                                toast.success("Blog deleted");
                                fetchMyBlogs();
                            } catch (err) {
                                toast.error("Failed to delete blog");
                            } finally {
                                setDeleteId(null);
                            }
                        }}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MyBlogs;
