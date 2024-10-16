
import { useState } from "react";
import { toast } from "react-toastify";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password); // Pass email and password to the parent function
    } else {
      toast.error("Please enter valid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-500">
      <div className="">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md">
          Login
        </button>
      </form>
      </div>
    </div>
  );
};

export default LoginPage;
