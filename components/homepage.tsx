import React from "react";
import Card from "@/components/UI/Card";
import Button from "@/components/UI/Button";
import { Callout } from "nextra/components";

const HomePage: React.FC = () => {
  const chapters = [
    {
      title: "Introduction to Logic",
      description:
        "Foundations of Logic Notation and mathematical proof writing.",
      link: "/content/ch2",
    },
    {
      title: "Sets, Relations, Functions",
      description:
        "Fundamental concepts of set theory, relations, functions and countability.",
      link: "/content/ch3/sets",
    },
    {
      title: "Number Theory",
      description: "Divisibility, Modular arithmetic and more.",
      link: "/content/ch4",
    },
    {
      title: "Algebra",
      description: "Groups, Rings, Fields",
      link: "/content/ch5",
    },
    {
      title: "Logic",
      description:
        "Advanced concepts of logic, involving logical calculi and more. ",
      link: "/content/ch6",
    },
    {
      title: "Challenges",
      description: "Some challenge exercises :)",
      link: "/challenges",
    },
  ];

  const placeholders = (3 - (chapters.length % 3)) % 3; // Calculate needed placeholders

  return (
    <div className="flex flex-col items-center w-full mt-10 space-y-12 px-4">
      {/* Header Section */}
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          Welcome to Discrete Mathematics
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          This website was originally created by a few teaching assisitants for
          the HS24 Discrete Mathematics course. It is now maintained by a group
          of HS25 TAs. Feel free to contribute wherever you believe your input
          could benefit other students.
        </p>
      </div>

      {/* Card Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {chapters.map((chapter, index) => (
          <Card
            key={index}
            title={chapter.title}
            description={chapter.description}
            link={chapter.link}
          />
        ))}
        {Array.from({ length: placeholders }).map((_, index) => (
          <div key={`placeholder-${index}`} className="invisible" />
        ))}
      </div>

      {/* Button Section */}
      <div className="mt-10">
        <Button href="/content">Get Started</Button>
      </div>

      {/* Disclaimer Section */}
      <div className="mt-10 w-full max-w-4xl">
        <Callout type="warning" emoji="⚠️">
          This webpage is not affiliated with ETH Zurich and does not guarantee
          the accuracy of its content.
        </Callout>
      </div>
    </div>
  );
};

export default HomePage;
