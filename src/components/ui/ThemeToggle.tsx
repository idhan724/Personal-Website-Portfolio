import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { applyTheme, getInitialTheme, type Theme } from "@/lib/theme";
import { Button } from "@/components/ui/button";

interface StarProps {
  top: string;
  left: string;
  size: number;
  delay: number;
}

interface CraterProps {
  className: string;
  delay: number;
}

const Stars: StarProps[] = [
  { top: "14%", left: "12%", size: 3, delay: 0.0 },
  { top: "30%", left: "22%", size: 2, delay: 0.07 },
  { top: "10%", left: "38%", size: 2.5, delay: 0.14 },
  { top: "55%", left: "16%", size: 2, delay: 0.21 },
  { top: "25%", left: "50%", size: 1.5, delay: 0.28 },
];

const crater: CraterProps[] = [
  { className: "w-2 h-2 top-2.5 right-2.5", delay: 0.2 },
  { className: "w-1.5 h-1.5 bottom-3 right-4", delay: 0.3 },
];

const StarParticle = ({ top, left, size, delay }: StarProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.9, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    transition={{ delay, duration: 0.3 }}
    style={{ top, left, width: size, height: size }}
    className="absolute rounded-full bg-white pointer-events-none"
  />
);

const Cloud = () => (
  <motion.div
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 0.85, x: 0 }}
    exit={{ opacity: 0, x: 10 }}
    transition={{ duration: 0.4 }}
    className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
  >
    <div className="relative w-9 h-3.5">
      <div className="absolute inset-0 bg-background rounded-xl" />
      <div className="absolute w-4.5 h-4.5 bg-background rounded-full -top-2 left-1.5" />
      <div className="absolute w-3 h-3 bg-background rounded-full -top-1 left-4.5" />
    </div>
  </motion.div>
);

const Crater = ({ className, delay }: CraterProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ delay }}
    className={`absolute rounded-full bg-blue-200/25 ${className}`}
  />
);

const MotionButton = motion(Button);

function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  function pillToggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  }
  return (
    <>
      <MotionButton
        onClick={pillToggle}
        animate={{
          background:
            theme === "dark"
              ? "linear-gradient(135deg, #1a1a4a, #2a2a6a)"
              : "linear-gradient(135deg, #74bfe8, #f5c842)",
          boxShadow:
            theme === "dark"
              ? "0 0 40px rgba(80,80,220,0.35), 0 8px 32px rgba(0,0,0,0.5)"
              : "0 0 40px rgba(255,190,30,0.45), 0 8px 32px rgba(0,0,0,0.15)",
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label={
          theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap"
        }
        className="relative w-[100px] h-[42px] rounded-full border-none cursor-pointer p-0 outline-none overflow-hidden z-10"
      >
        {/* Stars */}
        <AnimatePresence>
          {theme === "dark" &&
            Stars.map((star, i) => <StarParticle key={i} {...star} />)}
        </AnimatePresence>

        {/* Cloud */}
        <AnimatePresence>{theme === "light" && <Cloud />}</AnimatePresence>

        {/* Thumb */}
        <motion.div
          animate={{
            x: theme === "dark" ? 54 : 4,
            background:
              theme === "dark"
                ? "linear-gradient(145deg, #ccd8f5, #eaf0ff)"
                : "linear-gradient(145deg, #ffe566, #ffaa00)",
            boxShadow:
              theme === "dark"
                ? "0 4px 16px rgba(100,100,220,0.55), inset -4px -2px 8px rgba(100,130,200,0.25)"
                : "0 4px 20px rgba(255,155,0,0.6), 0 0 28px rgba(255,210,50,0.4)",
          }}
          transition={{
            x: { type: "spring", stiffness: 380, damping: 28 },
            background: { duration: 0.6, ease: "easeInOut" },
            boxShadow: { duration: 0.6 },
          }}
          className="absolute left-0 top-1 w-[37px] h-[37px] rounded-full flex items-center justify-center z-20"
        >
          {/* Sun / Moon swap */}
          <AnimatePresence mode="wait">
            {theme === "light" ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute flex items-center justify-center text-amber-700"
              >
                <Sun size={20} strokeWidth={2.25} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute flex items-center justify-center text-indigo-400"
              >
                <Moon size={18} strokeWidth={2.25} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Craters */}
          <AnimatePresence>
            {theme === "dark" &&
              crater.map((crater, i) => <Crater key={i} {...crater} />)}
          </AnimatePresence>
        </motion.div>
      </MotionButton>
    </>
  );
}

export default ThemeToggle;
