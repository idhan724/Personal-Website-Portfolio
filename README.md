# 🌐 Personal Portfolio — Idhan Khalas Saputra

A modern, animated personal portfolio built with React, TypeScript, and Vite. Showcasing projects, skills, and a contact form — with smooth animations and a clean dark/light theme.

---

## ✨ Features

- 🎨 **Dark / Light Theme** — persisted via `localStorage` with system preference detection
- 🌊 **Particle Background** — interactive WebGL particles powered by OGL
- 🔤 **Shuffle Text Animation** — looping character scramble effect on the hero name
- 🧲 **Magnetic Button** — cursor-following hover effect on the contact page
- 🪟 **3D Illustration** — Three.js powered 3D scene on the About page
- 🃏 **Tilt Card Effect** — perspective tilt on hover for interactive cards
- 🎬 **Slide-in Animations** — directional entrance animations (up, down, left, right)
- 📬 **Contact Form** — functional email sending via EmailJS
- 💊 **Pill Navigation** — animated nav pill that follows the active route (GSAP)
- 📱 **Responsive Design** — mobile-first layout with Tailwind CSS

---

## 🗂️ Project Structure

```
src/
├── assets/               # Static assets
├── components/
│   ├── animation/
│   │   ├── slide/        # SlideIn directional components
│   │   ├── Illustration3D.tsx
│   │   ├── Particles.tsx
│   │   ├── ShuffleText.tsx
│   │   └── variants.ts   # Framer Motion variants
│   ├── ui/               # shadcn/ui components (Button, Badge, Card, etc.)
│   ├── GlitchText.tsx
│   ├── MagneticButton.tsx
│   ├── PillNav.tsx
│   ├── ProjectCard.tsx
│   ├── SkillCard.tsx
│   └── TiltField.tsx
├── lib/
│   ├── theme.ts          # Theme helpers
│   └── utils.ts          # cn() utility
├── pages/
│   ├── Homepage.tsx
│   ├── About.tsx
│   ├── Project.tsx
│   └── Contact.tsx
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🛠️ Tech Stack

| Category      | Library                                        |
| ------------- | ---------------------------------------------- |
| Framework     | React 19 + TypeScript                          |
| Build Tool    | Vite 7                                         |
| Routing       | React Router DOM v6                            |
| Animation     | Motion (Framer Motion) + GSAP                  |
| 3D / WebGL    | Three.js + OGL                                 |
| Styling       | Tailwind CSS v4                                |
| UI Components | shadcn/ui + Radix UI                           |
| Icons         | Lucide React + React Simple Icons              |
| Email         | EmailJS                                        |
| Fonts         | Inter, Bebas Neue, Cormorant Garamond, DM Mono |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/personal-portfolio.git
cd personal-portfolio

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> Get your keys at [emailjs.com](https://www.emailjs.com/)

### Running Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📄 Pages

| Route      | Description                                           |
| ---------- | ----------------------------------------------------- |
| `/`        | Hero section with animated name and CTA buttons       |
| `/about`   | Skills, tech stack, and a 3D illustration             |
| `/project` | Project cards with modal detail and live/GitHub links |
| `/contact` | Contact form with EmailJS integration                 |

---

## 🤝 Credits

This project was built using amazing open-source libraries and community resources:

- [Motion](https://motion.dev/) - MIT License
- [Three.js](https://threejs.org/) - MIT License
- [Fontsource](https://fontsource.org/) - MIT License
- [shadcn/ui](https://ui.shadcn.com/) - MIT License
- [React Bits](https://reactbits.dev/) - MIT + Commons Clause License
- [React Simple Icons](https://github.com/icons-pack/react-simple-icons) - MIT License
- [Lucide](https://lucide.dev/) - ISC License
- [EmailJS](https://www.emailjs.com/) - Free Tier

---

## 👤 Author

**Idhan Khalas Saputra**
Front-End Developer · Specialized in clean UI, reusable components, and modern frontend workflows.

---
