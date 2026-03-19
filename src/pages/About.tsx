import Illustration3D from "@/components/animation/Illustration3D";
import SkillCard from "@/components/SkillCard";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  container,
  itemInLeft,
  itemInRight,
} from "@/components/animation/variants";
import SlideInDown from "@/components/animation/slide/SlideInDown";

declare global {
  interface Window {
    THREE: any;
  }
}

function About() {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.id = "about-kf";
    styleEl.textContent = `
      @keyframes floatY  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-10px)} }
      @keyframes fadeUp  { to { opacity:1; transform:translateY(0) } }
      @keyframes pulseDot{ 0%,100%{opacity:1} 50%{opacity:0.2} }
      .fu  { opacity:0; transform:translateY(24px); animation:fadeUp .8s cubic-bezier(.22,1,.36,1) forwards; }
      .fu1 { animation-delay:.1s }
      .fu2 { animation-delay:.2s }
      .fu3 { animation-delay:.35s }
      .fu4 { animation-delay:.5s }
      .fu5 { animation-delay:.65s }
    `;
    if (!document.getElementById("about-kf"))
      document.head.appendChild(styleEl);
    return () => {
      document.getElementById("about-kf")?.remove();
    };
  }, []);

  useEffect(() => {
    if (window.THREE) {
      setReady(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    s.onload = () => setReady(true);
    document.head.appendChild(s);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 pointer-events-none">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-32 "
        >
          <div>
            <motion.div
              variants={itemInRight}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-7 h-px bg-indigo-700 dark:bg-indigo-700/40" />
              <h2 className="font-bebas text-3xl tracking-[0.22em] uppercase text-indigo-500 dark:text-indigo-500/50">
                About me
              </h2>
            </motion.div>
            <div className="space-y-5 mb-10">
              <motion.p
                variants={itemInRight}
                className="text-lg font-light text-muted leading-relaxed font-cormorant"
              >
                Hi, I'm
                <strong className="text-indigo-500 font-semibold">
                  {" "}
                  Idhan Khalas Saputra{" "}
                </strong>
                — a frontend developer based in Indonesia, on a mission to turn
                passion into profession.
              </motion.p>
              <motion.p
                variants={itemInRight}
                className="text-lg font-light text-muted leading-relaxed font-cormorant"
              >
                My work is centered around creating clean, efficient code and
                polished interfaces. I may be at the start of my career, but my
                <strong className="text-indigo-500 font-semibold">
                  {" "}
                  personal projects{" "}
                </strong>
                demonstrate a commitment to modern standards and pixel-perfect
                execution.
              </motion.p>
              <motion.p
                variants={itemInRight}
                className="text-lg font-light text-muted leading-relaxed font-cormorant"
              >
                I am currently seeking my first professional opportunity to
                contribute to a team, armed with a portfolio of{" "}
                <strong className="text-indigo-500 font-semibold">
                  robust personal projects{" "}
                </strong>
                and a mindset geared toward continuous growth.
              </motion.p>
            </div>

            <motion.div
              variants={itemInRight}
              className="inline-flex items-center gap-2 border dark:border-cyan-400/25 border-blue-700 px-3 py-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-blue-700 dark:bg-cyan-400 animate-pulse" />
              <span className="font-bebas text-md tracking-[0.14em] uppercase text-blue-700 dark:text-cyan-400">
                Open to opportunities
              </span>
            </motion.div>
          </div>

          <motion.div variants={itemInLeft}>
            {ready ? (
              <Illustration3D />
            ) : (
              <div className="aspect-square flex items-center justify-center">
                <span className="font-mono text-[0.6rem] text-white/20 tracking-widest">
                  Loading scene…
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* SKILLS */}
        <section className="py-20">
          <SlideInDown className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xl tracking-[0.22em] uppercase text-indigo-900/60">
              What I Know
            </span>
            <div className="flex-1 h-2 bg-indigo-900/60" />
          </SlideInDown>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px pointer-events-auto"
          >
            <SkillCard />
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default About;
