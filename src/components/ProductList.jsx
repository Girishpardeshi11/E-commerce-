import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = selectedCategory === "all"
          ? await axios.get("https://fakestoreapi.com/products") // Fetch all products
          : await axios.get(`https://fakestoreapi.com/products/category/${selectedCategory}`); // Fetch category-specific products
          
        setProducts(response.data);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Re-fetch when category changes

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
          className="p-4 border rounded-md shadow-md hover:bg-gray-100 transition duration-300"
        >
          <img
            src={product.image || "/fallback-image.png"}
            alt={product.title}
            className="w-full h-48 object-cover mb-4"
          />
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
          <a
            href={`/product/${product.id}`}
            target="_blank"
            className="text-blue-500 underline"
            rel="noopener noreferrer"
          >
            View Product
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
