class Product < ApplicationRecord
  has_one_attached :cover_photo
  include Rails.application.routes.url_helpers

  def cover_photo_url
    # Phương thức này vẫn hữu ích, chúng ta sẽ gọi nó từ controller
    url_for(cover_photo) if cover_photo.attached?
  end
end