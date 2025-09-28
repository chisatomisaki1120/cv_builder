import { memo } from 'react';

interface SkillBadgeProps {
  skill: string;
  color: 'blue' | 'yellow' | 'green' | 'purple' | 'red';
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  green: 'bg-green-100 text-green-800',
  purple: 'bg-purple-100 text-purple-800',
  red: 'bg-red-100 text-red-800',
};

const SkillBadge = memo(function SkillBadge({ skill, color }: SkillBadgeProps) {
  return (
    <span className={`px-3 py-1 ${colorClasses[color]} rounded-full text-sm font-medium`}>
      {skill}
    </span>
  );
});

export default SkillBadge;