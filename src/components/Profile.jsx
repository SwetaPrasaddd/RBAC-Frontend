import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API from '../services/api'; // 🔧 adjust if needed
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';

const Profile = () => {
    const { user, token, role } = useSelector((state) => state.auth);
    const [name, setName] = useState(user?.name || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [email] = useState(user?.email || '');
    const [photo, setPhoto] = useState(user?.photo || null);

    const dispatch = useDispatch();

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const maxSizeInMB = 5; // limit = 2MB
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

            if (file.size > maxSizeInBytes) {
                toast.error("Image is too large. Max size is 2MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result); // this is the base64 string
            };
            reader.readAsDataURL(file);
        }
    };
    console.log(photo);
    console.log(user);


    const handleSave = async () => {
        try {
            const response = await API.patch('/auth/update/:' + user._id, { name, photo, gender });
            console.log(response);
            toast.success("Profile updated!");
            dispatch(loginSuccess({
                user: response.data.user,
                token,
                role
            }));


            console.log(response.data.user);
        } catch (err) {
            toast.error("Failed to update profile" + err.message);
            // console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-6">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-gray-900 dark:text-white">
                <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
                <div className="flex justify-center mb-4">
                    <img
                        src={photo}
                        alt="Profile"
                        className="rounded-full w-32 h-32 object-cover border-2 border-gray-300 dark:border-gray-600"
                    />
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="mb-4 text-sm text-gray-700 dark:text-gray-300"
                />

                {/* Name */}
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                    type="text"
                    className="w-full mb-4 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* Gender */}
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                <input
                    type="text"
                    className="w-full mb-4 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />

                {/* Email */}
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full mb-6 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                />

                <button
                    onClick={handleSave}
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Profile;
