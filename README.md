# Hướng Dẫn Setup Backend - Toeic Gamification

## 1. Clone Repository

```sh
git clone https://github.com/toeic-gamification/Toeic-gamification-BE.git
cd Toeic-gamification-BE
```

## 2. Tạo Nhánh Riêng Để Làm Việc

```sh
git checkout -b <ten-nhanh>
```
Ví dụ:
```sh
git checkout -b feature/user-authentication
```

## 3. Cài Đặt Dependencies

```sh
npm install
```

## 4. Cấu Hình File .env
Tạo file `.env` trong thư mục gốc của backend và điền các thông tin cần thiết:
```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
PORT=4000
```
*Lưu ý:* Bạn có thể liên hệ với team để lấy thông tin cấu hình chính xác.

## 5. Chạy Server

```sh
npm run dev
```

Nếu gặp lỗi cổng 4000 đã bị chiếm dụng:
```sh
netstat -ano | findstr :4000
taskkill /PID <PID> /F
npm run dev
```

## 6. Làm Việc Với Git
### Kiểm Tra Trạng Thái
```sh
git status
```

### Thêm File Đã Chỉnh Sửa
```sh
git add .
```

### Commit Code
```sh
git commit -m "[Mô tả ngắn gọn về thay đổi]"
```
Ví dụ:
```sh
git commit -m "Thêm API đăng ký người dùng"
```

### Đẩy Code Lên Remote Repository
```sh
git push origin <ten-nhanh>
```
Ví dụ:
```sh
git push origin feature/user-authentication
```

## 7. Tạo Pull Request (PR)
Sau khi hoàn thành một tính năng, vào GitHub, tạo Pull Request từ nhánh của bạn vào `main` để review và merge vào code chính.

## 8. Cập Nhật Code Mới Nhất Từ Main
```sh
git checkout main
git pull origin main
git checkout <ten-nhanh>
git merge main
```

## 9. Lưu Ý
- Luôn làm việc trên nhánh riêng, không commit trực tiếp vào `main`.
- Viết commit message rõ ràng.
- Kiểm tra kỹ trước khi đẩy code lên.

Chúc các bạn code vui vẻ! 🚀

