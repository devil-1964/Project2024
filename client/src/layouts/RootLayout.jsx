import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BarChart, Home, HomeIcon, LayoutDashboard, LogOut, Menu, Phone, User, Users, X } from 'lucide-react'; // Lucide icon for hamburger menu
import logo from "../assets/dcrustLogo.png";
import dp from "../assets/profile.png";
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode to decode JWT

const RootLayout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isRole, setIsRole] = useState(null)
    const token = localStorage.getItem('Authorization'); // Get the token from localStorage
    const navigate = useNavigate();

    // Function to check if the token is valid
    const checkAuthentication = () => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000; // Current time in seconds
                if (decodedToken.exp < currentTime) {
                    // Token expired
                    localStorage.removeItem('Authorization');
                    setIsAuthenticated(false);

                    toast.error('Session expired. Please log in again.');
                } else {
                    // Token is valid
                    setIsRole(decodedToken.role)
                    console.log(isRole)
                    setIsAuthenticated(true);
                }
            } catch (error) {
                // Invalid token
                localStorage.removeItem('Authorization');
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []); // Re-check on token change

    const toggleAuth = () => setIsAuthenticated(!isAuthenticated);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleLogout = () => {
        localStorage.removeItem('Authorization'); // Remove token from localStorage
        setIsAuthenticated(false); // Set authentication state to false
        toast.success('Logged out successfully');
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className='flex flex-col min-h-screen relative'>
            <header className="fixed top-0 left-0 w-full z-10 bg-blue-950 p-4 ">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to='/'>
                        <div className="flex items-center hover:scale-110 transition-transform ease-in gap-2">
                            <img src={logo} alt="logo" className="w-12 border-1 border-black" />
                        </div>
                    </Link>


                    {/* Desktop Navbar Links */}
                    <div className="hidden lg:flex gap-4 items-center">
                        <a href="/" className="text-white font-semibold hover:scale-110 transition-transform ease-in hover:text-yellow-400 flex gap-1"><HomeIcon />Home</a>
                        <a href="/team" className="text-white font-semibold hover:scale-110 transition-transform ease-in hover:text-yellow-400 flex gap-1"><Users />Our Team</a>
                        <a href="/contact-us" className="text-white hover:scale-110 transition-transform ease-in hover:text-yellow-400 font-semibold flex gap-1"><Phone />Contact Us</a>
                        <a href="/placement-statistics" className="text-white hover:scale-110 transition-transform ease-in hover:text-yellow-400 font-semibold flex gap-1"><BarChart />Placement Statistics</a>
                        {isAuthenticated && (
                            <>
                                <button onClick={() => { isRole == 'student' ? navigate('/student/dashboard') : navigate('/admin/jobs') }} className="text-white hover:scale-110 transition-transform ease-in py-2 hover:text-yellow-400 font-semibold flex gap-1"><LayoutDashboard />Dashboard</button>
                                <button onClick={() => handleLogout()} className="text-white py-2 hover:text-yellow-400 font-semibold hover:scale-110 transition-transform ease-in flex gap-1"><LogOut />Logout</button>
                            </>
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
                            {isMobileMenuOpen ? (<X className="w-6 h-6" />) : (<Menu className="w-6 h-6" />)}
                        </button>
                    </div>
                </div>
            </header>

            {/* Sidebar for Mobile */}
            <div className={`lg:hidden fixed top-0 left-0 h-full bg-blue-950 opacity-95 p-4 transition-transform ${isMobileMenuOpen ? 'transform translate-x-0' : 'transform -translate-x-full'} w-64 z-20`}>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="logo" className="w-20 mx-auto border-4 border-black" />
                    </div>
                    <h1 className='text-white text-xl font-bold text-center'>Training & Placement Portal <br /> DCRUST, Murthal </h1>
                    <a href="/team" className="text-white py-2 hover:scale-105 transition-transform ease-in hover:text-yellow-400 font-semibold flex gap-1"><Users />Our Team</a>
                    <a href="/contact-us" className="text-white py-2 hover:scale-105 transition-transform ease-in hover:text-yellow-400 font-semibold flex gap-1"><Phone />Contact Us</a>
                    <a href="/placement-statistics" className="text-white py-2 hover:scale-105 transition-transform ease-in hover:text-yellow-400 font-semibold flex gap-1"><BarChart />Placement Statistics</a>

                    {isAuthenticated && (
                        <>
                            <button onClick={() => { isRole == 'student' ? navigate('/student/dashboard') : navigate('/admin/jobs') }} className="text-white py-2 hover:scale-105 transition-transform ease-in hover:text-yellow-400 font-semibold flex gap-1"><LayoutDashboard />Dashboard</button>
                            <button onClick={() => handleLogout()} className="text-white py-2 hover:scale-105 transition-transform ease-in hover:text-yellow-400 font-semibold flex gap-1"><LogOut />Logout</button>
                        </>
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
            <main className={`lg:pl-0 ${isMobileMenuOpen ? 'lg:pl-64' : ''} my-16`}>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-blue-950 text-white py-2 absolute bottom-0 w-full ">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-sm">© {new Date().getFullYear()} DCRUST. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default RootLayout;
