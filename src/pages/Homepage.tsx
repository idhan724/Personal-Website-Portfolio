import Particles from "@/components/Particles";
import { motion } from "motion/react";

function Homepage() {
  return (
    <div className="relative h-screen">
      <Particles
        particleColors={["#0a0024"]}
        particleCount={400}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <motion.h1 className="text-primary text-6xl text-center ">
          <span className="text-lg">Hello, i'm</span> <br />
          <span>Idhan Khalas Saputra</span>
          <br />
          <span>Front-End Developer</span>
        </motion.h1>
      </div>
    </div>
  );
}

export default Homepage;
