import { useEffect, useState } from 'react';

interface KeyboardProps {
  pressedKey: string | null;
  isCorrect: boolean;
}

const Keyboard = ({ pressedKey, isCorrect }: KeyboardProps) => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [keyStates, setKeyStates] = useState<Map<string, 'correct' | 'incorrect' | null>>(new Map());

  useEffect(() => {
    if (pressedKey) {
      const key = pressedKey.toLowerCase();
      // Add the key to active keys
      setActiveKeys(prev => {
        const newSet = new Set(prev);
        newSet.add(key);
        return newSet;
      });

      // Set the key state (correct/incorrect)
      setKeyStates(prev => {
        const newMap = new Map(prev);
        newMap.set(key, isCorrect ? 'correct' : 'incorrect');
        return newMap;
      });

      // Remove the key after animation
      const timer = setTimeout(() => {
        setActiveKeys(prev => {
          const newSet = new Set(prev);
          newSet.delete(key);
          return newSet;
        });
        setKeyStates(prev => {
          const newMap = new Map(prev);
          newMap.delete(key);
          return newMap;
        });
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [pressedKey, isCorrect]);

  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    [' ']
  ];

  const getKeyStyle = (key: string) => {
    if (activeKeys.has(key)) {
      const state = keyStates.get(key);
      if (state === 'correct') {
        return 'bg-green-500 text-white';
      } else if (state === 'incorrect') {
        return 'bg-red-500 text-white';
      }
      return 'bg-primary text-white';
    }
    return 'bg-white text-gray-700 shadow-sm';
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 mb-1">
          {row.map((key, keyIndex) => (
            <div
              key={keyIndex}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-100 ${getKeyStyle(key)} ${
                key === ' ' ? 'w-32' : 'w-8'
              }`}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard; 