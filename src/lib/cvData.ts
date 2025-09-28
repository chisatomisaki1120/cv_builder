export interface SocialMedia {
    platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'github' | 'youtube' | 'tiktok' | 'telegram' | 'whatsapp' | 'discord' | 'website' | 'other';
    username: string;
    url: string;
    isVisible: boolean;
    displayName?: string; // For custom display name
}

export interface PersonalInfo {
    name: string;
    position: string;
    birthDate: string;
    phone: string;
    email: string;
    address: string;
    telegram: string;
    gender: string;
    about: string;
    avatar?: string; // Base64 encoded image string
    socialMedia: SocialMedia[]; // Array of social media accounts
}

export interface Education {
    id: string;
    school: string;
    period: string;
    description: string;
    details?: string;
}

export interface Skill {
    name: string;
    color: 'blue' | 'yellow' | 'green' | 'purple' | 'red';
    category: string; // Allow custom categories
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    period: string;
    description: string;
    details?: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
}

export interface CVData {
    personalInfo: PersonalInfo;
    education: Education[];
    skills: Skill[];
    experience: Experience[];
    achievements: Achievement[];
}

// Empty CV Data - Bắt đầu từ trống hoàn toàn
export const defaultCVData: CVData = {
    personalInfo: {
        name: "",
        position: "",
        birthDate: "",
        phone: "",
        email: "",
        address: "",
        telegram: "",
        gender: "",
        about: "",
        socialMedia: []
    },
    education: [],
    skills: [],
    experience: [],
    achievements: []
};

// Auth credentials
export const AUTH_CREDENTIALS = {
    username: 'chisato',
    password: 'chisatomisaki1120'
};

// Auth helpers
export const isAuthenticated = (): boolean => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('adminAuth') === 'true';
    }
    return false;
};

export const login = (username: string, password: string): boolean => {
    if (username === AUTH_CREDENTIALS.username && password === AUTH_CREDENTIALS.password) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('adminAuth', 'true');
        }
        return true;
    }
    return false;
};

export const logout = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('adminAuth');
    }
};

// Local Storage helpers
export const saveToLocalStorage = (data: CVData) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cvData', JSON.stringify(data));
    }
};

export const loadFromLocalStorage = (): CVData => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('cvData');
        if (saved) {
            const parsedData = JSON.parse(saved);

            // Migration: Add socialMedia if it doesn't exist (for backward compatibility)
            if (!parsedData.personalInfo.socialMedia) {
                parsedData.personalInfo.socialMedia = [];
            }

            return parsedData;
        }
    }
    return defaultCVData;
};

// Avatar upload helpers
export const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        return { isValid: false, error: 'Chỉ hỗ trợ file ảnh: JPEG, PNG, WebP' };
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        return { isValid: false, error: 'Kích thước file phải nhỏ hơn 5MB' };
    }

    return { isValid: true };
};

export const compressImage = (file: File, maxWidth: number = 400, quality: number = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            // Calculate new dimensions
            const aspectRatio = img.width / img.height;
            let newWidth = img.width;
            let newHeight = img.height;

            if (img.width > maxWidth) {
                newWidth = maxWidth;
                newHeight = maxWidth / aspectRatio;
            }

            // Set canvas dimensions
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Draw and compress
            if (ctx) {
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedDataUrl);
            } else {
                reject(new Error('Canvas context not available'));
            }
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
};

// Social Media helpers
export const generateSocialMediaUrl = (platform: SocialMedia['platform'], username: string): string => {
    const baseUrls = {
        facebook: 'https://facebook.com/',
        twitter: 'https://twitter.com/',
        linkedin: 'https://linkedin.com/in/',
        instagram: 'https://instagram.com/',
        github: 'https://github.com/',
        youtube: 'https://youtube.com/@',
        tiktok: 'https://tiktok.com/@',
        telegram: 'https://t.me/',
        whatsapp: 'https://wa.me/',
        discord: 'https://discord.gg/',
        website: '',
        other: ''
    };

    if (platform === 'website' || platform === 'other') {
        // For website and other, assume username is full URL if starts with http
        return username.startsWith('http') ? username : `https://${username}`;
    }

    return baseUrls[platform] + username.replace('@', '');
};

export const getSocialMediaIcon = (platform: SocialMedia['platform']): string => {
    const icons = {
        facebook: '📘',
        twitter: '🐦',
        linkedin: '💼',
        instagram: '📷',
        github: '🐙',
        youtube: '📺',
        tiktok: '🎵',
        telegram: '✈️',
        whatsapp: '💬',
        discord: '🎮',
        website: '🌐',
        other: '🔗'
    };

    return icons[platform];
};

export const getSocialMediaDisplayName = (platform: SocialMedia['platform']): string => {
    const names = {
        facebook: 'Facebook',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        instagram: 'Instagram',
        github: 'GitHub',
        youtube: 'YouTube',
        tiktok: 'TikTok',
        telegram: 'Telegram',
        whatsapp: 'WhatsApp',
        discord: 'Discord',
        website: 'Website',
        other: 'Other'
    };

    return names[platform];
};

export const validateSocialMediaUrl = (platform: SocialMedia['platform'], username: string): { isValid: boolean; error?: string } => {
    if (!username.trim()) {
        return { isValid: false, error: 'Username không được để trống' };
    }

    // Basic validation for different platforms
    switch (platform) {
        case 'website':
        case 'other':
            if (!username.includes('.') && !username.startsWith('http')) {
                return { isValid: false, error: 'URL không hợp lệ' };
            }
            break;
        case 'whatsapp':
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            if (!phoneRegex.test(username)) {
                return { isValid: false, error: 'Số điện thoại WhatsApp không hợp lệ' };
            }
            break;
        default:
            // For other social media platforms, just check if not empty
            break;
    }

    return { isValid: true };
};