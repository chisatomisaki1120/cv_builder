'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, User } from 'lucide-react';
import { validateImageFile, compressImage } from '@/lib/cvData';

interface AvatarUploadProps {
    currentAvatar?: string;
    onAvatarChange: (avatar: string | null) => void;
}

export default function AvatarUpload({ currentAvatar, onAvatarChange }: AvatarUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (file: File) => {
        setIsUploading(true);

        try {
            // Validate file
            const validation = validateImageFile(file);
            if (!validation.isValid) {
                alert(validation.error);
                return;
            }

            // Compress and convert to base64
            const compressedImage = await compressImage(file, 300, 0.85);
            onAvatarChange(compressedImage);

        } catch (error) {
            console.error('Upload failed:', error);
            alert('Có lỗi xảy ra khi upload ảnh. Vui lòng thử lại.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
        // Reset input value to allow selecting the same file again
        e.target.value = '';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find(file => file.type.startsWith('image/'));

        if (imageFile) {
            handleFileSelect(imageFile);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleRemoveAvatar = () => {
        onAvatarChange(null);
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
                Avatar
            </label>

            {/* Current Avatar Display */}
            {currentAvatar && (
                <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                        <Image
                            src={currentAvatar}
                            alt="Avatar"
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                            unoptimized={true} // Since it's a base64 string
                        />
                    </div>
                    <button
                        onClick={handleRemoveAvatar}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Upload Area */}
            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${dragOver
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={!isUploading ? openFileDialog : undefined}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileInputChange}
                    className="hidden"
                    disabled={isUploading}
                />

                <div className="space-y-2">
                    {isUploading ? (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <span className="text-sm text-gray-500">Đang upload...</span>
                        </div>
                    ) : (
                        <>
                            {currentAvatar ? (
                                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                            ) : (
                                <User className="mx-auto h-12 w-12 text-gray-400" />
                            )}
                            <div className="text-sm text-gray-600">
                                <span className="font-medium text-blue-600">Click để chọn ảnh</span>
                                <span> hoặc kéo thả file vào đây</span>
                            </div>
                            <div className="text-xs text-gray-500">
                                Hỗ trợ: JPEG, PNG, WebP (tối đa 5MB)
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Upload Tips */}
            <div className="text-xs text-gray-500 space-y-1">
                <div>💡 <strong>Tips:</strong></div>
                <div>• Ảnh sẽ được tự động nén và resize về 300x300px</div>
                <div>• Sử dụng ảnh có tỷ lệ vuông (1:1) để có kết quả tốt nhất</div>
                <div>• Ảnh được lưu trong trình duyệt (localStorage)</div>
            </div>
        </div>
    );
}