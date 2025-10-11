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
    <div className="bg-black border-2 border-purple-500/40 rounded-md p-3 md:p-4 lg:p-6 shadow-md shadow-purple-500/20">
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 lg:mb-5">
        <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-destructive text-red-500" />
        <h2 className="inter-text text-sm md:text-base font-bold text-red-500">Incoming Threat:</h2>
      </div>

      <h3 className="inter-text text-lg md:text-xl font-bold text-white mb-2">{asteroid.name}</h3>

      <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4">
        <div>
          <span className="inter-text text-gray-400 text-[10px] md:text-xs">Size:</span>
          <p className="inter-text text-white font-semibold text-xs md:text-sm">{asteroid.size}</p>
        </div>
        <div>
          <span className="inter-text text-gray-400 text-[10px] md:text-xs">Speed:</span>
          <p className="inter-text text-white font-semibold text-xs md:text-sm">{asteroid.speed} km/s</p>
        </div>
        <div>
          <span className="inter-text text-gray-400 text-[10px] md:text-xs">Distance:</span>
          <p className="inter-text text-white font-semibold text-xs md:text-sm">{asteroid.distance}k</p>
        </div>
        <div>
          <span className="inter-text text-gray-400 text-[10px] md:text-xs">Mass:</span>
          <p className="inter-text text-white font-semibold text-xs md:text-sm">
            {asteroid.mass !== null ? `${asteroid.mass}M tons` : "Unknown"}
          </p>
        </div>
      </div>

      <div className={`inter-text inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-md text-[10px] md:text-xs font-bold mb-3 md:mb-4 lg:mb-5 border ${getThreatBgColor()} ${getThreatColor()}`}>
        {asteroid.threatLevel}
      </div>

      <div className="space-y-2 md:space-y-3 mb-3 md:mb-4 lg:mb-5">
        <div className="flex justify-between items-center">
          <span className="inter-text text-gray-400 text-xs md:text-sm">Trajectory:</span>
          <span className="inter-text text-white font-medium text-xs md:text-sm">{asteroid.trajectory}</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="inter-text text-gray-400 text-xs md:text-sm">Diameter:</span>
          <span className="inter-text text-white font-medium text-xs md:text-sm">
            {asteroid.diameter !== null ? `~${asteroid.diameter}m` : "Unknown"}
          </span>
        </div>
      </div>

      <p className="inter-text text-[10px] md:text-xs text-gray-400 italic leading-relaxed">
        "{asteroid.description}"
      </p>
    </div>
  );
};

export default ThreatPanel;
