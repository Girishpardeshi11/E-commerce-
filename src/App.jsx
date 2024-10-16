import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { useState } from "react";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ProductList from "./components/ProductList"; // Updated ProductList
import ProductDetailPage from "./components/ProductDetailPage"; // Import new ProductDetailPage
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: "mor_2314",
        password: "83r5^_",
      });
      if (response.data) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      toast.error("Invalid credentials, please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductList />} />
          <Route path="/product-detail" element={<ProductDetailPage />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
