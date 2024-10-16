import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomSlider = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products?limit=5");
        const imageUrls = response.data.map((product) => product.image);
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Function to go to the next image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous image
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Automatic slide change every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval);
  }, [images]);

  return (
    <div className="relative w-full h-64 overflow-hidden">
      {images.length > 0 && (
        <>
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
          />
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full"
          >
            &gt;
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomSlider;
