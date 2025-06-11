import React from "react";

interface CustomOutlineButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
  className?: string;
}

const CustomOutlineButton: React.FC<CustomOutlineButtonProps> = ({
  onClick,
  text,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:hover:bg-blue-500/10 transition cursor-pointer radius-50 ${className}`}
    >
      {text}
    </button>
  );
};

export default CustomOutlineButton;
