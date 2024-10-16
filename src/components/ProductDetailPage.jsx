import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product from localStorage
    const storedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    setProduct(storedProduct);
  }, []);

  const handleAddToCart = () => {
    axios
      .post('https://fakestoreapi.com/carts', {
        userId: 5, // Assuming a static userId for now
        date: new Date().toISOString().split('T')[0], // Current date
        products: [{ productId: product.id, quantity: 1 }], // Product being added with quantity 1
      })
      .then((response) => {
        console.log('Added to cart:', response.data);
        toast.success('Product added to cart successfully!');
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add product to cart.');
      });
  };


  const handleBack = () => {
    navigate(-1); // Navigate back one step
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    
    <div className="container mx-auto p-6">
        {/* Back Button */}
        <button 
          onClick={handleBack} 
          className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 transition duration-300 mb-4"
        >
          Back
        </button>
  <div className="flex flex-col items-center">

      
    {/* Product Image */}
    <div className="mb-6">
      <img
        src={product.image}
        alt={product.title}
        className="rounded-lg shadow-md w-72 h-72 object-cover"
      />
    </div>

    {/* Product Details */}
    <div className="text-center mb-6">
      <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
      <p className="text-gray-700 mb-4 text-center max-w-xl mx-auto">{product.description}</p>
      <p className="text-2xl font-semibold text-green-600 mb-4">
      
        ${product.price.toFixed(2)}
      </p>
    </div>

    {/* Buy and Add to Cart Buttons */}
    <div className="flex space-x-4">
      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
        Buy Product
      </button>
      <button 
      className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
      onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>

  );
};

export default ProductDetailPage;
