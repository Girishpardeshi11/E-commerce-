import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate to programmatically navigate

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
    navigate(`/product-detail`); // Navigate to the ProductDetailPage component
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          // className=" p-4 border rounded-lg shadow-md hover:bg-gray-400 transition duration-700"
          className="border rounded-lg p-4 shadow bg-gray-700 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between  h-auto relative"
        >
          <img
            src={product.image || "/fallback-image.png"}
            alt={product.title}
            className="mb-4 cursor-pointer object-contain h-[250px] w-full"

            onClick={() => handleViewProduct(product)}
          />
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="bg-white-600 mb-2">₹{product.price.toFixed(2)}</p>
          <button
            onClick={() => handleViewProduct(product)}
            className="text-red-50 underline"
          >
            View Product
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
