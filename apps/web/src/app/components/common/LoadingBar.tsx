import React from 'react';

interface LoadingBarProps {
  color?: string; // Hex color for the progress bar
}

const LoadingBar: React.FC<LoadingBarProps> = ({ color = '#FFC648' }) => {
  return (
        <div
          className="h-1 animate-indeterminate"
          style={{ backgroundColor: color,
            transformOrigin: '0% 50%',
           }}
        ></div>
  );
};

export default LoadingBar;
