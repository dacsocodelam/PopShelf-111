import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login"; // <-- Import mới
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // <-- Import mới
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // <-- State mới

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
