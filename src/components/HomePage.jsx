import ProductList from "./ProductList";
import React, { useEffect, useState } from "react";
import CustomSlider from "./CustomSlider";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default to 'all'

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category); // Set the selected category
  };

  return (
    <div>
      {/* Navbar with category select */}
      <div className="bg-gray-600 text-white sticky top-0 w-full  shadow-md z-10">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
          <div className="text-2xl font-bold">E-Commerce</div>
          <div className="hidden md:flex space-x-16 ">
            <a href="#" className="hover:text-gray-300 transition duration-300">
              Home
            </a>
            <a href="#" className="hover:text-gray-300 transition duration-300">
              Products
            </a>
            <a href="#" className="hover:text-gray-300 transition duration-300">
              Cart
            </a>
          </div>

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
        </div>
      </div>
      <div className="mt-5">
        <CustomSlider className="" />
      </div>

      {/* Render products based on selected category */}
      <ProductList selectedCategory={selectedCategory} />

      {/* Footer */}
      <footer className="bg-gray-700 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 E-Commerce. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-400">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
