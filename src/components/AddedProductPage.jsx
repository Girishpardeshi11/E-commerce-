import React from "react";
import { useLocation } from "react-router-dom";

const AddedProductPage = () => {
  const location = useLocation();
  const productAdded = location.state?.product; // Get the product details passed via navigation

  if (!productAdded) {
    return <div>No product details to display.</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold text-gray-800">Product Added Successfully</h2>
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <img
            src={productAdded.image}
            alt={productAdded.title}
            className="h-40 w-40 object-cover rounded"
          />
          <div>
            <h3 className="text-xl font-bold">{productAdded.title}</h3>
            <p><strong>Price:</strong> ${productAdded.price}</p>
            <p><strong>Category:</strong> {productAdded.category}</p>
            <p><strong>Description:</strong> {productAdded.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddedProductPage;
