import { motion } from "motion/react";
import { ExternalLink, MoveUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { container, itemInDown } from "@/components/animation/variants";
import {
  type IconType,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiSwiper,
} from "@icons-pack/react-simple-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: TechItem[];
  thumbnail: string;
  demoUrl: string;
  githubUrl: string;
}

export interface TechItem {
  name: string;
  color: string;
  icon?: IconType;
}

export const TECH_COLORS: Record<string, string> = {
  React: "#61DAFB",
  Typescript: "#3178C6",
  Tailwind: "#38BDF8",
  Motion: "#BB4B96",
  Html: "#f0b002",
  Javascript: "#fcf403",
  Swiper: "#5b8fe3",
};

const PROJECTS: Project[] = [
  {
    id: "nexora",
    num: "01",
    title: "Nexora",
    subtitle: "Dashboard Task Management",
    description:
      " Implements reusable UI components, animated statistics, project filtering, and a structured folder architecture inspired by enterprise SaaS applications.",
    techStack: [
      { name: "React", color: TECH_COLORS["React"], icon: SiReact },
      {
        name: "TypeScript",
        color: TECH_COLORS["Typescript"],
        icon: SiTypescript,
      },
      {
        name: "TailwindCSS",
        color: TECH_COLORS["Tailwind"],
        icon: SiTailwindcss,
      },
      { name: "Motion", color: TECH_COLORS["Motion"] },
    ],
    thumbnail: "/thumbnail/nexora.png",
    demoUrl: "https://nexora-dashboard-management-tasks.vercel.app/",
    githubUrl:
      "https://github.com/idhan724/Nexora---Dashboard-Management-Tasks",
  },
  {
    id: "workora",
    num: "02",
    title: "Workora",
    subtitle: "Landing Page SaaS",
    description:
      "Workora is a modern, responsive, and sleek SaaS landing page designed for teams and businesses.It showcases key features, pricing plans, and testimonials, giving users a premium experience to manage, track, and scale their work effortlessly. ",
    techStack: [
      { name: "Html", color: TECH_COLORS["Html"], icon: SiHtml5 },
      {
        name: "Javascript",
        color: TECH_COLORS["Javascript"],
        icon: SiJavascript,
      },
      {
        name: "TailwindCSS",
        color: TECH_COLORS["Tailwind"],
        icon: SiTailwindcss,
      },
      { name: "Swiper", color: TECH_COLORS["Swiper"], icon: SiSwiper },
    ],
    thumbnail: "/thumbnail/workora.png",
    demoUrl: "https://workora-modern-landing-page.vercel.app/",
    githubUrl:
      "https://github.com/idhan724/Workora---Modern-SaaS-Startup-Landing-Page",
  },
  {
    id: "vireon",
    num: "03",
    title: "Vireon",
    subtitle: "Web E-Commerce",
    description:
      "Vireon is a case study of modern front-end architecture implementation using Zustand-based state management and a modular UI system with shadcn/ui. The website is built with React, TypeScript, and Vite. This project showcases product listing, category filtering, product search, shopping cart management, and a checkout page — all structured with clean and reusable components.",
    techStack: [
      { name: "React", color: TECH_COLORS["React"], icon: SiReact },
      {
        name: "TypeScript",
        color: TECH_COLORS["Typescript"],
        icon: SiTypescript,
      },
      {
        name: "TailwindCSS",
        color: TECH_COLORS["Tailwind"],
        icon: SiTailwindcss,
      },
    ],
    thumbnail: "/thumbnail/vireon.png",
    demoUrl: "https://vireon-website-e-commerce.vercel.app/",
    githubUrl: "https://github.com/idhan724/Vireon---Website-E-commerce",
  },
];

const MotionButton = motion(Button);
const MotionCard = motion(Card);

export function ProjectCard() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {PROJECTS.map((project) => (
        <MotionCard
          key={project.id}
          variants={itemInDown}
          whileHover={{ y: -5 }}
          className="rounded-xl"
        >
          <motion.img
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            className="h-full w-full object-contain"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          <CardContent className="p-5">
            <h3 className="font-semibold text-[17px] leading-tight tracking-tight text-foreground font-bebas">
              {project.title}
            </h3>
            <p className="text-md text-muted font-semibold font-bebas my-2">
              {project.subtitle}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer group/desc mb-4">
                  <p className="text-[13.5px] leading-relaxed text-muted-foreground font-light line-clamp-3 font-cormorant">
                    {project.description}
                  </p>
                  <div className="group/desc flex gap-2 justify-start items-center mt-2 text-muted-foreground/40 hover:text-muted-foreground ">
                    <span className="text-[11px] transition-colors">
                      Read more
                    </span>
                    <span className="mt-0.5 shrink-0 text-sm  group-hover/desc:translate-x-0.5 group-hover/desc:-translate-y-0.5 transition-all">
                      <MoveUpRight size={12} />
                    </span>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{project.title}</DialogTitle>
                  <p className="text-xs text-muted-foreground font-bebas">
                    {project.subtitle}
                  </p>
                </DialogHeader>
                <p className="text-sm leading-relaxed text-muted-foreground font-cormorant">
                  {project.description}
                </p>
              </DialogContent>
            </Dialog>

            <div className="flex flex-wrap items-center gap-1.5">
              {project.techStack.map((t) => (
                <Badge
                  key={t.name}
                  variant="outline"
                  className="gap-1.5 rounded-md border-border/50  px-2 py-0.5 text-sm font-normal font-mono"
                  style={{ background: `${t.color}40` }}
                >
                  {t.icon ? (
                    <t.icon size={24} />
                  ) : (
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: t.color }}
                    />
                  )}

                  {t.name}
                </Badge>
              ))}
            </div>
            <Separator className="mt-4" />
          </CardContent>

          <CardFooter className="gap-2">
            <MotionButton
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 rounded-lg text-xs"
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
              asChild
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiGithub size={24} />
                GitHub
              </a>
            </MotionButton>

            <MotionButton
              size="sm"
              className="h-8 gap-1.5 rounded-lg text-xs"
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
              asChild
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo
                <ExternalLink size={24} />
              </a>
            </MotionButton>
          </CardFooter>
        </MotionCard>
      ))}
    </motion.div>
  );
}
