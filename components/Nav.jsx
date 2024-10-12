"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const Nav = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle burger menu

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        
            <nav className='flex-between w-full mb-16 pt-3'>
                <Link href="/" className="flex gap-2 flex-center">
                    <Image
                        src="/assets/images/logo-dz.png"
                        alt='FindMe-logo' width={30} height={30}
                        className='object-contain'
                    />
                    <p className='logo_text'>FindMe</p>
                </Link>



                <div className='sm:flex hidden'>

                    <div className='flex gap-3 md:gap-5 '>
                        <Link href="/profile" className='outline_btn'>
                            My Profile
                        </Link>
                        <Link href="/create-prompt" className='black_btn'>
                            Create Post
                        </Link>


                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>


                    </div>

                </div>

                {/* mobile navigation */}
                <div className='sm:hidden flex relative'>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                    <div className='relative'>
                        {/* Burger Icon */}

                        <div className="relative">
                            {/* Burger Icon */}
                            <button
                                onClick={toggleMenu}
                                className="flex flex-col justify-center items-center w-8 h-10 space-y-1 ml-3"
                            >
                                <div className={`w-8 h-1 bg-black rounded transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
                                <div className={`w-8 h-1 bg-black rounded transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                                <div className={`w-8 h-1 bg-black rounded transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                                    <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        My Profile
                                    </a>
                                    <a href="/create-prompt" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Create Prompt
                                    </a>
                                </div>
                            )}
                        </div>



                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2'>
                                <Link href="/profile" className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
                                    My Profile
                                </Link>

                                <Link href="/create-prompt" className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
                                    Create Post
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav >
        
    )
}

export default Nav
