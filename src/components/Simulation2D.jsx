import React, { useEffect, useRef, useState } from "react";

export const Simulation2D = ({
  asteroid,
  deflectionAngle,
  deflectionPower,
  effectiveness,
  onProgress,
}) => {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationProgress = 0;
    let animationId;

    const earthX = canvas.width / 2;
    const earthY = canvas.height / 2;
    const earthRadius = 60;

    const startX = canvas.width - 100;
    const startY = 100;

    const asteroidSize = {
      small: 8,
      medium: 15,
      large: 25,
      massive: 40,
    }[asteroid.size];

    const deflection = (effectiveness * deflectionAngle * deflectionPower) / 100;

    const animate = () => {
      animationProgress += 0.008;

      if (animationProgress >= 1) {
        animationProgress = 1;
        onProgress(1);
      } else {
        onProgress(animationProgress);
      }

      setProgress(animationProgress);

      // Clear canvas
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      for (let i = 0; i < 80; i++) {
        const x = (i * 137.5) % canvas.width;
        const y = (i * 234.7) % canvas.height;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.4})`;
        ctx.fillRect(x, y, 2, 2);
      }

      // Draw Earth
      const earthGradient = ctx.createRadialGradient(
        earthX - 15,
        earthY - 15,
        0,
        earthX,
        earthY,
        earthRadius
      );
      earthGradient.addColorStop(0, "#6bb6ff");
      earthGradient.addColorStop(0.5, "#2e7dd6");
      earthGradient.addColorStop(1, "#0a3d7a");
      ctx.fillStyle = earthGradient;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
      ctx.fill();

      // Earth glow
      ctx.strokeStyle = "rgba(74, 158, 255, 0.4)";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthRadius + 10, 0, Math.PI * 2);
      ctx.stroke();

      // Safe zone
      ctx.strokeStyle = "rgba(100, 200, 100, 0.3)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthRadius + 80, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Asteroid position with deflection
      const targetX = earthX - deflection * 3;
      const targetY = earthY - deflection * 2;

      const asteroidX = startX + (targetX - startX) * animationProgress;
      const asteroidY = startY + (targetY - startY) * animationProgress;

      // Trajectory line
      ctx.strokeStyle = "rgba(255, 100, 100, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();

      // Deflection beam
      if (animationProgress > 0.2 && animationProgress < 0.8) {
        const beamGradient = ctx.createLinearGradient(earthX, earthY, asteroidX, asteroidY);
        beamGradient.addColorStop(0, "rgba(168, 85, 247, 0.8)");
        beamGradient.addColorStop(1, "rgba(168, 85, 247, 0)");
        ctx.strokeStyle = beamGradient;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(earthX, earthY);
        ctx.lineTo(asteroidX, asteroidY);
        ctx.stroke();

        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Particles
        for (let i = 0; i < 5; i++) {
          const particleProgress = (animationProgress * 5 - i * 0.1) % 1;
          if (particleProgress > 0 && particleProgress < 1) {
            const px = earthX + (asteroidX - earthX) * particleProgress;
            const py = earthY + (asteroidY - earthY) * particleProgress;
            ctx.fillStyle = `rgba(168, 85, 247, ${1 - particleProgress})`;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Asteroid
      const asteroidGradient = ctx.createRadialGradient(
        asteroidX - asteroidSize * 0.3,
        asteroidY - asteroidSize * 0.3,
        0,
        asteroidX,
        asteroidY,
        asteroidSize
      );
      asteroidGradient.addColorStop(0, "#8b6f47");
      asteroidGradient.addColorStop(0.6, "#5c4a3a");
      asteroidGradient.addColorStop(1, "#2a1f1a");
      ctx.fillStyle = asteroidGradient;
      ctx.beginPath();
      ctx.arc(asteroidX, asteroidY, asteroidSize, 0, Math.PI * 2);
      ctx.fill();

      // Asteroid glow
      if (animationProgress > 0.5) {
        const glowIntensity = (animationProgress - 0.5) * 2;
        ctx.strokeStyle = `rgba(255, 100, 100, ${glowIntensity * 0.6})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(asteroidX, asteroidY, asteroidSize + 5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Speed vector
      const vectorLength = asteroid.speed * 3;
      ctx.strokeStyle = "rgba(255, 200, 100, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(asteroidX, asteroidY);
      ctx.lineTo(
        asteroidX + ((targetX - asteroidX) / 50) * vectorLength,
        asteroidY + ((targetY - asteroidY) / 50) * vectorLength
      );
      ctx.stroke();

      // Distance line
      const distance = Math.sqrt((asteroidX - earthX) ** 2 + (asteroidY - earthY) ** 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(asteroidX, asteroidY);
      ctx.lineTo(earthX, earthY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Distance text
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = "12px monospace";
      const midX = (asteroidX + earthX) / 2;
      const midY = (asteroidY + earthY) / 2;
      ctx.fillText(`${Math.round(distance)} px`, midX + 10, midY);

      if (animationProgress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [asteroid, deflectionAngle, deflectionPower, effectiveness, onProgress]);

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "radial-gradient(ellipse at center, #0a0a1a 0%, #000 100%)" }}
      />

      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 right-4 text-white text-xs bg-black/50 backdrop-blur p-3 rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-gray-400">Progress</div>
            <div className="text-purple-300 font-bold">{(progress * 100).toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-gray-400">Deflection</div>
            <div className="text-blue-300 font-bold">{deflectionAngle.toFixed(1)}°</div>
          </div>
          <div>
            <div className="text-gray-400">Power</div>
            <div className="text-green-300 font-bold">{deflectionPower}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
