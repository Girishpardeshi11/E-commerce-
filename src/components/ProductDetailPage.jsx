import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

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

    localStorage.setItem("cart", JSON.stringify(currentCart));

    axios
      .post("https://fakestoreapi.com/carts", {
        userId: 5,
        date: new Date().toISOString().split("T")[0],
        products: [{ productId: product.id, quantity: 1 }],
      })
      .then(() => {
        toast.success("Product added to cart successfully!");
      })
      .catch(() => {
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

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleBuyNow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, email, phone } = customerData;
    if (name && address && email && phone) {
      toast.success("Purchase successful!");
      setShowModal(false);
    } else {
      toast.error("Please fill out all required fields!");
    }
  };

  if (!product) {
    return (
      <div className="text-center text-gray-400 flex items-center justify-center min-h-screen">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-10 flex flex-col items-center justify-center">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("https://img.freepik.com/free-photo/shopping-cart-plain-background-with-copy-space_23-2148283802.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(5px)", // Blur effect applied here
          zIndex: -1,
        }}
      />

      {/* Back Button */}
      <div className="flex justify-start w-full max-w-xs mb-4">
        <button
          onClick={handleBack}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 transition duration-300 flex items-center"
        >
          <IoReturnUpBack className="h-5 w-5 mr-1" />
          Back
        </button>
      </div>

      {/* Centered Product Details */}
      <div className="bg-gray-200 rounded-lg shadow-lg w-full max-w-4xl p-5 bg-opacity-80 flex flex-col md:flex-row min-h-[300px]">
        <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="bg-gray-300 rounded-lg h-[300px] w-full object-contain shadow-md"
          />
        </div>

        <div className="flex-grow flex flex-col justify-center p-4">
          <h2 className="text-xl font-bold text-black">{product.title}</h2>
          <p className="text-orange-800 my-2">₹{product.price.toFixed(2)}</p>
          {showDescription && (
            <p className="text-gray-800 mt-2">{product.description}</p>
          )}

          {/* Buttons */}
          <div className="flex flex-col space-y-2 mt-4">
            <button
              className="bg-gray-600 text-white py-2 rounded-lg shadow-md hover:bg-gray-500 transition duration-300 w-full"
              onClick={handleViewDetails}
            >
              {showDescription ? "Hide Details" : "View Details"}
            </button>
            <button
              className="bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-500 transition duration-300 w-full"
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              {isLoading ? "Adding to Cart..." : "Add to Cart"}
            </button>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded w-full"
              onClick={handleCartClick}
            >
              Go to Cart
            </button>
            <button
              className="bg-red-600 text-white py-2 px-4 rounded w-full"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Enter Customer Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={customerData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={customerData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={customerData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={customerData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
