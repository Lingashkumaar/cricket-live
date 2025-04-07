import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Cricket Live
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/live-matches" className="hover:text-blue-200">
              Live Matches
            </Link>
            <Link href="/upcoming-matches" className="hover:text-blue-200">
              Upcoming
            </Link>
            <Link href="/completed-matches" className="hover:text-blue-200">
              Completed
            </Link>
            <Link href="/series" className="hover:text-blue-200">
              Series
            </Link>
            <Link href="/rankings" className="hover:text-blue-200">
              Rankings
            </Link>
          </div>
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;