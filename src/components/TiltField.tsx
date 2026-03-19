import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
  type Variants,
} from "motion/react";

interface TiltFieldProps {
  label: string;
  htmlFor?: string;
  variants: Variants;
  children: React.ReactNode;
}

function TiltField({ label, htmlFor, variants, children }: TiltFieldProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useTransform(y, [-20, 20], [2, -2]);
  const rY = useTransform(x, [-20, 20], [-2, 2]);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });
  const srX = useSpring(rX, { stiffness: 150, damping: 20 });
  const srY = useSpring(rY, { stiffness: 150, damping: 20 });

  const onMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || shouldReduce) return;
      const r = ref.current.getBoundingClientRect();
      x.set(((e.clientX - r.left - r.width / 2) / r.width) * 20);
      y.set(((e.clientY - r.top - r.height / 2) / r.height) * 20);
    },
    [shouldReduce],
  );
  const onLeave = React.useCallback(() => {
    x.set(0);
    y.set(0);
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      style={{
        x: sx,
        y: sy,
        rotateX: srX,
        rotateY: srY,
        perspective: 800,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <label
        htmlFor={htmlFor}
        className="block text-[11px] tracking-[0.25em] uppercase mb-2 font-mono"
      >
        {label}
      </label>
      {children}
    </motion.div>
  );
}

export default TiltField;
