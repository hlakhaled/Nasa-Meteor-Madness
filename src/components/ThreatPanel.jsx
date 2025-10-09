import { AlertTriangle, Info } from "lucide-react";

const ThreatPanel = ({ asteroid }) => {
  const getThreatColor = () => {
    if (asteroid.threatLevel.includes("MINOR")) return "text-green-400";
    if (asteroid.threatLevel.includes("MODERATE")) return "text-yellow-400";
    if (asteroid.threatLevel.includes("SIGNIFICANT")) return "text-orange-400";
    if (asteroid.threatLevel.includes("SEVERE")) return "text-red-500";
    return "text-red-500";
  };

  const getThreatBgColor = () => {
    if (asteroid.threatLevel.includes("MINOR")) return "bg-green-500/10 border-green-500/30";
    if (asteroid.threatLevel.includes("MODERATE")) return "bg-yellow-500/10 border-yellow-500/30";
    if (asteroid.threatLevel.includes("SIGNIFICANT")) return "bg-orange-500/10 border-orange-500/30";
    if (asteroid.threatLevel.includes("SEVERE")) return "bg-red-500/10 border-red-500/30";
    return "bg-red-500/10 border-red-500/30";
  };

  return (
    <div className="bg-black border-2 border-purple-500/40 rounded-md p-6 shadow-md shadow-purple-500/20">
      {/* Header with Alert Icon */}
      <div className="flex items-center gap-3 mb-5">
        <AlertTriangle className="h-5 w-5 text-destructive text-red-500" />
        <h2 className="inter-text text-md font-bold text-red-500">Incoming Threat:</h2>
      </div>

      {/* Asteroid Name */}
      <h3 className="inter-text text-xl font-bold text-white mb-2">{asteroid.name}</h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="inter-text text-gray-400 text-xs">Size:</span>
          <p className="inter-text text-white font-semibold text-sm">{asteroid.size}</p>
        </div>
        <div>
          <span className="inter-text text-gray-400 text-xs">Speed:</span>
          <p className="inter-text text-white font-semibold text-sm">{asteroid.speed} km/s</p>
        </div>
        <div>
          <span className="inter-text text-gray-400 text-xs">Distance:</span>
          <p className="inter-text text-white font-semibold text-sm">{asteroid.distance}k</p>
        </div>
        <div>
          <span className="inter-text text-gray-400 text-xs">Mass:</span>
          <p className="inter-text text-white font-semibold text-sm">
            {asteroid.mass !== null ? `${asteroid.mass}M tons` : "Unknown"}
          </p>
        </div>
      </div>

      {/* Threat Badge */}
      <div className={`inter-text inline-block px-4 py-1.5 rounded-md text-xs font-bold mb-5 border ${getThreatBgColor()} ${getThreatColor()}`}>
        {asteroid.threatLevel}
      </div>

      {/* Trajectory and Diameter */}
      <div className="space-y-3 mb-5">
        <div className="flex justify-between items-center">
          <span className="inter-text text-gray-400 text-sm">Trajectory:</span>
          <span className="inter-text text-white font-medium text-sm">{asteroid.trajectory}</span>
        </div>
        <div className="flex justify-between items-center">
        
            <span className="inter-text text-gray-400 text-sm">Diameter:</span>
          
          <span className="inter-text text-white font-medium text-sm">
            {asteroid.diameter !== null ? `~${asteroid.diameter}m` : "Unknown"}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="inter-text text-xs text-gray-400 italic leading-relaxed">
        "{asteroid.description}"
      </p>
    </div>
  );
};

export default ThreatPanel;