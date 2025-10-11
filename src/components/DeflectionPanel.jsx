import { useState } from "react";
import { DEFLECTION_METHODS } from "../data/deflectionMethods";
import { Rocket } from "lucide-react";

const DeflectionPanel = ({ asteroid, onLaunch, level }) => {
  const [selectedMethod, setSelectedMethod] = useState(DEFLECTION_METHODS[0]);
  const [power, setPower] = useState(50);
  const [angle, setAngle] = useState(15);

  const calculateSuccess = () => {
    const base = selectedMethod.effectiveness[asteroid.composition] || 0.6;
    const powerEff = power / 100;
    const angleOpt = 1 - Math.abs(angle - selectedMethod.optimalAngle) / 30;
    const sizePenalty = asteroid.mass !== null ? Math.min(asteroid.mass / selectedMethod.maxMass, 1) : 0.5;
    const speedPenalty = Math.min(asteroid.speed / selectedMethod.maxSpeed, 1);

    const difficultyMultiplier = Math.max(0.5, 1 - (level - 1) * 0.06);

    let success =
      base * 0.35 +
      powerEff * 0.2 +
      angleOpt * 0.2 +
      (1 - sizePenalty) * 0.125 +
      (1 - speedPenalty) * 0.125;

    success = success * difficultyMultiplier;
    success = Math.max(0, Math.min(success, 1));
    return success;
  };

  const successProb = calculateSuccess();
  const successPercent = Math.round(successProb * 100);

  const getRating = () => {
    if (successPercent >= 80) return { text: "PERFECT", color: "text-green-400" };
    if (successPercent >= 60) return { text: "GOOD", color: "text-blue-400" };
    if (successPercent >= 40) return { text: "POOR", color: "text-yellow-400" };
    return { text: "CRITICAL", color: "text-red-400" };
  };
  
  const rating = getRating();

  return (
    <div>
      <div className="bg-black border-2 border-purple-500/40 rounded-md p-3 md:p-4 lg:p-5 shadow-md shadow-purple-500/20 space-y-4 md:space-y-5 lg:space-y-6">
        <h2 className="inter-text text-sm md:text-base font-bold text-white">Deflection System</h2>

        <div>
          <h3 className="inter-text text-xs md:text-sm font-semibold text-gray-400 mb-2 md:mb-3">Deflection Method</h3>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {DEFLECTION_METHODS.map((method) => {
              const IconComponent = method.icon;
              const isSelected = selectedMethod.id === method.id;
              return (
                <button
                  key={method.id}
                  className={`py-2 px-2 md:py-3 md:px-3 rounded-lg font-semibold transition-all duration-200 flex flex-col items-center justify-center gap-1 md:gap-2 ${
                    isSelected
                      ? "bg-purple-600 border-purple-500/50 border-2 text-white"
                      : "bg-black text-black border-purple-500/50 border-2 hover:bg-purple-500/50 "
                  }`}
                  onClick={() => setSelectedMethod(method)}
                >
                  <IconComponent className="h-3 w-3 md:h-4 md:w-4 text-white" />
                  <span className="inter-text text-[10px] md:text-xs text-white text-center leading-tight">{method.name}</span>
                </button>
              );
            })}
          </div >
            <div className="bg-gray-900/50 p-2 md:p-3 rounded text-xs space-y-1 md:space-y-2 mt-2 md:mt-4">
              <p className="inter-text text-[10px] md:text-xs text-yellow-400 ">
                Effectiveness vs {asteroid.composition}:{" "}
                {Math.round((selectedMethod.effectiveness[asteroid.composition] || 0.6) * 100)}%
              </p>
              <p className="inter-text text-[10px] md:text-xs text-gray-400 mt-2 md:mt-3 ">
                {selectedMethod.description}
              </p>
            </div>
        </div>

        <div>
          <div className="flex justify-between mb-2 md:mb-3">
            <span className="inter-text text-xs md:text-sm font-semibold text-gray-400">Power Output</span>
            <span className="inter-text text-xs md:text-sm font-semibold text-white">{power}%</span>
          </div>
          <div className="relative w-full h-2 bg-gray-700 rounded-full">
            <div 
              className="absolute h-full bg-purple-500 rounded-full transition-all duration-200"
              style={{ width: `${power}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={power}
              onChange={(e) => setPower(Number(e.target.value))}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50 cursor-pointer transition-all duration-200 pointer-events-none"
              style={{ left: `calc(${power}% - 8px)` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2 md:mb-3">
            <span className="inter-text text-xs md:text-sm font-semibold text-gray-400">Deflection Angle</span>
            <span className="inter-text text-xs md:text-sm font-semibold text-white">{angle}°</span>
          </div>
          <div className="relative w-full h-2 bg-gray-700 rounded-full">
            <div 
              className="absolute h-full bg-purple-500 rounded-full transition-all duration-200"
              style={{ width: `${(angle / 30) * 100}%` }}
            />
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50 cursor-pointer transition-all duration-200 pointer-events-none"
              style={{ left: `calc(${(angle / 30) * 100}% - 8px)` }}
            />
          </div>
        </div>

        <div className="bg-gray-900/50 p-2 md:p-3 rounded space-y-1 md:space-y-2">
          <h3 className="inter-text text-xs md:text-sm font-semibold text-white">Mission Analysis</h3>
          <div className="flex justify-between items-center">
            <span className="inter-text text-[10px] md:text-xs text-gray-400">Success Probability:</span>
            <span className="inter-text text-sm md:text-base font-semibold text-yellow-400">{successPercent}%</span>
          </div>
          <div className={`inter-text text-xs md:text-sm font-semibold ${rating.color}`}>{rating.text}</div>
          <div className="space-y-1 text-[10px] md:text-xs text-gray-400">
            <div className="inter-text">• Power efficiency: {Math.round((power / 100) * 100)}%</div>
            <div className="inter-text">• Angle optimization: {Math.round((1 - Math.abs(angle - selectedMethod.optimalAngle) / 30) * 100)}%</div>
            <div className="inter-text">
              • Size challenge:{" "}
              {asteroid.mass !== null
                ? Math.round((1 - Math.min(asteroid.mass / selectedMethod.maxMass, 1)) * 100)
                : 50}
              %
            </div>
            <div className="inter-text">• Speed factor: {Math.round((1 - Math.min(asteroid.speed / selectedMethod.maxSpeed, 1)) * 100)}%</div>
          </div>
        </div>
      </div>

      <button
        className="inter-text w-full h-12 md:h-14 text-sm md:text-base font-bold bg-red-600 hover:bg-red-700 text-white rounded-md transition-all duration-200 shadow-lg shadow-red-500/50 hover:shadow-red-500/70 flex items-center justify-center gap-2 mt-3 md:mt-4"
        onClick={() => onLaunch(selectedMethod, power, angle)}
      >
         <Rocket className="h-4 w-4 md:h-5 md:w-5 text-warning" />
        LAUNCH MISSION
      </button>
    </div>
  );
};

export default DeflectionPanel;
