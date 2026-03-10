import { Route, Routes, useLocation } from "react-router-dom";
import PillNav from "./components/PillNav";
import "./index.css";
import Homepage from "@/pages/Homepage";
import About from "@/pages/About";

function App() {
  const location = useLocation();
  return (
    <>
      <PillNav
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Contact", href: "/contact" },
        ]}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
        initialLoadAnimation={false}
      />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </>
  );
}

export default App;
