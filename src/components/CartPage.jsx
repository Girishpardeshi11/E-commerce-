import React, { useEffect, useState } from 'react';
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve cart from local storage or initialize it as an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

    // Function to clear the cart 
    const handleClearCart = () => {
      // Clear cart from local storage
      localStorage.removeItem('cart');
      // Update state to reflect the cleared cart
      setCartItems([]);
    };

    
  const handleBack = () => {
    navigate("/home");
  };

  return (
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
        
        <h2 className="text-2xl font-bold text-black-100 mb-4 text-center ">Your Cart</h2>
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
                  <p className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
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
    </div>
  );
};

export default CartPage;
