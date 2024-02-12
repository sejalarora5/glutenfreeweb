// Header.tsx

import React from 'react';
import appIcon from "../assets/appIcon.png";
import NavDrawerComponent from './NavDrawerComponent';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <>
            {/* Header for larger screens */}
            <div className="hidden lg:flex items-end justify-end md:pr-36 py-5 space-x-4">
                {/* Additional buttons */}
                <button className="text-white btn bg-pink-300 w-30 m-3 text-lg font-semibold">Sign In</button>
                <button className="text-white btn bg-pink-300 w-30 m-3 text-lg font-semibold">Sign Up</button>
                {/* Add more buttons as needed */}
            </div>

            <header className="md:pl-28 md:pr-36 px-5 flex items-center justify-between">
                {/* Logo on the left */}
                <div className="flex items-center">
                    <img src={appIcon} alt="Logo" className="md:h-20 h-14" />
                </div>

                {/* Sidebar (drawer) for smaller screens */}
                <div className="md:hidden">
                    {/* Implement your sidebar here */}
                    <div className="flex-none">
                        <div className="drawer drawer-end z-10">
                            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block w-8 h-8 stroke-current"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        ></path>
                                    </svg>
                                </label>
                            </div>
                            <div className="drawer-side">
                                <label
                                    htmlFor="my-drawer-4"
                                    aria-label="close sidebar"
                                    className="drawer-overlay"
                                ></label>
                                <ul className="menu p-4 md:w-80 w-60 min-h-full bg-base-200 text-base-content">
                                    <NavDrawerComponent />
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buttons on the right for larger screens */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* Additional buttons */}
                    <Link to={'/'}>
                        <button className="text-pink-300 text-xl font-semibold">Home</button>
                    </Link>

                    <Link to={'/stores'}>
                        <button className="text-pink-300 text-xl font-semibold">Find Shops</button>
                    </Link>

                    <Link to={'/cards'}>
                        <button className="text-pink-300 text-xl font-semibold">Cards</button>
                    </Link>

                    <Link to={'/blogs'}>
                        <button className="text-pink-300 text-xl font-semibold">Blogs</button>
                    </Link>

                    <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="text-pink-300 text-xl font-semibold">More ⇓</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-48">
                            <Link to={'/recipes'}>
                                <li><a className="text-pink-300 text-sm font-semibold">Recipes</a></li>
                            </Link>
                            <Link to={'/blogs'}>
                                <li><a className="text-pink-300 text-sm font-semibold">Blogs</a></li>
                            </Link>
                            <Link to={'/videos'}>
                                <li><a className="text-pink-300 text-sm font-semibold">Videos</a></li>
                            </Link>
                            <Link to={'/cards'}>
                                <li><a className="text-pink-300 text-sm font-semibold">Cards</a></li>
                            </Link>
                            <Link to={'//gluten_free_ebook'}>
                                <li><a className="text-pink-300 text-sm font-semibold">Gluten Free eBook</a></li>
                            </Link>
                            <Link to={'/settings'}>
                                <li><a className="text-pink-300 text-sm font-semibold">Settings</a></li>
                            </Link>
                            <Link to={'/our_story'}>
                                <li><a className="text-pink-300 text-sm font-semibold">Our Story</a></li>
                            </Link>
                            <Link to={'/rti'}>
                                <li><a className="text-pink-300 text-sm font-semibold">Right to information</a></li>
                            </Link>
                            <Link to={'/faq'}>
                                <li><a className="text-pink-300 text-sm font-semibold">FAQ to information</a></li>
                            </Link>


                        </ul>
                    </div>
                    {/* Add more buttons as needed */}
                </div>
            </header>
        </>
    );
};

export default Header;
