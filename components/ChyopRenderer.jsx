import { useState } from 'react';

const ChyopRenderer = ({ story }) => {
  const [path, setPath] = useState([{ node: story, choice: null }]);

  const handleChoice = (nodeIndex, choice) => {
    const newPath = path.slice(0, nodeIndex + 1);
    newPath[nodeIndex] = { ...newPath[nodeIndex], choice };
    newPath.push({ node: choice.child, choice: null });
    setPath(newPath);
  };

  return (
    <div className="chyop-container space-y-4 max-w-2xl mx-auto">
      {path.map((entry, index) => (
        <div key={index} className="story-segment py-3">
          <p className="text-base mb-3">{entry.node.text}</p>

          {entry.node.choices.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {entry.node.choices.map((choice, choiceIdx) => {
                const isSelected = entry.choice?.text === choice.text;
                return (
                  <button
                    key={choiceIdx}
                    className={`p-3 rounded-lg font-medium transition-all duration-200 ${
                      isSelected
                        ? "bg-gray-700 dark:bg-gray-800 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                    onClick={() => !isSelected && handleChoice(index, choice)}
                    disabled={isSelected}
                  >
                    {choice.text}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


export default ChyopRenderer;