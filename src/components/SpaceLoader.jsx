import React, { useState, useEffect } from 'react';

const SpaceLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0f0f0f 100%)',
      zIndex: 1000,
    }}>
      {/* Animated stars background */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: '#fff',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${1 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Main loader container */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
      }}>
        {/* Rotating asteroid with orbit */}
        <div style={{
          position: 'relative',
          width: '120px',
          height: '120px',
        }}>
          {/* Orbit ring */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '140px',
            height: '140px',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            borderRadius: '50%',
            animation: 'pulse 2s ease-in-out infinite',
          }} />

          {/* Central asteroid */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #5E2AC4, #7C3AED)',
            borderRadius: '50%',
            boxShadow: '0 0 40px rgba(124, 58, 237, 0.6), inset -10px -10px 20px rgba(0,0,0,0.3)',
            animation: 'rotate 4s linear infinite',
          }}>
            {/* Crater effects */}
            <div style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '50%',
              top: '15px',
              left: '20px',
            }} />
            <div style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '50%',
              bottom: '18px',
              right: '15px',
            }} />
          </div>

          {/* Orbiting particles */}
          {[0, 120, 240].map((delay, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                animation: `orbit 3s linear infinite`,
                animationDelay: `${delay * 0.01}s`,
                transformOrigin: 'center',
              }}
            >
              <div style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                background: '#A78BFA',
                borderRadius: '50%',
                top: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 10px rgba(167, 139, 250, 0.8)',
              }} />
            </div>
          ))}
        </div>

        {/* Loading text and progress */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}>
          <h2 style={{
            color: '#A78BFA',
            fontSize: '24px',
            fontWeight: '700',
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.5px',
          }}>
            Loading Earth Model
          </h2>

          {/* Progress bar */}
          <div style={{
            width: '240px',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #5E2AC4, #7C3AED, #A78BFA)',
              borderRadius: '3px',
              transition: 'width 0.3s ease',
              boxShadow: '0 0 10px rgba(124, 58, 237, 0.5)',
            }} />
          </div>

          <p style={{
            color: '#888',
            fontSize: '14px',
            margin: 0,
            fontFamily: "'Inter', sans-serif",
          }}>
            {progress}% Complete
          </p>
        </div>
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default SpaceLoader;