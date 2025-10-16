# HTML/CSS Frontend for Product Management

Đây là phiên bản HTML/CSS thuần túy của ứng dụng quản lý sản phẩm, thay thế cho React frontend.

## Cấu trúc thư mục

```
html-frontend/
├── index.html          # Trang chủ - Danh sách sản phẩm
├── admin.html          # Trang quản trị - Thêm/Sửa/Xóa sản phẩm
├── login.html          # Trang đăng nhập (demo)
├── css/
│   ├── home.css        # CSS cho trang chủ
│   ├── admin.css       # CSS cho trang quản trị
│   └── login.css       # CSS cho trang đăng nhập
└── js/
    ├── home.js         # JavaScript cho trang chủ
    ├── admin.js        # JavaScript cho trang quản trị
    └── login.js        # JavaScript cho trang đăng nhập
```

## Tính năng

### Trang chủ (index.html)

- ✅ Hiển thị danh sách sản phẩm
- ✅ Tìm kiếm sản phẩm theo từ khóa
- ✅ Hiển thị hình ảnh, tên và giá sản phẩm
- ✅ Link đến trang quản trị

### Trang quản trị (admin.html)

- ✅ Thêm sản phẩm mới
- ✅ Chỉnh sửa sản phẩm
- ✅ Xóa sản phẩm
- ✅ Upload hình ảnh
- ✅ Hiển thị danh sách tất cả sản phẩm

### Trang đăng nhập (login.html)

- ✅ Form đăng nhập (demo mode)
- ✅ Redirect đến trang quản trị
- ✅ Lưu token vào localStorage

## Cách sử dụng

### 1. Khởi động Rails Backend

```bash
cd backend
rails s
```

Backend sẽ chạy tại: `http://localhost:3000`

### 2. Mở HTML Frontend

**Cách 1: Mở trực tiếp trong trình duyệt**

- Mở file `index.html` bằng trình duyệt
- **Lưu ý**: Có thể gặp lỗi CORS khi gọi API

**Cách 2: Sử dụng Live Server (Khuyên dùng)**

- Cài đặt extension "Live Server" trong VS Code
- Click phải vào `index.html` → "Open with Live Server"
- Hoặc mở folder `html-frontend` và chạy:

  ```bash
  # Nếu có Python
  python -m http.server 8000

  # Hoặc nếu có Node.js
  npx http-server -p 8000
  ```

### 3. Truy cập ứng dụng

- **Trang chủ**: `http://localhost:8000/index.html`
- **Trang quản trị**: `http://localhost:8000/admin.html`
- **Trang đăng nhập**: `http://localhost:8000/login.html`

## Lưu ý

### CORS Settings

Backend Rails cần cấu hình CORS để cho phép frontend gọi API:

File: `backend/config/initializers/cors.rb`

```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'  # Hoặc 'http://localhost:8000' cho an toàn hơn
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

### Demo Mode

- Đăng nhập ở chế độ demo - không cần password thật
- Token được lưu trong localStorage để giả lập việc đăng nhập
- Trong production, cần implement authentication thật sự

### API Endpoints được sử dụng

- `GET /api/v1/products` - Lấy danh sách sản phẩm
- `GET /api/v1/products?keyword=xxx` - Tìm kiếm sản phẩm
- `GET /api/v1/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/v1/products` - Tạo sản phẩm mới
- `PATCH /api/v1/products/:id` - Cập nhật sản phẩm
- `DELETE /api/v1/products/:id` - Xóa sản phẩm
- `POST /api/v1/login` - Đăng nhập

## Thiết kế UI

Giao diện sử dụng theme màu tím gradient:

- Màu chính: `#3f2b96` (tím đậm) và `#d66dd3` (tím sáng)
- Background: Gradient `#f3e6fa` → `#d66dd3`
- Font: Montserrat
- Hiệu ứng: Shadow, hover, transitions

## So sánh với React version

| Tính năng      | React                | HTML/CSS   |
| -------------- | -------------------- | ---------- |
| Framework      | React + React Router | Vanilla JS |
| Build process  | npm build            | Không cần  |
| Dependencies   | 1344 packages        | 0 packages |
| File size      | ~500KB (bundled)     | ~50KB      |
| Performance    | Virtual DOM          | Direct DOM |
| Learning curve | Cao                  | Thấp       |
| Maintenance    | Phức tạp             | Đơn giản   |

## Phát triển thêm

Có thể thêm:

- [ ] Trang chi tiết sản phẩm (`product-detail.html`)
- [ ] Pagination cho danh sách sản phẩm
- [ ] Filter theo category/genre
- [ ] Sort theo giá, tên, ngày
- [ ] Dark mode
- [ ] Responsive design improvements
- [ ] Loading spinners
- [ ] Form validation
- [ ] Image preview before upload

## License

MIT
