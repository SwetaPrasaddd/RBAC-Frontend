import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useSelector } from 'react-redux';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Switch,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const { user, token } = useSelector((state) => state.auth);
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ title: '', content: '', _id: '' });

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);

    useEffect(() => {
        fetchBlogs();
        fetchUsers();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await API.get('/blogs');
            setBlogs(res.data);
        } catch {
            toast.error('Error fetching blogs');
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await API.get('/auth/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data);
        } catch {
            toast.error('Error fetching users');
        }
    };

    const handleAdd = () => {
        setEditMode(false);
        setFormData({ title: '', content: '' });
        setOpen(true);
    };

    const handleEdit = (blog) => {
        setEditMode(true);
        setFormData({ ...blog });
        setOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchBlogs();
            toast.success('Blog deleted');
        } catch {
            toast.error('Error deleting blog');
        }
    };

    const handleSave = async () => {
        try {
            if (editMode) {
                await API.patch(`/blogs/${formData._id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success('Blog updated');
            } else {
                await API.post(`/blogs/${user._id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success('Blog created');
            }
            setOpen(false);
            fetchBlogs();
        } catch {
            toast.error('Failed to save blog');
        }
    };

    const toggleBlockUser = async (id, block) => {
        try {
            await API.patch(`/auth/block/${id}`, { block: !block }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchUsers();
            toast.success(!block ? 'User blocked' : 'User unblocked');
        } catch {
            toast.error('Failed to update user status');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-start justify-between mb-10">
                    <h1 className="text-5xl font-bold text-indigo-400 animate-pulse mt-4">Admin Dashboard</h1>
                    <button
                        onClick={handleAdd}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-2xl shadow-md transition duration-200 mt-4"
                    >
                        <AddCircle className="mr-2" /> Create Blog
                    </button>
                </div>

                <h2 className="text-3xl font-semibold text-purple-300 mb-6">All Blogs</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-indigo-500/40 transition-shadow duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-xl font-bold text-indigo-300 mb-2">{blog.title}</h3>
                                <p className="text-gray-300 line-clamp-4">{blog.content}</p>
                                <p className="text-sm italic text-gray-400">Author: {blog.author?.name || 'Unknown'}</p>
                            </div>
                            <div className="mt-4 flex gap-4">
                                <button
                                    onClick={() => handleEdit(blog)}
                                    className="px-4 py-2 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setBlogToDelete(blog);
                                        setDeleteDialogOpen(true);
                                    }}
                                    className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <h2 className="text-3xl font-semibold text-purple-300 mb-6">Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 rounded-xl">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="text-left p-4 text-white">Name</th>
                                <th className="text-left p-4 text-white">Email</th>
                                <th className="text-left p-4 text-white">Role</th>
                                <th className="text-left p-4 text-white">Blocked</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} className="border-b border-gray-600">
                                    <td className="p-4 text-gray-200">{u.name}</td>
                                    <td className="p-4 text-gray-200">{u.email}</td>
                                    <td className="p-4 text-gray-200">{u.role}</td>
                                    <td className="p-4">
                                        <Switch
                                            checked={u.block}
                                            onChange={() => toggleBlockUser(u._id, u.block)}
                                            color="error"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Blog Create/Edit Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle className="bg-gray-800 text-white">{editMode ? 'Edit Blog' : 'New Blog'}</DialogTitle>
                <DialogContent className="bg-gray-800">
                    <TextField
                        label="Title"
                        fullWidth
                        margin="dense"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <TextField
                        label="Content"
                        fullWidth
                        multiline
                        rows={4}
                        margin="dense"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                </DialogContent>
                <DialogActions className="bg-gray-800">
                    <button
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Save
                    </button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle className="bg-gray-800 text-white">Confirm Deletion</DialogTitle>
                <DialogContent className="bg-gray-800">
                    <p className="text-gray-300">
                        Are you sure you want to delete the blog titled{' '}
                        <span className="font-semibold text-red-400">
                            {blogToDelete?.title}
                        </span>
                        ?
                    </p>
                </DialogContent>
                <DialogActions className="bg-gray-800">
                    <button
                        onClick={() => setDeleteDialogOpen(false)}
                        className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            await handleDelete(blogToDelete._id);
                            setDeleteDialogOpen(false);
                            setBlogToDelete(null);
                        }}
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminDashboard;
