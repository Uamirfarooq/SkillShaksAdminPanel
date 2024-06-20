import React from 'react';
import logo from "../../assert/logobg.ico";

const Licensing = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <header className="bg-white dark:bg-gray-800 shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Licensing-Dummy Info</h1>
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
                    <h2 className="text-xl font-semibold mb-4">License Agreement</h2>
                    <p className="leading-relaxed">
                        This License Agreement ("Agreement") is between you ("Licensee") and SkillShaks ("Licensor"), and governs 
                        the use of the educational content, including but not limited to, courses, tutorials, and other instructional 
                        materials provided by SkillShaks ("Content").
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Grant of License</h2>
                    <p className="leading-relaxed">
                        Subject to the terms and conditions of this Agreement, Licensor grants Licensee a non-exclusive, non-transferable, 
                        limited license to access and use the Content for personal, non-commercial educational purposes only.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Restrictions</h2>
                    <p className="leading-relaxed">
                        Licensee shall not:
                    </p>
                    <ul className="list-disc list-inside ml-4 leading-relaxed">
                        <li>Copy, reproduce, distribute, or create derivative works from the Content, except as expressly permitted by this Agreement.</li>
                        <li>Sell, sublicense, rent, lease, or otherwise transfer the Content to any third party.</li>
                        <li>Use the Content for any commercial purpose or in any public display.</li>
                        <li>Remove or alter any copyright notices or other proprietary notices on the Content.</li>
                    </ul>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Ownership</h2>
                    <p className="leading-relaxed">
                        The Content and all intellectual property rights therein are and shall remain the exclusive property of Licensor. 
                        Licensee acknowledges that no title to the intellectual property in the Content is transferred to Licensee under 
                        this Agreement.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Termination</h2>
                    <p className="leading-relaxed">
                        This Agreement is effective until terminated by either party. Licensee may terminate this Agreement at any time by 
                        discontinuing use of the Content and destroying all copies of the Content in Licensee's possession. Licensor may 
                        terminate this Agreement immediately upon notice if Licensee breaches any term of this Agreement.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Disclaimer of Warranties</h2>
                    <p className="leading-relaxed">
                        The Content is provided "as is" without warranty of any kind, either express or implied, including, but not limited to, 
                        the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. Licensor does not warrant 
                        that the Content will meet Licensee's requirements or that the operation of the Content will be uninterrupted or error-free.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
                    <p className="leading-relaxed">
                        In no event shall Licensor be liable for any damages (including, without limitation, incidental, consequential, or punitive damages) 
                        arising out of or in connection with the use or inability to use the Content, even if Licensor has been advised of the possibility of 
                        such damages.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
                    <p className="leading-relaxed">
                        This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which Licensor is located, 
                        without regard to its conflict of laws principles.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <p className="leading-relaxed">
                        If you have any questions about this Agreement, please contact us at:
                    </p>
                    <p className="leading-relaxed">
                        <strong>SkillShaks</strong><br />
                        Email: support@skillshaks.com<br />
                        Address: 123 Learning Way, Education City, Knowledge State, 12345
                    </p>
                </section>
            </main>
            <footer className="bg-white dark:bg-gray-800 shadow-md">
                <div className="container mx-auto px-4 py-4 text-center text-gray-600 dark:text-gray-400">
                    &copy; SkillShaks 2024
                </div>
            </footer>
        </div>
    );
};

export default Licensing;
