import ProductList from "./ProductList";
import React, { useEffect, useState } from "react";
import CustomSlider from "./CustomSlider";
import { BsCart4 } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import axios from "axios"; // Import axios

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default to 'all'
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(response.data); // Use axios response data
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

  const handleNavigate = () => {
    navigate('/cart'); // Navigate to the cart page
  };

  return (
    <div className="bg-gray-600 text-gray-200 min-h-screen">
      {/* Render Navbar */}
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        handleNavigate={handleNavigate}
      />

      <div className="my-4">
        <CustomSlider />
      </div>

      {/* Render products based on selected category */}
      <ProductList selectedCategory={selectedCategory} />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 py-6">
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
