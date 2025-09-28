import { ReactNode, memo } from 'react';

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const SectionCard = memo(function SectionCard({ title, icon, children, className = '' }: SectionCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-blue-500">{icon}</span>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
});

export default SectionCard;