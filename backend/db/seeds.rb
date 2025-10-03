
puts "Seeding database..."

Product.destroy_all

Product.create!([
  {
    name: "The Great Gatsby",
    description: "A novel by F. Scott Fitzgerald.",
    author: "F. Scott Fitzgerald",
    release_year: 1925,
    price: 15.99,
    genre: "Novel",
    rating: 5
  },
  {
    name: "Inception",
    description: "A mind-bending thriller.",
    author: "Christopher Nolan",
    release_year: 2010,
    price: 19.99,
    genre: "Movie",
    rating: 5
  },
  {
    name: "The Legend of Zelda: Breath of the Wild",
    description: "An action-adventure game.",
    author: "Nintendo",
    release_year: 2017,
    price: 59.99,
    genre: "Game",
    rating: 5
  }
])

puts "Seeding products finished."

# Xóa tất cả user cũ để đảm bảo không bị trùng lặp
User.destroy_all

# Tạo user mới với mật khẩu bạn muốn
User.create!(email: 'admin@example.com', password: 'popshelf22')

puts "Admin user created: admin@example.com / popshelf22"