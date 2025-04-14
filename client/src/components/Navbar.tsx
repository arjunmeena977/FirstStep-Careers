import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActiveLink = (path: string) => {
    return location === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <i className="fa-solid fa-briefcase text-primary text-2xl mr-2"></i>
                <span className="font-bold text-xl text-neutral-dark">FresherHunt</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <Link href="/">
                <a className={`px-3 py-2 text-sm font-medium ${isActiveLink('/') ? 'text-primary border-b-2 border-primary' : 'text-neutral-medium hover:text-primary transition'}`}>
                  Home
                </a>
              </Link>
              <Link href="/off-campus-drives">
                <a className={`px-3 py-2 text-sm font-medium ${isActiveLink('/off-campus-drives') ? 'text-primary border-b-2 border-primary' : 'text-neutral-medium hover:text-primary transition'}`}>
                  Off-Campus Drives
                </a>
              </Link>
              <Link href="/work-from-home">
                <a className={`px-3 py-2 text-sm font-medium ${isActiveLink('/work-from-home') ? 'text-primary border-b-2 border-primary' : 'text-neutral-medium hover:text-primary transition'}`}>
                  Work From Home
                </a>
              </Link>
              <Link href="/internships">
                <a className={`px-3 py-2 text-sm font-medium ${isActiveLink('/internships') ? 'text-primary border-b-2 border-primary' : 'text-neutral-medium hover:text-primary transition'}`}>
                  Internships
                </a>
              </Link>
              <Link href="/youtube">
                <a className={`px-3 py-2 text-sm font-medium ${isActiveLink('/youtube') ? 'text-primary border-b-2 border-primary' : 'text-neutral-medium hover:text-primary transition'}`}>
                  YouTube
                </a>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <Button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Subscribe for Alerts
              </Button>
            </div>
            <div className="ml-3 sm:hidden">
              <button 
                type="button" 
                className="text-neutral-medium p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`sm:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/">
            <a className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveLink('/') ? 'text-primary bg-blue-50' : 'text-neutral-medium hover:bg-gray-50 hover:text-primary'}`}>
              Home
            </a>
          </Link>
          <Link href="/off-campus-drives">
            <a className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveLink('/off-campus-drives') ? 'text-primary bg-blue-50' : 'text-neutral-medium hover:bg-gray-50 hover:text-primary'}`}>
              Off-Campus Drives
            </a>
          </Link>
          <Link href="/work-from-home">
            <a className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveLink('/work-from-home') ? 'text-primary bg-blue-50' : 'text-neutral-medium hover:bg-gray-50 hover:text-primary'}`}>
              Work From Home
            </a>
          </Link>
          <Link href="/internships">
            <a className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveLink('/internships') ? 'text-primary bg-blue-50' : 'text-neutral-medium hover:bg-gray-50 hover:text-primary'}`}>
              Internships
            </a>
          </Link>
          <Link href="/youtube">
            <a className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveLink('/youtube') ? 'text-primary bg-blue-50' : 'text-neutral-medium hover:bg-gray-50 hover:text-primary'}`}>
              YouTube
            </a>
          </Link>
          <Button className="block w-full px-3 py-2 mt-4 rounded-md text-base font-medium text-white bg-primary hover:bg-blue-700">
            Subscribe for Alerts
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
