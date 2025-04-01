import { useState, useEffect } from 'react';

interface TypingStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
}

export const useTypingStats = (solution: string) => {
  const [isTyping, setIsTyping] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    cpm: 0,
    accuracy: 100,
    errors: 0
  });

  const calculateStats = (input: string) => {
    const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
    const words = input.trim().split(/\s+/).length;
    const characters = input.length;
    
    setStats({
      wpm: Math.round(words / timeElapsed),
      cpm: Math.round(characters / timeElapsed),
      accuracy: calculateAccuracy(input),
      errors: countErrors(input)
    });
  };

  const calculateAccuracy = (input: string): number => {
    const correct = input.split('').filter((char, i) => char === solution[i]).length;
    return Math.round((correct / input.length) * 100) || 100;
  };

  const countErrors = (input: string): number => {
    return input.split('').filter((char, i) => char !== solution[i]).length;
  };

  const handleInputChange = (input: string) => {
    if (!isTyping) {
      setIsTyping(true);
      setStartTime(Date.now());
    }
    calculateStats(input);
  };

  return {
    stats,
    handleInputChange
  };
}; 