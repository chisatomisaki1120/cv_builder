import { memo } from 'react';

interface EducationItemProps {
  school: string;
  period: string;
  description: string;
  details?: string;
}

const EducationItem = memo(function EducationItem({ school, period, description, details }: EducationItemProps) {
  // Hàm để render text với xuống dòng
  const renderTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="border-l-4 border-blue-500 pl-4 py-2">
      <h3 className="font-semibold text-gray-800">{school}</h3>
      <p className="text-blue-600 text-sm font-medium">{period}</p>
      <p className="text-gray-600 text-sm whitespace-pre-line">{renderTextWithLineBreaks(description)}</p>
      {details && <p className="text-gray-600 text-sm whitespace-pre-line">{renderTextWithLineBreaks(details)}</p>}
    </div>
  );
});

export default EducationItem;