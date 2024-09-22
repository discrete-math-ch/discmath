import React from 'react';
import { Tabs } from 'nextra/components';

const Problem = ({ title, children, source, link }) => {
  const labeledChildren = React.Children.toArray(children);

  const question = labeledChildren.filter(child => child?.props?.label === 'question');
  const answer = labeledChildren.filter(child => child?.props?.label === 'answer');
  const hints = labeledChildren.filter(child => child?.props?.label === 'hint');
  const takeaway = labeledChildren.filter(child => child?.props?.label === 'takeaway');

  const items = [];

  if (question.length > 1) {
    question.forEach((_, index) => items.push(`Question ${index + 1}`));
  } else if (question.length === 1) {
    items.push('Question');
  }
  
  if (hints.length > 1) {
    hints.forEach((_, index) => items.push(`Hint ${index + 1}`));
  } else if (hints.length === 1) {
    items.push('Hint');
  }
  
  if (answer.length > 1) {
    answer.forEach((_, index) => items.push(`Answer ${index + 1}`));
  } else if (answer.length === 1) {
    items.push('Answer');
  }
  
  if (takeaway.length > 1) {
    takeaway.forEach((_, index) => items.push(`Takeaway ${index + 1}`));
  } else if (takeaway.length === 1) {
    items.push('Takeaway');
  }
  
  return (
    <details className="border border-gray-300 rounded-md p-4 shadow-md my-5">
      <summary className="text-lg font-semibold cursor-pointer flex justify-between items-center">
        <span>{title}</span>
        {source && !link && (
          <span className="text-sm text-gray-600 dark:text-gray-400 ">
            Source: {source}
          </span>
        )}
        {source && link && (
          <span className="text-sm text-gray-600 dark:text-gray-400 ">
            Source: <a href={link} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'rgb(170, 255, 0)' }}>{source}</a>
          </span>
        )}
      </summary>
      <Tabs items={items}>
        {question.map((q, index) => (
          <Tabs.Tab key={`Question-${index}`}>
            <div>{q}</div>
          </Tabs.Tab>
        ))}
        {hints.map((hint, index) => (
          <Tabs.Tab key={`Hint-${index}`}>
            <div>{hint}</div>
          </Tabs.Tab>
        ))}
        {answer.map((a, index) => (
          <Tabs.Tab key={`Answer-${index}`}>
            <div>{a}</div>
          </Tabs.Tab>
        ))}
        {takeaway.map((t, index) => (
          <Tabs.Tab key={`Takeaway-${index}`}>
            <div>{t}</div>
          </Tabs.Tab>
        ))}
      </Tabs>
    </details>
  );
};

export default Problem;