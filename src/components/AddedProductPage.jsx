import React from "react";
import { useLocation } from "react-router-dom";

const AddedProductPage = () => {
  const location = useLocation();
  const productAdded = location.state?.product; // Get the product details passed via navigation

  if (!productAdded) {
    return <div className="text-center text-gray-500 mt-10">No product details to display.</div>;
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Product Added Successfully</h2>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 p-6">
          {/* Product Image */}
          <img
            src={productAdded.image}
            alt={productAdded.title}
            className="h-64 w-64 object-cover rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
          />

          {/* Product Details */}
          <div className="flex flex-col space-y-4 text-gray-700">
            <h3 className="text-2xl font-semibold text-gray-900">{productAdded.title}</h3>
            <p className="text-lg"><strong>Price:</strong> ₹{productAdded.price}</p>
            <p className="text-lg"><strong>Category:</strong> {productAdded.category}</p>
            <p className="text-sm text-gray-600"><strong>Description:</strong> {productAdded.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddedProductPage;
