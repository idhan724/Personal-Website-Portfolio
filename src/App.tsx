import PillNav from "./components/PillNav";
import "./index.css";
import Homepage from "@/pages/Homepage";

function App() {
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
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
        initialLoadAnimation={false}
      />
      <Homepage />
    </>
  );
}

export default App;
