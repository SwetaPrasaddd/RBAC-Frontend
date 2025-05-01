import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-indigo-400 mb-6">Privacy Policy</h1>
                <p className="text-gray-300 mb-4">
                    Last updated: <span className="italic">April 30, 2025</span>
                </p>

                <section className="mb-6">
                    <h2 className="text-2xl text-indigo-300 font-semibold mb-2">1. Introduction</h2>
                    <p className="text-gray-300">
                        We respect your privacy and are committed to protecting your personal data.
                        This Privacy Policy outlines how we collect, use, and safeguard your information when you use our blogging platform.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl text-indigo-300 font-semibold mb-2">2. Information We Collect</h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Your name and email when signing up.</li>
                        <li>Blog content you create and post.</li>
                        <li>Usage data such as browser type and visit duration.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl text-indigo-300 font-semibold mb-2">3. How We Use Your Information</h2>
                    <p className="text-gray-300">
                        We use your information to provide and improve our services, personalize your experience,
                        communicate with you, and ensure security.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl text-indigo-300 font-semibold mb-2">4. Data Protection</h2>
                    <p className="text-gray-300">
                        Your data is stored securely and we implement industry-standard measures to prevent unauthorized access,
                        disclosure, or loss of data.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl text-indigo-300 font-semibold mb-2">5. Third-Party Services</h2>
                    <p className="text-gray-300">
                        We do not sell or rent your personal data. Some analytics or authentication services may have limited access to anonymized data.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl text-indigo-300 font-semibold mb-2">6. Your Rights</h2>
                    <p className="text-gray-300">
                        You can access, modify, or delete your data at any time by contacting us or through your account settings.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl text-indigo-300 font-semibold mb-2">7. Contact</h2>
                    <p className="text-gray-300">
                        For any questions regarding your privacy, please email us at:
                        <span className="text-indigo-400"> support@rbacblog.com</span>
                    </p>
                </section>

                <footer className="text-sm text-gray-500 italic mt-10 text-center">
                    &copy; {new Date().getFullYear()} RBACBlog. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
