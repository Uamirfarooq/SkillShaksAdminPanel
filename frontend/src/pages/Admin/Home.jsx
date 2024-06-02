import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const AdminHomePage = () => {


    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            

            {/* Main Content */}
            <main className="flex-grow p-8 flex flex-col items-center justify-center">
                {/* Hero Section */}
                <section className="flex flex-col justify-center items-center text-center mb-8">
                    <h1 className="text-6xl font-bold mb-4 animate-fadeIn">Welcome to Admin Panel</h1>
                    <p className="text-xl text-gray-700 mb-8">Manage your platform efficiently</p>
                </section>

                {/* Admin Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Manage Content */}
                    <div className="bg-white p-6 shadow-md rounded-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Manage Content</h2>
                        <p className="text-gray-700 mb-4">Create, update, or delete courses and materials.</p>
                        <Link to= "/admin/dashboard" className="bg-yellow-500 hover:bg-yellow-400 transition duration-300 text-white px-4 py-2 rounded">
                            Manage Content
                        </Link>
                        
                    </div>


                    {/* View Analytics */}
                    <div className="bg-white p-6 shadow-md rounded-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">View Analytics</h2>
                        <p className="text-gray-700 mb-4">Analyze platform usage and performance metrics.</p>
                        <Link to= "/admin/analytics" className="bg-green-500 hover:bg-green-400 transition duration-300 text-white px-4 py-2 rounded">
                            View Analytics
                        </Link>
                        
                    </div>

                    {/* Manage Users */}
                    <div className="bg-white p-6 shadow-md rounded-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
                        <p className="text-gray-700 mb-4">View, add, edit, or remove users from the platform.</p>
                        <Link to= "/admin/manage-user"  className="bg-blue-600 hover:bg-blue-500 transition duration-300 text-white px-4 py-2 rounded">
                            Go to Users
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            
        </div>
    );
};

export default AdminHomePage;
