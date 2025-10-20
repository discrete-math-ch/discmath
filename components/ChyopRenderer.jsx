import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

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
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {entry.node.text}
            </ReactMarkdown>
          </div>

          {entry.node.choices.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
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
                    <ReactMarkdown
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {choice.text}
                    </ReactMarkdown>
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