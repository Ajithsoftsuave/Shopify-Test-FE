import React from "react";

interface ReturnButtonProps {
  shopUrl?: string;
}

export const ReturnButton: React.FC<ReturnButtonProps> = ({ shopUrl }) => {
  return (
    <a
      id="return-button"
      href={`${shopUrl}`}
      type="button"
      className="text-xs mt-4 sm:mt-0 sm:text-left text-center text-indigo-600 hover:text-indigo-500"
    >
      Return to Store
    </a>
  );
};
