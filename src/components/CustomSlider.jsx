import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const products = response.data;

        // Randomly select 4 images from the products
        const randomProducts = [];
        while (randomProducts.length < 4) {
          const randomIndex = Math.floor(Math.random() * products.length);
          if (!randomProducts.includes(products[randomIndex])) {
            randomProducts.push(products[randomIndex]);
          }
        }

        // Create slide data with messages and images
        const slideData = randomProducts.map((product, index) => ({
          image: product.image,
          title: [
            "Welcome to Our Store!",
            "Exclusive Offers!",
            "New Arrivals!",
            "Best Sellers!"
          ][index],
          description: [
            "Discover amazing products at unbeatable prices.",
            "Grab your favorite items with our special discounts.",
            "Check out the latest trends and styles.",
            "Shop our top-selling products and join the crowd.",
          ][index],
          backgroundColor: [
            "bg-red-100",
            "bg-blue-100",
            "bg-green-100",
            "bg-purple-100",
          ][index],
        }));

        setSlides(slideData);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // Automatic slide change every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [slides]);

  return (
    <div className="relative w-full h-64 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${
            currentIndex === index ? "translate-x-0" : "translate-x-full"
          } ${slide.backgroundColor} flex items-center justify-center text-black p-4`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover opacity-40" // Reduced opacity to prevent overlapping
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
            <p className="text-lg">{slide.description}</p>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full"
      >
        &gt;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomSlider;
