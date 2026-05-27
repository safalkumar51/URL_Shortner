import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { logoutUser } from '../api/user.api';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      // ignore error
    }
    dispatch(logout());
    navigate({ to: "/" });
  };

  return (
    <nav className="bg-slate-200 shadow-md border-b border-slate-400 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-rose-700 flex items-center">
              <svg className="h-8 w-8 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span>URL Shortener</span>
            </Link>
          </div>
          
          {/* Right side - Auth buttons */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-slate-700 hidden sm:inline">
                  Welcome, <span className="font-semibold">{user?.name || 'User'}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-sm"
              >
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;