import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { checkAuthToken } from '../../utils/checkAuthToken';

const Navbar = () => {
    const [authStatus, setAuthStatus] = useState({ authenticated: false, token: null });
    useEffect(() => {
        const authResult = checkAuthToken();
        setAuthStatus(authResult);
      }, [checkAuthToken]);
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
            <div className="text-2xl font-bold">Admin Panel</div>
            <div className="space-x-4">
            {authStatus.authenticated ? <Link to="/admin/logout" type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Logout</Link> : <Link to={authStatus.authenticated ? "/admin/L" : "/admin/register"} className="bg-blue-800 hover:bg-blue-700 transition duration-300 px-4 py-2 rounded">Login</Link >}
                
                
            </div>
        </nav>
    )
}

export default Navbar