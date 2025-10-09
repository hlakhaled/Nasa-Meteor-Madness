const MissionResultDialog = ({
  open,
  onClose,
  success,
  perfect,
  message,
  isGameOver,
  finalVictory,
  onRestart,
  score = 0,
  level = 1,
  pointsEarned = 0,
}) => {

  const isFinalVictory = finalVictory;

  const getTitle = () => {
    if (isGameOver) return "GAME OVER!";
    if (isFinalVictory) return "FINAL VICTORY!";
    if (success) return "MISSION SUCCESS!";
    return "MISSION FAILED!";
  };

  const getTitleColor = () => {
    if (isGameOver) return "text-red-500";
    if (isFinalVictory) return "text-yellow-400";
    if (success) return "text-green-400";
    return "text-red-500";
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-black border-2 border-purple-500/50 rounded-2xl p-8 shadow-2xl shadow-purples-500/30 max-w-md w-full mx-4">
        {/* Title */}
        <h2 className={`inter-text text-xl font-bold text-center mb-4 ${getTitleColor()}`}>
          {getTitle()}
        </h2>

        {/* Message */}
        <p className="inter-text text-center text-sm text-gray-300 text-base mb-4 leading-relaxed">
          {message}
        </p>

        {/* Stats */}
        <div className="space-y-2 mb-6 text-center">
          {isGameOver ? (
            <>
              <div className="text-gray-300">
                <span className="inter-text text-sm text-gray-400">Final Score: </span>
                <span className="inter-text text-sm font-bold text-white">{score}</span>
              </div>
              <div className="text-gray-300">
                <span className="inter-text text-sm text-gray-400">Highest Level: </span>
                <span className="inter-text text-sm font-bold text-white">{level}</span>
              </div>
            </>
          ) : success ? (
            isFinalVictory ? (
              <>
                <div className="text-gray-300">
                  <span className="inter-text text-sm text-gray-400">Final Score: </span>
                  <span className="inter-text text-sm font-bold text-yellow-400">{score}</span>
                </div>
                <div className="text-gray-300">
                  <span className="inter-text text-sm text-gray-400">Completed Levels: </span>
                  <span className="inter-text text-sm font-bold text-white">{level}</span>
                </div>
              </>
            ) : (
              <>
                <div className="text-gray-300">
                  <span className="inter-text text-sm text-gray-400">Points Earned: </span>
                  <span className="inter-text text-sm font-bold text-purple-400">
                    +{pointsEarned}
                  </span>
                </div>
                <div className="text-gray-300">
                  <span className="inter-text text-sm text-gray-400">Next Level: </span>
                  <span className="inter-text text-sm font-bold text-white">{level + 1}</span>
                </div>
              </>
            )
          ) : null}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {isGameOver && onRestart ? (
            <button
              className="inter-text text-sm w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all duration-200 "
              onClick={onRestart}
            >
              Play Again
            </button>
          ) : isFinalVictory ? (
            <button
              className="inter-text text-sm w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-all duration-200"
              onClick={onRestart}
            >
              Play Again
            </button>
          ) : success ? (
            <>
              <button
                className="inter-text text-sm flex-1 py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all duration-200 "
                onClick={onClose}
              >
                Next Level
              </button>
              <button
                className="inter-text text-sm flex-1 py-3 px-6 bg-white hover:bg-gray-100 text-black font-semibold rounded-lg transition-all duration-200"
                onClick={onRestart}
              >
                Restart
              </button>
            </>
          ) : (
            <button
              className="inter-text text-sm w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all duration-200 "
              onClick={onClose}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionResultDialog;