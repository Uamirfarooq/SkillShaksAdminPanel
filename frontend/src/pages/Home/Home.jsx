import React from 'react';
import 'tailwindcss/tailwind.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="flex justify-between items-center p-5 bg-green-600 text-white">
        <div className="text-2xl font-bold">EduLearn</div>
        <nav className="space-x-4">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#courses" className="hover:underline">Courses</a>
          <a href="#testimonials" className="hover:underline">Testimonials</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </header>
      <section className="relative text-center text-white bg-gradient-to-br from-green-600 to-green-400 py-24 overflow-hidden">
        <h1 className="text-5xl font-bold">Welcome to EduLearn</h1>
        <p className="mt-4 text-xl">Your gateway to knowledge and learning</p>
        <button className="mt-6 px-8 py-3 bg-green-700 rounded-md hover:bg-green-800 transition-colors">Get Started</button>
        <div className="absolute inset-0 bg-cover opacity-10 animate-floating" style={{ backgroundImage: 'url(path/to/your/animation.svg)' }}></div>
      </section>
      <section id="features" className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Features</h2>
        <div className="flex justify-center space-x-6 flex-wrap">
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:-translate-y-2">Interactive Courses</div>
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:-translate-y-2">Expert Tutors</div>
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:-translate-y-2">Flexible Learning</div>
        </div>
      </section>
      <section id="courses" className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Popular Courses</h2>
        <div className="flex justify-center space-x-6 flex-wrap">
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:-translate-y-2">Web Development</div>
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:-translate-y-2">Data Science</div>
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:-translate-y-2">Graphic Design</div>
        </div>
      </section>
      <section id="testimonials" className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Students Say</h2>
        <div className="flex justify-center space-x-6 flex-wrap">
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:-translate-y-2">"This platform is amazing!" - Jane Doe</div>
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:-translate-y-2">"I learned so much from the courses." - John Smith</div>
        </div>
      </section>
      <footer id="contact" className="py-10 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-5">Contact Us</h2>
        <p>Email: info@edulearn.com</p>
        <p>Phone: 123-456-7890</p>
      </footer>
    </div>
  );
};

export default HomePage;
