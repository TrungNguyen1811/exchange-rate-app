# Exchange Rate Project

## Mô tả
Dự án **Exchange Rate** là một ứng dụng web hiển thị và so sánh tỷ giá các loại tiền tệ phổ biến, giúp người dùng:  

- Xem tỷ giá hối đoái theo ngày.  
- So sánh tỷ giá giữa các quốc gia hoặc các loại tiền tệ hàng đầu.  
- Xem lịch sử tỷ giá.  

Ứng dụng được xây dựng bằng **JavaScript**, **Parcel**, và cấu trúc module rõ ràng.

---

## Cấu trúc thư mục

src/
├─ js/
│ ├─ controller.js
│ ├─ model.js
│ └─ view/
│ ├─ compareRateNation.js # So sánh tỷ giá giữa các quốc gia
│ ├─ submitExchangeRate.js # Form gửi tỷ giá hối đoái
│ ├─ submitTimeHistory.js # Form lưu lịch sử tỷ giá
│ └─ View.js # Base class cho các view component
└─ index.html

---

## Module chính

- **controller.js**: Quản lý kết nối các module view và model.  
- **model.js**: Xử lý dữ liệu, API và tính toán tỷ giá.  
- **view/**: Chứa các component giao diện và logic hiển thị:
  - `compareRateNation.js`: So sánh tỷ giá giữa các quốc gia.  
  - `submitExchangeRate.js`: Gửi tỷ giá mới.  
  - `submitTimeHistory.js`: Gửi lịch sử tỷ giá.  
  - `View.js`: Base class cho các view component.  

---

## Cài đặt & chạy dự án

1. Cài đặt dependencies:
npm install

Chạy ở chế độ phát triển:
npm run dev

Build để deploy:
npm run build


Xóa cache Parcel nếu gặp lỗi build:
rm -rf .parcel-cache
npm run build
