import { motion } from "motion/react";
import type { SlideInProps } from "./SlideInUp";

function SlideInDown<T extends React.ElementType = "div">({
  as,
  children,
  ...props
}: SlideInProps<T>) {
  const Component = as || "div";
  const MotionComponent = motion(Component);
  return (
    <MotionComponent
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ display: as === "span" ? "inline-block" : undefined }}
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export default SlideInDown;
