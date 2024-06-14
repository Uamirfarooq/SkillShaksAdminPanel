
import { Link } from 'react-router-dom'
import { selectCurrentUser } from "../../Feature/auth/authSlice"
import { logout } from "../../Feature/auth/authSlice"
import { useDispatch, useSelector } from 'react-redux';
import DarkModeToggle from './DarkModeButton';

const Navbar = () => {
    const dispatch = useDispatch()

    const logoutapp = () => {
        dispatch(logout())

    }
    const { isAuthenticated } = useSelector(selectCurrentUser)


    return (
        <nav className="bg-blue-600 text-white min-w-full  p-4 shadow-md flex justify-between items-center">
            <div className="text-2xl font-bold">Admin Panel</div>
            <div className="space-x-4">
                {isAuthenticated ? <button onClick={logoutapp} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Logout</button>
                    :
                    <Link to="/admin/Login" className="bg-blue-800 hover:bg-blue-700 transition duration-300 px-4 py-2 rounded">Login</Link >}
                <DarkModeToggle />
            </div>
        </nav>
    )
}

export default Navbar
