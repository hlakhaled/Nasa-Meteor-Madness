import { useState, Suspense } from "react";
import DeflectionPanel from "../components/DeflectionPanel";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MissionStats from "../components/MissionStats";
import ThreatPanel from "../components/ThreatPanel";
import MissionResultDialog from "../components/MissionResultDialog";
import MethodDisplay from "../components/MethodDisplay";
import { ASTEROID_TEMPLATES } from "../data/asteroidTemplates";
import { DEFLECTION_METHODS } from "../data/deflectionMethods";
import { getRandomMessage } from "../data/messages";
import Earth from "../components/EarthD";
import Starfield from "../components/Starfield";
import MissionAnimation from "../components/MissionAnimation";
import MissionDialog from "../components/MissionDialog";

const DefendEarth = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [missionSuccess, setMissionSuccess] = useState(false);
  const [missionPerfect, setMissionPerfect] = useState(false);
  const [missionMessage, setMissionMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalVictory, setFinalVictory] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(DEFLECTION_METHODS[0]);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationSuccess, setAnimationSuccess] = useState(false);
  const [dialogActive, setDialogActive] = useState(true);
  const [showDeflection, setShowDeflection] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showThreat, setShowThreat] = useState(false);

  const currentAsteroid = ASTEROID_TEMPLATES[level - 1];

  const handleHighlight = (panel) => {
    if (panel === "all") {
      setShowDeflection(true);
      setShowStats(true);
      setShowThreat(true);
    } else if (panel == "stats"){
      setShowStats(true);
    }
     else if (panel === "threat") {
      setShowThreat(true);
    } else if (panel === "deflection") {
      setShowDeflection(true);
    }
  };

  const handleDialogComplete = () => {
    setDialogActive(false);
    setShowDeflection(true);
    setShowStats(true);
    setShowThreat(true);
  };

  const handleLaunch = (method, power, angle) => {
    setSelectedMethod(method);
    
    const base = method.effectiveness[currentAsteroid.composition] || 0.6;
    const powerEff = power / 100;
    const angleOpt = 1 - Math.abs(angle - method.optimalAngle) / 30;
    const sizePenalty =
      currentAsteroid.mass !== null ? Math.min(currentAsteroid.mass / method.maxMass, 1) : 0.5;
    const speedPenalty = Math.min(currentAsteroid.speed / method.maxSpeed, 1);

    // Progressive difficulty - each level makes it harder
    const difficultyMultiplier = Math.max(0.5, 1 - (level - 1) * 0.06);

    let success =
      base * 0.35 +
      powerEff * 0.2 +
      angleOpt * 0.2 +
      (1 - sizePenalty) * 0.125 +
      (1 - speedPenalty) * 0.125;

    // Apply difficulty scaling
    success = success * difficultyMultiplier;

    // Add randomness (reduced range for more consistency)
    success += (Math.random() - 0.5) * 0.08;
    
    // Clamp between 0 and 1 without artificial boost
    success = Math.max(0, Math.min(success, 1));

    // New thresholds: Critical (<40%), Poor (40-60%), Good (60-80%), Perfect (>80%)
    const missionWasSuccessful = level >= 9? success >= 0.29 : success >= 0.39;
    const wasPerfect = success >= 0.8;
    
    // Start animation
    setAnimationSuccess(missionWasSuccessful);
    setShowAnimation(true);

    // Store mission results for later
    if (!missionWasSuccessful) {
      setMissionSuccess(false);
      setMissionPerfect(false);
      setPointsEarned(0);
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives === 0) {
        setIsGameOver(true);
        setMissionMessage(getRandomMessage("gameOver"));
      } else {
        setMissionMessage(getRandomMessage("fail"));
      }
    } else if(level < 10){

      if (wasPerfect) {
        setMissionSuccess(true);
        setMissionPerfect(true);
        const points = 250;
        setPointsEarned(points);
        setScore(score + points);
        setMissionMessage(getRandomMessage("perfect"));
      } else {
        setMissionSuccess(true);
        setMissionPerfect(false);
        const points = 100;
        setPointsEarned(points);
        setScore(score + points);
        setMissionMessage(getRandomMessage("success"));
      }
    }
    
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    
    if (missionSuccess && level === ASTEROID_TEMPLATES.length) {
      setFinalVictory(true);
      setMissionMessage(getRandomMessage("finalVictory"));
    }
    
    setDialogOpen(true);

    // Advance to next level if successful
    if (missionSuccess && level < ASTEROID_TEMPLATES.length) {
      if (level < 10) {
        setTimeout(() => setLevel(level + 1), 2000);
      } else {
        setFinalVictory(true);
        setDialogOpen(true);
        setMissionMessage(getRandomMessage("finalVictory"));
      }
}

  };

  const handleRestart = () => {
    setLevel(1);
    setScore(0);
    setLives(5);
    setIsGameOver(false);
    setDialogOpen(false);
  };

  // Calculate asteroid size based on mass
  const getAsteroidSize = () => {
    if (!currentAsteroid.mass) return 0.08;
    // Scale asteroid size based on mass (normalize between 0.05 and 0.2)
    const normalizedSize = 0.05 + (currentAsteroid.mass / 1000) * 0.15;
    return Math.min(normalizedSize, 0.2);
  };

  return (
    <div className="relative h-screen lg:overflow-hidden text-white flex flex-col md:flex-row">
      <main className="w-full px-5 mx-0">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] gap-6">
          {/* Left Panel - Deflection System */}
          <div
            className="
              order-2 lg:order-1
              lg:h-[calc(100vh-8rem)] 
              lg:overflow-y-auto
              scrollbar-purple
              p-1
            "
          >
            {showDeflection && (
              <DeflectionPanel asteroid={currentAsteroid} onLaunch={handleLaunch} level={level} />
            )}

          </div>

          {/* Center - Earth Display with Starfield */}
          <div className="order-1 lg:order-2 flex flex-col items-center justify-center gap-6">
            <div className="relative w-full h-[500px] lg:h-[calc(100vh-8rem)] rounded-lg overflow-hidden">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                  {/* Lighting */}
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <pointLight position={[-10, -10, -5]} intensity={0.5} />
                  
                  {/* Starfield Background */}
                  <Starfield count={5000} />
                  
                  {/* Earth Model */}
                  <Earth scale={1} />
                  
                  {/* Mission Animation */}
                  {showAnimation && (
                    <MissionAnimation
                      success={animationSuccess}
                      asteroidSize={getAsteroidSize()}
                      onComplete={handleAnimationComplete}
                    />
                  )}
                  
                  {/* Camera Controls */}
                  <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    scale={2}
                    minDistance={10}
                    maxDistance={10}
                    zoomSpeed={0.5}
                    rotateSpeed={0.5}
                    enabled={!showAnimation}
                  />
                </Suspense>
              </Canvas>
            </div>
          </div>

          {/* Right Panels - Stats and Threat */}
          <div className="order-3 space-y-6">
            {showStats && <MissionStats level={level} score={score} lives={lives} />}
            {showThreat && <ThreatPanel asteroid={currentAsteroid} />}
          </div>
        </div>
      </main>

      <MissionDialog onComplete={handleDialogComplete} onHighlight={handleHighlight} />


      <MissionResultDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        success={missionSuccess}
        perfect={missionPerfect}
        message={missionMessage}
        isGameOver={isGameOver}
        finalVictory= {finalVictory}
        onRestart={handleRestart}
        score={score}
        level={level}
        pointsEarned={pointsEarned}
      />
    </div>
  );
};

export default DefendEarth;