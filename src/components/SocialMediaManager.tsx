'use client';

import { useState } from 'react';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { SocialMedia, getSocialMediaIcon, getSocialMediaDisplayName } from '@/lib/cvData';

interface SocialMediaManagerProps {
    socialMedia: SocialMedia[] | undefined;
    onUpdate: (socialMedia: SocialMedia[]) => void;
}

export default function SocialMediaManager({ socialMedia = [], onUpdate }: SocialMediaManagerProps) {
    const [newSocialMedia, setNewSocialMedia] = useState<Partial<SocialMedia>>({
        platform: 'facebook',
        username: '',
        url: '', // Keep for compatibility but won't be used for display
        isVisible: true,
        displayName: ''
    });

    // Ensure socialMedia is always an array
    const socialMediaList = socialMedia || [];

    const availablePlatforms: SocialMedia['platform'][] = [
        'facebook', 'twitter', 'linkedin', 'instagram', 'github',
        'youtube', 'tiktok', 'telegram', 'whatsapp', 'discord', 'website', 'other'
    ];

    const handleAddSocialMedia = () => {
        if (!newSocialMedia.username?.trim()) {
            alert('Vui lòng nhập username/thông tin');
            return;
        }

        const displayName = newSocialMedia.displayName || getSocialMediaDisplayName(newSocialMedia.platform!);

        const newItem: SocialMedia = {
            platform: newSocialMedia.platform!,
            username: newSocialMedia.username,
            url: '', // Keep empty since we don't need links
            isVisible: newSocialMedia.isVisible ?? true,
            displayName
        };

        onUpdate([...socialMediaList, newItem]);

        // Reset form
        setNewSocialMedia({
            platform: 'facebook',
            username: '',
            url: '',
            isVisible: true,
            displayName: ''
        });
    };

    const handleRemoveSocialMedia = (index: number) => {
        const updated = socialMediaList.filter((_, i) => i !== index);
        onUpdate(updated);
    };

    const handleToggleVisibility = (index: number) => {
        const updated = socialMediaList.map((item, i) =>
            i === index ? { ...item, isVisible: !item.isVisible } : item
        );
        onUpdate(updated);
    };

    const handleUpdateSocialMedia = (index: number, field: keyof SocialMedia, value: string | boolean) => {
        const updated = socialMediaList.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        onUpdate(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Mạng xã hội & Liên kết</h3>
                <span className="text-sm text-gray-500">{socialMediaList.length} liên kết</span>
            </div>

            {/* Existing Social Media List */}
            {socialMediaList.length > 0 && (
                <div className="space-y-3">
                    {socialMediaList.map((item, index) => (
                        <div
                            key={index}
                            className={`p-4 border rounded-lg transition-all ${item.isVisible ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-300'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{getSocialMediaIcon(item.platform)}</span>

                                <div className="flex-1 grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        value={item.displayName || ''}
                                        onChange={(e) => handleUpdateSocialMedia(index, 'displayName', e.target.value)}
                                        placeholder={getSocialMediaDisplayName(item.platform)}
                                        className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />

                                    <input
                                        type="text"
                                        value={item.username}
                                        onChange={(e) => handleUpdateSocialMedia(index, 'username', e.target.value)}
                                        placeholder="Username hoặc thông tin"
                                        className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleToggleVisibility(index)}
                                        className={`p-2 rounded transition-colors ${item.isVisible
                                            ? 'text-green-600 hover:bg-green-50'
                                            : 'text-gray-400 hover:bg-gray-100'
                                            }`}
                                        title={item.isVisible ? 'Ẩn' : 'Hiện'}
                                    >
                                        {item.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                                    </button>

                                    <button
                                        onClick={() => handleRemoveSocialMedia(index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                        title="Xóa"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add New Social Media */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3">Thêm liên kết mới</h4>

                <div className="grid grid-cols-4 gap-3 mb-3">
                    <select
                        value={newSocialMedia.platform}
                        onChange={(e) => setNewSocialMedia(prev => ({
                            ...prev,
                            platform: e.target.value as SocialMedia['platform'],
                            displayName: getSocialMediaDisplayName(e.target.value as SocialMedia['platform'])
                        }))}
                        className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {availablePlatforms.map(platform => (
                            <option key={platform} value={platform}>
                                {getSocialMediaIcon(platform)} {getSocialMediaDisplayName(platform)}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        value={newSocialMedia.displayName || ''}
                        onChange={(e) => setNewSocialMedia(prev => ({ ...prev, displayName: e.target.value }))}
                        placeholder="Tên hiển thị"
                        className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                    <input
                        type="text"
                        value={newSocialMedia.username || ''}
                        onChange={(e) => setNewSocialMedia(prev => ({ ...prev, username: e.target.value }))}
                        placeholder="Username hoặc thông tin"
                        className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                    <button
                        onClick={handleAddSocialMedia}
                        className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        <Plus size={16} />
                        Thêm
                    </button>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                    <div>💡 <strong>Hướng dẫn:</strong></div>
                    <div>• Thông tin sẽ được hiển thị dưới dạng text thuần (không có link)</div>
                    <div>• Có thể nhập username, số điện thoại, hoặc bất kỳ thông tin nào</div>
                    <div>• Sử dụng &quot;Tên hiển thị&quot; để tùy chỉnh nhãn hiển thị</div>
                </div>
            </div>
        </div>
    );
}