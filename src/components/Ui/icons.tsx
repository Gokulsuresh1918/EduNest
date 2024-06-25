// src/Ui/icons.tsx
import React from 'react';

export const EditIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.232 5.232l3.536 3.536M7.5 11.5l3.536-3.536 7.072 7.072L14.572 18.5H10v-4.572l-2.5-2.5z"
      />
    </svg>
  );
};

export const EyeIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.49 1.357-1.275 2.592-2.292 3.535A9.955 9.955 0 0112 19a9.955 9.955 0 01-7.25-3.465A9.955 9.955 0 012.458 12z"
      />
    </svg>
  );
};

export const EyeOffIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7 .49-1.357 1.275-2.592 2.292-3.535M12 5c.768 0 1.515.085 2.227.244M9.882 9.883a3 3 0 104.242 4.243M15 12a3 3 0 01-4.243-4.243M4.22 4.22l15.56 15.56"
      />
    </svg>
  );
};
