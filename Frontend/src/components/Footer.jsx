import React from "react";
import { Link } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full bg-light">

      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-borderColor">

        {/* Logo + About */}
        <div className="max-w-sm">
          <Link to="/">
            <img className="h-8" src={assets.logo} alt="CarRental logo" />
          </Link>

          <p className="mt-6 text-sm text-gray-500 leading-relaxed">
            CarRental makes luxury and comfortable travel simple.  
            Book premium cars for trips, business, or weekends —  
            or earn passive income by listing your own vehicle.
          </p>

          
          
        </div>

        {/* Quick Links from Navbar */}
        <div className="flex flex-wrap md:flex-nowrap gap-10">

          {/* Navigation Links */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-4">Quick Links</h2>
            <ul className="text-sm text-gray-500 space-y-2">
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="hover:text-primary transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-4">Company</h2>
            <ul className="text-sm text-gray-500 space-y-2">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/owner" className="hover:text-primary">List Your Car</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms & Privacy</Link></li>
            </ul>
          </div>

          

        </div>
      </div>

      {/* Bottom Copyright */}
      <p className="py-5 text-center text-xs md:text-sm text-gray-500">
        © {new Date().getFullYear()} CarRental. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
