interface StatsDisplayProps {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
}

const StatsDisplay = ({ wpm, cpm, accuracy, errors }: StatsDisplayProps) => {
  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-primary">{wpm}</div>
        <div className="text-sm text-gray-600">WPM</div>
      </div>
      <div className="bg-white rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-primary">{cpm}</div>
        <div className="text-sm text-gray-600">CPM</div>
      </div>
      <div className="bg-white rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-primary">{accuracy}%</div>
        <div className="text-sm text-gray-600">Accuracy</div>
      </div>
      <div className="bg-white rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-primary">{errors}</div>
        <div className="text-sm text-gray-600">Errors</div>
      </div>
    </div>
  );
};

export default StatsDisplay; 