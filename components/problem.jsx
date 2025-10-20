import React, { useState } from 'react';
import { Tabs } from 'nextra/components';
import ChyopRenderer from '@/components/ChyopRenderer.jsx';

const Problem = ({ title, difficulty, relevance, children, source, link }) => {
  const labeledChildren = React.Children.toArray(children);

  const question = labeledChildren.filter(child => child?.props?.label === 'question');
  const answer = labeledChildren.filter(child => child?.props?.label === 'answer');
  const chyop = labeledChildren.filter(child => child?.props?.label === 'chyop');
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
  
  if (chyop.length > 1) {
    chyop.forEach((_, index) => items.push(`Choose Your Own Proof ${index + 1}`));
  } else if (chyop.length === 1) {
    items.push('Choose Your Own Proof');
  }
  
  if (takeaway.length > 1) {
    takeaway.forEach((_, index) => items.push(`Takeaway ${index + 1}`));
  } else if (takeaway.length === 1) {
    items.push('Takeaway');
  }

  /*const difficultyToEmoji = (level) => {
    switch (level) {
      case 1: return '🐣';
      case 2: return '🐢';
      case 3: return '🐱';
      case 4: return '🐺';
      case 5: return '🦁';
      case 6: return '🐉';
      default: return '';
    }
  };

  const difficultyToText = (level) => {
    switch (level) {
      case 1: return 'Easy';
      case 2: return 'Fairly Easy';
      case 3: return 'Moderate';
      case 4: return 'Hard';
      case 5: return 'Very Hard';
      case 6: return 'Hmmm?';
      default: return '';
    }
  };*/
  
  return (
    <details className="border border-gray-300 rounded-md p-4 shadow-md my-5">
      <summary className="text-lg font-semibold cursor-pointer flex flex-wrap items-center gap-2 sm:gap-5">
        <span className="chevron mr-2 black dark:white"></span>
        <span className="text-base sm:text-lg font-semibold">{title}</span>

        {difficulty && (
          <span className="text-sm sm:text-base">
            Difficulty: {difficulty> 5? '🐉' : (difficulty + '/5')}
          </span>
        )}
        
        {relevance !== undefined && (
          <span className="text-sm sm:text-base" title={relevance < 1 ? 'Irrelevant' : `Relevancy ${relevance}/4`}>
            Relevance: {relevance < 1 ? '🪩' : '🎓'.repeat(relevance)}
          </span>
        )}
        
        {source && (
          <span
          className="ml-auto text-sm sm:text-base flex flex-wrap"
        >
          Source:&nbsp; {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: link ? 'rgb(179, 196, 232)' : 'grey' }} 
            >
              {source}
            </a>
          ) : (
            <span>{source}</span>
          )}
        </span>
        )}
      </summary>
      <Tabs items={items} className="overflow-x-auto whitespace-nowrap sm:whitespace-normal">
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
        {chyop.map((c, idx) => (
          <Tabs.Tab key={`Chyop-${idx}`}>
            <ChyopRenderer story={c.props.children} />
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
