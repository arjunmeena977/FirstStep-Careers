import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <i className="fa-solid fa-briefcase text-primary text-2xl mr-2"></i>
              <span className="font-bold text-xl">FirstStep Careers</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your one-stop platform for finding the best fresher jobs across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-linkedin text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-youtube text-lg"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Job Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Software Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Data Science</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Digital Marketing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Business Analytics</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <i className="fas fa-envelope w-5 text-primary"></i>
                <span>contact@fresherhunt.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fas fa-phone w-5 text-primary"></i>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fas fa-map-marker-alt w-5 text-primary"></i>
                <span>Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} FresherHunt. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
