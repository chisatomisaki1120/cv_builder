import { ReactNode, memo } from 'react';

interface ContactInfoProps {
  icon: ReactNode;
  text: string;
}

const ContactInfo = memo(function ContactInfo({ icon, text }: ContactInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-blue-500">{icon}</span>
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  );
});

export default ContactInfo;