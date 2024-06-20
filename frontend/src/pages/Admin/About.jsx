import React from 'react';
import logo from "../../assert/logobg.ico";

const About = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <header className="bg-white dark:bg-gray-800 shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">About Us-Dummy Info</h1>
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
                    <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
                    <p className="leading-relaxed">
                        At SkillShaks, our mission is to provide high-quality, accessible, and affordable 
                        online courses to learners worldwide. We aim to empower individuals with the knowledge 
                        and skills they need to succeed in their personal and professional lives.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">What We Offer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-center">
                            <img src={logo} alt="Courses" className="w-16 h-16 mr-4"/>
                            <div>
                                <h3 className="text-lg font-semibold">Diverse Course Catalog</h3>
                                <p className="leading-relaxed">
                                    We offer a wide range of courses in various fields including technology, 
                                    business, arts, and more. Our courses are designed by industry experts to 
                                    ensure top-notch content.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <img src={logo} alt="Support" className="w-16 h-16 mr-4"/>
                            <div>
                                <h3 className="text-lg font-semibold">24/7 Support</h3>
                                <p className="leading-relaxed">
                                    Our dedicated support team is available around the clock to assist you with 
                                    any questions or issues you may encounter. We are committed to providing 
                                    excellent customer service.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <img src={logo} alt="Certification" className="w-16 h-16 mr-4"/>
                            <div>
                                <h3 className="text-lg font-semibold">Certification</h3>
                                <p className="leading-relaxed">
                                    Upon completing our courses, you will receive a certification that you can 
                                    showcase on your resume, LinkedIn, or personal portfolio to demonstrate your 
                                    newly acquired skills.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <img src={logo} alt="Community" className="w-16 h-16 mr-4"/>
                            <div>
                                <h3 className="text-lg font-semibold">Community Engagement</h3>
                                <p className="leading-relaxed">
                                    Join a vibrant community of learners and professionals. Participate in forums, 
                                    group discussions, and networking events to enhance your learning experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <img src={logo} alt="Founder" className="w-32 h-32 mx-auto rounded-full mb-4"/>
                            <h3 className="text-lg font-semibold">Umair</h3>
                            <p className="leading-relaxed">Founder & CEO</p>
                        </div>
                        <div className="text-center">
                            <img src={logo} alt="Team Member" className="w-32 h-32 mx-auto rounded-full mb-4"/>
                            <h3 className="text-lg font-semibold">Team Member 1</h3>
                            <p className="leading-relaxed">Chief Technology Officer</p>
                        </div>
                        <div className="text-center">
                            <img src={logo} alt="Team Member" className="w-32 h-32 mx-auto rounded-full mb-4"/>
                            <h3 className="text-lg font-semibold">Team Member 2</h3>
                            <p className="leading-relaxed">Head of Customer Support</p>
                        </div>
                    </div>
                </section>
            </main>
            
        </div>
    );
};

export default About;
