import { motion } from "motion/react";
import SlideInRight from "@/components/animation/slide/SlideInRight";
import { ProjectCard } from "@/components/ProjectCard";

function Projects() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-8">
        <SlideInRight className="mb-24">
          <div>
            <p className="text-[10.5px] font-mono tracking-[0.5em] uppercase text-indigo-300 mb-4">
              Selected Work
            </p>
            <h2 className="text-primary leading-[0.9] font-bebas text-7xl">
              PROJECTS
              <span className="block text-5xl bg-linear-to-r from-indigo-300 via-indigo-500 to-indigo-700 text-transparent bg-clip-text font-cormorant italic">
                that ship.
              </span>
            </h2>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 h-px origin-left bg-linear-90 from-transparent via-indigo-500 to-transparent"
          />
        </SlideInRight>

        <ProjectCard />
      </div>
    </section>
  );
}

export default Projects;
