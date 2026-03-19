import ShuffleText from "@/components/animation/ShuffleText";
import SlideInDown from "@/components/animation/slide/SlideInDown";
import SlideInLeft from "@/components/animation/slide/SlideInLeft";
import SlideInRight from "@/components/animation/slide/SlideInRight";
import SlideInUp from "@/components/animation/slide/SlideInUp";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const MotionButton = motion(Button);

function Homepage() {
  return (
    <div className="relative h-screen ">
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4">
        <div className="space-y-6 text-center">
          <h1 className="text-primary text-4xl md:text-6xl">
            <SlideInDown
              as="span"
              className="text-muted text-xl md:text-3xl font-mono"
            >
              Hello, I'm
            </SlideInDown>{" "}
            <br />
            <ShuffleText
              text="Idhan Khalas Saputra"
              trigger="loop"
              duration={2000}
              fps={20}
              className="text-indigo-500 font-semibold font-bebas"
            />
            <br />
          </h1>
          <SlideInLeft className="flex items-center justify-center gap-4 w-full mx-auto">
            <div className="w-27 h-px bg-indigo-700 dark:bg-indigo-700/40" />
            <span className="text-xl md:text-3xl text-indigo-700 font-bebas">
              Front-End Developer
            </span>
            <div className="w-27 h-px bg-indigo-700 dark:bg-indigo-700/40" />
          </SlideInLeft>

          <SlideInUp className="text-muted text-md md:text-lg max-w-md mx-auto font-mono">
            Specialized in clean UI, reusable component, and modern frontend
            workflows.
          </SlideInUp>
          <div className="flex justify-center gap-3 pointer-events-auto">
            <SlideInRight>
              <Link to="/project">
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
              </Link>
            </SlideInRight>

            <SlideInLeft>
              <Link to="/contact">
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
              </Link>
            </SlideInLeft>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
