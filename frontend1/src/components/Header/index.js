import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Book Management</div>
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/add" className="hover:underline">Add Book</Link></li>
        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
        <li><Link to="/about" className="hover:underline">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
