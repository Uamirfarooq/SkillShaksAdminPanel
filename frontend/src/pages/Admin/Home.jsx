import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { checkAuthToken } from '../../utils/checkAuthToken';

const AdminHomePage = () => {

    const [authStatus, setAuthStatus] = useState({ authenticated: false, token: null });

    useEffect(() => {
      const authResult = checkAuthToken();
      setAuthStatus(authResult);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
                <div className="text-2xl font-bold">Admin Panel</div>
                <div className="space-x-4">
                    <Link to="/admin/register" className="bg-blue-800 hover:bg-blue-700 transition duration-300 px-4 py-2 rounded">Login</Link >

                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow p-8">
                {/* Hero Section */}
                <section className="flex flex-col justify-center items-center text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 animate-fadeIn">Welcome to Admin Panel</h1>
                    <p className="text-xl text-gray-700 mb-8">Manage your platform efficiently</p>
                </section>

                {/* Admin Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Manage Content */}
                    <div className="bg-white p-6 shadow-md rounded-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Manage Content</h2>
                        <p className="text-gray-700 mb-4">Create, update, or delete courses and materials.</p>
                        <Link to={authStatus.authenticated ? "/admin/dashboard" : "/admin/register"} className="bg-yellow-500 hover:bg-yellow-400 transition duration-300 text-white px-4 py-2 rounded">
                            Manage Content
                        </Link>
                    </div>


                    {/* View Analytics */}
                    <div className="bg-white p-6 shadow-md rounded-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">View Analytics</h2>
                        <p className="text-gray-700 mb-4">Analyze platform usage and performance metrics.</p>
                        <button className="bg-green-500 hover:bg-green-400 transition duration-300 text-white px-4 py-2 rounded">
                            View Analytics
                        </button>
                    </div>

                    {/* Manage Users */}
                    <div className="bg-white p-6 shadow-md rounded-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
                        <p className="text-gray-700 mb-4">View, add, edit, or remove users from the platform.</p>
                        <button className="bg-blue-600 hover:bg-blue-500 transition duration-300 text-white px-4 py-2 rounded">
                            Go to Users
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold">Contact Support</h3>
                        <p>Email: admin-support@learnplatform.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold">Follow Us</h3>
                        <div className="space-x-4">
                            <a href="#" className="hover:text-gray-400">Facebook</a>
                            <a href="#" className="hover:text-gray-400">Twitter</a>
                            <a href="#" className="hover:text-gray-400">LinkedIn</a>
                        </div>
                    </div>
                    <p>© 2024 LearnPlatform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default AdminHomePage;
