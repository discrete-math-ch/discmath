"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const LastCommitAuthor: React.FC = () => {
  const [author, setAuthor] = useState<string>("");
  const [commitDate, setCommitDate] = useState<string>("");

  const router = useRouter();
  const filePath = router.asPath;

  useEffect(() => {
    const fetchLastCommitAuthor = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/discrete-math-ch/discmath/commits?path=${filePath}`,
        );
        const data = await response.json();
        if (data.length > 0) {
          setAuthor(data[0].commit.author.name);
          setCommitDate(new Date(data[0].commit.author.date).toLocaleString());
        }
        console.log(data[0].commit);
      } catch (error) {
        console.error("Error fetching commit data:", error);
      }
    };

    fetchLastCommitAuthor();
  }, [filePath]);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        Last commit by: <span className="text-blue-500">{author}</span>
      </p>
      <p className="text-sm text-gray-900 dark:text-gray-100">
        Date: <span className="text-blue-500">{commitDate}</span>
      </p>
    </div>
  );
};

export default LastCommitAuthor;

