import { Award } from "lucide-react";

const MissionStats = ({ level, score, lives }) => {
  return (
    <div className="bg-black border-2 border-purple-500/50 rounded-md p-6 shadow-md shadow-purple-500/20">
      {/* Header with Trophy Icon */}
      <div className="flex items-center gap-3 mb-4">
        <Award className="h-5 w-5 text-warning text-yellow-500" />
        <h2 className="inter-text text-md font-bold text-white">Mission Stats</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="inter-text text-xl font-bold text-purple-400 mb-2">{level}</div>
          <div className="inter-text text-sm text-gray-400">Level</div>
        </div>
        <div>
          <div className="inter-text text-xl font-bold text-green-400 mb-2">{score}</div>
          <div className="inter-text text-sm text-gray-400">Score</div>
        </div>
        <div>
          <div className="inter-text text-xl font-bold text-blue-400 mb-2">{lives}</div>
          <div className="inter-text text-sm text-gray-400">Lives</div>
        </div>
      </div>
    </div>
  );
};

export default MissionStats;