import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Use this to get URL parameters
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold">{product.title}</h2>
      <img src={product.image} alt={product.title} className="w-full h-64 object-cover mb-4" />
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-xl font-semibold">${product.price}</p>
      <p className="text-gray-500">Category: {product.category}</p>
      <p className="text-gray-500">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
    </div>
  );
};

export default ProductDetail;
