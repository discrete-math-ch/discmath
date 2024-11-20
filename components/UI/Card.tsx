import React from "react";

interface CardProps {
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, description, link }) => {
  return (
    <a
      href={link}
      className="rounded-lg bg-background-light dark:bg-background-dark p-6 shadow-md border border-border-light dark:border-border-dark 
                 text-text-light dark:text-text-dark transition-transform transform hover:scale-105 
                 hover:shadow-lg dark:hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)] 
                 "
    >
      <h2 className="text-xl font-semibold text-primary-dark dark:text-primary-light transition-colors">
        {title}
      </h2>
      <p className="text-sm mt-2 dark:text-secondary-light text-secondary-dark">
        {description}
      </p>
    </a>
  );
};

export default Card;
