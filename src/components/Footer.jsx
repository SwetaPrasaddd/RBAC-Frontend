// src/components/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TermsModal from './TermsModal';

const Footer = () => {
    const [openTerms, setOpenTerms] = useState(false);

    return (
        <footer className="bg-gray-950 py-4 text-center text-gray-400">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} RBACBlog App. All rights reserved.
            </p>
            <div className="mt-4">
                <Link to="/about" className="text-gray-300 hover:text-white transition mx-2">About</Link>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition mx-2">Privacy Policy</Link>
                <button
                    onClick={() => setOpenTerms(true)}
                    className="text-gray-300 hover:text-white transition mx-2"
                >
                    Terms of Service
                </button>
            </div>

            <TermsModal open={openTerms} onClose={() => setOpenTerms(false)} />
        </footer>
    );
};

export default Footer;
