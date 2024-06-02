import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white">
            <div className="text-9xl font-bold">404</div>
            <div className="text-3xl font-semibold mt-4">Oops! Page not found</div>
            <p className="text-lg mt-2">The page you are looking for might have been removed or does not exist.</p>
            <Link to="/" className="mt-8 px-6 py-3 bg-blue-700 hover:bg-blue-600 rounded-md text-lg font-semibold shadow-md transition duration-300 ease-in-out">Go back to Home</Link>
        </div>
    );
};

export default NotFoundPage;
