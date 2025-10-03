import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";
import ProductForm from "../../components/ProductForm/ProductForm";
import "./admin.css";

function Admin() {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchProducts = () => {
    fetch("http://localhost:3000/api/v1/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/v1/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        fetchProducts();
      } else {
        alert("Failed to delete product. Are you logged in?");
      }
    });
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
  };

  const handleUpdate = (submissionData, productId) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/v1/products/${productId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: submissionData,
    }).then(() => {
      setProductToEdit(null);
      fetchProducts();
    });
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">管理者用ページ (Admin)</h1>
      <div className="admin-card">
        <ProductForm
          onProductCreated={fetchProducts}
          productToEdit={productToEdit}
          onProductUpdated={handleUpdate}
        />
        <hr />
        <ProductList
          products={products}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      <Link className="admin-link" to="/">ホームページに戻る</Link>
    </div>
  );
}

export default Admin;
