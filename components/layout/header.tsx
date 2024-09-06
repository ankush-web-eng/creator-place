'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CiSearch, CiShoppingCart, CiCircleInfo, CiHeadphones } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { signOut, useSession } from 'next-auth/react';

const NavLinks: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div className="relative">
        <input
          type="text"
          className="bg-white text-black px-3 py-2 pl-10 rounded-full focus:outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="flex items-center space-x-2 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <CiSearch />
          <span className={`text-black transition-opacity duration-300 ${isFocused ? 'opacity-0' : 'opacity-100'}`}>
            Search
          </span>
        </div>
      </div>

      <Link href={'/cart'} className='flex space-x-1'>
        <CiShoppingCart size={24} />
        <span className='font-semibold'>Cart</span>
      </Link>

      <Link href={'/about'} className='flex space-x-1'>
        <CiCircleInfo size={24} />
        <span className='font-semibold'>About</span>
      </Link>

      <Link href={'/contact'} className='flex space-x-1'>
        <CiHeadphones size={24} />
        <span className='font-semibold'>Contact</span>
      </Link>
    </>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { data: session } = useSession();

  const handleAuth = () => {
    if (session?.user) {
      signOut();
    } else {
      window.location.href = '/signin';
    }
  }

  return (
    <nav className="fixed z-50 backdrop-blur-3xl top-5 left-1/2 transform -translate-x-1/2 w-[65%] bg-gray-100 text-black rounded-full px-5 py-1 flex justify-between items-center lg:w-[65%]">
      <Link href={'/dashboard'} className="text-black flex space-x-2 font-bold items-center">
        <Image src='/vyb-icon.png' alt='VYB Icon' width={20} height={20} className='h-6 w-10' fetchPriority='high' loading='lazy' />
        <span className='font-bold text-xl'>VYB Store</span>
      </Link>

      <div className="hidden lg:flex space-x-4 py-3 items-center">
        <NavLinks />
        <div className='relative border rounded-xl flex space-x-3 border-black p-2 cursor-pointer' onClick={() => setHidden(!hidden)}>
          <FaUser size={20} />
          {hidden ? <MdKeyboardArrowDown size={20} /> : <IoIosArrowUp size={20} />}
          <div className={`${hidden ? "hidden" : "flex flex-col space-y-2"} absolute left-0 top-full mt-1 bg-gray-100 opacity-80 backdrop-blur-xl z-50 shadow-lg rounded-lg`}>
            <span className='hover:bg-gray-300 rounded-xl px-3 py-1'>Profile</span>
            <span onClick={handleAuth} className='hover:bg-gray-300 rounded-xl px-3 py-1'>{session?.user ? 'Logout' : 'Login'}</span>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-gray-200 focus:outline-none">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-100 mt-2 py-2 rounded-lg lg:hidden">
          <div className="lg:hidden flex flex-col justify-center items-start space-y-3 py-3 px-4">
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
