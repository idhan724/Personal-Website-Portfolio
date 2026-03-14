import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { itemInUp } from "./animation/variants";

interface SkillItem {
  tag: string;
  title: string;
  body: string;
}

const SKILLS: SkillItem[] = [
  {
    tag: "Foundation",
    title: "HTML & CSS",
    body: "Semantic markup · Flexbox\nCSS Grid · Animations\nResponsive design",
  },
  {
    tag: "Scripting",
    title: "JavaScript",
    body: "ES6+ · DOM manipulation\nAsync/Await · Fetch API\nBasic algorithms",
  },
  {
    tag: "Framework",
    title: "React.js",
    body: "Components & Props\nuseState / useEffect\nReact Router basics",
  },
  {
    tag: "Animation",
    title: "Motion",
    body: "Animations & transitions\nGesture handling\nScroll-based effects",
  },
  {
    tag: "Tooling",
    title: "Dev Tools",
    body: "Git & GitHub · VS Code\nnpm basics · Vite\nBrowser DevTools",
  },
  {
    tag: "Styling",
    title: "Tailwind CSS",
    body: "Utility-first workflow\nCustom config basics\nDark mode support",
  },
];

const MotionCard = motion(Card);

function SkillCard() {
  return (
    <>
      {SKILLS.map((item) => (
        <MotionCard
          variants={itemInUp}
          className="group relative bg-card p-8 overflow-hidden transition-colors duration-300 hover:bg-[#e8e8fd] dark:hover:bg-[#0d0d1a]"
        >
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-linear-to-r from-indigo-500 to-cyan-400 transition-all duration-500" />
          <Badge
            variant="outline"
            className="font-mono text-[0.57rem] tracking-[0.16em] uppercase text-indigo-400"
          >
            {item.tag}
          </Badge>
          <CardTitle
            className="text-primary text-lg font-light mb-2"
            style={{ fontFamily: "Georgia,serif" }}
          >
            {item.title}
          </CardTitle>

          <CardDescription className="font-mono text-[0.62rem] leading-loose text-muted whitespace-pre-line">
            {item.body}
          </CardDescription>
        </MotionCard>
      ))}
    </>
  );
}

export default SkillCard;
