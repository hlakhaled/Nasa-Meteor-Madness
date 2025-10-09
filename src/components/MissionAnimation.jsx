import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MissionAnimation = ({ success, asteroidSize = 0.08, onComplete }) => {
  const asteroidRef = useRef();
  const trailRef = useRef();
  const deflectionRef = useRef();
  const explosionRef = useRef();
  const impactRef = useRef();
  const debrisRefs = useRef([]);
  
  const [phase, setPhase] = useState("asteroidFalling");
  const [progress, setProgress] = useState(0);

  // Fixed target position on Earth surface (front-facing)
  const targetPosition = useRef(
    new THREE.Vector3(0, 0.3, 1.13)
  ).current;

  // Start position (far away in space, coming from above)
  const startPosition = useRef(
    new THREE.Vector3(0, 8, 5)
  ).current;

  // Deflection start position (from Earth surface, slightly behind target)
  const deflectionStart = useRef(
    new THREE.Vector3(0, -0.3, 1.25)
  ).current;

  useFrame((state, delta) => {
    // Phase 1: Asteroid falling toward Earth
    if (phase === "asteroidFalling") {
      const newProgress = Math.min(progress + delta * 0.3, 1);
      setProgress(newProgress);

      if (asteroidRef.current) {
        // Interpolate asteroid position
        asteroidRef.current.position.lerpVectors(
          startPosition,
          targetPosition,
          newProgress
        );

        // Rotation for realism
        asteroidRef.current.rotation.x += delta * 4;
        asteroidRef.current.rotation.y += delta * 2.5;

        // Scale effect as it approaches
        const scale = 0.6 + newProgress * 0.4;
        asteroidRef.current.scale.setScalar(scale);
      }

      // Update trail
      if (trailRef.current && asteroidRef.current) {
        trailRef.current.position.copy(asteroidRef.current.position);
        trailRef.current.material.opacity = 0.5 * (1 - newProgress * 0.2);
      }

      // Launch deflection when asteroid is about 50% of the way
      if (newProgress >= 0.5 && !deflectionRef.current?.userData.launched) {
        if (deflectionRef.current) {
          deflectionRef.current.userData.launched = true;
        }
        setPhase("deflectionLaunched");
        setProgress(0);
      }
    }

    // Phase 2: Deflection projectile launched
    else if (phase === "deflectionLaunched") {
      const newProgress = Math.min(progress + delta * 1.2, 1);
      setProgress(newProgress);

      // Continue asteroid movement (slower during deflection)
      const asteroidProgress = Math.min(0.4 + newProgress * 0.3, 1);
      if (asteroidRef.current) {
        asteroidRef.current.position.lerpVectors(
          startPosition,
          targetPosition,
          asteroidProgress
        );
        asteroidRef.current.rotation.x += delta * 4;
        asteroidRef.current.rotation.y += delta * 2.5;
      }

      if (trailRef.current && asteroidRef.current) {
        trailRef.current.position.copy(asteroidRef.current.position);
      }

      // Move deflection projectile
      if (deflectionRef.current) {
        if (success) {
          // Success: Intercept the asteroid in space (farther from Earth)
          const interceptPoint = asteroidRef.current.position.clone();
          deflectionRef.current.position.lerpVectors(
            deflectionStart,
            interceptPoint,
            newProgress
          );
        } else {
          // Failure: Miss the asteroid completely
          const missDirection = new THREE.Vector3(2, 3, 2);
          deflectionRef.current.position.lerpVectors(
            deflectionStart,
            missDirection,
            newProgress
          );
        }

        // Keep projectile bright
        deflectionRef.current.material.opacity = 1;
      }

      // Check if deflection reaches target
      if (newProgress >= 0.95) {
        if (success) {
          setPhase("deflectionHit");
          setProgress(0);
        } else {
          setPhase("asteroidImpact");
          setProgress(0);
        }
      }
    }

    // Phase 3a: Deflection hits asteroid (success)
    else if (phase === "deflectionHit") {
      const newProgress = Math.min(progress + delta * 2, 1);
      setProgress(newProgress);

      // Explosion at asteroid
      if (explosionRef.current && asteroidRef.current) {
        explosionRef.current.position.copy(asteroidRef.current.position);
        const explosionScale = newProgress * 0.5;
        explosionRef.current.scale.setScalar(explosionScale);
        explosionRef.current.material.opacity = 1 - newProgress;
      }

      // Hide asteroid and deflection
      if (asteroidRef.current) asteroidRef.current.visible = false;
      if (trailRef.current) trailRef.current.visible = false;
      if (deflectionRef.current) deflectionRef.current.visible = false;

      // Create debris
      if (newProgress < 0.3) {
        debrisRefs.current.forEach((debris, i) => {
          if (debris) {
            const angle = (i / 12) * Math.PI * 2;
            const radius = newProgress * 2;
            debris.position.set(
              asteroidRef.current.position.x + Math.cos(angle) * radius,
              asteroidRef.current.position.y + Math.sin(angle) * radius,
              asteroidRef.current.position.z + Math.sin(angle * 2) * radius
            );
            debris.rotation.x += delta * 10;
            debris.rotation.y += delta * 8;
          }
        });
      } else {
        // Fade out debris
        debrisRefs.current.forEach(debris => {
          if (debris) debris.visible = false;
        });
      }

      if (newProgress >= 1) {
        setPhase("complete");
        setTimeout(() => onComplete(), 500);
      }
    }

    // Phase 3b: Asteroid impacts Earth (failure)
    else if (phase === "asteroidImpact") {
      const newProgress = Math.min(progress + delta * 2.5, 1);
      setProgress(newProgress);

      // Impact explosion
      if (impactRef.current) {
        impactRef.current.position.copy(targetPosition);
        const impactScale = newProgress * 0.6;
        impactRef.current.scale.setScalar(impactScale);
        impactRef.current.material.opacity = 1 - newProgress * 0.7;
      }

      // Hide asteroid
      if (asteroidRef.current) asteroidRef.current.visible = false;
      if (trailRef.current) trailRef.current.visible = false;

      if (newProgress >= 1) {
        setPhase("complete");
        setTimeout(() => onComplete(), 500);
      }
    }
  });

  return (
    <group>
      {/* Asteroid */}
      <mesh ref={asteroidRef} position={startPosition}>
        <dodecahedronGeometry args={[asteroidSize, 1]} />
        <meshStandardMaterial
          color="#8B4513"
          roughness={0.9}
          metalness={0.1}
          emissive="#ff4500"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Asteroid trail */}
      <mesh ref={trailRef} position={startPosition}>
        <sphereGeometry args={[asteroidSize * 1.5, 16, 16]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Purple deflection projectile - larger and more visible */}
      <mesh 
        ref={deflectionRef} 
        position={deflectionStart}
        userData={{ launched: false }}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
        />
        {/* Stronger glow effect */}
        <pointLight color="#a855f7" intensity={4} distance={1} />
      </mesh>
      
      {/* Projectile trail */}
      {phase === "deflectionLaunched" && deflectionRef.current && (
        <mesh position={deflectionRef.current.position}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Success explosion (bright purple) */}
      <mesh ref={explosionRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Debris particles (success) */}
      {[...Array(12)].map((_, i) => (
        <mesh
          key={i}
          ref={el => debrisRefs.current[i] = el}
          visible={false}
        >
          <boxGeometry args={[asteroidSize * 0.2, asteroidSize * 0.2, asteroidSize * 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      ))}

      {/* Failure impact explosion (large red/orange) */}
      <mesh ref={impactRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial
          color="#ff3300"
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Explosion flash light - stronger */}
      {(phase === "deflectionHit" || phase === "asteroidImpact") && progress < 0.4 && (
        <pointLight
          position={phase === "deflectionHit" ? explosionRef.current?.position : targetPosition}
          intensity={15}
          distance={5}
          color={phase === "deflectionHit" ? "#a855f7" : "#ff6600"}
        />
      )}
    </group>
  );
};

export default MissionAnimation;