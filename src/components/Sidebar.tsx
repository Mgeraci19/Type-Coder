import { ReactNode } from 'react';
import ChallengeCard from './ChallengeCard';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export default function Sidebar({ isOpen, onToggle, title, description, difficulty }: SidebarProps) {
  return (
    <div className="relative">
      {/* Toggle button - always visible */}
      <button
        onClick={onToggle}
        className={`absolute -left-4 top-4 z-10 h-8 w-8 flex items-center justify-center
          bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all duration-300
          rounded-full shadow-md hover:shadow-lg`}
        aria-label={isOpen ? 'Hide problem description' : 'Show problem description'}
      >
        <div className="text-lg">
          {isOpen ? '×' : '☰'}
        </div>
      </button>

      <aside 
        className={`${
          isOpen ? 'w-[400px] visible' : 'w-0 invisible'
        } flex-shrink-0 overflow-hidden bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out flex items-center justify-center`}
      >
        <div className="w-full flex justify-center">
          <ChallengeCard
            title={title}
            description={description}
            difficulty={difficulty}
          />
        </div>
      </aside>
    </div>
  );
} 