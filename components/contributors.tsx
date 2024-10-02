import React, { useEffect, useState } from 'react';

interface Contributor {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
  contributions: number;
}

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/repos/discrete-math-ch/discmath/contributors')
      .then(response => response.json())
      .then(data => setContributors(data))
      .catch(error => console.error('Error fetching contributors:', error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Contributors</h2>
      <ul className="space-y-4">
        {contributors.map(contributor => (
          <li key={contributor.id} className="flex items-center space-x-4">
            <img
              src={contributor.avatar_url}
              alt={contributor.login}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <a
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: 'rgb(170, 255, 0)' }}
              >
                {contributor.login}
              </a>
              {<p className="text-gray-600 dark:text-gray-300">Contribution count: {contributor.contributions}</p>}

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contributors;