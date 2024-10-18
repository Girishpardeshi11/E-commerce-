import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response =
          selectedCategory === "all"
            ? await axios.get("https://fakestoreapi.com/products")
            : await axios.get(
                `https://fakestoreapi.com/products/category/${selectedCategory}`
              );
        setProducts(response.data);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleViewProduct = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate(`/product-detail`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-700">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 shadow bg-gray-800 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-auto relative"
        >
          <div className="flex flex-1 justify-center items-center">
            <img
              src={product.image || "/fallback-image.png"}
              alt={product.title}
              className="w-full h-auto max-h-[250px] object-cover rounded-md transition-transform duration-300 transform hover:scale-105"
              onClick={() => handleViewProduct(product)}
            />
          </div>

          <h3 className="text-lg font-semibold text-white">{product.title}</h3>
          <p className="text-lg text-yellow-400 mb-2">
            ₹{product.price.toFixed(2)}
          </p>
          <button
            onClick={() => handleViewProduct(product)}
            className="bg-blue-300 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            View Product
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
