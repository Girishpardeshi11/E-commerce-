import React, { useState, useEffect } from "react";
import axios from "axios"; // If using Axios, otherwise use fetch

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data); // Set the products to state
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false); // Disable loading spinner
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-4 border rounded-md shadow-md hover:bg-gray-100"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold">{product.title}</h3>
          <p className="text-gray-600 mb-2">${product.price}</p>
          <a
            href={`/product/${product.id}`}
            target="_blank"
            className="text-blue-500 underline"
          >
            View Product
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
