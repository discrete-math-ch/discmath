import { useState } from 'react';

const ChyopRenderer = ({ story }) => {
  const [history, setHistory] = useState([{ 
    node: story, 
    choice: null 
  }]);

  const handleChoice = (choice) => {
    setHistory([...history, {
      node: choice.child,
      choice: choice.text
    }]);
  };

  return (
    <div className="chyop-container">
      {history.map((entry, index) => (
        <div key={index} className="story-segment">
          <p>{entry.node.text}</p>
          {index === history.length - 1 && entry.node.choices.length > 0 && (
            <div className="choices-container">
              {entry.node.choices.map((choice, choiceIdx) => (
                <button 
                  key={choiceIdx}
                  className="chyop-choice-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                  onClick={() => handleChoice(choice)}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChyopRenderer;