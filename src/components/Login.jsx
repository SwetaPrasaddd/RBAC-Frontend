import React from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

const Login = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="p-6 w-full max-w-md">
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Login
                    </Typography>
                    <form className="space-y-4">
                        <TextField label="Email" variant="outlined" fullWidth />
                        <TextField label="Password" variant="outlined" type="password" fullWidth />
                        <Button variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
