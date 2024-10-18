import { useState } from "react";
import { toast } from "react-toastify";
import { FaUser, FaLock } from "react-icons/fa"; // Icons for input fields

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password); // Pass email and password to the parent function
    } else {
      toast.error("Please enter valid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("https://img.freepik.com/premium-vector/online-shopping-digital-technology-with-icon-blue-background-ecommerce-online-store-marketing_252172-219.jpg?semt=ais_hybrid")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(5px)", // Blur effect applied here
          zIndex: -1,
        }}
      />

      {/* Adjusted Width, Height, and Flex Properties */}
      <div className="w-[500px] max-w-sm h-[600px] bg-gray-800 p-8 rounded-lg shadow-lg relative flex flex-col justify-center items-center">
        {/* User Icon */}
        <div className="flex justify-center -mt-16 mb-4">
          <div className="bg-gray-900 p-6 rounded-full">
            <FaUser className="text-white text-4xl" />
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <h2 className="text-2xl mb-8 text-center text-white font-bold">Login</h2>

          {/* Email Input */}
          <div className="mb-5 relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-4 py-3 text-lg border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 text-lg border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember me and Forgot Password */}
          <div className="flex items-center justify-between mb-6 text-sm text-gray-400">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
