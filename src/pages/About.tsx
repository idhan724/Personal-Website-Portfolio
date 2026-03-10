import { useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────
interface SkillItem {
  tag: string;
  title: string;
  body: string;
}

interface LearningItem {
  title: string;
  active: boolean;
  desc: string;
  pct: number;
}

interface JourneyItem {
  n: string;
  title: string;
  body: string;
}

interface FloatLabel {
  text: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  color: string;
  delay: string;
}

// ── Data ──────────────────────────────────────────────────────
const SKILLS: SkillItem[] = [
  { tag: "Foundation", title: "HTML & CSS",   body: "Semantic markup · Flexbox\nCSS Grid · Animations\nResponsive design" },
  { tag: "Scripting",  title: "JavaScript",   body: "ES6+ · DOM manipulation\nAsync/Await · Fetch API\nBasic algorithms" },
  { tag: "Framework",  title: "React.js",     body: "Components & Props\nuseState / useEffect\nReact Router basics" },
  { tag: "Design",     title: "Figma",        body: "Wireframing · Prototyping\nDesign-to-code workflow\nUI principles" },
  { tag: "Tooling",    title: "Dev Tools",    body: "Git & GitHub · VS Code\nnpm basics · Vite\nBrowser DevTools" },
  { tag: "Styling",    title: "Tailwind CSS", body: "Utility-first workflow\nCustom config basics\nDark mode support" },
];

const LEARNING: LearningItem[] = [
  { title: "Next.js",        active: true,  desc: "App router, SSR, full-stack apps with server actions.", pct: 55 },
  { title: "TypeScript",     active: true,  desc: "Type safety, interfaces, generics, integrating with React.", pct: 38 },
  { title: "React Basics",   active: false, desc: "Components, hooks, state management, small apps.", pct: 100 },
  { title: "CSS Animations", active: false, desc: "Keyframes, transitions, scroll-driven effects.", pct: 100 },
];

const JOURNEY: JourneyItem[] = [
  { n: "01", title: "The Spark",    body: "Discovered web dev through YouTube. Got hooked on how HTML + CSS creates something real." },
  { n: "02", title: "Going Deeper", body: "Took courses on JavaScript, React, responsive design. Built personal projects along the way." },
  { n: "03", title: "Now",          body: "Building my portfolio, contributing to open source, looking for my first opportunity." },
];

const FLOAT_LABELS: FloatLabel[] = [
  { text: "const dev = 'passionate';", top: "8%",   left: "-4%",  color: "rgba(201,169,110,0.75)", delay: "0s"   },
  { text: "npm run build ✓",           top: "45%",  right: "-6%", color: "rgba(78,205,196,0.75)",  delay: "1.6s" },
  { text: "</> learning everyday",     bottom:"10%",left: "2%",   color: "rgba(167,139,250,0.75)", delay: "3s"   },
];

// ── Declare THREE on window ───────────────────────────────────
declare global {
  interface Window {
    THREE: any;
  }
}

// ── 3D Scene ──────────────────────────────────────────────────
const Scene3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent): void => {
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.THREE) return;
    const THREE = window.THREE;

    const wrap = canvas.parentElement as HTMLElement;
    const W = (): number => wrap.clientWidth;
    const H = (): number => wrap.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.setSize(W(), H());

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W() / H(), 0.1, 100);
    camera.position.set(0, 2.2, 9);
    camera.lookAt(0, 0.5, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0x1a1a3a, 1.2));

    const screenLight = new THREE.PointLight(0x4ecdc4, 4.5, 8);
    screenLight.position.set(0, 1.5, 1.8);
    scene.add(screenLight);

    const rim = new THREE.DirectionalLight(0xc9a96e, 0.6);
    rim.position.set(-3, 4, -3);
    scene.add(rim);

    const fill = new THREE.PointLight(0x6c63ff, 1.2, 12);
    fill.position.set(3, 2, 2);
    scene.add(fill);

    const stdMat = (color: number, metal = 0.2, rough = 0.7) =>
      new THREE.MeshStandardMaterial({ color, metalness: metal, roughness: rough });

    const addBox = (
      w: number, h: number, d: number, color: number,
      x: number, y: number, z: number, rx = 0, ry = 0
    ) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), stdMat(color));
      m.position.set(x, y, z);
      m.rotation.x = rx;
      m.rotation.y = ry;
      m.castShadow = true;
      m.receiveShadow = true;
      scene.add(m);
      return m;
    };

    // Desk
    addBox(6.5, 0.12, 2.8, 0x1a1525,  0,    -0.5,  0);
    addBox(0.12,1.8, 0.12, 0x12101a, -3.1, -1.4, -1.2);
    addBox(0.12,1.8, 0.12, 0x12101a,  3.1, -1.4, -1.2);
    addBox(0.12,1.8, 0.12, 0x12101a, -3.1, -1.4,  1.2);
    addBox(0.12,1.8, 0.12, 0x12101a,  3.1, -1.4,  1.2);

    // Monitor
    const monGrp = new THREE.Group();
    scene.add(monGrp);

    const bezel = new THREE.Mesh(new THREE.BoxGeometry(2.6,1.65,0.09), stdMat(0x111118, 0.5, 0.4));
    bezel.position.set(0, 1.85, -0.9);
    monGrp.add(bezel);

    const scrMat = new THREE.MeshStandardMaterial({ color:0x0a2a2a, emissive:0x0d4a4a, emissiveIntensity:1.2, roughness:0.1 });
    const scrMesh = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.38, 0.01), scrMat);
    scrMesh.position.set(0, 1.85, -0.85);
    monGrp.add(scrMesh);

    const CODE_COLORS = [0x4ecdc4,0x6c63ff,0x4ecdc4,0xa78bfa,0x4ecdc4,0x6c63ff,0x4ecdc4];
    const CODE_W      = [1.1,0.7,0.9,0.55,1.0,0.65,0.85];
    const codeLines: any[] = [];
    for (let i = 0; i < 7; i++) {
      const lm = new THREE.Mesh(
        new THREE.BoxGeometry(CODE_W[i], 0.045, 0.001),
        new THREE.MeshStandardMaterial({ color:CODE_COLORS[i], emissive:CODE_COLORS[i], emissiveIntensity:0.9, transparent:true, opacity:0.75 })
      );
      lm.position.set(-0.55 + CODE_W[i]/2 - 1.1, 2.42 - i*0.185, -0.84);
      monGrp.add(lm);
      codeLines.push(lm);
    }

    const curMat = new THREE.MeshStandardMaterial({ color:0x4ecdc4, emissive:0x4ecdc4, emissiveIntensity:2 });
    const cursor  = new THREE.Mesh(new THREE.BoxGeometry(0.05,0.13,0.001), curMat);
    cursor.position.set(0.3, 1.55, -0.84);
    monGrp.add(cursor);

    const mNeck = new THREE.Mesh(new THREE.BoxGeometry(0.12,0.45,0.1), stdMat(0x111118, 0.5));
    mNeck.position.set(0, 0.82, -0.9);
    monGrp.add(mNeck);
    const mBase = new THREE.Mesh(new THREE.BoxGeometry(0.7,0.045,0.38), stdMat(0x111118, 0.5));
    mBase.position.set(0, 0.60, -0.85);
    monGrp.add(mBase);

    // Keyboard
    const kbGrp = new THREE.Group();
    scene.add(kbGrp);
    const kb = new THREE.Mesh(new THREE.BoxGeometry(1.85,0.055,0.62), stdMat(0x18181f,0.4,0.5));
    kb.position.set(0,-0.44,0.55); kb.rotation.x = -0.06;
    kbGrp.add(kb);
    const kMat = stdMat(0x222230,0.3,0.6);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 12; c++) {
      const k = new THREE.Mesh(new THREE.BoxGeometry(0.11,0.03,0.1), kMat);
      k.position.set(-0.8+c*0.138,-0.41,0.3+r*0.12);
      k.rotation.x = -0.06;
      kbGrp.add(k);
    }

    // Chair
    addBox(2.0,0.10,1.80, 0x0e0e16,  0,   -1.6, 1.4);
    addBox(2.0,2.00,0.12, 0x0e0e16,  0,   -0.5, 2.38, -0.1);
    addBox(0.12,0.08,1.0, 0x16161f,-0.95,-1.3,  1.4);
    addBox(0.12,0.08,1.0, 0x16161f, 0.95,-1.3,  1.4);

    // Character
    const charGrp = new THREE.Group();
    charGrp.position.set(0, 0, 1.0);
    scene.add(charGrp);

    const skinMat  = stdMat(0xd4956a, 0, 0.7);
    const shirtMat = stdMat(0x1e1e3f, 0, 0.8);
    const pantsMat = stdMat(0x151520, 0, 0.8);
    const hairMat  = stdMat(0x1a0f0f, 0, 0.9);
    const glassMat = stdMat(0x333333, 0.9, 0.1);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.72,0.88,0.38), shirtMat);
    torso.position.set(0,0.5,0); charGrp.add(torso);

    const neckM = new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.10,0.20,8), skinMat);
    neckM.position.set(0,1.06,0); charGrp.add(neckM);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.46,0.50,0.42), skinMat);
    head.position.set(0,1.44,0); head.rotation.x = 0.32; charGrp.add(head);

    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.48,0.22,0.44), hairMat);
    hair.position.set(0,1.66,-0.04); hair.rotation.x = 0.32; charGrp.add(hair);

    for (const xOff of [-0.13, 0.13]) {
      const f = new THREE.Mesh(new THREE.TorusGeometry(0.075,0.012,6,14), glassMat);
      f.position.set(xOff, 1.44, 0.22);
      f.rotation.x = Math.PI / 2 + 0.32;
      charGrp.add(f);
    }
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.07,0.012,0.012), glassMat);
    bridge.position.set(0, 1.445, 0.22); charGrp.add(bridge);

    const armGeo = new THREE.BoxGeometry(0.19,0.52,0.19);
    const lUA = new THREE.Mesh(armGeo, shirtMat);
    lUA.position.set(-0.47,0.22,0); lUA.rotation.x = 0.55; charGrp.add(lUA);
    const rUA = new THREE.Mesh(armGeo, shirtMat);
    rUA.position.set( 0.47,0.22,0); rUA.rotation.x = 0.55; charGrp.add(rUA);

    // ✅ FIX: forearms — set position directly, never Object.assign
    const makeForearm = (xPos: number) => {
      const grp = new THREE.Group();
      const fm = new THREE.Mesh(new THREE.BoxGeometry(0.16,0.46,0.16), skinMat);
      fm.position.set(0, -0.23, 0);
      grp.add(fm);
      const hm = new THREE.Mesh(new THREE.BoxGeometry(0.18,0.13,0.13), skinMat);
      hm.position.set(0, -0.51, 0);
      grp.add(hm);
      grp.position.set(xPos, -0.04, 0.26);
      grp.rotation.x = 0.85;
      charGrp.add(grp);
      return grp;
    };
    const lFA = makeForearm(-0.47);
    const rFA = makeForearm( 0.47);

    const legGeo = new THREE.BoxGeometry(0.3,0.7,0.3);
    const lLeg = new THREE.Mesh(legGeo, pantsMat);
    lLeg.position.set(-0.2,-0.9,0.3); lLeg.rotation.x = 0.3; charGrp.add(lLeg);
    const rLeg = new THREE.Mesh(legGeo, pantsMat);
    rLeg.position.set( 0.2,-0.9,0.3); rLeg.rotation.x = 0.3; charGrp.add(rLeg);

    // Mug
    const mugGrp = new THREE.Group();
    mugGrp.position.set(1.6,-0.38,0.1);
    scene.add(mugGrp);
    mugGrp.add(new THREE.Mesh(new THREE.CylinderGeometry(0.095,0.08,0.22,12), stdMat(0x2a1a1a,0.1,0.7)));
    const mh = new THREE.Mesh(new THREE.TorusGeometry(0.065,0.018,8,12,Math.PI), stdMat(0x2a1a1a));
    mh.position.set(0.1,0,0); mh.rotation.y = Math.PI/2; mugGrp.add(mh);

    interface SteamParticle { mesh: any; off: number; }
    const steam: SteamParticle[] = [];
    for (let i = 0; i < 5; i++) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.018,4,4),
        new THREE.MeshBasicMaterial({ color:0xaadddd, transparent:true, opacity:0.3 })
      );
      mesh.position.set((Math.random()-0.5)*0.06, 0.18+i*0.06, 0);
      mugGrp.add(mesh);
      steam.push({ mesh, off: i*0.9+Math.random()*1.5 });
    }

    // Particles
    const pp = new Float32Array(80*3);
    for (let i = 0; i < 80; i++) {
      pp[i*3]   = (Math.random()-0.5)*7;
      pp[i*3+1] = (Math.random()-0.5)*5;
      pp[i*3+2] = (Math.random()-0.5)*4;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pp,3));
    scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color:0x4ecdc4, size:0.022, transparent:true, opacity:0.4 })));

    let t = 0;
    let raf: number;

    const tick = (): void => {
      raf = requestAnimationFrame(tick);
      t += 0.016;

      charGrp.rotation.y = mouseRef.current.x * 0.18;
      monGrp.rotation.y  = mouseRef.current.x * 0.04;
      kbGrp.rotation.y   = mouseRef.current.x * 0.04;

      lFA.rotation.x = 0.85 + Math.sin(t*4.5)*0.12;
      rFA.rotation.x = 0.85 + Math.sin(t*4.5+Math.PI)*0.12;

      head.position.y = 1.44 + Math.sin(t*1.1)*0.008;
      hair.position.y = 1.66 + Math.sin(t*1.1)*0.008;

      curMat.emissiveIntensity = Math.sin(t*4) > 0 ? 2.0 : 0.0;
      screenLight.intensity    = 4.5 + Math.sin(t*7)*0.15;

      codeLines.forEach(cl => { cl.position.y += 0.0008; if (cl.position.y > 2.5) cl.position.y = 1.45; });

      steam.forEach(({ mesh, off }) => {
        mesh.position.y = 0.18 + ((t*0.4+off)%0.5)*0.6;
        mesh.position.x = Math.sin(t*1.5+off)*0.04;
        mesh.material.opacity = 0.3*(1-((t*0.4+off)%0.5)*1.8);
      });

      renderer.render(scene, camera);
    };
    tick();

    const onResize = (): void => {
      renderer.setSize(W(), H());
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return (): void => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position:"relative", width:"100%", aspectRatio:"1", maxWidth:460, margin:"0 auto" }}>
      <canvas ref={canvasRef} style={{ width:"100%", height:"100%", display:"block" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)" }} />
      {FLOAT_LABELS.map((fl) => (
        <div key={fl.text} style={{
          position:"absolute", top:fl.top, bottom:fl.bottom, left:fl.left, right:fl.right,
          fontFamily:"monospace", fontSize:"0.5rem", letterSpacing:"0.06em",
          color:fl.color, border:"1px solid rgba(255,255,255,0.08)",
          background:"rgba(7,7,15,0.9)", padding:"0.35rem 0.7rem", whiteSpace:"nowrap",
          animation:`floatY 5s ease-in-out ${fl.delay} infinite`,
        }}>{fl.text}</div>
      ))}
    </div>
  );
};

// ── Section Label ─────────────────────────────────────────────
const SL: React.FC<{ label: string }> = ({ label }) => (
  <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"3rem" }}>
    <span style={{ fontFamily:"monospace", fontSize:"0.63rem", letterSpacing:"0.22em",
      textTransform:"uppercase", color:"rgba(201,169,110,0.35)" }}>{label}</span>
    <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.06)" }} />
  </div>
);

// ── Main Page ─────────────────────────────────────────────────
const About: React.FC = () => {
  const [ready, setReady] = useState<boolean>(false);

  // ✅ FIX: load Three.js — no return value from this branch
  useEffect((): void => {
    if (window.THREE) { setReady(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    s.onload = () => setReady(true);
    document.head.appendChild(s);
  }, []);

  // ✅ FIX: inject styles — return cleanup fn (void-compatible)
  useEffect(() => {
    const el = document.createElement("style");
    el.id = "about-kf";
    el.textContent = `
      @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes fadeUp  { to { opacity:1; transform:translateY(0) } }
      @keyframes pulseDot{ 0%,100%{opacity:1} 50%{opacity:0.2} }
    `;
    if (!document.getElementById("about-kf")) document.head.appendChild(el);
    return () => { document.getElementById("about-kf")?.remove(); };
  }, []);

  const serif = "Georgia,'Times New Roman',serif";
  const mono  = "'Courier New',monospace";
  const gold  = "rgba(201,169,110,0.9)";
  const dim   = "rgba(255,255,255,0.25)";
  const bdr   = "rgba(255,255,255,0.06)";

  const fu = (delay = "0s"): React.CSSProperties => ({
    opacity: 0, transform: "translateY(24px)",
    animation: `fadeUp .8s ${delay} cubic-bezier(.22,1,.36,1) forwards`,
  });

  return (
    <div style={{ minHeight:"100vh", background:"#07070f", color:"#eae6f0", fontFamily:serif, overflowX:"hidden" }}>

      {/* Noise overlay */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, opacity:0.25,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        backgroundSize:"200px" }} />

      <div style={{ position:"relative", zIndex:1, maxWidth:1020, margin:"0 auto", padding:"0 2rem" }}>

        {/* NAV */}
        <nav style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"2rem 0", borderBottom:`1px solid ${bdr}` }}>
          <span style={{ fontFamily:mono, fontSize:"0.72rem", letterSpacing:"0.18em", textTransform:"uppercase", color:gold }}>YourName.dev</span>
          <div style={{ display:"flex", gap:"2.5rem" }}>
            {(["Work","About","Projects","Contact"] as const).map(l => (
              <span key={l} style={{ fontFamily:mono, fontSize:"0.65rem", letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer", color:l==="About" ? gold : dim }}>{l}</span>
            ))}
          </div>
        </nav>

        {/* HERO */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"4rem", alignItems:"center", padding:"6rem 0 4rem" }}>
          <div>
            <div style={{ ...fu("0s"), display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.5rem" }}>
              <div style={{ width:28, height:1, background:"rgba(201,169,110,0.35)" }} />
              <span style={{ fontFamily:mono, fontSize:"0.62rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(201,169,110,0.55)" }}>About me</span>
            </div>

            <h1 style={{ ...fu(".1s"), fontSize:"clamp(2.6rem,5vw,4.2rem)", fontWeight:300, lineHeight:1.08, margin:"0 0 1.2rem" }}>
              Building my<br />path in{" "}<em style={{ fontStyle:"italic", color:gold }}>code</em><br />&amp; design
            </h1>

            <p style={{ ...fu(".2s"), fontSize:"1.1rem", fontWeight:300, color:dim, lineHeight:1.8, maxWidth:"38ch", margin:"0 0 1.5rem" }}>
              Frontend developer in the making — turning curiosity into projects, and projects into skills.
            </p>

            <div style={{ ...fu(".3s"), display:"inline-flex", alignItems:"center", gap:"0.5rem", border:"1px solid rgba(78,205,196,0.25)", padding:"0.4rem 0.9rem", marginBottom:"2rem" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ecdc4", animation:"pulseDot 1.8s infinite" }} />
              <span style={{ fontFamily:mono, fontSize:"0.58rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"#4ecdc4" }}>Open to opportunities</span>
            </div>

            <div style={{ ...fu(".45s"), display:"flex", gap:"0.8rem", flexWrap:"wrap" }}>
              <button style={{ fontFamily:mono, fontSize:"0.62rem", letterSpacing:"0.16em", textTransform:"uppercase", padding:"0.8rem 1.8rem", cursor:"pointer", background:gold, color:"#07070f", border:`1px solid ${gold}` }}>
                See My Projects
              </button>
              <button style={{ fontFamily:mono, fontSize:"0.62rem", letterSpacing:"0.16em", textTransform:"uppercase", padding:"0.8rem 1.8rem", cursor:"pointer", background:"transparent", color:dim, border:`1px solid ${bdr}` }}>
                Download CV
              </button>
            </div>
          </div>

          <div style={fu(".6s")}>
            {ready
              ? <Scene3D />
              : <div style={{ aspectRatio:"1", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontFamily:mono, fontSize:"0.6rem", color:dim, letterSpacing:"0.2em" }}>Loading scene…</span>
                </div>
            }
          </div>
        </div>

        <div style={{ height:1, background:bdr }} />

        {/* STORY */}
        <section style={{ padding:"5rem 0" }}>
          <SL label="My story" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"4rem" }}>
            <h3 style={{ fontSize:"2rem", fontWeight:300, lineHeight:1.3, margin:0 }}>
              Every expert<br />was once a<br /><em style={{ color:gold }}>beginner</em>
            </h3>
            <div>
              {[
                <span key="p1">Hi, I'm <strong style={{ color:"#eae6f0", fontWeight:400 }}>Your Name</strong> — a fresh frontend developer based in Indonesia, on a mission to turn passion into profession.</span>,
                <span key="p2">My journey started when I first opened a code editor and a few lines of HTML brought something to life. That spark turned into an obsession with crafting beautiful, functional interfaces.</span>,
                <span key="p3">I don't have years of corporate experience yet — but I have <strong style={{ color:"#eae6f0", fontWeight:400 }}>genuine curiosity, personal projects</strong>, and an appetite for learning that doesn't stop.</span>,
              ].map((p, i) => (
                <p key={i} style={{ fontSize:"1.1rem", fontWeight:300, lineHeight:1.85, color:"rgba(255,255,255,0.32)", marginBottom:"1.2rem" }}>{p}</p>
              ))}
            </div>
          </div>

          <div style={{ marginTop:"3rem", borderTop:`1px solid ${bdr}` }}>
            {JOURNEY.map((s) => (
              <div key={s.n} style={{ display:"flex", gap:"2rem", padding:"1.8rem 0", borderBottom:`1px solid ${bdr}` }}>
                <span style={{ fontFamily:mono, fontSize:"0.6rem", letterSpacing:"0.12em", color:"rgba(201,169,110,0.5)", minWidth:"2.8rem", paddingTop:"0.15rem" }}>{s.n} —</span>
                <div>
                  <h4 style={{ fontSize:"1.1rem", fontWeight:400, marginBottom:"0.4rem" }}>{s.title}</h4>
                  <p style={{ fontFamily:mono, fontSize:"0.63rem", color:dim, lineHeight:1.9, margin:0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height:1, background:bdr }} />

        {/* SKILLS */}
        <section style={{ padding:"5rem 0" }}>
          <SL label="What I know" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:1, background:bdr, border:`1px solid ${bdr}` }}>
            {SKILLS.map((s) => (
              <div key={s.title}
                style={{ background:"#07070f", padding:"2rem", position:"relative", overflow:"hidden", transition:"background .3s", cursor:"default" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "#0d0d1a";
                  ((e.currentTarget as HTMLDivElement).querySelector(".bar") as HTMLDivElement).style.width = "100%";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "#07070f";
                  ((e.currentTarget as HTMLDivElement).querySelector(".bar") as HTMLDivElement).style.width = "0";
                }}>
                <div className="bar" style={{ position:"absolute", bottom:0, left:0, height:2, width:0, background:"linear-gradient(90deg,#6c63ff,#4ecdc4)", transition:"width .4s ease" }} />
                <p style={{ fontFamily:mono, fontSize:"0.57rem", letterSpacing:"0.16em", textTransform:"uppercase", color:"#6c63ff", marginBottom:"0.75rem" }}>{s.tag}</p>
                <h4 style={{ fontFamily:serif, fontSize:"1.1rem", fontWeight:400, marginBottom:"0.5rem" }}>{s.title}</h4>
                <p style={{ fontFamily:mono, fontSize:"0.62rem", lineHeight:1.9, color:dim, whiteSpace:"pre-line", margin:0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height:1, background:bdr }} />

        {/* LEARNING */}
        <section style={{ padding:"5rem 0" }}>
          <SL label="Currently learning" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.2rem" }}>
            {LEARNING.map((item) => (
              <div key={item.title} style={{ border:`1px solid ${bdr}`, padding:"1.8rem", background:"#0d0d1a" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.9rem" }}>
                  <h4 style={{ fontFamily:serif, fontSize:"1.1rem", fontWeight:400, margin:0 }}>{item.title}</h4>
                  <span style={{ fontFamily:mono, fontSize:"0.53rem", letterSpacing:"0.14em", textTransform:"uppercase", padding:"0.28rem 0.65rem",
                    color:item.active ? "#4ecdc4" : "rgba(201,169,110,0.8)",
                    border:`1px solid ${item.active ? "rgba(78,205,196,0.3)" : "rgba(201,169,110,0.3)"}` }}>
                    {item.active ? "In Progress" : "Completed"}
                  </span>
                </div>
                <p style={{ fontFamily:mono, fontSize:"0.62rem", color:dim, lineHeight:1.9, margin:"0 0 0.9rem" }}>{item.desc}</p>
                <div style={{ height:2, background:bdr }}>
                  <div style={{ height:"100%", width:`${item.pct}%`, background:"linear-gradient(90deg,#6c63ff,#4ecdc4)" }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height:1, background:bdr }} />

        {/* VALUES */}
        <section style={{ padding:"5rem 0" }}>
          <SL label="What drives me" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", border:`1px solid ${bdr}` }}>
            {([
              { n:"01", em:"Curiosity", rest:" first",      body:`I ask "why" before "how". Understanding the problem is half the solution.` },
              { n:"02", em:"Ship",      rest:" & iterate",  body:"I believe in launching imperfect things and improving them — done beats perfect." },
              { n:"03", em:"Design",    rest:" matters",    body:"Good code deserves beautiful presentation. Details make the difference." },
            ] as const).map((v, i, arr) => (
              <div key={v.n} style={{ padding:"2.5rem 2rem", borderRight:i < arr.length-1 ? `1px solid ${bdr}` : "none" }}>
                <p style={{ fontFamily:mono, fontSize:"0.6rem", letterSpacing:"0.14em", color:"rgba(201,169,110,0.35)", marginBottom:"0.8rem" }}>{v.n}</p>
                <h4 style={{ fontFamily:serif, fontSize:"1.25rem", fontWeight:300, marginBottom:"0.5rem" }}>
                  <em style={{ color:gold }}>{v.em}</em>{v.rest}
                </h4>
                <p style={{ fontFamily:mono, fontSize:"0.62rem", lineHeight:1.9, color:dim, margin:0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ borderTop:`1px solid ${bdr}`, padding:"5rem 0", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"2rem" }}>
          <div>
            <h2 style={{ fontFamily:serif, fontSize:"clamp(1.8rem,3vw,3rem)", fontWeight:300, lineHeight:1.2, margin:"0 0 0.6rem" }}>
              Looking for a <em style={{ color:gold }}>motivated</em><br />junior developer?
            </h2>
            <p style={{ fontFamily:mono, fontSize:"0.62rem", color:dim, margin:0 }}>Open to internships, junior roles, and freelance projects.</p>
          </div>
          <button style={{ fontFamily:mono, fontSize:"0.62rem", letterSpacing:"0.16em", textTransform:"uppercase", padding:"0.9rem 2rem", cursor:"pointer", background:gold, color:"#07070f", border:`1px solid ${gold}`, whiteSpace:"nowrap" }}>
            Say Hello
          </button>
        </div>

        {/* FOOTER */}
        <footer style={{ borderTop:`1px solid ${bdr}`, padding:"1.8rem 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <p style={{ fontFamily:mono, fontSize:"0.6rem", letterSpacing:"0.12em", color:dim, margin:0 }}>© 2026 Your Name — Indonesia</p>
          <div style={{ display:"flex", gap:"2rem" }}>
            {(["GitHub","LinkedIn","Twitter"] as const).map(l => (
              <span key={l} style={{ fontFamily:mono, fontSize:"0.6rem", letterSpacing:"0.12em", color:dim, cursor:"pointer" }}>{l}</span>
            ))}
          </div>
        </footer>

      </div>
    </div>
  );
};

export default About;