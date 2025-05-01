// VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let hasVerified = false;

        const verify = async () => {
            if (hasVerified) return;
            hasVerified = true;

            try {
                await API.get(`/auth/verify-email/${token}`);
                toast.success("Email verified successfully. You can now log in.");
                return navigate("/login");
            } catch (error) {
                toast.error(error.response?.data?.message || "Email verification failed.");
                setTimeout(() => navigate("/login"), 3000);
            } finally {
                setLoading(false);
            }
        };

        verify();
    }, []);



    return (
        <div className="flex justify-center items-center min-h-screen">
            {loading ? <h2>Verifying...</h2> : null}
        </div>
    );
};

export default VerifyEmail;
