import React, { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Navbar = ({ categories, selectedCategory, handleCategoryChange, handleNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productAdded, setProductAdded] = useState(null); // Track added product
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });
  const navigate = useNavigate();

  // Toggle the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://fakestoreapi.com/products", formData);
      console.log("Product Added:", response.data);
      toggleModal(); // Close the modal after submission
  
      // Navigate to the new page with product details
      navigate('/added-product', { state: { product: response.data } });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleViewProducts = (product) => {
    navigate('/added-product', { state: { product } }); 
  };

  return (
    <div className="bg-gray-900 sticky top-0 w-full shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ja_94oPBZ_aUAIORmyd4Ic0v8klKjBBBWQ&s"
            alt="E-Commerce Logo"
            className="h-12 w-auto rounded-r-lg"
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
          <BsCart4 className="h-10 w-full cursor-pointer" onClick={handleNavigate} />

          {/* Add Product Button */}
          <button
            onClick={toggleModal}
            className="bg-green-500 text-white p-2 rounded shadow-md hover:bg-green-400 transition duration-300"
          >
            Add Product
          </button>

          {/* View Products Button */}
          <button
            onClick={() => handleViewProducts}
            className="bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-400 transition duration-300"
          >
            View Products
          </button>
        </div>
      </div>

      {/* Modal for Adding Product */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-500 text-white p-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display Added Product (if any) */}
      {productAdded && (
        <div className="text-white mt-4 p-4 bg-gray-800 rounded">
          <h3 className="text-xl font-bold">Product Added:</h3>
          <div className="flex items-center space-x-4">
            <img src={productAdded.image} alt={productAdded.title} className="h-20 w-20 object-cover rounded" />
            <div>
              <p><strong>Title:</strong> {productAdded.title}</p>
              <p><strong>Price:</strong> ${productAdded.price}</p>
              <p><strong>Category:</strong> {productAdded.category}</p>
              <p><strong>Description:</strong> {productAdded.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
