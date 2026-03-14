import * as React from "react";

function Illustration3D() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouseRef = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.THREE) return;
    const THREE = window.THREE;
    const wrap = canvas.parentElement as HTMLElement;
    const W = () => wrap.clientWidth;
    const H = () => wrap.clientHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.setSize(W(), H());

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W() / H(), 0.1, 100);
    camera.position.set(0, 2.2, 9);
    camera.lookAt(0, 0.5, 0);

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

    const sm = (c: number, m = 0.2, r = 0.7) =>
      new THREE.MeshStandardMaterial({ color: c, metalness: m, roughness: r });

    const addBox = (
      w: number,
      h: number,
      d: number,
      c: number,
      x: number,
      y: number,
      z: number,
      rx = 0,
      ry = 0,
    ) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), sm(c));
      mesh.position.set(x, y, z);
      mesh.rotation.x = rx;
      mesh.rotation.y = ry;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      return mesh;
    };

    // Desk
    addBox(6.5, 0.12, 2.8, 0x1a1525, 0, -0.5, 0);
    addBox(0.12, 1.8, 0.12, 0x12101a, -3.1, -1.4, -1.2);
    addBox(0.12, 1.8, 0.12, 0x12101a, 3.1, -1.4, -1.2);
    addBox(0.12, 1.8, 0.12, 0x12101a, -3.1, -1.4, 1.2);
    addBox(0.12, 1.8, 0.12, 0x12101a, 3.1, -1.4, 1.2);

    // Monitor
    const monGrp = new THREE.Group();
    scene.add(monGrp);
    const bezel = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 1.65, 0.09),
      sm(0x111118, 0.5, 0.4),
    );
    bezel.position.set(0, 1.85, -0.9);
    monGrp.add(bezel);

    const scrMat = new THREE.MeshStandardMaterial({
      color: 0x0a2a2a,
      emissive: 0x0d4a4a,
      emissiveIntensity: 1.2,
      roughness: 0.1,
    });
    const scrMesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 1.38, 0.01),
      scrMat,
    );
    scrMesh.position.set(0, 1.85, -0.85);
    monGrp.add(scrMesh);

    const CC = [
      0x4ecdc4, 0x6c63ff, 0x4ecdc4, 0xa78bfa, 0x4ecdc4, 0x6c63ff, 0x4ecdc4,
    ];
    const CW = [1.1, 0.7, 0.9, 0.55, 1.0, 0.65, 0.85];
    const codeLines: any[] = [];
    for (let i = 0; i < 7; i++) {
      const lm = new THREE.Mesh(
        new THREE.BoxGeometry(CW[i], 0.045, 0.001),
        new THREE.MeshStandardMaterial({
          color: CC[i],
          emissive: CC[i],
          emissiveIntensity: 0.9,
          transparent: true,
          opacity: 0.75,
        }),
      );
      lm.position.set(-0.55 + CW[i] / 2 - 1.1, 2.42 - i * 0.185, -0.84);
      monGrp.add(lm);
      codeLines.push(lm);
    }
    const curMat = new THREE.MeshStandardMaterial({
      color: 0x4ecdc4,
      emissive: 0x4ecdc4,
      emissiveIntensity: 2,
    });
    const cursor = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.13, 0.001),
      curMat,
    );
    cursor.position.set(0.3, 1.55, -0.84);
    monGrp.add(cursor);
    const mNeck = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.45, 0.1),
      sm(0x111118, 0.5),
    );
    mNeck.position.set(0, 0.82, -0.9);
    monGrp.add(mNeck);
    const mBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.045, 0.38),
      sm(0x111118, 0.5),
    );
    mBase.position.set(0, 0.6, -0.85);
    monGrp.add(mBase);

    // Keyboard
    const kbGrp = new THREE.Group();
    scene.add(kbGrp);
    const kb = new THREE.Mesh(
      new THREE.BoxGeometry(1.85, 0.055, 0.62),
      sm(0x18181f, 0.4, 0.5),
    );
    kb.position.set(0, -0.44, 0.55);
    kb.rotation.x = -0.06;
    kbGrp.add(kb);
    const kMat = sm(0x222230, 0.3, 0.6);
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 12; c++) {
        const k = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.03, 0.1), kMat);
        k.position.set(-0.8 + c * 0.138, -0.41, 0.3 + r * 0.12);
        k.rotation.x = -0.06;
        kbGrp.add(k);
      }

    // Chair
    addBox(2.0, 0.1, 1.8, 0x0e0e16, 0, -1.6, 1.4);
    addBox(2.0, 2.0, 0.12, 0x0e0e16, 0, -0.5, 2.38, -0.1);
    addBox(0.12, 0.08, 1.0, 0x16161f, -0.95, -1.3, 1.4);
    addBox(0.12, 0.08, 1.0, 0x16161f, 0.95, -1.3, 1.4);

    // Character
    const charGrp = new THREE.Group();
    charGrp.position.set(0, 0, 1.0);
    scene.add(charGrp);

    const skinMat = sm(0xd4956a, 0, 0.7);
    const shirtMat = sm(0x1e1e3f, 0, 0.8);
    const pantsMat = sm(0x151520, 0, 0.8);
    const hairMat = sm(0x1a0f0f, 0, 0.9);
    const glassMat = sm(0x333333, 0.9, 0.1);

    const torso = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.88, 0.38),
      shirtMat,
    );
    torso.position.set(0, 0.5, 0);
    charGrp.add(torso);

    const neckM = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.1, 0.2, 8),
      skinMat,
    );
    neckM.position.set(0, 1.06, 0);
    charGrp.add(neckM);

    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.5, 0.42),
      skinMat,
    );
    head.position.set(0, 1.44, 0);
    head.rotation.x = 0.32;
    charGrp.add(head);

    const hair = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.22, 0.44),
      hairMat,
    );
    hair.position.set(0, 1.66, -0.04);
    hair.rotation.x = 0.32;
    charGrp.add(hair);

    for (const xOff of [-0.13, 0.13]) {
      const f = new THREE.Mesh(
        new THREE.TorusGeometry(0.075, 0.012, 6, 14),
        glassMat,
      );
      f.position.set(xOff, 1.44, 0.22);
      f.rotation.x = Math.PI / 2 + 0.32;
      charGrp.add(f);
    }
    const bridge = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 0.012, 0.012),
      glassMat,
    );
    bridge.position.set(0, 1.445, 0.22);
    charGrp.add(bridge);

    const armGeo = new THREE.BoxGeometry(0.19, 0.52, 0.19);
    const lUA = new THREE.Mesh(armGeo, shirtMat);
    lUA.position.set(-0.47, 0.22, 0);
    lUA.rotation.x = 0.55;
    charGrp.add(lUA);
    const rUA = new THREE.Mesh(armGeo, shirtMat);
    rUA.position.set(0.47, 0.22, 0);
    rUA.rotation.x = 0.55;
    charGrp.add(rUA);

    const makeForearm = (xPos: number) => {
      const grp = new THREE.Group();
      const fm = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.46, 0.16),
        skinMat,
      );
      fm.position.set(0, -0.23, 0);
      grp.add(fm);
      const hm = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.13, 0.13),
        skinMat,
      );
      hm.position.set(0, -0.51, 0);
      grp.add(hm);
      grp.position.set(xPos, -0.04, 0.26);
      grp.rotation.x = 0.85;
      charGrp.add(grp);
      return grp;
    };
    const lFA = makeForearm(-0.47);
    const rFA = makeForearm(0.47);

    const legGeo = new THREE.BoxGeometry(0.3, 0.7, 0.3);
    const lLeg = new THREE.Mesh(legGeo, pantsMat);
    lLeg.position.set(-0.2, -0.9, 0.3);
    lLeg.rotation.x = 0.3;
    charGrp.add(lLeg);
    const rLeg = new THREE.Mesh(legGeo, pantsMat);
    rLeg.position.set(0.2, -0.9, 0.3);
    rLeg.rotation.x = 0.3;
    charGrp.add(rLeg);

    // Mug
    const mugGrp = new THREE.Group();
    mugGrp.position.set(1.6, -0.38, 0.1);
    scene.add(mugGrp);
    mugGrp.add(
      new THREE.Mesh(
        new THREE.CylinderGeometry(0.095, 0.08, 0.22, 12),
        sm(0x2a1a1a, 0.1, 0.7),
      ),
    );
    const mh = new THREE.Mesh(
      new THREE.TorusGeometry(0.065, 0.018, 8, 12, Math.PI),
      sm(0x2a1a1a),
    );
    mh.position.set(0.1, 0, 0);
    mh.rotation.y = Math.PI / 2;
    mugGrp.add(mh);

    const steam: Array<{ mesh: any; off: number }> = [];
    for (let i = 0; i < 5; i++) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 4, 4),
        new THREE.MeshBasicMaterial({
          color: 0xaadddd,
          transparent: true,
          opacity: 0.3,
        }),
      );
      mesh.position.set((Math.random() - 0.5) * 0.06, 0.18 + i * 0.06, 0);
      mugGrp.add(mesh);
      steam.push({ mesh, off: i * 0.9 + Math.random() * 1.5 });
    }

    // Particles
    const pp = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      pp[i * 3] = (Math.random() - 0.5) * 7;
      pp[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pp[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pp, 3));
    scene.add(
      new THREE.Points(
        pg,
        new THREE.PointsMaterial({
          color: 0x4ecdc4,
          size: 0.022,
          transparent: true,
          opacity: 0.4,
        }),
      ),
    );

    let t = 0,
      raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.016;
      charGrp.rotation.y = mouseRef.current.x * 0.18;
      monGrp.rotation.y = mouseRef.current.x * 0.04;
      kbGrp.rotation.y = mouseRef.current.x * 0.04;
      lFA.rotation.x = 0.85 + Math.sin(t * 4.5) * 0.12;
      rFA.rotation.x = 0.85 + Math.sin(t * 4.5 + Math.PI) * 0.12;
      head.position.y = 1.44 + Math.sin(t * 1.1) * 0.008;
      hair.position.y = 1.66 + Math.sin(t * 1.1) * 0.008;
      curMat.emissiveIntensity = Math.sin(t * 4) > 0 ? 2.0 : 0.0;
      screenLight.intensity = 4.5 + Math.sin(t * 7) * 0.15;
      codeLines.forEach((cl) => {
        cl.position.y += 0.0008;
        if (cl.position.y > 2.5) cl.position.y = 1.45;
      });
      steam.forEach(({ mesh, off }) => {
        mesh.position.y = 0.18 + ((t * 0.4 + off) % 0.5) * 0.6;
        mesh.position.x = Math.sin(t * 1.5 + off) * 0.04;
        mesh.material.opacity = 0.3 * (1 - ((t * 0.4 + off) % 0.5) * 1.8);
      });
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      renderer.setSize(W(), H());
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full max-w-[460px] mx-auto"
      style={{ aspectRatio: "1" }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)",
        }}
      />
      {[
        {
          text: "const dev = 'passionate';",
          cls: "top-[8%] -left-[4%]",
          color: "text-yellow-400/70",
          delay: "0s",
        },
        {
          text: "npm run build ✓",
          cls: "top-[45%] -right-[6%]",
          color: "text-cyan-400/70",
          delay: "1.6s",
        },
        {
          text: "</> learning everyday",
          cls: "bottom-[10%] left-[2%]",
          color: "text-purple-400/70",
          delay: "3s",
        },
      ].map((fl) => (
        <div
          key={fl.text}
          className={`absolute ${fl.cls} ${fl.color} font-mono text-[0.5rem] tracking-wider border border-white/10 bg-[rgba(7,7,15,0.9)] px-2 py-1 whitespace-nowrap hidden lg:block`}
          style={{ animation: `floatY 5s ease-in-out ${fl.delay} infinite` }}
        >
          {fl.text}
        </div>
      ))}
    </div>
  );
}

export default Illustration3D;
