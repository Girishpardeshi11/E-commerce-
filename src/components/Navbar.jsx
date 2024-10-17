import React from "react";
import { BsCart4 } from "react-icons/bs";

const Navbar = ({ categories, selectedCategory, handleCategoryChange, handleNavigate }) => {
  return (
    <div className="bg-gray-900 sticky top-0 w-full shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ja_94oPBZ_aUAIORmyd4Ic0v8klKjBBBWQ&s"
            alt="E-Commerce Logo"
            className="h-12 w-auto rounded-r-lg" // Adjust height as needed
          />
          <span className="ml-3 text-2xl font-bold text-white">E-Commerce</span>
        </div>

        <div className="flex space-x-8">
          {/* Dropdown for categories */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="bg-gray-700 text-white p-3 rounded shadow-md transition duration-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="all">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          {/* Cart Icon */}
          <BsCart4 className="h-10 w-full" onClick={handleNavigate} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
