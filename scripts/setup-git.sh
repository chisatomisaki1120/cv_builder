#!/bin/bash

# 🚀 Script khởi tạo Git repository và deploy lên GitHub Pages

echo "🔧 Khởi tạo Git repository..."

# Kiểm tra xem đã có git chưa
if [ ! -d ".git" ]; then
    git init
    echo "✅ Đã khởi tạo Git repository"
else
    echo "ℹ️ Git repository đã tồn tại"
fi

# Thêm tất cả files
git add .

# Commit đầu tiên
git commit -m "🎉 Initial commit - CV website ready for GitHub Pages

✨ Features:
- Complete CV website with admin panel
- PDF import/export functionality  
- Responsive design with Tailwind CSS
- LocalStorage persistence
- Authentication system
- GitHub Pages ready with static export

🚀 Ready to deploy!"

echo "✅ Đã commit code"

echo ""
echo "🌐 Các bước tiếp theo:"
echo "1. Tạo repository trên GitHub với tên 'chisato_cv'"
echo "2. Thay đổi YOUR_USERNAME trong lệnh dưới:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/chisato_cv.git"
echo "3. Push code:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo "4. Bật GitHub Pages trong Settings > Pages > Source: GitHub Actions"
echo ""
echo "📖 Xem file DEPLOYMENT.md để biết chi tiết hơn"