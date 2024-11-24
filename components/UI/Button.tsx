import React from "react";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  ariaLabel?: string; // Optional prop for accessibility
}

const Button: React.FC<ButtonProps> = ({ href, children, onClick, ariaLabel }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-block px-6 py-3 rounded-lg bg-secondary text-background shadow-lg hover:bg-secondary-dark hover:shadow-xl focus:ring-2 focus:ring-secondary-dark focus:outline-none transition-all transform hover:scale-105 active:scale-95"
      role="button"
      aria-label={ariaLabel || "button"}
    >
      {children}
    </a>
  );
};

export default Button;
