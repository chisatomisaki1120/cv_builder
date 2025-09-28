# Chisato CV - Professional Resume Website

A modern, responsive CV website built with Next.js 15, TypeScript, and Tailwind CSS. **Start from completely empty CV** and build your professional resume step by step with admin panel, PDF export, and advanced customization.

## 🚀 Features

### Core Features

-   **Responsive Design** - Works perfectly on all devices
-   **PDF Export** - High-quality PDF generation with optimized layout
-   **Admin Panel** - Complete CRUD interface for CV management
-   **Authentication** - Secure admin access with credentials
-   **Avatar Upload** - Image upload with automatic compression and base64 encoding
-   **Social Media Management** - Add and manage multiple social media profiles
-   **Multi-line Support** - Rich text descriptions with line break support
-   **Performance Optimized** - Fast loading with modern optimization techniques

### Technical Features

-   **Next.js 15** with App Router and Turbopack
-   **TypeScript** for type safety
-   **Tailwind CSS v4** for styling
-   **LocalStorage** for data persistence
-   **React 19** with concurrent features
-   **Optimized Images** with Next.js Image component
-   **Memoized Components** for better performance

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx           # Main CV display page
│   ├── admin/
│   │   ├── page.tsx       # Admin panel with tabs
│   │   └── layout.tsx     # Admin layout
│   └── demo/
│       └── page.tsx       # Demo page
├── components/
│   ├── SectionCard.tsx    # Reusable section wrapper
│   ├── SkillBadge.tsx     # Skill display component
│   ├── EducationItem.tsx  # Education/Experience item
│   ├── ContactInfo.tsx    # Contact information display
│   ├── ExportPDF.tsx      # PDF export functionality
│   ├── Login.tsx          # Authentication form
│   ├── AvatarUpload.tsx   # Image upload component
│   └── SocialMediaManager.tsx # Social media CRUD
└── lib/
    └── cvData.ts          # Data types and utilities
```

## 🛠️ Getting Started

### Prerequisites

-   Node.js 18+
-   npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd chisato_cv

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the CV.

### Admin Access

-   Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
-   **Username**: `chisato`
-   **Password**: `chisatomisaki1120`

## 🎯 Usage

### CV Display (`/`)

-   View the complete CV with responsive design
-   Export to PDF using the floating action button
-   Access demo and admin pages via control buttons

### Admin Panel (`/admin`)

-   **Personal Info Tab**: Update basic information and avatar
-   **Education Tab**: Manage education entries with CRUD operations
-   **Skills Tab**: Add/edit/delete skills with categories and colors
-   **Experience Tab**: Manage work experience with detailed descriptions
-   **Achievements Tab**: Showcase accomplishments with color coding
-   **Social Media Tab**: Manage social media profiles (display only, no links)

### Features Highlight

#### Avatar Management

-   Drag & drop or click to upload
-   Automatic image compression (300x300px)
-   Support: JPEG, PNG, WebP (max 5MB)
-   Base64 encoding for localStorage

#### Skills Management

-   **Custom categories** via keyboard input (programming, design, marketing, etc.)
-   **Dynamic grouping** and display by category
-   **Color-coded** skill badges
-   **Flexible categorization** system
-   **Backward compatible** with existing data

#### Social Media Management

-   12+ platform support (Facebook, GitHub, LinkedIn, etc.)
-   Custom display names
-   Visibility toggle
-   Text-only display (no clickable links)
-   Icon-based platform identification

#### PDF Export

-   Full-width, margin-free layout
-   High-quality rendering with html2canvas-pro
-   Multi-page support for long content
-   Optimized for printing and sharing

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
npm run audit        # Run security audit
```

## ⚡ Performance Optimizations

### Implemented Optimizations

-   ✅ Next.js Image component with WebP/AVIF support
-   ✅ React.memo for component memoization
-   ✅ Optimized CSS with consolidated rules
-   ✅ Turbopack for faster builds
-   ✅ Bundle size optimization
-   ✅ Package import optimization (lucide-react)
-   ✅ Compression and security headers

### Performance Metrics

-   **Bundle Size**: ~620KB (27% reduction)
-   **First Contentful Paint**: ~0.8s
-   **Largest Contentful Paint**: ~1.4s
-   **Cumulative Layout Shift**: ~0.05

See [PERFORMANCE.md](./PERFORMANCE.md) for detailed optimization report.

## 🔒 Security

-   Input validation and sanitization
-   XSS protection with React's built-in escaping
-   Secure headers configuration
-   Client-side only data storage (localStorage)
-   No sensitive data exposure

## 📱 Browser Support

-   Chrome 90+
-   Firefox 88+
-   Safari 14+
-   Edge 90+

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Other Platforms

The app can be deployed to any platform supporting Node.js:

-   Netlify
-   Railway
-   Render
-   DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## � Documentation

-   **[USER_GUIDE.md](./USER_GUIDE.md)** - Hướng dẫn chi tiết cho người dùng cuối
-   **[CATEGORY_FEATURE.md](./CATEGORY_FEATURE.md)** - Tài liệu về tính năng custom categories
-   **[PERFORMANCE.md](./PERFORMANCE.md)** - Báo cáo tối ưu hóa performance

## �📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Chisato** - [Telegram](https://t.me/michiisato)

## 🙏 Acknowledgments

-   Next.js team for the amazing framework
-   Tailwind CSS for the utility-first approach
-   Lucide React for beautiful icons
-   html2canvas-pro for PDF generation
