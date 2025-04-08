import { useRef, useEffect, useState } from 'react';

interface CodeEditorProps {
  solution: string;
  userInput: string;
  onInputChange: (value: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export default function CodeEditor({ solution, userInput, onInputChange, textareaRef }: CodeEditorProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (textareaRef.current) {
      const tempDiv = document.createElement('div');
      tempDiv.style.visibility = 'hidden';
      tempDiv.style.position = 'absolute';
      tempDiv.style.whiteSpace = 'pre-wrap';
      tempDiv.style.fontFamily = 'monospace';
      tempDiv.style.fontSize = '14px';
      tempDiv.style.lineHeight = '1.5';
      tempDiv.textContent = solution;
      document.body.appendChild(tempDiv);
      
      setDimensions({
        width: tempDiv.offsetWidth,
        height: tempDiv.offsetHeight
      });
      
      document.body.removeChild(tempDiv);
    }
  }, [solution, textareaRef]);

  return (
    <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>
      {/* Solution display */}
      <pre className="font-mono text-sm text-gray-400 whitespace-pre-wrap">
        {solution}
      </pre>
      
      {/* User input overlay */}
      <textarea
        ref={textareaRef}
        value={userInput}
        onChange={(e) => onInputChange(e.target.value)}
        className="absolute inset-0 w-full h-full font-mono text-sm bg-transparent text-transparent caret-white resize-none focus:outline-none"
        spellCheck="false"
      />
      
      {/* User input display */}
      <pre className="absolute inset-0 font-mono text-sm whitespace-pre-wrap">
        {userInput.split('').map((char, index) => {
          const isCorrect = char === solution[index];
          return (
            <span
              key={index}
              className={`${isCorrect ? 'text-green-400' : 'text-red-500'}`}
            >
              {char}
            </span>
          );
        })}
      </pre>
    </div>
  );
} 