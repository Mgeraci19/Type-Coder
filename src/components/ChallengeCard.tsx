interface ChallengeCardProps {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const ChallengeCard = ({ title, description, difficulty }: ChallengeCardProps) => {
  return (
    <div className="w-[300px] bg-gray-800 text-white rounded-lg shadow-lg p-6 transition-all duration-300">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <div className="mb-6">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
          difficulty === 'Easy' ? 'bg-green-500 text-white' :
          difficulty === 'Medium' ? 'bg-yellow-500 text-white' :
          'bg-red-500 text-white'
        }`}>
          {difficulty}
        </span>
      </div>
      <div className="prose prose-invert prose-sm max-w-none">
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ChallengeCard; 