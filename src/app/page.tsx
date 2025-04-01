'use client';

import { useState, useEffect, useRef } from 'react';
import ChallengeCard from '@/components/ChallengeCard';
import CodeEditor from '@/components/CodeEditor';
import Keyboard from '@/components/Keyboard';
import StatsDisplay from '@/components/StatsDisplay';
import { useTypingStats } from '@/hooks/useTypingStats';

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
  const { stats, handleInputChange } = useTypingStats(currentChallenge.solution);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle special keys
      if (e.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1));
        return;
      }
      if (e.key === 'Enter') {
        setUserInput(prev => prev + '\n');
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        setUserInput(prev => prev + '    ');
        return;
      }

      // Handle regular characters
      if (e.key.length === 1) {
        setPressedKey(e.key);
        setUserInput(prev => prev + e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update stats when userInput changes
  useEffect(() => {
    handleInputChange(userInput);
  }, [userInput, handleInputChange]);

  // Focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-center">TypeCoder</h1>
      
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <ChallengeCard
            title={currentChallenge.title}
            description={currentChallenge.description}
            difficulty={currentChallenge.difficulty}
          />
        </div>

        <div className="flex flex-col gap-4">
          <CodeEditor
            solution={currentChallenge.solution}
            userInput={userInput}
            onInputChange={setUserInput}
            textareaRef={textareaRef}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Keyboard 
            pressedKey={pressedKey} 
            isCorrect={pressedKey ? userInput[userInput.length - 1] === currentChallenge.solution[userInput.length - 1] : false} 
          />
        </div>

        <div className="flex flex-col gap-4">
          <StatsDisplay {...stats} />
        </div>
      </div>
    </div>
  );
} 