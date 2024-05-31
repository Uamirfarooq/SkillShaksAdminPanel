import React from 'react'

const Footer = () => {
  return (
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
  )
}

export default Footer