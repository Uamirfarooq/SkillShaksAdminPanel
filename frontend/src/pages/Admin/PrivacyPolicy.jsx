import React from 'react';
import logo from "../../assert/logobg.ico";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <header className="bg-white dark:bg-gray-800 shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Privacy Policy-Dummy Info</h1>
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
                    <h2 className="text-xl font-semibold mb-4">Introduction</h2>
                    <p className="leading-relaxed">
                        At SkillShaks, we are committed to protecting your privacy. This Privacy Policy 
                        explains how we collect, use, disclose, and safeguard your information when you 
                        visit our website and use our services. Please read this privacy policy carefully.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
                    <p className="leading-relaxed">
                        We may collect information about you in a variety of ways. The information we may collect 
                        on the Site includes:
                    </p>
                    <ul className="list-disc list-inside ml-4 leading-relaxed">
                        <li>Personal Data: Personally identifiable information, such as your name, shipping address, 
                            email address, and telephone number, and demographic information, such as your age, gender, 
                            hometown, and interests, that you voluntarily give to us when you register with the Site 
                            or when you choose to participate in various activities related to the Site.
                        </li>
                        <li>Derivative Data: Information our servers automatically collect when you access the Site, 
                            such as your IP address, your browser type, your operating system, your access times, and 
                            the pages you have viewed directly before and after accessing the Site.
                        </li>
                    </ul>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
                    <p className="leading-relaxed">
                        Having accurate information about you permits us to provide you with a smooth, efficient, and 
                        customized experience. Specifically, we may use information collected about you via the Site to:
                    </p>
                    <ul className="list-disc list-inside ml-4 leading-relaxed">
                        <li>Create and manage your account.</li>
                        <li>Email you regarding your account or order.</li>
                        <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                        <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
                        <li>Increase the efficiency and operation of the Site.</li>
                    </ul>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Disclosure of Your Information</h2>
                    <p className="leading-relaxed">
                        We may share information we have collected about you in certain situations. Your information may 
                        be disclosed as follows:
                    </p>
                    <ul className="list-disc list-inside ml-4 leading-relaxed">
                        <li>By Law or to Protect Rights: If we believe the release of information about you is necessary 
                            to respond to legal process, to investigate or remedy potential violations of our policies, 
                            or to protect the rights, property, and safety of others, we may share your information as 
                            permitted or required by any applicable law, rule, or regulation.
                        </li>
                        <li>Business Transfers: We may share or transfer your information in connection with, or during 
                            negotiations of, any merger, sale of company assets, financing, or acquisition of all or a 
                            portion of our business to another company.
                        </li>
                    </ul>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                    <p className="leading-relaxed">
                        If you have questions or comments about this Privacy Policy, please contact us at:
                    </p>
                    <p className="leading-relaxed">
                        <strong>SkillShaks</strong><br />
                        Email: support@skillshaks.com<br />
                        Address: 123 Learning Way, Education City, Knowledge State, 12345
                    </p>
                </section>
            </main>
            
        </div>
    );
};

export default PrivacyPolicy;
