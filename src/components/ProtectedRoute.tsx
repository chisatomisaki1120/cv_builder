'use client';

import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/cvData';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  // Loading state
  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Show access denied if not authenticated
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="text-red-500" size={32} />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Truy cập bị từ chối</h1>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-yellow-800 mb-2">
              <AlertTriangle size={20} />
              <span className="font-medium">Thông báo</span>
            </div>
            <p className="text-sm text-yellow-700">
              Bạn cần đăng nhập với tài khoản admin để truy cập trang này.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/admin"
              className="block w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Đăng nhập Admin
            </Link>
            
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
              Quay về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}