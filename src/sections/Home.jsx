import React, {
  Suspense,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Canvas, useFrame } from "@react-three/fiber";

import {
  Environment,
  PerspectiveCamera,
  Preload,
} from "@react-three/drei";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FaYoutube,
  FaInstagram,
  FaArrowUpRightFromSquare,
  FaArrowDown,
  FaPlay,
  FaCamera,
  FaHeart,
  FaStar,
  FaBars,
  FaXmark,
} from "react-icons/fa6";

import profileImage from "../assets/moj.jpg";
import backgroundImage from "../assets/background.jpg";
import YouTubeVideo from "../components/YouTubeVideo";
import Contact from "../sections/Contact"
import SocialHub from "./SocialHub";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   THREE.JS PARTICLE FIELD
========================================================= */

function ParticleField({ mobile = false }) {
  const points = useRef(null);

  const count = mobile ? 350 : 900;

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      array[i * 3] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

      array[i * 3 + 1] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

      array[i * 3 + 2] =
        radius * Math.cos(phi);
    }

    return array;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;

    points.current.rotation.y =
      state.clock.elapsedTime *
      (mobile ? 0.012 : 0.018);

    points.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.12) *
      (mobile ? 0.015 : 0.025);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={mobile ? 0.018 : 0.022}
        transparent
        opacity={mobile ? 0.25 : 0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* =========================================================
   THREE.JS HERO SCENE
========================================================= */

function HeroScene() {
  const [mobile, setMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <Canvas
      dpr={mobile ? [1, 1] : [1, 1.5]}
      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{
        position: [0, 0, 9],
        fov: mobile ? 48 : 42,
      }}
      frameloop="always"
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 9]}
        fov={mobile ? 48 : 42}
      />

      <ambientLight intensity={0.8} />

      {!mobile && (
        <directionalLight
          position={[4, 5, 5]}
          intensity={1.5}
          color="#ffffff"
        />
      )}

      <Suspense fallback={null}>
        <ParticleField mobile={mobile} />
        <Environment preset="city" />
      </Suspense>

      <Preload all />
    </Canvas>
  );
}

/* =========================================================
   SOCIALS
========================================================= */

const socials = [
  {
    Icon: FaYoutube,
    label: "YouTube",
    href:
      "https://www.youtube.com/@svmtechnicalpoint",
  },
  {
    Icon: FaInstagram,
    label: "Instagram",
    href: "https://instagram.com/",
  },
];

/* =========================================================
   SECOND CHANNEL
   👉 YAHAN SECOND CHANNEL KA LINK HAI
========================================================= */

const secondChannelUrl =
  "https://www.youtube.com/@Svmkiduniya";

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const root = useRef(null);
  const hero = useRef(null);
  const heroContent = useRef(null);
  const threeScene = useRef(null);
  const cursor = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =====================================================
         INITIAL STATES
      ===================================================== */

      gsap.set(".nav-element", {
        opacity: 0,
        y: -20,
      });

      gsap.set(".hero-reveal", {
        opacity: 0,
        y: 50,
      });

      gsap.set(".hero-line", {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(threeScene.current, {
        opacity: 0,
        scale: 1.06,
      });

      /* =====================================================
         INTRO ANIMATION
      ===================================================== */

      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.to(".nav-element", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.06,
      })
        .to(
          threeScene.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          ".hero-reveal",
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
          },
          "-=0.8"
        )
        .to(
          ".hero-line",
          {
            scaleX: 1,
            duration: 0.8,
          },
          "-=0.3"
        );

      /* =====================================================
         HERO PARALLAX
      ===================================================== */

      if (heroContent.current && hero.current) {
        gsap.to(heroContent.current, {
          yPercent: -12,
          opacity: 0.35,
          ease: "none",

          scrollTrigger: {
            trigger: hero.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (threeScene.current && hero.current) {
        gsap.to(threeScene.current, {
          yPercent: 10,
          scale: 1.1,
          ease: "none",

          scrollTrigger: {
            trigger: hero.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      /* =====================================================
         BACKGROUND PARALLAX
      ===================================================== */

      gsap.to(".home-background", {
        scale: 1.06,
        yPercent: 3,
        ease: "none",

        scrollTrigger: {
          trigger: hero.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =====================================================
         SECTION REVEALS
      ===================================================== */

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 45,
          duration: 0.9,
          ease: "power4.out",

          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      /* =====================================================
         CUSTOM CURSOR
      ===================================================== */

      const moveCursor = (event) => {
        if (!cursor.current) return;

        gsap.to(cursor.current, {
          x: event.clientX,
          y: event.clientY,
          duration: 0.2,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", moveCursor);

      /* =====================================================
         MAGNETIC BUTTONS
      ===================================================== */

      const magneticItems =
        document.querySelectorAll(".magnetic");

      const handlers = [];

      magneticItems.forEach((item) => {
        const move = (event) => {
          const rect =
            item.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          gsap.to(item, {
            x: x * 0.12,
            y: y * 0.12,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        const reset = () => {
          gsap.to(item, {
            x: 0,
            y: 0,
            duration: 0.45,
            ease: "elastic.out(1, 0.4)",
          });
        };

        item.addEventListener("mousemove", move);
        item.addEventListener("mouseleave", reset);

        handlers.push({
          item,
          move,
          reset,
        });
      });

      /* =====================================================
         CLEANUP
      ===================================================== */

      return () => {
        window.removeEventListener(
          "mousemove",
          moveCursor
        );

        handlers.forEach(
          ({ item, move, reset }) => {
            item.removeEventListener(
              "mousemove",
              move
            );

            item.removeEventListener(
              "mouseleave",
              reset
            );

            gsap.killTweensOf(item);
          }
        );
      };
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <main
      ref={root}
      className="
        min-h-screen
        overflow-x-hidden
        bg-[#f4f4f1]
        text-[#111]
      "
    >
      {/* =====================================================
          CUSTOM CURSOR
      ===================================================== */}

      <div
        ref={cursor}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]
          hidden
          h-4
          w-4
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-red-600
          mix-blend-difference
          md:block
        "
      />

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className="
          absolute
          left-0
          right-0
          top-0
          z-[100]
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1600px]
            items-center
            justify-between
            px-4
            py-4
            sm:px-8
            sm:py-5
            lg:px-12
          "
        >
          {/* LOGO */}

          <a
            href="#home"
            onClick={closeMenu}
            className="
              nav-element
              magnetic
              group
              flex
              items-center
              gap-2.5
              sm:gap-3
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-red-600
                shadow-[0_0_35px_rgba(220,38,38,.35)]
                transition
                duration-500
                group-hover:rotate-[-6deg]
                group-hover:scale-110
                sm:h-11
                sm:w-11
              "
            >
              <FaYoutube className="text-lg sm:text-xl" />
            </div>

            <div>
              <div className="flex items-center">
                <span className="text-lg font-black sm:text-xl">
                  SVM
                </span>

                <span className="ml-1 text-[7px] text-red-500 sm:text-[8px]">
                  ®
                </span>
              </div>

              <p className="text-[6px] font-bold tracking-[0.22em] text-white/50 sm:text-[7px]">
                CREATOR
              </p>
            </div>
          </a>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-8 md:flex lg:gap-9">
            {[
              ["HOME", "#home"],
              ["VIDEOS", "#videos"],
              ["ABOUT", "#about"],
              ["CONTACT", "#contact"],
            ].map(([label, href], index) => (
              <a
                key={label}
                href={href}
                className={`
                  nav-element
                  text-[9px]
                  font-black
                  tracking-[0.2em]
                  transition
                  lg:text-[10px]
                  ${
                    index === 0
                      ? "text-white hover:text-red-500"
                      : "text-white/60 hover:text-white"
                  }
                `}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* =================================================
              DESKTOP ACTION BUTTONS
          ================================================= */}

          <div className="hidden items-center gap-2 sm:flex">

            {/* =================================================
                2CHANNEL BUTTON
            ================================================= */}

            <a
              href={secondChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open SVM second YouTube channel"
              className="
                nav-element
                magnetic
                flex
                items-center
                gap-2
                rounded-full
                border
                border-white/20
                bg-white/5
                px-4
                py-3
                text-[8px]
                font-black
                tracking-[0.1em]
                text-white
                backdrop-blur-md
                transition
                duration-300
                hover:border-red-500
                hover:bg-red-600
                hover:text-white
              "
            >
              <FaYoutube />
              2CHANNEL
            </a>

            {/* =================================================
                SUBSCRIBE BUTTON
            ================================================= */}

            <a
              href="https://www.youtube.com/@svmtechnicalpoint"
              target="_blank"
              rel="noopener noreferrer"
              className="
                nav-element
                magnetic
                flex
                items-center
                gap-2
                rounded-full
                bg-red-600
                px-5
                py-3
                text-[8px]
                font-black
                tracking-[0.12em]
                transition
                hover:bg-red-500
              "
            >
              <FaYoutube />
              SUBSCRIBE
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            className="
              nav-element
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/30
              text-white
              backdrop-blur-md
              md:hidden
            "
          >
            {menuOpen ? (
              <FaXmark />
            ) : (
              <FaBars />
            )}
          </button>
        </div>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        <div
          className={`
            mx-4
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-black/90
            backdrop-blur-2xl
            transition-all
            duration-300
            md:hidden
            ${
              menuOpen
                ? "max-h-[600px] translate-y-0 opacity-100"
                : "pointer-events-none max-h-0 -translate-y-3 opacity-0"
            }
          `}
        >
          <nav className="flex flex-col p-3">

            {[
              ["HOME", "#home"],
              ["VIDEOS", "#videos"],
              ["ABOUT", "#about"],
              ["CONTACT", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={closeMenu}
                className="
                  rounded-xl
                  px-4
                  py-4
                  text-xs
                  font-black
                  tracking-[0.2em]
                  text-white/80
                  transition
                  hover:bg-red-600
                  hover:text-white
                "
              >
                {label}
              </a>
            ))}

            {/* =================================================
                MOBILE 2CHANNEL
            ================================================= */}

            <a
              href={secondChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              aria-label="Open SVM second YouTube channel"
              className="
                mt-2
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/20
                bg-white/5
                px-4
                py-4
                text-[9px]
                font-black
                tracking-[0.15em]
                text-white
                transition
                hover:border-red-500
                hover:bg-red-600
              "
            >
              <FaYoutube />
              2CHANNEL
            </a>

            {/* =================================================
                MOBILE SUBSCRIBE
            ================================================= */}

            <a
              href="https://www.youtube.com/@svmtechnicalpoint"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="
                mt-2
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-red-600
                px-4
                py-4
                text-[9px]
                font-black
                tracking-[0.15em]
              "
            >
              <FaYoutube />
              SUBSCRIBE ON YOUTUBE
            </a>
          </nav>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        ref={hero}
        id="home"
        className="
          relative
          min-h-[100svh]
          overflow-hidden
          bg-[#030303]
          text-white
        "
      >
        {/* BACKGROUND */}

        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="SVM Creator background"
            className="
              home-background
              h-full
              w-full
              object-cover
              object-center
              opacity-90
            "
          />

          <div className="absolute inset-0 bg-black/20" />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-black/75
              via-black/30
              to-transparent
              md:from-black/65
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/80
              via-black/10
              to-transparent
            "
          />
        </div>

        {/* THREE BACKGROUND */}

        <div
          ref={threeScene}
          className="
            pointer-events-none
            absolute
            inset-0
            z-[1]
          "
        >
          <HeroScene />
        </div>

        {/* HERO CONTENT */}

        <div
          ref={heroContent}
          className="
            relative
            z-10
            flex
            min-h-[100svh]
            items-end
            px-5
            pb-8
            pt-28
            sm:px-8
            sm:pb-14
            sm:pt-32
            lg:px-12
            lg:pb-16
          "
        >
          <div className="mx-auto w-full max-w-[1600px]">
            <div
              className="
                grid
                items-end
                gap-10
                lg:grid-cols-[minmax(0,1fr)_400px]
                lg:gap-12
              "
            >
              {/* LEFT HERO */}

              <div className="min-w-0">
                <div
                  className="
                    hero-reveal
                    mb-5
                    flex
                    items-center
                    gap-2.5
                    sm:mb-7
                    sm:gap-3
                  "
                >
                  <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                    <span
                      className="
                        absolute
                        inline-flex
                        h-full
                        w-full
                        animate-ping
                        rounded-full
                        bg-red-500
                        opacity-70
                      "
                    />

                    <span
                      className="
                        relative
                        inline-flex
                        h-2.5
                        w-2.5
                        rounded-full
                        bg-red-500
                        sm:h-3
                        sm:w-3
                      "
                    />
                  </span>

                  <span
                    className="
                      text-[7px]
                      font-black
                      tracking-[0.18em]
                      text-white/60
                      xs:text-[8px]
                      sm:text-[9px]
                      sm:tracking-[0.3em]
                    "
                  >
                    YOUTUBER • VLOGGER • CREATOR
                  </span>
                </div>

                <h1
                  className="
                    overflow-visible
                    text-[18vw]
                    font-black
                    leading-[0.76]
                    tracking-[-0.09em]
                    xs:text-[17vw]
                    sm:text-[14vw]
                    md:text-[13vw]
                    lg:text-[10.5vw]
                  "
                >
                  <span className="hero-reveal block">
                    WATCH.
                  </span>

                  <span
                    className="
                      hero-reveal
                      block
                      pl-[5vw]
                      text-red-500
                    "
                  >
                    LIVE.
                  </span>

                  <span className="hero-reveal block">
                    CREATE.
                  </span>
                </h1>

                <div
                  className="
                    mt-7
                    flex
                    flex-col
                    gap-5
                    sm:mt-9
                    sm:gap-7
                    md:flex-row
                    md:items-end
                  "
                >
                  <p
                    className="
                      hero-reveal
                      max-w-xl
                      text-[13px]
                      leading-6
                      text-white/70
                      sm:text-sm
                      sm:leading-7
                      md:text-base
                    "
                  >
                    Welcome to{" "}
                    <span className="font-bold text-white">
                      SVM Technical Point
                    </span>
                    . A creator space for
                    technology, vlogs, lifestyle,
                    experiences and everyday
                    adventures.
                  </p>

                  <a
                    href="https://www.youtube.com/@svmtechnicalpoint"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      hero-reveal
                      magnetic
                      group
                      flex
                      min-h-12
                      w-fit
                      shrink-0
                      items-center
                      gap-3
                      rounded-full
                      bg-red-600
                      px-5
                      py-3.5
                      text-[8px]
                      font-black
                      tracking-[0.12em]
                      shadow-[0_10px_50px_rgba(220,38,38,.3)]
                      transition
                      hover:bg-red-500
                      sm:px-6
                      sm:py-4
                      sm:text-[9px]
                      sm:tracking-[0.15em]
                    "
                  >
                    <FaPlay className="text-[8px]" />
                    WATCH MY CHANNEL

                    <FaArrowUpRightFromSquare
                      className="
                        transition
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                      "
                    />
                  </a>
                </div>

                <div
                  className="
                    hero-line
                    mt-7
                    h-px
                    w-full
                    bg-white/15
                    sm:mt-9
                  "
                />

                <div
                  className="
                    hero-reveal
                    mt-5
                    flex
                    items-center
                    gap-4
                    sm:mt-6
                    sm:gap-7
                  "
                >
                  <div>
                    <p className="text-lg font-black sm:text-xl">
                      1.2K+
                    </p>

                    <p
                      className="
                        mt-1
                        text-[6px]
                        font-bold
                        tracking-[0.15em]
                        text-white/40
                        sm:text-[8px]
                        sm:tracking-[0.2em]
                      "
                    >
                      SUBSCRIBERS
                    </p>
                  </div>

                  <div className="h-7 w-px bg-white/15 sm:h-8" />

                  <div>
                    <p className="text-lg font-black sm:text-xl">
                      100+
                    </p>

                    <p
                      className="
                        mt-1
                        text-[6px]
                        font-bold
                        tracking-[0.15em]
                        text-white/40
                        sm:text-[8px]
                        sm:tracking-[0.2em]
                      "
                    >
                      VIDEOS
                    </p>
                  </div>

                  <div className="h-7 w-px bg-white/15 sm:h-8" />

                  <div>
                    <p className="text-lg font-black sm:text-xl">
                      50+
                    </p>

                    <p
                      className="
                        mt-1
                        text-[6px]
                        font-bold
                        tracking-[0.15em]
                        text-white/40
                        sm:text-[8px]
                        sm:tracking-[0.2em]
                      "
                    >
                      STORIES
                    </p>
                  </div>
                </div>
              </div>

              {/* CREATOR CARD */}

              <div className="hero-reveal hidden lg:block">
                <div className="relative">
                  <div
                    className="
                      absolute
                      -inset-8
                      rounded-[3rem]
                      bg-red-600/10
                      blur-[70px]
                    "
                  />

                  <div
                    className="
                      relative
                      overflow-hidden
                      rounded-[1.8rem]
                      border
                      border-white/15
                      bg-black/55
                      p-2
                      backdrop-blur-2xl
                    "
                  >
                    <div
                      className="
                        relative
                        aspect-[4/5]
                        overflow-hidden
                        rounded-[1.3rem]
                      "
                    >
                      <img
                        src={profileImage}
                        alt="SVM Creator"
                        loading="eager"
                        className="
                          h-full
                          w-full
                          object-cover
                          object-center
                        "
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/80
                          via-transparent
                          to-transparent
                        "
                      />

                      <div
                        className="
                          absolute
                          bottom-5
                          left-5
                          right-5
                        "
                      >
                        <p
                          className="
                            text-[8px]
                            font-bold
                            tracking-[0.25em]
                            text-red-400
                          "
                        >
                          SVM CREATOR
                        </p>

                        <h3
                          className="
                            mt-2
                            text-3xl
                            font-black
                            leading-none
                          "
                        >
                          LIFE.
                          <br />

                          <span className="text-red-500">
                            ON CAMERA.
                          </span>
                        </h3>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-red-600
                          "
                        >
                          <FaYoutube />
                        </div>

                        <div>
                          <p
                            className="
                              text-[9px]
                              font-black
                              tracking-[0.15em]
                            "
                          >
                            SVM TECHNICAL POINT
                          </p>

                          <p className="text-[8px] text-white/40">
                            Vlogs • Lifestyle • Tech
                          </p>
                        </div>
                      </div>

                      <div
                        className="
                          mt-5
                          flex
                          items-center
                          justify-between
                          border-t
                          border-white/10
                          pt-4
                        "
                      >
                        <span
                          className="
                            text-[8px]
                            font-bold
                            tracking-[0.2em]
                            text-white/30
                          "
                        >
                          YOUTUBE CHANNEL
                        </span>

                        <span
                          className="
                            flex
                            items-center
                            gap-2
                            text-[8px]
                            font-black
                            text-red-400
                          "
                        >
                          WATCH NOW
                          <FaArrowUpRightFromSquare />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE YOUTUBE BUTTON */}

        <div
          className="
            absolute
            bottom-6
            left-5
            z-30
            sm:bottom-7
            sm:left-8
            md:hidden
          "
        >
          <a
            href="https://www.youtube.com/@svmtechnicalpoint"
            target="_blank"
            rel="noopener noreferrer"
            className="
              magnetic
              flex
              min-h-11
              items-center
              gap-2
              rounded-full
              bg-red-600
              px-4
              py-3
              text-[7px]
              font-black
              tracking-[0.08em]
              shadow-[0_8px_30px_rgba(220,38,38,.25)]
            "
          >
            <FaYoutube />
            SUBSCRIBE ON YOUTUBE
          </a>
        </div>

        {/* DESKTOP SCROLL */}

        <div
          className="
            absolute
            bottom-8
            right-8
            z-20
            hidden
            items-center
            gap-4
            lg:flex
          "
        >
          <span
            className="
              text-[8px]
              font-bold
              tracking-[0.3em]
              text-white/40
            "
          >
            SCROLL TO EXPLORE
          </span>

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/15
            "
          >
            <FaArrowDown className="animate-bounce text-xs" />
          </div>
        </div>
      </section>

      {/* =====================================================
          CREATOR INTRO
      ===================================================== */}

      <section
        className="
          px-5
          py-24
          sm:px-8
          sm:py-32
          lg:px-16
          lg:py-44
        "
      >
        <div className="mx-auto max-w-[1500px]">
          <div
            className="
              grid
              gap-10
              lg:grid-cols-[0.3fr_1fr]
              lg:gap-16
            "
          >
            <div className="reveal">
              <p
                className="
                  text-[9px]
                  font-bold
                  tracking-[0.3em]
                  text-red-600
                  sm:text-[10px]
                "
              >
                01 / CREATOR
              </p>
            </div>

            <div>
              <h2
                className="
                  text-[15vw]
                  font-black
                  leading-[0.82]
                  tracking-[-0.08em]
                  sm:text-[11vw]
                  lg:text-[10vw]
                "
              >
                LIFE
                <br />
                <span className="text-red-600">
                  BEHIND
                </span>{" "}
                THE CAMERA
              </h2>

              <div
                className="
                  mt-10
                  grid
                  gap-7
                  sm:mt-16
                  sm:gap-10
                  lg:grid-cols-2
                "
              >
                <p
                  className="
                    reveal
                    max-w-xl
                    text-base
                    leading-7
                    text-gray-500
                    sm:text-lg
                    sm:leading-8
                  "
                >
                  I'm a YouTuber and content
                  creator sharing videos,
                  experiences, lifestyle moments
                  and the things I genuinely enjoy.
                </p>

                <p
                  className="
                    reveal
                    max-w-xl
                    text-base
                    leading-7
                    text-gray-500
                    sm:text-lg
                    sm:leading-8
                  "
                >
                  From everyday moments to
                  exciting experiences, every
                  video is a new story to watch,
                  enjoy and remember.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CREATOR STATS
      ===================================================== */}

      <section
        className="
          border-y
          border-black/10
          bg-[#e9e8e4]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            sm:grid-cols-3
          "
        >
          {[
            ["1.2K+", "SUBSCRIBERS"],
            ["100+", "VIDEOS"],
            ["50+", "LIFE STORIES"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="
                reveal
                border-b
                border-black/10
                px-5
                py-10
                last:border-b-0
                sm:border-b-0
                sm:border-r
                sm:px-6
                sm:py-14
                sm:last:border-r-0
                lg:px-12
              "
            >
              <p
                className="
                  text-5xl
                  font-black
                  tracking-[-0.07em]
                  sm:text-6xl
                "
              >
                {number}
              </p>

              <p
                className="
                  mt-3
                  text-[8px]
                  font-bold
                  tracking-[0.2em]
                  text-gray-500
                  sm:text-[10px]
                  sm:tracking-[0.25em]
                "
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          VIDEOS
      ===================================================== */}

      <section
        id="videos"
        className="
          bg-[#101010]
          px-5
          py-24
          text-white
          sm:px-8
          sm:py-32
          lg:px-16
          lg:py-44
        "
      >
        <div className="mx-auto max-w-[1500px]">
          <YouTubeVideo />
        </div>
      </section>

      {/* =====================================================
          CONTENT CATEGORIES
      ===================================================== */}

      <section
        id="about"
        className="
          px-5
          py-24
          sm:px-8
          sm:py-32
          lg:px-16
          lg:py-44
        "
      >
        <div className="mx-auto max-w-[1500px]">
          <p
            className="
              reveal
              text-[9px]
              font-bold
              tracking-[0.3em]
              text-red-600
              sm:text-[10px]
            "
          >
            03 / CONTENT
          </p>

          <h2
            className="
              reveal
              mt-10
              text-[15vw]
              font-black
              leading-[0.8]
              tracking-[-0.09em]
              sm:mt-12
              sm:text-[11vw]
            "
          >
            STORIES
            <br />
            WORTH
            <br />
            <span className="text-red-600">
              SHARING.
            </span>
          </h2>

          <div
            className="
              mt-14
              grid
              gap-10
              sm:mt-20
              md:grid-cols-3
              md:gap-8
            "
          >
            <div className="reveal">
              <FaCamera className="text-2xl text-red-600" />

              <h3 className="mt-5 text-xl font-bold">
                Vlogs
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                Real moments, daily adventures,
                travel and experiences captured
                on camera.
              </p>
            </div>

            <div className="reveal">
              <FaHeart className="text-2xl text-red-600" />

              <h3 className="mt-5 text-xl font-bold">
                Lifestyle
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                Personal moments, routines,
                interests and everything that
                makes everyday life interesting.
              </p>
            </div>

            <div className="reveal">
              <FaStar className="text-2xl text-red-600" />

              <h3 className="mt-5 text-xl font-bold">
                Entertainment
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                Fun videos, challenges, stories
                and memorable moments for the
                community.
              </p>
            
            </div>
          </div>
        </div>
      </section>
      <SocialHub/>
      <Contact/>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section
        id="contact"
        className="
          bg-red-600
          px-5
          py-24
          text-white
          sm:px-8
          sm:py-32
          lg:px-16
          lg:py-44
        "
      >
        <div className="mx-auto max-w-[1500px]">
          <p
            className="
              reveal
              text-[9px]
              font-bold
              tracking-[0.3em]
              text-white/60
              sm:text-[10px]
            "
          >
            04 / COLLABORATE
          </p>

          <h2
            className="
              reveal
              mt-10
              text-[16vw]
              font-black
              leading-[0.78]
              tracking-[-0.09em]
              sm:mt-12
              sm:text-[12vw]
            "
          >
            LET'S
            <br />
            CREATE
            <br />
            TOGETHER.
          </h2>

          <div
            className="
              mt-12
              flex
              flex-col
              justify-between
              gap-10
              border-t
              border-white/30
              pt-7
              sm:mt-16
              sm:pt-8
              md:flex-row
              md:items-end
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  tracking-[0.2em]
                  text-white/60
                  sm:text-[10px]
                "
              >
                FIND ME ONLINE
              </p>

              <div className="mt-4 flex gap-3 sm:mt-5">
                {socials.map(
                  ({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="
                        magnetic
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/30
                        transition
                        hover:bg-white
                        hover:text-red-600
                      "
                    >
                      <Icon />
                    </a>
                  )
                )}
              </div>
            </div>

            <a
              href="https://www.youtube.com/@svmtechnicalpoint"
              target="_blank"
              rel="noopener noreferrer"
              className="
                magnetic
                flex
                w-fit
                items-center
                gap-4
                text-[9px]
                font-bold
                tracking-[0.16em]
                sm:gap-5
                sm:text-[10px]
                sm:tracking-[0.2em]
              "
            >
              VISIT MY YOUTUBE

              <span
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-red-600
                  sm:h-14
                  sm:w-14
                "
              >
                <FaArrowUpRightFromSquare />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        className="
          bg-[#101010]
          px-5
          py-7
          text-white
          sm:px-8
          sm:py-8
          lg:px-12
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]
            flex-col
            justify-between
            gap-3
            text-[8px]
            font-bold
            tracking-[0.15em]
            text-white/30
            sm:text-[9px]
            sm:tracking-[0.2em]
            md:flex-row
          "
        >
          <span>SVM®</span>

          <span>
            YOUTUBE / VLOGS / LIFESTYLE
          </span>

          <span>
            © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </main>
  );
}
