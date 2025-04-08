import { useEffect, useRef } from 'react';

interface KeyboardProps {
  pressedKey: string | null;
  isCorrect: boolean;
}

export default function Keyboard({ pressedKey, isCorrect }: KeyboardProps) {
  const keyRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (pressedKey) {
      // Handle special keys mapping
      const keyMap: { [key: string]: string } = {
        'Tab': 'Tab',
        'Backspace': 'Backspace',
        'Enter': 'Enter',
        'Control': 'Ctrl',
        ' ': ' '
      };

      // Use the mapped key or convert to lowercase
      const key = keyMap[pressedKey] || pressedKey.toLowerCase();
      const keyElement = keyRefs.current.get(key);
      
      if (keyElement) {
        // Remove any existing animation classes
        keyElement.classList.remove('animate-keypress-correct', 'animate-keypress-incorrect');
        
        // Force a reflow to ensure the animation restarts
        void keyElement.offsetWidth;
        
        // Add the appropriate animation class
        keyElement.classList.add(
          isCorrect ? 'animate-keypress-correct' : 'animate-keypress-incorrect'
        );
      }
    }
  }, [pressedKey, isCorrect]);

  const rows = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
    ['Ctrl', 'Alt', ' ', 'Alt', 'Ctrl']
  ];

  const getKeyWidth = (key: string) => {
    switch (key) {
      case 'Tab':
      case '\\':
      case 'Caps':
      case 'Enter':
      case 'Shift':
        return 'w-16';
      case 'Backspace':
        return 'w-24';
      case ' ':
        return 'w-64';
      case 'Ctrl':
      case 'Alt':
        return 'w-12';
      default:
        return 'w-8';
    }
  };

  const getKeyDisplay = (key: string) => {
    switch (key) {
      case ' ':
        return 'Space';
      case '\\':
        return '\\';
      case 'Backspace':
        return '⌫';
      case 'Enter':
        return '⏎';
      default:
        return key;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex flex-col gap-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {row.map((key) => {
              const isPressed = pressedKey?.toLowerCase() === key.toLowerCase();
              const isSpecialKey = ['Tab', 'Caps', 'Shift', 'Ctrl', 'Alt', 'Backspace', 'Enter'].includes(key);
              
              return (
                <div
                  key={key}
                  ref={(el) => {
                    if (el) keyRefs.current.set(key, el);
                    else keyRefs.current.delete(key);
                  }}
                  className={`${getKeyWidth(key)} h-12 flex items-center justify-center rounded
                    ${isSpecialKey ? 'bg-gray-700' : 'bg-gray-600'}
                    ${isPressed ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : ''}
                    text-gray-200 font-mono text-sm
                    transition-colors duration-100`}
                >
                  {getKeyDisplay(key)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
} 