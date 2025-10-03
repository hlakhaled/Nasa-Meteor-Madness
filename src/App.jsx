import React, { useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import ExplorePage from "./pages/ExplorePage";
import Navbar from "./components/Navbar";
import DefendEarth from "./pages/DefendEarth";
import AsteroidSimulation from "./pages/AsteroidSimulation";
import FunFacts from "./pages/FunFacts";
import AboutChallenge from "./pages/AboutChallenge";

// Layout for pages with navbar
function Layout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Outlet /> {/* child routes appear here */}
    </div>
  );
}

function App() {
  const bgAudioRef = useRef(null);
  const clickAudioRef = useRef(null);

  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.3; // lower background music volume
      bgAudioRef.current.play().catch(() => {
        console.log("Autoplay blocked — waiting for interaction");
      });
    }
  }, []);

  const handleClick = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.volume = 0.6; // lower click sound
      clickAudioRef.current.currentTime = 0; // restart if already playing
      clickAudioRef.current.playbackRate = 1.75; // faster click
      clickAudioRef.current.play().catch(() => {});
    }
  };

  return (
    <Router>
      {/* Background music */}
      <audio ref={bgAudioRef} loop autoPlay>
        <source src="/music/Sakta.mp3" type="audio/mpeg" />
      </audio>

      {/* Click sound */}
      <audio ref={clickAudioRef}>
        <source src="/click.mp3" type="audio/mpeg" />
      </audio>

      {/* Global click sound trigger */}
      <div onClick={handleClick}>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<ExplorePage />} />

          {/* Pages with navbar */}
          <Route element={<Layout />}>
            <Route path="defend-earth" element={<DefendEarth />} />
            <Route
              path="asteroid-simulation"
              element={<AsteroidSimulation />}
            />
            <Route path="fun-facts" element={<FunFacts />} />
            <Route path="about-challenge" element={<AboutChallenge />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
