import React from "react";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="inline-block px-5 py-3 rounded-lg bg-secondary text-background shadow hover:bg-secondary-dark transition-colors"
    >
      {children}
    </a>
  );
};

export default Button;