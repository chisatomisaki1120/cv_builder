'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, Phone, Mail, MapPin, User, GraduationCap, Code, Briefcase, Award, Settings } from "lucide-react";
import Link from 'next/link';
import SectionCard from "@/components/SectionCard";
import SkillBadge from "@/components/SkillBadge";
import EducationItem from "@/components/EducationItem";
import ContactInfo from "@/components/ContactInfo";
import ExportPDF from "@/components/ExportPDF";
import { CVData, loadFromLocalStorage, defaultCVData } from '@/lib/cvData';

export default function Home() {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);

  useEffect(() => {
    const data = loadFromLocalStorage();
    setCVData(data);
  }, []);

  // Group skills by category dynamically
  const skillsByCategory = cvData.skills.reduce((acc, skill) => {
    const category = skill.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof cvData.skills>);

  // Get category display names
  const getCategoryDisplayName = (category: string) => {
    const categoryNames: Record<string, string> = {
      'programming': 'Lập trình',
      'language': 'Ngôn ngữ',
      'design': 'Thiết kế',
      'marketing': 'Marketing',
      'management': 'Quản lý',
      'other': 'Khác'
    };
    return categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Control Buttons */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <ExportPDF cvData={cvData} />
        <Link
          href="/admin"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        >
          <Settings size={20} />
          Admin
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Empty State Message */}
        {!cvData.personalInfo.name && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Chào mừng đến với CV Builder!</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                CV của bạn hiện đang trống. Hãy bắt đầu tạo CV chuyên nghiệp bằng cách thêm thông tin cá nhân trong trang quản trị.
              </p>
              <div className="space-y-3">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  <Settings size={20} />
                  Bắt đầu tạo CV
                </Link>
                <div className="text-sm text-gray-500 mt-2">
                  Đăng nhập với: <strong>chisato</strong> / <strong>chisatomisaki1120</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CV Content for PDF Export */}
        <div id="cv-content">{cvData.personalInfo.name && (
          <>
            {/* Header with Profile */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                    {cvData.personalInfo.avatar ? (
                      <Image
                        src={cvData.personalInfo.avatar}
                        alt={cvData.personalInfo.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                        unoptimized={true} // Since it's a base64 string
                        priority={true} // Avatar is above the fold
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <User size={48} className="text-gray-500" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-blue-600 mb-2">{cvData.personalInfo.name}</h1>
                  <p className="text-xl text-gray-600 mb-4">{cvData.personalInfo.position}</p>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ContactInfo icon={<Calendar size={16} />} text={cvData.personalInfo.birthDate} />
                    <ContactInfo icon={<Phone size={16} />} text={cvData.personalInfo.phone} />
                    <ContactInfo icon={<Mail size={16} />} text={cvData.personalInfo.email} />
                    <ContactInfo icon={<User size={16} />} text={cvData.personalInfo.gender} />
                    <div className="md:col-span-2">
                      <ContactInfo icon={<MapPin size={16} />} text={cvData.personalInfo.address} />
                    </div>
                  </div>

                  {/* Social Media Info */}
                  {cvData.personalInfo.socialMedia && cvData.personalInfo.socialMedia.length > 0 && (
                    <div className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cvData.personalInfo.socialMedia
                          .filter(social => social.isVisible)
                          .map((social, index) => {
                            const icon = social.platform === 'facebook' ? '📘' :
                              social.platform === 'twitter' ? '🐦' :
                                social.platform === 'linkedin' ? '💼' :
                                  social.platform === 'instagram' ? '📷' :
                                    social.platform === 'github' ? '🐙' :
                                      social.platform === 'youtube' ? '�' :
                                        social.platform === 'tiktok' ? '🎵' :
                                          social.platform === 'telegram' ? '✈️' :
                                            social.platform === 'whatsapp' ? '�' :
                                              social.platform === 'discord' ? '🎮' :
                                                social.platform === 'website' ? '🌐' : '�';

                            const displayText = `${social.displayName || social.platform}: ${social.username}`;

                            return (
                              <ContactInfo
                                key={index}
                                icon={<span className="text-base">{icon}</span>}
                                text={displayText}
                              />
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* About Section */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {cvData.personalInfo.about}
                </p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Education Section */}
              <SectionCard title="Học vấn" icon={<GraduationCap size={24} />}>
                <div className="space-y-4">
                  {cvData.education.map((edu) => (
                    <EducationItem
                      key={edu.id}
                      school={edu.school}
                      period={edu.period}
                      description={edu.description}
                      details={edu.details}
                    />
                  ))}
                </div>
              </SectionCard>

              {/* Skills Section */}
              <SectionCard title="Các kỹ năng" icon={<Code size={24} />}>
                <div className="space-y-6">
                  {/* Dynamic Skills by Category */}
                  {Object.entries(skillsByCategory).map(([category, skills]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-gray-800 mb-3">
                        {getCategoryDisplayName(category)}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <SkillBadge
                            key={`${category}-${index}`}
                            skill={skill.name}
                            color={skill.color}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* Experience and Achievements Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Experience Section */}
              <SectionCard title="Kinh nghiệm làm việc" icon={<Briefcase size={24} />}>
                <div className="space-y-4">
                  {cvData.experience.map((exp) => (
                    <EducationItem
                      key={exp.id}
                      school={`${exp.position} - ${exp.company}`}
                      period={exp.period}
                      description={exp.description}
                      details={exp.details}
                    />
                  ))}
                </div>
              </SectionCard>

              {/* Achievements Section */}
              <SectionCard title="Thành tích" icon={<Award size={24} />}>
                <div className="space-y-4">
                  {cvData.achievements.map((achievement) => {
                    const colorClasses = {
                      blue: 'from-blue-50 to-indigo-50 border-blue-500',
                      green: 'from-green-50 to-emerald-50 border-green-500',
                      purple: 'from-purple-50 to-violet-50 border-purple-500',
                      yellow: 'from-yellow-50 to-amber-50 border-yellow-500',
                      red: 'from-red-50 to-rose-50 border-red-500',
                    };

                    return (
                      <div key={achievement.id} className={`p-4 bg-gradient-to-r ${colorClasses[achievement.color]} rounded-lg border-l-4`}>
                        <h4 className="font-semibold text-gray-800 mb-2">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{achievement.description}</p>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>
            </div>

            {/* Footer */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6 text-center">
              <p className="text-gray-600 text-sm">
                © 2025 <a href="https://t.me/michiisato">Chisato</a> Allright reserved.
              </p>
            </div>
          </>
        )}</div> {/* End cv-content */}
      </div>
    </div>
  );
}
