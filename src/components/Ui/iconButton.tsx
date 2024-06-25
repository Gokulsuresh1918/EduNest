// src/Ui/iconButton.tsx
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className="p-2 rounded hover:bg-gray-200">
      {children}
    </button>
  );
};
