import { Route, Routes, useLocation } from "react-router-dom";
import PillNav from "./components/PillNav";
import "./index.css";
import Homepage from "@/pages/Homepage";
import About from "@/pages/About";
import Projects from "@/pages/Project";
import Particles from "@/components/animation/Particles";
import Contact from "@/pages/Contact";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="relative">
      <PillNav
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Project", href: "/project" },
          { label: "Contact", href: "/contact" },
        ]}
        activeHref={pathname}
        className="custom-nav"
        ease="power2.easeOut"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
        initialLoadAnimation={false}
      />
      <Particles
        particleColors={["#6366f1"]}
        particleCount={400}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/project" element={<Projects />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </div>
  );
}

export default App;
