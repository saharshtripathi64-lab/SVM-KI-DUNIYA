import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function IntroAnimation({ onFinish }) {
  const greetings = [
   "Wellcome TO THE WORLD OF SVM KI DUNIYA",
  ];

  const [lineIndex, setLineIndex] = useState(0);
  const [visibleWords, setVisibleWords] = useState(0);
  const [showScreen, setShowScreen] = useState(true);

  const audioContextRef = useRef(null);

  const words = greetings[lineIndex].split(" ");

  // Subtle typing sound using Web Audio API
  const playTypingSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (
          window.AudioContext || window.webkitAudioContext
        )();
      }

      const ctx = audioContextRef.current;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(
        650 + Math.random() * 100,
        ctx.currentTime
      );

      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.045
      );

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (error) {
      // Audio may be blocked until user interaction.
    }
  };

  useEffect(() => {
    if (visibleWords < words.length) {
      const timer = setTimeout(() => {
        setVisibleWords((prev) => prev + 1);
        playTypingSound();
      }, 520);

      return () => clearTimeout(timer);
    }

    // After first sentence finishes
    if (lineIndex < greetings.length - 1) {
      const timer = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
        setVisibleWords(0);
      }, 1100);

      return () => clearTimeout(timer);
    }

    // Finish intro
    const timer = setTimeout(() => {
      setShowScreen(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [visibleWords, lineIndex, words.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {showScreen && (
        <motion.div
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            overflow-hidden
            bg-black text-white
          "
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.4,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          <div className="w-full max-w-6xl px-8 md:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={lineIndex}
                className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  y: -15,
                  transition: {
                    duration: 0.45,
                  },
                }}
              >
                {words.slice(0, visibleWords).map((word, i) => (
                  <motion.span
                    key={`${lineIndex}-${i}`}
                    initial={{
                      opacity: 0,
                      y: 12,
                      filter: "blur(6px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      text-4xl
                      font-semibold
                      tracking-tight
                      md:text-6xl
                      lg:text-8xl
                    "
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Minimal typing cursor */}
            {visibleWords < words.length && (
              <motion.div
                className="
                  mx-auto mt-5
                  h-10 w-[2px]
                  bg-white
                "
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                }}
              />
            )}
          </div>

          {/* Bottom progress line */}
          <motion.div
            className="
              absolute bottom-10 left-1/2
              h-[1px]
              -translate-x-1/2
              bg-white/30
            "
            initial={{ width: 0 }}
            animate={{
              width: "120px",
            }}
            transition={{
              duration: 4.5,
              ease: "linear",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
