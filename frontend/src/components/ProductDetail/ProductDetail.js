import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [coverPhoto, setCoverPhoto] = useState(null); // State cho file ảnh mới
  const { id } = useParams();

  const fetchProduct = () => {
    fetch(`http://localhost:3000/api/v1/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setFormData(data);
      })
      .catch((error) => console.error("Error fetching product:", error));
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setCoverPhoto(event.target.files[0]);
  };

  const handleSave = () => {
    const submissionData = new FormData();
    // Thêm các trường dữ liệu text vào FormData
    Object.keys(formData).forEach((key) => {
      submissionData.append(`product[${key}]`, formData[key]);
    });
    // Nếu có file ảnh mới, thêm vào FormData
    if (coverPhoto) {
      submissionData.append("product[cover_photo]", coverPhoto);
    }

    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/v1/products/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        // Không cần Content-Type, trình duyệt tự xử lý cho FormData
      },
      body: submissionData,
    }).then(() => {
      setIsEditing(false);
      setCoverPhoto(null); // Reset file input
      fetchProduct();
    });
  };

  if (!product) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="product-detail-container">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            style={{ fontSize: "2em", fontWeight: "bold", width: "100%" }}
          />
          <p>
            <strong>説明:</strong>{" "}
            <input
              type="text"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <strong>著者:</strong>{" "}
            <input
              type="text"
              name="author"
              value={formData.author || ""}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <strong>発売年:</strong>{" "}
            <input
              type="number"
              name="release_year"
              value={formData.release_year || ""}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <strong>価格:</strong>{" "}
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price || ""}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <strong>ジャンル:</strong>{" "}
            <input
              type="text"
              name="genre"
              value={formData.genre || ""}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <strong>評価:</strong>{" "}
            <input
              type="number"
              name="rating"
              value={formData.rating || ""}
              onChange={handleInputChange}
            />{" "}
            / 5
          </p>
          <p>
            <strong>カバー写真 (Cover Photo):</strong>{" "}
            <input type="file" onChange={handleFileChange} />
          </p>
          <div className="product-detail-actions">
            <button className="product-detail-btn" onClick={handleSave}>保存</button>
            <button
              className="product-detail-btn"
              onClick={() => setIsEditing(false)}
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>{product.name}</h1>
          {product.cover_photo_url && (
            <img
              src={product.cover_photo_url}
              alt={product.name}
              className="product-detail-cover"
            />
          )}
          <p>
            <strong>説明:</strong> {product.description}
          </p>
          <p>
            <strong>著者:</strong> {product.author}
          </p>
          <p>
            <strong>発売年:</strong> {product.release_year}
          </p>
          <p>
            <strong>価格:</strong> {product.price}
          </p>
          <p>
            <strong>ジャンル:</strong> {product.genre}
          </p>
          <p>
            <strong>評価:</strong> {product.rating} / 5
          </p>
          <div className="product-detail-actions">
            <button className="product-detail-btn" onClick={() => setIsEditing(true)}>編集</button>
            <Link className="product-detail-btn" to="/">
              一覧に戻る
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
