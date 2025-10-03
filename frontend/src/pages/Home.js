import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList/ProductList";
import "./home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input

  // Modified function to accept a search keyword
  const fetchProducts = (keyword = "") => {
    let url = "http://localhost:3000/api/v1/products";
    if (keyword) {
      url += `?keyword=${keyword}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  // Initial fetch when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handler for the search button click
  const handleSearch = () => {
    fetchProducts(searchTerm);
  };

  return (
    <div className="home-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="製品を検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>検索</button>
      </div>

      <ProductList products={products} />

      <Link to="/admin" className="home-admin-float-link">
        管理者用ページへ (Go to the admin page)
      </Link>
    </div>
  );
}

export default Home;