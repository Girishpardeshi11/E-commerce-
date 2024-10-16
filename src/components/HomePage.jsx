import ProductList from "./ProductList";
import CustomSlider from "./CustomSlider";

const HomePage = () => {
  return (
    <div className="">
      {/* Navbar */}
      <div class="bg-gray-500 text-white fixed w-full top-0 shadow-md z-10">
        <div class="container mx-auto flex justify-between items-center py-4 px-4">
          <div class="text-2xl font-bold">E-Commerce</div>
          <div class="hidden md:flex space-x-4">
            <a href="#" class="hover:text-gray-300 transition duration-300">
              Home
            </a>
            <a href="#" class="hover:text-gray-300 transition duration-300">
              Products
            </a>
            <a href="#" class="hover:text-gray-300 transition duration-300">
              Cart
            </a>
          </div>
          <input
            type="text"
            placeholder="Search"
            class="p-2 rounded-md outline-none text-black focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* slider */}
      <CustomSlider className="" />

      {/* Categories */}
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-semibold mb-6">Product Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-gray-100 p-6 text-center">Electronics</div>
          <div className="bg-gray-100 p-6 text-center">Fashion</div>
          <div className="bg-gray-100 p-6 text-center">Home Appliances</div>
          <div className="bg-gray-100 p-6 text-center">Sports</div>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-6 text-center"> Alll Products</h1>
      <ProductList />

      {/* Footer */}
      <footer className="bg-gray-700 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 E-Commerce. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-400">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
