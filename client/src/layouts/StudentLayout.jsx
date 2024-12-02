import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';  // Use Link from react-router-dom
import { Home, Menu, Plus, Users } from 'lucide-react'; // Removed BarChart and Phone icons
import logo from "../assets/dcrustLogo.png";
import dp from "../assets/profile.png";

const StudentLayout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleAuth = () => setIsAuthenticated(!isAuthenticated);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const navigate = useNavigate();

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-10 bg-blue-950 p-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="logo" className="w-12 border-1 border-black" />
                    </div>

                    {/* Desktop Navbar Links */}
                    <div className="hidden lg:flex gap-4 items-center">
                        <Link to="/student/dashboard" className="text-white font-semibold hover:text-yellow-400 flex gap-1">
                            <Home /> Home
                        </Link>
                        <Link to="/student/jobs" className="text-white font-semibold hover:text-yellow-400 flex gap-1">
                            <Plus /> Apply Jobs
                        </Link>

                        {isAuthenticated && (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="User Profile" src={dp} className="bg-white" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li><Link to="/student/profile" className="justify-between">Edit Profile</Link></li>
                                    <li><a>Logout</a></li>
                                </ul>
                            </div>
                        )}

                        {!isAuthenticated && (
                            <div className="flex gap-2">
                                <button onClick={() => { navigate("/login") }} className="btn bg-blue-950 text-white border-yellow-500">Login</button>
                                <button onClick={() => { navigate("/signup") }} className="btn bg-white text-black">Signup</button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Menu */}
                    <div className="lg:hidden flex items-center">
                        <button onClick={toggleMobileMenu} className="btn btn-ghost text-white">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Sidebar for Mobile */}
            <div className={`lg:hidden fixed top-0 left-0 h-full bg-blue-950 p-4 transition-transform ${isMobileMenuOpen ? 'transform translate-x-0' : 'transform -translate-x-full'} w-64 z-20`}>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="logo" className="w-20 mx-auto border-4 border-black" />
                    </div>
                    <h1 className='text-white text-xl font-bold text-center'>Training & Placement Portal <br /> DCRUST, Murthal </h1>
                    <Link to="/student/dashboard" className="text-white py-2 hover:text-yellow-400 font-semibold flex gap-1">
                        <Home /> Home
                    </Link>
                    <Link to="/student/jobs" className="text-white py-2 hover:text-yellow-400 font-semibold flex gap-1">
                        <Plus /> Apply Jobs
                    </Link>

                    {isAuthenticated && (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="User Profile" src={dp} className="bg-white" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>Profile</li>
                                <li><Link to="/student/profile" className="justify-between">Edit Profile</Link></li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    )}

                    {!isAuthenticated && (
                        <div className="flex flex-col gap-2">
                            <button onClick={() => { navigate("/login") }} className="btn bg-blue-950 text-white border-yellow-500">Login</button>
                            <button onClick={() => { navigate("/signup") }} className="btn bg-white text-black">Signup</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <main className={`lg:pl-0 ${isMobileMenuOpen ? 'lg:pl-64' : ''} mt-16`}>
                <Outlet />
            </main>
           
        </>
    );
};

export default StudentLayout;
