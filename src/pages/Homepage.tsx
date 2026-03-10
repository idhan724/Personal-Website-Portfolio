import Particles from "@/components/animation/Particles";
import ShuffleText from "@/components/animation/ShuffleText";
import SlideInDown from "@/components/animation/slide/SlideInDown";
import SlideInLeft from "@/components/animation/slide/SlideInLeft";
import SlideInRight from "@/components/animation/slide/SlideInRight";
import SlideInUp from "@/components/animation/slide/SlideInUp";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import { motion } from "motion/react";

const MotionButton = motion(Button);

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
        <div className="space-y-3">
          <h1 className="text-primary text-6xl text-center">
            <SlideInDown as="span" className="text-3xl">
              Hello, i'm
            </SlideInDown>{" "}
            <br />
            <ShuffleText
              text="Idhan Khalas Saputra"
              trigger="loop"
              duration={2000}
              fps={20}
              className="text-indigo-500 font-semibold"
            />
            <br />
            <SlideInLeft as="span">Front-End Developer</SlideInLeft>
          </h1>
          <SlideInUp className="text-muted text-lg text-center max-w-md mx-auto">
            Specialized in clean UI, reusable component, and modern frontend
            workflows.
          </SlideInUp>
          <div className="flex justify-center gap-3 pointer-events-auto">
            <SlideInRight>
              <MotionButton
                whileHover={{
                  scale: 1.04,
                  y: -4,
                  transition: {
                    type: "spring",
                    stiffness: 250,
                  },
                }}
                whileTap={{
                  scale: 0.95,
                  y: -1,
                  transition: { duration: 0.15 },
                }}
                variant="nav"
                size="lg"
                className="bg-indigo-500"
              >
                View Project
                <SquareArrowOutUpRight />
              </MotionButton>
            </SlideInRight>

            <SlideInLeft>
              <MotionButton
                whileHover={{
                  scale: 1.04,
                  y: -4,
                  transition: {
                    type: "spring",
                    stiffness: 250,
                  },
                }}
                whileTap={{
                  scale: 0.95,
                  y: -1,
                  transition: { duration: 0.15 },
                }}
                variant="nav"
                size="lg"
                className="bg-indigo-500"
              >
                Contact Me
              </MotionButton>
            </SlideInLeft>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
