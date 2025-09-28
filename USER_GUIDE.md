# 🎯 Hướng dẫn sử dụng CV Website

## 📋 Tổng quan

Đây là một website CV chuyên nghiệp được xây dựng với Next.js, cho phép bạn tạo và quản lý CV trực tuyến từ hoàn toàn trống.

## 🚀 Bắt đầu nhanh

### Bước 1: Truy cập trang chính

-   Mở trang web tại `/`
-   CV bắt đầu hoàn toàn trống - bạn sẽ thấy message hướng dẫn bắt đầu

### Bước 2: Vào trang Admin

1. Click nút **"Bắt đầu tạo CV"** từ trang chính
2. Hoặc click nút **"Admin"** ở góc trên bên phải
3. Hoặc truy cập trực tiếp `/admin`

### Bước 3: Đăng nhập

-   **Username**: `chisato`
-   **Password**: `chisatomisaki1120`

### Bước 4: Bắt đầu tạo CV

-   Bạn sẽ thấy message chào mừng với hướng dẫn từng bước
-   Bắt đầu với thông tin cá nhân (họ tên, vị trí công việc)
-   Sau đó chuyển sang các tab khác

## 📑 Hướng dẫn từng phần

### 1. 👤 Thông tin cá nhân (Bắt đầu ở đây!)

-   **Họ tên**: Tên đầy đủ của bạn
-   **Vị trí**: Chức danh/nghề nghiệp mong muốn
-   **Thông tin liên hệ**: SĐT, email, địa chỉ
-   **Giới tính**: Nam/Nữ hoặc tùy chỉnh
-   **Về tôi**: Mô tả ngắn về bản thân và mục tiêu
-   **Avatar**: Upload ảnh đại diện (tự động nén về 300x300px)

### 2. 🎓 Học vấn

-   **Bắt đầu trống** - thêm từng trình độ học vấn
-   **Trường**: Tên trường học
-   **Thời gian**: Vd: "09/2018 - 06/2022"
-   **Mô tả**: Chuyên ngành, thành tích
-   **Chi tiết**: Thông tin bổ sung (GPA, giải thưởng...)

### 3. 💪 Kỹ năng

-   **Bắt đầu trống** - thêm từng kỹ năng
-   **Tên kỹ năng**: JavaScript, Photoshop, Marketing...
-   **Màu sắc**: Blue, Green, Yellow, Purple, Red
-   **Danh mục**: Nhập tự do (programming, design, marketing, management...)

#### 🏷️ Gợi ý Categories:

-   `programming` → Lập trình
-   `language` → Ngôn ngữ
-   `design` → Thiết kế
-   `marketing` → Marketing
-   `management` → Quản lý
-   `communication` → Giao tiếp
-   `tools` → Công cụ
-   `database` → Cơ sở dữ liệu
-   `soft-skills` → Kỹ năng mềm

### 4. 💼 Kinh nghiệm làm việc

-   **Bắt đầu trống** - thêm từng kinh nghiệm
-   **Công ty**: Tên công ty
-   **Vị trí**: Chức danh
-   **Thời gian**: Thời gian làm việc
-   **Mô tả**: Công việc chính
-   **Chi tiết**: Thành tích cụ thể (sử dụng `\n` để xuống dòng)

### 5. 🏆 Thành tích

-   **Bắt đầu trống** - thêm từng thành tích
-   **Tiêu đề**: Tên thành tích (có thể dùng emoji)
-   **Mô tả**: Chi tiết về thành tích
-   **Màu sắc**: Tùy chọn màu hiển thị

### 6. 🌐 Mạng xã hội

-   **Bắt đầu trống** - thêm từng mạng xã hội
-   **Platform**: Chọn từ 12+ nền tảng có sẵn
-   **Username**: Tên người dùng hoặc thông tin
-   **Tên hiển thị**: Tùy chỉnh label hiển thị
-   **Hiển thị**: Bật/tắt visibility

## 🎯 Workflow khuyên dùng

### Bước 1: Thông tin cơ bản

1. Điền họ tên đầy đủ
2. Thêm vị trí công việc mong muốn
3. Điền đầy đủ thông tin liên hệ
4. Upload avatar chất lượng

### Bước 2: Nội dung chính

1. Thêm học vấn (từ cũ đến mới)
2. Thêm kỹ năng chuyên môn
3. Thêm kinh nghiệm làm việc
4. Thêm thành tích nổi bật

### Bước 3: Hoàn thiện

1. Thêm mạng xã hội chuyên nghiệp
2. Review và chỉnh sửa thông tin
3. Test export PDF
4. Chia sẻ CV

## 🎨 Tính năng đặc biệt

### 📄 Export PDF

-   Chỉ khả dụng khi có thông tin trong CV
-   Click nút **"Tải PDF"** để xuất CV dạng PDF
-   Layout tối ưu, full-width, không margin
-   Chất lượng cao, phù hợp in ấn

### 🔄 Real-time Preview

-   Thay đổi được hiển thị ngay lập tức
-   Quay về trang chính để xem kết quả

### 💾 Lưu trữ tự động

-   Dữ liệu được lưu trong localStorage
-   Không mất dữ liệu khi refresh trang
-   Riêng tư, chỉ lưu trên máy của bạn

## ⚠️ Lưu ý quan trọng

### ✅ Khởi đầu đúng cách:

1. **Bắt buộc**: Điền họ tên trước khi làm việc khác
2. **Quan trọng**: Thêm vị trí công việc để CV có ý nghĩa
3. **Nên có**: Ít nhất 1-2 kỹ năng và 1 kinh nghiệm
4. **Hoàn chỉnh**: Upload avatar để CV professional hơn

### ❌ Tránh những lỗi này:

-   Để trống họ tên (CV sẽ không hiển thị gì)
-   Không thêm thông tin liên hệ
-   Upload ảnh avatar kém chất lượng
-   Viết mô tả quá dài, khó đọc

## 🔧 Troubleshooting

### Nếu CV không hiển thị gì:

1. Kiểm tra đã điền họ tên chưa
2. Refresh trang và thử lại
3. Kiểm tra localStorage của trình duyệt

### Nếu không thể lưu dữ liệu:

1. Đảm bảo đã đăng nhập admin
2. Kiểm tra localStorage có bị disable không
3. Thử làm mới trang và nhập lại

## 💡 Tips cho CV chuyên nghiệp

1. **Bắt đầu nhỏ**: Điền đủ thông tin cơ bản trước
2. **Xây dựng dần**: Thêm từng phần một cách có hệ thống
3. **Review thường xuyên**: Xem trước CV sau mỗi thay đổi lớn
4. **Tối ưu cho PDF**: Đảm bảo nội dung vừa đủ, không quá dài
5. **Cập nhật định kỳ**: Thêm kỹ năng và kinh nghiệm mới

---

🎯 **Mục tiêu**: Tạo CV chuyên nghiệp từ con số 0, hoàn toàn tùy chỉnh theo nhu cầu cá nhân!
