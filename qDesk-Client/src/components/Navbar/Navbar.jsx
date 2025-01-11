import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const { user, logOutUser } = useContext(AuthContext)
  // console.log(user);

  useEffect(() => {
    if (darkMode) {
      document.querySelector("html").classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.querySelector("html").classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("User logged out!")
      })
      .catch(() => {
        toast.error("Something went wrong!")
      })
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="navbar">
          <div className="flex-1">
            <Link to="/" className="font-bold text-xl text-gray-700 dark:text-white">qDesk</Link>
          </div>
          <div className="flex-none gap-8">
            <div>
              <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-500" : "text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"}> Home </NavLink>
            </div>
            <div>
              <NavLink to="/all-jobs" className={({ isActive }) => isActive ? "text-blue-500" : "text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"}> All Jobs </NavLink>
            </div>

            {
              !user && <div>
                <NavLink to="/login" className={({ isActive }) => isActive ? "text-blue-500" : "text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"}> Login </NavLink>
              </div>
            }

            {
              user && <div className="dropdown dropdown-end z-40">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" title={user?.displayName}>
                  <div className="w-10 rounded-full">
                    <img referrerPolicy='no-referrer'
                      alt="User"
                      src={user?.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content space-y-1 bg-white dark:bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li>
                    <NavLink to="/add-jobs" className={({ isActive }) => isActive ? "text-blue-500" : "justify-between text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"}>
                      Add Job
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-posted-jobs" className={({ isActive }) => isActive ? "text-blue-500" : "justify-between text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"}>
                      My Posted Jobs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-bids" className={({ isActive }) => isActive ? "text-blue-500" : "justify-between text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"}>
                      My Bids
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/bid-requests" className={({ isActive }) => isActive ? "text-blue-500" : "justify-between text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"}>
                      Bid Requests
                    </NavLink>
                  </li>
                  <li className='bg-gray-200 dark:bg-gray-700 rounded-md text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400' onClick={handleLogOut}><button>Logout</button></li>
                </ul>
              </div>
            }

            {/* theme controller */}
            <label className="flex cursor-pointer gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path
                  d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input type="checkbox" onChange={() => setDarkMode(!darkMode)} className="toggle theme-controller" checked={darkMode} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </div>
        </div>
        {/* <hr className="border-gray-200 dark:border-gray-700"></hr> */}
      </div>
    </div>
  );
};

export default Navbar;