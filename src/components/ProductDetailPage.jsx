import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    setProduct(storedProduct);
  }, []);

  const handleAddToCart = () => {
    setIsLoading(true);
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = currentCart.findIndex(
      (item) => item.productId === product.id
    );

    if (existingProductIndex > -1) {
      currentCart[existingProductIndex].quantity += 1;
    } else {
      currentCart.push({
        productId: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
      });
    }

    console.log("current cart",currentCart);
    console.log();
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // Simulate API call
    axios
      .post("https://fakestoreapi.com/carts", {
        userId: 5,
        date: new Date().toISOString().split("T")[0],
        products: [{ productId: product.id, quantity: 1 }],
      })
      .then((response) => {
        console.log("Added to cart:", response.data);
        toast.success("Product added to cart successfully!");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add product to cart.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleViewDetails = () => {
    setShowDescription((prev) => !prev);
  };

  if (!product) {
    return (
      <div className="text-center text-gray-400">
        Loading product details...
      </div>
    );
  }

  const handleCartClick = () => {
    navigate("/cart");
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
      <div className="flex justify-start w-full max-w-xs mb-4 -mt-12 relative ml-0">
        <button
          onClick={handleBack}
          className="bg-gray-600 text-white px-4 rounded-lg shadow-md hover:bg-gray-500 transition duration-300 h-5 w-9"
        >
          <IoReturnUpBack className="h-5 w-4" />
        </button>
      </div>

      {/* Centered Product Details */}
      <div className="bg-gray-200 rounded-lg shadow-lg w-full max-w-4xl p-5 bg-opacity-80 z-10 flex flex-row min-h-[300px]"> 
        {/* Increased min height of main div */}

        {/* Product Image */}
        <div className="flex-shrink-0 w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="bg-gray-300 rounded-lg h-[300px] w-full object-contain shadow-md"
          />
        </div>  

        {/* Product Details and Buttons */}
        <div className="flex-grow flex flex-col justify-center p-4">
          <h2 className="text-xl font-bold text-black">{product.title}</h2>
          <p className="text-orange-800 my-2">${product.price.toFixed(2)}</p>
          {showDescription && (
            <p className="text-gray-800 mt-2">{product.description}</p>
          )}

          {/* Buttons */}
          <div className="flex flex-col space-y-2 mt-4">
            <button
              className="bg-gray-600 text-white py-2 rounded-lg shadow-md hover:bg-gray-500 transition duration-300 w-36"
              onClick={handleViewDetails}
            >
              View Details
            </button>
            <button
              className="bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-500 transition duration-300 w-36"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              onClick={handleCartClick}
              className="bg-blue-600 text-white py-2 px-4 rounded w-36"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
