# 🚀 Hướng dẫn Deploy lên GitHub Pages

## Các bước thực hiện:

### 1. Tạo GitHub Repository

```bash
# Khởi tạo git repository (nếu chưa có)
git init

# Thêm remote repository
git remote add origin https://github.com/YOUR_USERNAME/chisato_cv.git

# Thay đổi tên repository trong next.config.ts nếu khác
# const repoName = 'chisato_cv'; // <- Thay đổi tên này
```

### 2. Cập nhật cấu hình repository name

Mở file `next.config.ts` và thay đổi:

```typescript
const repoName = "YOUR_REPO_NAME"; // Thay bằng tên repository thực tế
```

### 3. Commit và push code

```bash
git add .
git commit -m "Initial commit - CV website ready for GitHub Pages"
git branch -M main
git push -u origin main
```

### 4. Bật GitHub Pages

1. Vào repository trên GitHub
2. Đi đến **Settings** > **Pages**
3. Chọn **Source**: GitHub Actions
4. GitHub Actions sẽ tự động deploy khi có push

### 5. Deploy bằng command (tùy chọn)

```bash
# Deploy thủ công
npm run deploy
```

## 🔧 Scripts có sẵn:

-   `npm run dev` - Chạy development server
-   `npm run build:github` - Build cho production GitHub Pages
-   `npm run deploy` - Deploy thủ công lên GitHub Pages

## 📦 Tính năng đã được tối ưu:

✅ **Static Export** - Tương thích với GitHub Pages
✅ **Base Path Configuration** - Hoạt động với subdirectory
✅ **Image Optimization** - Tối ưu cho static hosting
✅ **GitHub Actions** - Tự động deploy khi push
✅ **Cross-platform Scripts** - Hoạt động trên Windows/Mac/Linux

## 🌐 Truy cập website:

Sau khi deploy thành công, website sẽ có sẵn tại:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## 🔍 Kiểm tra deployment:

1. Kiểm tra tab **Actions** trong GitHub repository
2. Xem log để đảm bảo build thành công
3. Truy cập URL để test website

## ⚠️ Lưu ý quan trọng:

-   **localStorage**: Dữ liệu CV sẽ được lưu trong trình duyệt của từng người dùng
-   **Admin Panel**: Truy cập `/admin` để quản lý CV
-   **Authentication**: Username: `chisato`, Password: `chisatomisaki1120`
-   **PDF Import**: Tính năng import PDF sẽ hoạt động trên production

## 🐛 Troubleshooting:

### Build fails:

```bash
# Xóa cache và rebuild
rm -rf .next out node_modules
npm install
npm run build:github
```

### Deployment fails:

-   Kiểm tra repository name trong `next.config.ts`
-   Đảm bảo GitHub Actions có quyền Pages
-   Xem logs trong tab Actions

### Website không load:

-   Kiểm tra basePath trong `next.config.ts`
-   Clear browser cache
-   Kiểm tra console để xem lỗi JavaScript
