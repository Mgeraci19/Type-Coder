'use client';

import { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/Sidebar';
import CodeEditor from '@/components/CodeEditor';
import Keyboard from '@/components/Keyboard';

interface Challenge {
  title: string;
  description: string;
  solution: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const sampleChallenge: Challenge = {
  title: 'Two Sum',
  description: 'Given an array of integers nums and an integer target, return indices of the two numbers in nums such that they add up to target.',
  solution: `function twoSum(nums: number[], target: number): number[] {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    
    return [];
}`,
  difficulty: 'Easy'
};

export default function Home() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(sampleChallenge);
  const [userInput, setUserInput] = useState('');
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for Tab
      if (e.key === 'Tab') {
        e.preventDefault();
      }

      // Set the pressed key for visual feedback
      let keyToShow = e.key;
      
      // Handle special keys
      switch (e.key) {
        case 'Backspace':
          setUserInput(prev => prev.slice(0, -1));
          break;
        case 'Enter':
          setUserInput(prev => prev + '\n');
          break;
        case 'Tab':
          setUserInput(prev => prev + '    ');
          break;
        case 'Control':
          keyToShow = 'Ctrl';
          break;
        case ' ':
          setUserInput(prev => prev + ' ');
          break;
        default:
          // Handle regular characters including symbols
          if (e.key.length === 1) {
            setUserInput(prev => prev + e.key);
          }
      }

      setPressedKey(keyToShow);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white py-8 shadow-lg">
        <h1 className="text-5xl font-bold text-center tracking-tight">
          Type<span className="text-blue-400">Coder</span>
        </h1>
        <p className="text-gray-300 text-center mt-2 text-lg">
          Master your typing skills through coding challenges
        </p>
      </div>
      
      <div className="flex justify-center max-w-[1600px] mx-auto relative px-4 py-8">
        <div className="flex gap-6 w-full">
          <Sidebar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(prev => !prev)}
            title={currentChallenge.title}
            description={currentChallenge.description}
            difficulty={currentChallenge.difficulty}
          />

          {/* Main content area */}
          <main className="flex-grow flex flex-col gap-8 bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-center">
              <CodeEditor
                solution={currentChallenge.solution}
                userInput={userInput}
                onInputChange={setUserInput}
                textareaRef={textareaRef}
              />
            </div>
            
            <div className="border-t border-gray-700 pt-8">
              <Keyboard 
                pressedKey={pressedKey} 
                isCorrect={pressedKey ? userInput[userInput.length - 1] === currentChallenge.solution[userInput.length - 1] : false} 
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 