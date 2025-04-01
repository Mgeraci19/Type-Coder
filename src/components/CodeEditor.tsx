import { useRef, useEffect, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeEditorProps {
  solution: string;
  userInput: string;
  onInputChange: (value: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const CodeEditor = ({ solution, userInput, onInputChange, textareaRef }: CodeEditorProps) => {
  const [lineHeight, setLineHeight] = useState(20);
  const [charWidth, setCharWidth] = useState(8);

  useEffect(() => {
    if (textareaRef.current) {
      const computedStyle = window.getComputedStyle(textareaRef.current);
      setLineHeight(parseFloat(computedStyle.lineHeight));
      setCharWidth(parseFloat(computedStyle.fontSize) * 0.6);
    }
  }, [textareaRef]);

  const getPosition = (index: number) => {
    const lines = solution.slice(0, index).split('\n');
    const currentLine = lines.length - 1;
    const currentLineIndex = lines[currentLine].length;
    
    return {
      left: `${currentLineIndex * charWidth}px`,
      top: `${currentLine * lineHeight}px`,
    };
  };

  return (
    <div className="relative mb-12">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Solution Template</h3>
        <div className="relative min-h-[200px]">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-4">
            {solution.split('').map((char, index) => {
              const isTyped = index < userInput.length;
              const isCorrect = isTyped && userInput[index] === char;
              const position = getPosition(index);
              
              return (
                <span
                  key={index}
                  className="absolute font-mono"
                  style={{
                    ...position,
                    backgroundColor: isTyped ? (isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)') : 'transparent',
                    borderBottom: isTyped ? `2px solid ${isCorrect ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'}` : 'none',
                  }}
                >
                  {isTyped ? userInput[index] : char}
                </span>
              );
            })}
          </div>
          {/* <textarea
            ref={textareaRef}
            value={userInput}
            onChange={(e) => onInputChange(e.target.value)}
            className="absolute top-0 left-0 w-full h-full p-4 font-mono text-sm bg-transparent resize-none outline-none"
            style={{ 
              caretColor: 'transparent',
              fontSize: '14px',
              lineHeight: '1.5',
              padding: '1rem',
            }}

          /> */}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor; 