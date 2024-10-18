import React, { useEffect, useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default to 'all'
  


  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve cart from local storage or initialize it as an empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Function to clear the cart 
  const handleClearCart = () => {
    // Clear cart from local storage
    localStorage.removeItem("cart");
    // Update state to reflect the cleared cart
    setCartItems([]);
  };

  const handleBack = () => {
    navigate("/home");
  };

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed successfully from the cart");
  };

  // Function to open the modal for updating quantity
  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setQuantity(item.quantity); // Set current quantity
    setIsModalOpen(true);
  };

  // Function to update quantity of a specific item
  const handleUpdateQuantity = () => {
    const updatedCart = cartItems.map((item) =>
      item.title === selectedItem.title ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Quantity updated successfully");
    setIsModalOpen(false);
  };
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
    <div className="relative min-h-screen py-10 flex flex-col items-center justify-center">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("https://img.freepik.com/free-photo/shopping-cart-plain-background-with-copy-space_23-2148283802.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.5s ease-in-out",
          filter: "blur(5px)", // Blur effect applied here
          zIndex: -1, // Make sure it's behind other content
        }}
      />
      {/* Back Button */}
      <div className="flex justify-start mb-4 w-full max-w-xs">
        <button
          onClick={handleBack}
          className="bg-gray-600 text-white px-4 rounded-lg shadow-md hover:bg-gray-500 transition duration-300 h-5 w-9"
        >
          <IoReturnUpBack className="h-5 w-4" />
        </button>
      </div>

      <div className="bg-gray-100 rounded-lg shadow-lg w-full max-w-4xl p-5 bg-opacity-80 z-10">
        <h2 className="text-2xl font-bold text-black mb-4 text-center ">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-300 text-center">Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="flex items-center mb-4 bg-pink-100 p-4 rounded-lg">
                <img
                  src={item.image} // Assuming you have the image URL saved in the cart
                  alt={item.title}
                  className="h-20 w-20 object-cover rounded-lg mr-4"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-orange-900">{item.title}</h3>
                  <p className="text-green-700">Quantity: {item.quantity}</p>
                  <p className="text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleOpenModal(item)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300"
                >
                  Update
                </button>
                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {/* Clear Cart Button */}
        <div className="flex justify-center mt-4">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-500 transition duration-300"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>

      {/* Update Quantity Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Update Quantity for {selectedItem.title}
            </h2>
            <div className="flex justify-center mb-4">
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded p-2 w-24 text-center"
              />
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white py-2 px-6 rounded hover:bg-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateQuantity}
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default CartPage;
