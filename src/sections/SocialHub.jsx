import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const accounts = [
  {
    platform: "YouTube",
    title: "My Main Channel",
    username: "svmtechnicalpoint",
    description: "Videos & Content",
    url: "https://www.youtube.com/@svmtechnicalpoint",
    color: "#ff0033",
    icon: "▶",
  },
  {
    platform: "YouTube",
    title: "Second Channel",
    username: "@Svmkiduniya",
    description: "Second YouTube Channel",
    url: "https://www.youtube.com/@Svmkiduniya",
    color: "#ff0033",
    icon: "▶",
  },
  {
    platform: "Telegram",
    title: "@SVMTECHNICALPOINT",
    username: "@mytelegram",
    description: "Join my community",
    url: "https://t.me/svmtechnicalpoint",
    color: "#229ed9",
    icon: "➤",
  },
  {
    platform: "WhatsApp",
    title: "WhatsApp",
    username: "Chat With Me",
    description: "Direct WhatsApp chat",
    url: "7348301658",
    color: "#25d366",
    icon: "◉",
  },
  {
    platform: "Instagram",
    title: "Instagram",
    username: "@myinstagram",
    description: "Photos & Reels",
    url: "https://instagram.com/svm__maurya/",
    color: "#e1306c",
    icon: "◎",
  },
  {
    platform: "Facebook",
    title: "Facebook Page",
    username: "/svm.maurya.2025/",
    description: "Follow my Facebook",
    url: "https://www.facebook.com/svm.maurya.2025/",
    color: "#1877f2",
    icon: "f",
  },
];

function ThreeScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const parent = canvas.parentElement;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      parent.clientWidth / parent.clientHeight,
      0.1,
      100
    );

    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
      parent.clientWidth,
      parent.clientHeight
    );

    /* =========================
       CENTRAL 3D CORE
    ========================= */

    const coreGeometry =
      new THREE.IcosahedronGeometry(1.15, 3);

    const coreMaterial =
      new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });

    const core = new THREE.Mesh(
      coreGeometry,
      coreMaterial
    );

    scene.add(core);

    /* =========================
       INNER CORE
    ========================= */

    const innerGeometry =
      new THREE.IcosahedronGeometry(0.7, 2);

    const innerMaterial =
      new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });

    const innerCore = new THREE.Mesh(
      innerGeometry,
      innerMaterial
    );

    scene.add(innerCore);

    /* =========================
       RINGS
    ========================= */

    const rings = [];

    for (let i = 0; i < 3; i++) {
      const geometry =
        new THREE.TorusGeometry(
          1.5 + i * 0.3,
          0.008,
          12,
          100
        );

      const material =
        new THREE.MeshBasicMaterial({
          color:
            i % 2 === 0
              ? 0x00e5ff
              : 0xec4899,
          transparent: true,
          opacity: 0.45,
        });

      const ring =
        new THREE.Mesh(
          geometry,
          material
        );

      ring.rotation.x =
        i * 0.7;

      ring.rotation.y =
        i * 0.5;

      scene.add(ring);

      rings.push(ring);
    }

    /* =========================
       PARTICLES
    ========================= */

    const particleCount = 700;

    const particlePositions =
      new Float32Array(
        particleCount * 3
      );

    for (
      let i = 0;
      i < particleCount;
      i++
    ) {
      particlePositions[
        i * 3
      ] =
        (Math.random() - 0.5) * 14;

      particlePositions[
        i * 3 + 1
      ] =
        (Math.random() - 0.5) * 9;

      particlePositions[
        i * 3 + 2
      ] =
        (Math.random() - 0.5) * 12;
    }

    const particleGeometry =
      new THREE.BufferGeometry();

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        particlePositions,
        3
      )
    );

    const particleMaterial =
      new THREE.PointsMaterial({
        color: 0x8b5cf6,
        size: 0.025,
        transparent: true,
        opacity: 0.7,
      });

    const particles =
      new THREE.Points(
        particleGeometry,
        particleMaterial
      );

    scene.add(particles);

    /* =========================
       LIGHTS
    ========================= */

    const purpleLight =
      new THREE.PointLight(
        0x8b5cf6,
        8,
        10
      );

    purpleLight.position.set(
      0,
      0,
      2
    );

    scene.add(purpleLight);

    const cyanLight =
      new THREE.PointLight(
        0x00e5ff,
        4,
        8
      );

    cyanLight.position.set(
      3,
      2,
      2
    );

    scene.add(cyanLight);

    /* =========================
       MOUSE
    ========================= */

    let mouseX = 0;
    let mouseY = 0;

    const mouseMove = (event) => {
      mouseX =
        (event.clientX /
          window.innerWidth -
          0.5) *
        2;

      mouseY =
        (event.clientY /
          window.innerHeight -
          0.5) *
        2;
    };

    window.addEventListener(
      "mousemove",
      mouseMove
    );

    /* =========================
       ANIMATION
    ========================= */

    let animationId;

    const clock =
      new THREE.Clock();

    const animate = () => {
      animationId =
        requestAnimationFrame(
          animate
        );

      const time =
        clock.getElapsedTime();

      core.rotation.x =
        time * 0.18;

      core.rotation.y =
        time * 0.3;

      innerCore.rotation.x =
        -time * 0.25;

      innerCore.rotation.y =
        -time * 0.2;

      rings.forEach(
        (ring, index) => {
          ring.rotation.z +=
            0.001 +
            index * 0.0004;

          ring.rotation.x +=
            0.0005;
        }
      );

      particles.rotation.y =
        time * 0.015;

      core.rotation.x +=
        mouseY * 0.05;

      core.rotation.y +=
        mouseX * 0.05;

      camera.position.x +=
        (mouseX * 0.2 -
          camera.position.x) *
        0.03;

      camera.position.y +=
        (-mouseY * 0.15 -
          camera.position.y) *
        0.03;

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    /* =========================
       RESIZE
    ========================= */

    const resize = () => {
      const width =
        parent.clientWidth;

      const height =
        parent.clientHeight;

      camera.aspect =
        width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(
        width,
        height
      );
    };

    window.addEventListener(
      "resize",
      resize
    );

    /* =========================
       CLEANUP
    ========================= */

    return () => {
      cancelAnimationFrame(
        animationId
      );

      window.removeEventListener(
        "mousemove",
        mouseMove
      );

      window.removeEventListener(
        "resize",
        resize
      );

      renderer.dispose();

      coreGeometry.dispose();
      coreMaterial.dispose();

      innerGeometry.dispose();
      innerMaterial.dispose();

      particleGeometry.dispose();
      particleMaterial.dispose();

      rings.forEach((ring) => {
        ring.geometry.dispose();
        ring.material.dispose();
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="social-canvas"
    />
  );
}

/* =====================================================
   CARD
===================================================== */

function SocialCard({
  account,
  index,
}) {
  const cardRef =
    useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: index * 0.08,
        ease: "power3.out",
      }
    );
  }, [index]);

  const handleMove = (event) => {
    const card =
      cardRef.current;

    const rect =
      card.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left;

    const y =
      event.clientY -
      rect.top;

    const rotateY =
      ((x / rect.width) - 0.5) *
      10;

    const rotateX =
      ((y / rect.height) - 0.5) *
      -10;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.025,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <a
      ref={cardRef}
      href={account.url}
      target="_blank"
      rel="noopener noreferrer"
      className="social-card"
      style={{
        "--accent": account.color,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="card-glow" />

      <div className="social-icon">
        {account.icon}
      </div>

      <div className="card-info">
        <span>
          {account.platform}
        </span>

        <h3>
          {account.title}
        </h3>

        <strong>
          {account.username}
        </strong>

        <p>
          {account.description}
        </p>
      </div>

      <div className="arrow">
        ↗
      </div>

      <div className="card-line" />
    </a>
  );
}

/* =====================================================
   MAIN
===================================================== */

export default function SocialHub() {
  const sectionRef =
    useRef(null);

  useEffect(() => {
    const ctx =
      gsap.context(() => {
        gsap.from(
          ".social-badge",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          }
        );

        gsap.from(
          ".social-heading",
          {
            opacity: 0,
            y: 45,
            duration: 1,
            delay: 0.1,
            ease: "power4.out",
          }
        );

        gsap.from(
          ".social-subtitle",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
            delay: 0.3,
          }
        );

        gsap.from(
          ".social-three",
          {
            opacity: 0,
            scale: 0.75,
            duration: 1.2,
            delay: 0.2,
            ease: "power3.out",
          }
        );
      }, sectionRef);

    return () =>
      ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="social-section"
    >
      <style>{`

        * {
          box-sizing: border-box;
        }

        .social-section {
          position: relative;
          min-height: 100vh;
          overflow: hidden;

          padding: 100px 20px 70px;

          color: white;

          background:
            radial-gradient(
              circle at 50% 35%,
              rgba(124,58,237,.13),
              transparent 30%
            ),
            #030305;

          font-family:
            Inter,
            Arial,
            sans-serif;
        }

        .social-section::before {
          content: "";
          position: absolute;
          inset: 0;

          pointer-events: none;

          background-image:
            linear-gradient(
              rgba(255,255,255,.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.025) 1px,
              transparent 1px
            );

          background-size: 65px 65px;

          mask-image:
            linear-gradient(
              black,
              transparent
            );
        }

        /* HEADER */

        .social-header {
          position: relative;
          z-index: 10;

          max-width: 850px;

          margin: auto;

          text-align: center;
        }

        .social-badge {
          display: inline-flex;

          align-items: center;
          gap: 8px;

          padding: 8px 14px;

          border:
            1px solid
            rgba(255,255,255,.1);

          border-radius: 100px;

          background:
            rgba(255,255,255,.04);

          color: #8e8e9b;

          font-size: 10px;
          font-weight: 700;

          letter-spacing: .2em;
        }

        .social-badge-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #00f5a0;

          box-shadow:
            0 0 12px
            #00f5a0;
        }

        .social-heading {
          margin: 25px 0 15px;

          font-size:
            clamp(48px, 7vw, 88px);

          line-height: .92;

          letter-spacing: -.065em;

          font-weight: 800;
        }

        .gradient-text {
          color: transparent;

          background:
            linear-gradient(
              90deg,
              #8b5cf6,
              #ec4899,
              #00e5ff
            );

          background-clip: text;
          -webkit-background-clip: text;
        }

        .social-subtitle {
          color: #777783;

          font-size: 15px;

          line-height: 1.7;

          margin: 0;
        }

        /* THREE */

        .social-three {
          position: relative;

          width:
            min(650px, 100%);

          height: 430px;

          margin:
            0 auto -10px;

          z-index: 2;
        }

        .social-canvas {
          width: 100%;
          height: 100%;

          display: block;
        }

        .core-text {
          position: absolute;

          top: 50%;
          left: 50%;

          transform:
            translate(-50%, -50%);

          display: flex;

          flex-direction: column;

          align-items: center;

          pointer-events: none;
        }

        .core-text small {
          color: #777783;

          font-size: 8px;

          letter-spacing: .35em;
        }

        .core-text strong {
          margin: 5px 0;

          font-size: 21px;

          letter-spacing: .12em;

          text-shadow:
            0 0 25px
            rgba(139,92,246,.9);
        }

        /* GRID */

        .social-grid {
          position: relative;

          z-index: 10;

          width:
            min(1050px, 100%);

          margin: auto;

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 14px;
        }

        /* CARD */

        .social-card {
          position: relative;

          min-height: 145px;

          display: flex;

          align-items: center;

          gap: 15px;

          padding: 20px;

          overflow: hidden;

          color: white;

          text-decoration: none;

          border:
            1px solid
            rgba(255,255,255,.09);

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.075),
              rgba(255,255,255,.025)
            );

          backdrop-filter: blur(20px);

          transform-style: preserve-3d;

          transition:
            border-color .3s,
            background .3s;
        }

        .social-card:hover {
          border-color:
            var(--accent);

          background:
            rgba(255,255,255,.08);
        }

        .card-glow {
          position: absolute;

          width: 130px;
          height: 130px;

          left: -70px;
          top: -70px;

          border-radius: 50%;

          background:
            var(--accent);

          filter: blur(60px);

          opacity: .15;
        }

        .social-icon {
          position: relative;
          z-index: 2;

          flex-shrink: 0;

          width: 52px;
          height: 52px;

          display: grid;
          place-items: center;

          border-radius: 16px;

          color:
            var(--accent);

          border:
            1px solid
            var(--accent);

          background:
            rgba(255,255,255,.025);

          font-size: 22px;
          font-weight: 800;
        }

        .card-info {
          position: relative;
          z-index: 2;

          min-width: 0;
        }

        .card-info span {
          display: block;

          color: #696975;

          font-size: 9px;
          font-weight: 700;

          text-transform: uppercase;

          letter-spacing: .15em;

          margin-bottom: 4px;
        }

        .card-info h3 {
          margin: 0 0 3px;

          font-size: 16px;

          font-weight: 650;
        }

        .card-info strong {
          display: block;

          color: #aaaab5;

          font-size: 11px;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;
        }

        .card-info p {
          margin: 5px 0 0;

          color: #5f5f6a;

          font-size: 9px;
        }

        .arrow {
          position: absolute;

          top: 15px;
          right: 16px;

          color: #555560;

          font-size: 20px;

          transition: .3s;
        }

        .social-card:hover .arrow {
          color:
            var(--accent);

          transform:
            translate(3px,-3px);
        }

        .card-line {
          position: absolute;

          left: 0;
          bottom: 0;

          width: 100%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              var(--accent),
              transparent
            );

          transform:
            translateX(-100%);

          transition:
            transform .7s;
        }

        .social-card:hover
        .card-line {
          transform:
            translateX(0);
        }

        /* FOOTER */

        .social-footer {
          position: relative;

          z-index: 10;

          display: flex;

          justify-content: center;

          align-items: center;

          gap: 8px;

          margin-top: 28px;

          color: #555560;

          font-size: 10px;
        }

        .footer-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #00f5a0;

          box-shadow:
            0 0 8px #00f5a0;
        }

        /* RESPONSIVE */

        @media (max-width: 850px) {

          .social-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .social-three {
            height: 390px;
          }

        }

        @media (max-width: 560px) {

          .social-section {
            padding:
              70px 15px 50px;
          }

          .social-heading {
            font-size: 48px;
          }

          .social-three {
            height: 320px;
          }

          .social-grid {
            grid-template-columns: 1fr;
          }

          .social-card {
            min-height: 125px;
          }

        }

      `}</style>

      <div className="social-header">

        <div className="social-badge">
          <span className="social-badge-dot" />
          SOCIAL ECOSYSTEM
        </div>

        <h2 className="social-heading">
          Connect With Me
          <br />
          <span className="gradient-text">
            Everywhere.
          </span>
        </h2>

        <p className="social-subtitle">
          One place. Every platform.
          <br />
          Find me across the internet.
        </p>

      </div>

      <div className="social-three">

        <ThreeScene />

        <div className="core-text">
          <small>MY</small>

          <strong>SOCIAL</strong>

          <small>NETWORK</small>
        </div>

      </div>

      <div className="social-grid">

        {accounts.map(
          (account, index) => (
            <SocialCard
              key={index}
              account={account}
              index={index}
            />
          )
        )}

      </div>

      <div className="social-footer">
        <span className="footer-dot" />
        All official social links
      </div>

    </section>
  );
}
