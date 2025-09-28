'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, ArrowLeft, Edit3, User, GraduationCap, Code, Briefcase, Award, RotateCcw, LogOut } from 'lucide-react';
import Link from 'next/link';
import { CVData, PersonalInfo, Education, Skill, Experience, Achievement, SocialMedia, loadFromLocalStorage, saveToLocalStorage, defaultCVData, isAuthenticated, logout } from '@/lib/cvData';
import Login from '@/components/Login';
import AvatarUpload from '@/components/AvatarUpload';
import SocialMediaManager from '@/components/SocialMediaManager';

export default function AdminPage() {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [activeTab, setActiveTab] = useState<'personal' | 'education' | 'skills' | 'experience' | 'achievements'>('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    const data = loadFromLocalStorage();
    setCVData(data);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    saveToLocalStorage(cvData);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn reset tất cả dữ liệu về mặc định không?')) {
      setCVData(defaultCVData);
      saveToLocalStorage(defaultCVData);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    const data = loadFromLocalStorage();
    setCVData(data);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  // Show login form if not authenticated
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setCVData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateAvatar = (avatar: string | null) => {
    setCVData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        avatar: avatar || undefined
      }
    }));
  };

  const updateSocialMedia = (socialMedia: SocialMedia[]) => {
    setCVData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        socialMedia
      }
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      period: '',
      description: '',
      details: ''
    };
    setCVData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setCVData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const deleteEducation = (id: string) => {
    setCVData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      name: '',
      color: 'blue',
      category: 'programming'
    };
    setCVData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    setCVData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const deleteSkill = (index: number) => {
    setCVData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      period: '',
      description: '',
      details: ''
    };
    setCVData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setCVData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const deleteExperience = (id: string) => {
    setCVData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      icon: '🏆',
      color: 'blue'
    };
    setCVData(prev => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement]
    }));
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    setCVData(prev => ({
      ...prev,
      achievements: prev.achievements.map(ach =>
        ach.id === id ? { ...ach, [field]: value } : ach
      )
    }));
  };

  const deleteAchievement = (id: string) => {
    setCVData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(ach => ach.id !== id)
    }));
  };

  const tabs = [
    { id: 'personal', label: 'Thông tin cá nhân', icon: <User size={20} /> },
    { id: 'education', label: 'Học vấn', icon: <GraduationCap size={20} /> },
    { id: 'skills', label: 'Kỹ năng', icon: <Code size={20} /> },
    { id: 'experience', label: 'Kinh nghiệm', icon: <Briefcase size={20} /> },
    { id: 'achievements', label: 'Thành tích', icon: <Award size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                <ArrowLeft size={20} />
                <span>Quay lại CV</span>
              </Link>
              <div className="flex items-center gap-2">
                <Edit3 className="text-blue-500" size={24} />
                <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {saveSuccess && (
                <div className="text-green-600 text-sm font-medium">
                  ✓ Đã lưu thành công!
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                <LogOut size={20} />
                Đăng xuất
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                <RotateCcw size={20} />
                Reset
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                <Save size={20} />
                {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Danh mục quản lý</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'personal' | 'education' | 'skills' | 'experience' | 'achievements')}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Welcome Message for Empty CV */}
              {!cvData.personalInfo.name && activeTab === 'personal' && (
                <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">👋</div>
                    <div>
                      <h3 className="font-bold text-blue-800 text-lg mb-2">Chào mừng đến với CV Builder!</h3>
                      <p className="text-blue-700 mb-4">
                        CV của bạn hiện đang trống. Hãy bắt đầu bằng cách điền thông tin cá nhân bên dưới.
                      </p>
                      <div className="text-sm text-blue-600 space-y-1">
                        <div>✨ <strong>Mẹo:</strong> Bắt đầu với họ tên và vị trí công việc</div>
                        <div>📋 <strong>Tiếp theo:</strong> Thêm thông tin liên hệ và mô tả bản thân</div>
                        <div>🎯 <strong>Sau đó:</strong> Chuyển sang các tab khác để thêm học vấn, kỹ năng, kinh nghiệm</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800">Thông tin cá nhân</h2>

                  {/* Avatar Upload Section */}
                  <div className="mb-6">
                    <AvatarUpload
                      currentAvatar={cvData.personalInfo.avatar}
                      onAvatarChange={updateAvatar}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                      <input
                        type="text"
                        value={cvData.personalInfo.name}
                        onChange={(e) => updatePersonalInfo('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Chức vụ</label>
                      <input
                        type="text"
                        value={cvData.personalInfo.position}
                        onChange={(e) => updatePersonalInfo('position', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                      <input
                        type="text"
                        value={cvData.personalInfo.birthDate}
                        onChange={(e) => updatePersonalInfo('birthDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                      <input
                        type="text"
                        value={cvData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={cvData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                      <input
                        type="text"
                        value={cvData.personalInfo.address}
                        onChange={(e) => updatePersonalInfo('address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Giới thiệu bản thân</label>
                    <textarea
                      value={cvData.personalInfo.about}
                      onChange={(e) => updatePersonalInfo('about', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Social Media Management */}
                  <div>
                    <SocialMediaManager
                      socialMedia={cvData.personalInfo.socialMedia}
                      onUpdate={updateSocialMedia}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Học vấn</h2>
                    <button
                      onClick={addEducation}
                      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      <Plus size={20} />
                      Thêm học vấn
                    </button>
                  </div>
                  <div className="space-y-4">
                    {cvData.education.map((edu) => (
                      <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium text-gray-800">Trường học</h3>
                          <button
                            onClick={() => deleteEducation(edu.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tên trường</label>
                            <input
                              type="text"
                              value={edu.school}
                              onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian</label>
                            <input
                              type="text"
                              value={edu.period}
                              onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                          <textarea
                            value={edu.description}
                            onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                            rows={3}
                            placeholder="Nhập mô tả (có thể xuống dòng)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Chi tiết (tùy chọn)</label>
                          <textarea
                            value={edu.details || ''}
                            onChange={(e) => updateEducation(edu.id, 'details', e.target.value)}
                            rows={3}
                            placeholder="Nhập chi tiết (có thể xuống dòng)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Kỹ năng</h2>
                    <button
                      onClick={addSkill}
                      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      <Plus size={20} />
                      Thêm kỹ năng
                    </button>
                  </div>

                  {/* Category Guidelines */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-2">💡 Hướng dẫn danh mục</h3>
                    <p className="text-sm text-blue-700 mb-2">
                      Bạn có thể nhập bất kỳ danh mục nào. Một số gợi ý:
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">programming</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">language</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">design</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">marketing</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">management</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">communication</span>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    {cvData.skills.map((skill, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium text-gray-800">Kỹ năng #{index + 1}</h3>
                          <button
                            onClick={() => deleteSkill(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tên kỹ năng</label>
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => updateSkill(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Màu sắc</label>
                            <select
                              value={skill.color}
                              onChange={(e) => updateSkill(index, 'color', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="blue">Xanh dương</option>
                              <option value="green">Xanh lá</option>
                              <option value="yellow">Vàng</option>
                              <option value="purple">Tím</option>
                              <option value="red">Đỏ</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                            <input
                              type="text"
                              value={skill.category}
                              onChange={(e) => updateSkill(index, 'category', e.target.value)}
                              placeholder="Ví dụ: Lập trình, Ngôn ngữ, Thiết kế, Marketing..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Có thể nhập bất kỳ danh mục nào (programming, language, design, marketing, etc.)
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Kinh nghiệm làm việc</h2>
                    <button
                      onClick={addExperience}
                      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      <Plus size={20} />
                      Thêm kinh nghiệm
                    </button>
                  </div>
                  <div className="space-y-4">
                    {cvData.experience.map((exp) => (
                      <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium text-gray-800">Kinh nghiệm làm việc</h3>
                          <button
                            onClick={() => deleteExperience(exp.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Công ty</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Vị trí</label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả công việc</label>
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            rows={3}
                            placeholder="Nhập mô tả công việc (có thể xuống dòng)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Thành tích (tùy chọn)</label>
                          <textarea
                            value={exp.details || ''}
                            onChange={(e) => updateExperience(exp.id, 'details', e.target.value)}
                            rows={3}
                            placeholder="Nhập thành tích (có thể xuống dòng)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Thành tích</h2>
                    <button
                      onClick={addAchievement}
                      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      <Plus size={20} />
                      Thêm thành tích
                    </button>
                  </div>
                  <div className="space-y-4">
                    {cvData.achievements.map((achievement) => (
                      <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium text-gray-800">Thành tích</h3>
                          <button
                            onClick={() => deleteAchievement(achievement.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                            <input
                              type="text"
                              value={achievement.title}
                              onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                            <input
                              type="text"
                              value={achievement.icon}
                              onChange={(e) => updateAchievement(achievement.id, 'icon', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                          <textarea
                            value={achievement.description}
                            onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                            placeholder="Nhập mô tả thành tích (có thể xuống dòng)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                          />
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Màu sắc</label>
                          <select
                            value={achievement.color}
                            onChange={(e) => updateAchievement(achievement.id, 'color', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="blue">Xanh dương</option>
                            <option value="green">Xanh lá</option>
                            <option value="yellow">Vàng</option>
                            <option value="purple">Tím</option>
                            <option value="red">Đỏ</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}