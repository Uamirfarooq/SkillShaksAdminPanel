import React from 'react';
import logo from "../../assert/logobg.ico";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <header className="bg-white dark:bg-gray-800 shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Contact Us-Dummy Info</h1>
                    <div className="flex items-center space-x-4">
                        <span className="font-medium">Welcome, Admin</span>
                        <img 
                            src={logo}
                            alt="Admin" 
                            className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
                        />
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                    <p className="leading-relaxed">
                        We are here to help you with any questions or concerns you may have. Please feel free to reach out to us using the information below.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <div className="leading-relaxed">
                        <p><strong>Email:</strong> support@skillshaks.com</p>
                        <p><strong>Phone:</strong> +1 (123) 456-7890</p>
                        <p><strong>Address:</strong> 123 Learning Way, Education City, Knowledge State, 12345</p>
                    </div>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="message">Message</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                rows="5" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
                                required 
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Send Message
                        </button>
                    </form>
                </section>
            </main>
            
        </div>
    );
};

export default Contact;
