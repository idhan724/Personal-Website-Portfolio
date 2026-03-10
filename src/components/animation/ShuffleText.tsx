import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface ShuffleTextProps {
  text?: string;
  duration?: number;
  fps?: number;
  trigger?: "hover" | "click" | "mount" | "loop";
  loopInterval?: number;
  className?: string;
}

export default function ShuffleText({
  text = "Hello World",
  duration = 1200,
  fps = 20,
  trigger = "mount",
  loopInterval = 10000,
  className = "",
}: ShuffleTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAnimatingRef = useRef<boolean>(false);

  const shuffle = (): void => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const totalFrames = Math.floor((duration / 1000) * fps);
    let frame = 0;

    intervalRef.current = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      const newText = text
        .split("")
        .map((char: string, i: number) => {
          if (char === " ") return " ";
          const nonSpaceCount = text.replace(/ /g, "").length;
          const charRevealThreshold = i / nonSpaceCount;
          if (progress > charRevealThreshold + 0.1) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(newText);

      if (frame >= totalFrames) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        isAnimatingRef.current = false;
      }
    }, 1000 / fps);
  };

  useEffect(() => {
    setDisplayText(
      text
        .split("")
        .map((c) =>
          c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)],
        )
        .join(""),
    );

    if (trigger === "mount") {
      timeoutRef.current = setTimeout(shuffle, 300);
    }
    if (trigger === "loop") {
      timeoutRef.current = setTimeout(shuffle, 300);
      loopRef.current = setInterval(() => {
        shuffle();
      }, loopInterval + duration);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, []);

  return (
    <span
      className={className}
      onMouseEnter={trigger === "hover" ? shuffle : undefined}
      onClick={trigger === "click" ? shuffle : undefined}
      style={{
        cursor:
          trigger === "hover" || trigger === "click" ? "pointer" : "default",
      }}
    >
      {displayText.split("").map((char: string, i: number) => (
        <motion.span
          key={i}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: char !== text[i] ? 0.4 : 1 }}
          transition={{ x: { duration: 0.8 }, opacity: { duration: 0.5 } }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
