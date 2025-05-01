import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Slide
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TermsModal = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="md"
            fullWidth
            PaperProps={{
                className: "bg-gray-900 text-white rounded-xl border border-indigo-500"
            }}
        >
            <DialogTitle className="text-indigo-800 font-bold text-2xl">
                📜 Terms of Service
            </DialogTitle>

            <DialogContent dividers className="space-y-4 text-gray-500 max-h-[500px] overflow-y-auto">
                <p>Welcome to our platform. By using our service, you agree to the following terms:</p>

                <ul className="list-decimal list-inside space-y-2">
                    <li>You are responsible for the content you post.</li>
                    <li>Do not use our platform for illegal or harmful activities.</li>
                    <li>Respect other users and their content.</li>
                    <li>We reserve the right to remove any content that violates our policies.</li>
                    <li>Your data is protected as per our privacy policy.</li>
                    <li>We may update terms occasionally. Continued use means you accept those changes.</li>
                </ul>

                <p>These terms ensure a safe and respectful environment for everyone.</p>
            </DialogContent>

            <DialogActions className="bg-gray-800 px-6 py-4">
                <Button onClick={onClose} variant="contained" sx={{
                    backgroundColor: "#6366f1",
                    ":hover": { backgroundColor: "#4f46e5" }
                }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TermsModal;
