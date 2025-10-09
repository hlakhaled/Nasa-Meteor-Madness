import { MISSION_DIALOG } from "../data/missionDialog";
import { VOICE_FILES } from "../data/voiceFiles";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import astronaut from "../assets/astronaut.png";
import astronautAnnoyed from "../assets/astrount_annoyed.png";

const MissionDialog = ({ onComplete, onHighlight }) => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const voiceAudioRef = useRef(null);


  // Enable audio on first user interaction (fix autoplay issue)
  useEffect(() => {
    const enableAudio = () => {
      setAudioEnabled(true);
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("keydown", enableAudio);
    };
    window.addEventListener("click", enableAudio);
    window.addEventListener("keydown", enableAudio);
    return () => {
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("keydown", enableAudio);
    };
  }, []);

  // Handle keyboard "next" trigger
  useEffect(() => {
    const handleKeyNext = (e) => {
      // Prevent skipping during typing
      if (!isTyping && isVisible) handleNext();
    };
    window.addEventListener("keydown", handleKeyNext);
    return () => window.removeEventListener("keydown", handleKeyNext);
  }, [isTyping, isVisible]);

  useEffect(() => {
    const resumeAudioContext = () => {
        if (typingAudioRef.current && typingAudioRef.current.context?.state === "suspended") {
        typingAudioRef.current.context.resume();
        }
    };
    window.addEventListener("click", resumeAudioContext);
    window.addEventListener("keydown", resumeAudioContext);
    return () => {
        window.removeEventListener("click", resumeAudioContext);
        window.removeEventListener("keydown", resumeAudioContext);
    };
    }, []);

  useEffect(() => {
    if (index >= MISSION_DIALOG.length) return;

    const current = MISSION_DIALOG[index];
    setDisplayedText("");
    setIsTyping(true);

    // Highlight triggers
    if (index === 4 && onHighlight) onHighlight("threat");
    else if (index === 5 && onHighlight) onHighlight("deflection");
    else if (index === 8 && onHighlight) onHighlight("stats");

    // stop previous voice
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current.currentTime = 0;
    }

    // play current voice
    if (audioEnabled && VOICE_FILES[index]) {
      const audio = new Audio(VOICE_FILES[index]);
      audio.volume = 0.8;
      voiceAudioRef.current = audio;
      audio.play().catch((err) => console.warn("Audio blocked:", err));
    }

    // typing animation
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(current.slice(0, i + 1));
      i++;
      if (i === current.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 10);

    return () => {
      clearInterval(interval);
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
        voiceAudioRef.current.currentTime = 0;
      }
    };
  }, [index, onHighlight, audioEnabled]);

  const handleNext = (e) => {
    e?.stopPropagation();
    if (isTyping) return;
    if (index < MISSION_DIALOG.length - 1) {
      setIndex(index + 1);
    } else {
      setIsVisible(false);
      setTimeout(() => onComplete?.(), 300);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onHighlight?.("all");
      onComplete?.();
    }, 300);
  };

  const stopVoice = () => {
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current.currentTime = 0;
      voiceAudioRef.current = null;
    }
  };

  if (!isVisible) {
    stopVoice(); 
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key={`dialog-${index}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-8 left-0 right-0 mx-auto w-[85%] max-w-[1400px] z-50"
      >
        <div
          className="relative bg-black/70 border-2 border-purple-500 rounded-md px-10 backdrop-blur-md shadow-2xl shadow-purple-500/20"
          onClick={handleNext}
          style={{ cursor: isTyping ? "default" : "pointer" }}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-4 right-4 p-1.5 rounded-lg transition-all hover:scale-110 z-10"
            aria-label="Skip introduction"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Content */}
          <div className="flex items-center justify-center gap-6 min-h-[180px]">
            <div className="flex-1">
              <p className="inter-text text-md leading-relaxed text-white">
                {displayedText}
              </p>

              {!isTyping && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="inter-text font-light text-gray-400 text-sm mt-3"
                >
                  [Click or Press any key to continue]
                </motion.p>
              )}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <img
                src={index === 1 || index === 8 ? astronautAnnoyed : astronaut}
                alt="Mission Commander"
                className="w-28 h-28 object-contain"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MissionDialog;