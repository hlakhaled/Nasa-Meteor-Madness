export const ASTEROID_TEMPLATES = [
  // --- Levels 1-2: MINOR THREAT (Training/Intro) ---
  {
    id: 1,
    name: "Vesta-Fragment",
    size: "micro",
    speed: 4.0, // Slowest
    distance: 1200, // Farthest
    mass: 0.1,
    composition: "rocky/silicate",
    threatLevel: "MINOR THREAT",
    trajectory: "shallow angle",
    diameter: 50,
    description: "A small chunk of a larger breakup event. Good target practice for basic defenses. Minimal ground impact.",
  },
  {
    id: 2,
    name: "Bennu-Alpha",
    size: "small",
    speed: 6.5,
    distance: 950,
    mass: 0.3,
    composition: "carbon-rich (low density)",
    threatLevel: "MINOR THREAT",
    trajectory: "direct approach",
    diameter: 150,
    description: "Dark, porous, and relatively fragile. Easier to shatter but requires precise kinetic impact due to low density.",
  },

  // --- Levels 3-4: MODERATE THREAT (Standard Engagement) ---
  {
    id: 3,
    name: "Apollo-Scout",
    size: "medium",
    speed: 8.0,
    distance: 700,
    mass: 1.0,
    composition: "stony",
    threatLevel: "MODERATE THREAT",
    trajectory: "grazing path",
    diameter: 300,
    description: "The most common type of near-Earth object. A standard threat that requires a calibrated response. Significant regional damage expected.",
  },
  {
    id: 4,
    name: "Apophis-Proxy",
    size: "medium",
    speed: 9.5,
    distance: 600,
    mass: 1.8,
    composition: "S-type (stony/nickel)",
    threatLevel: "MODERATE THREAT",
    trajectory: "mid-speed flyby",
    diameter: 400,
    description: "Modeled after the famous 99942 Apophis. A solid, fast-moving object requiring multiple interceptors for a clean deflection.",
  },

  // --- Levels 5-6: SIGNIFICANT THREAT (Strategic Challenge) ---
  {
    id: 5,
    name: "Icarus-Fastball",
    size: "large",
    speed: 12.0, // First big jump in speed
    distance: 500,
    mass: 3.0,
    composition: "silicate/iron",
    threatLevel: "SIGNIFICANT THREAT",
    trajectory: "high-speed tangent",
    diameter: 600,
    description: "Less massive than others at this size, but its extreme velocity makes tracking and interception highly challenging. Global atmospheric effects possible.",
  },
  {
    id: 6,
    name: "Gaspra-Mass",
    size: "large",
    speed: 10.0,
    distance: 420,
    mass: 4.5, // High mass for size
    composition: "stony-primitive",
    threatLevel: "SIGNIFICANT THREAT",
    trajectory: "direct approach",
    diameter: 800,
    description: "A large, relatively slow-moving rock. Its sheer mass makes deflection difficult, demanding a high-yield solution or early kinetic pushes.",
  },

  // --- Levels 7-8: SEVERE THREAT (High Stakes) ---
  {
    id: 7,
    name: "Eros-Junior",
    size: "very large",
    speed: 14.5,
    distance: 350,
    mass: 6.5,
    composition: "metallic-stony", // More durable
    threatLevel: "SEVERE THREAT",
    trajectory: "erratic spin",
    diameter: 1000,
    description: "A kilometers-sized object with high metal content. The erratic spin complicates targeting. Failure guarantees continent-scale devastation.",
  },
  {
    id: 8,
    name: "Didymos-System",
    size: "binary",
    speed: 11.5,
    distance: 300,
    mass: 7.5,
    composition: "S-type (binary pair)",
    threatLevel: "SEVERE THREAT",
    trajectory: "paired orbit",
    diameter: 1200, // Total mass/damage equivalence
    description: "Not one, but two objects orbiting each other (Primary and Moonlet). You must neutralize both to prevent impact. Based on the DART mission target.",
  },

  // --- Levels 9-10: CRITICAL THREAT (Boss Encounters) ---
  {
    id: 9,
    name: "Oumuamua-Echo",
    size: "massive/interstellar",
    speed: 22.0, // Fastest, representing an interstellar object
    distance: 250,
    mass: 8.5,
    composition: "unknown/dense",
    threatLevel: "CRITICAL THREAT",
    trajectory: "interstellar flyby",
    diameter: 1500,
    description: "An unknown object detected from outside our solar system. Traveling at impossible speeds. Deflection window is razor-thin and failure is extinction.",
  },
  {
    id: 10,
    name: "Hektor-Titan",
    size: "planet killer",
    speed: 17.0,
    distance: 200, // Closest
    mass: 10.0, // Highest Mass
    composition: "metallic (pure iron-nickel)",
    threatLevel: "CRITICAL THREAT: EXTINCTION EVENT",
    trajectory: "unavoidable collision",
    diameter: 2000,
    description: "The ultimate boss. This is a 2km-wide, pure iron-nickel mass on a direct collision course. Only the most powerful, timely intervention will save Earth. No second chances.",
  },
];