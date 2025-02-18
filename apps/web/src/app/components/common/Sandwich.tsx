import React, { ReactElement } from 'react';

interface SandwichProps {
  header: ReactElement;
  footer: ReactElement;
  content: ReactElement;
}

const Sandwich: React.FC<SandwichProps> = ({ header, footer, content }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-none">{header}</div>
      <div className="flex-grow overflow-y-auto no-scrollbar">{content}</div>
      <div className="flex-none">{footer}</div>
    </div>
  );
};

export default Sandwich;
