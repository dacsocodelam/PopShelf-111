import React from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

function ProductList({ products, onDelete, onEdit }) {
  return (
    <div className="product-list">
      <h2 className="product-list-title">製品一覧</h2>
      {products.map((product) => (
        <div className="product-item" key={product.id}>
          <div className="product-info">
            {product.cover_photo_url && (
              <img
                src={product.cover_photo_url}
                alt={product.name}
                className="product-image"
              />
            )}
            <Link to={`/products/${product.id}`} className="product-title">
              {product.name}
            </Link>
          </div>
          <div className="product-right">
            <span className="product-price">
              {product.price ? product.price.toLocaleString() + " 円" : "-"}
            </span>
            <div className="product-actions">
              {onEdit && (
                <button className="product-btn" onClick={() => onEdit(product)}>
                  編集
                </button>
              )}
              {onDelete && (
                <button className="product-btn" onClick={() => onDelete(product.id)}>
                  削除
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;