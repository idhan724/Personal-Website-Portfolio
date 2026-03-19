import { motion } from "motion/react";

function GlitchText({ text }: { text: string }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 text-indigo-500 opacity-0"
        animate={{
          opacity: [0, 0.8, 0, 0.6, 0],
          x: [0, -3, 2, -1, 0],
          skewX: [0, -5, 3, -2, 0],
        }}
        transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 4 }}
        aria-hidden
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-cyan-400 opacity-0"
        animate={{
          opacity: [0, 0.6, 0, 0.8, 0],
          x: [0, 3, -2, 1, 0],
          skewX: [0, 3, -5, 2, 0],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: 4,
          delay: 0.05,
        }}
        aria-hidden
      >
        {text}
      </motion.span>
    </span>
  );
}

export default GlitchText;
