@echo off
REM 🚀 Script khởi tạo Git repository và deploy lên GitHub Pages (Windows)

echo 🔧 Khởi tạo Git repository...

REM Kiểm tra xem đã có git chưa
if not exist ".git" (
    git init
    echo ✅ Đã khởi tạo Git repository
) else (
    echo ℹ️ Git repository đã tồn tại
)

REM Thêm tất cả files
git add .

REM Commit đầu tiên
git commit -m "🎉 Initial commit - CV website ready for GitHub Pages" -m "✨ Features:" -m "- Complete CV website with admin panel" -m "- PDF import/export functionality" -m "- Responsive design with Tailwind CSS" -m "- LocalStorage persistence" -m "- Authentication system" -m "- GitHub Pages ready with static export" -m "🚀 Ready to deploy!"

echo ✅ Đã commit code

echo.
echo 🌐 Các bước tiếp theo:
echo 1. Tạo repository trên GitHub với tên 'chisato_cv'
echo 2. Thay đổi YOUR_USERNAME trong lệnh dưới:
echo    git remote add origin https://github.com/YOUR_USERNAME/chisato_cv.git
echo 3. Push code:
echo    git branch -M main
echo    git push -u origin main
echo 4. Bật GitHub Pages trong Settings ^> Pages ^> Source: GitHub Actions
echo.
echo 📖 Xem file DEPLOYMENT.md để biết chi tiết hơn

pause