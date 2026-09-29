import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FaPlay,
  FaYoutube,
  FaArrowUpRightFromSquare,
  FaArrowDown,
} from "react-icons/fa6";

import channelLogo from "../assets/logo.jpg";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   CHANNEL
========================================================= */

const channel = {
  name: "SVM Technical Point",
  handle: "@svmtechnicalpoint",
  logo: channelLogo,
  url: "https://www.youtube.com/@svmtechnicalpoint",
};

/* =========================================================
   VIDEOS
========================================================= */

const videos = [
  {
    title: "My Latest Vlog",
    category: "VLOG 01",
    url: "https://youtu.be/pL4rq0p3z5s?si=BfWKjyPW9DDG3gps",
  },
  {
    title: "A Day In My Life",
    category: "LIFESTYLE 02",
    url: "https://youtu.be/kXJymxVWyjI?si=fcqWMFxItWXdate3",
  },
  {
    title: "Travel & Experience",
    category: "TRAVEL 03",
    url: "https://youtu.be/4CS-L40CZ0E?si=My5AN7rdzfunIiPi",
  },
  {
    title: "My New Video",
    category: "VLOG 04",
    url: "https://youtu.be/sCnZpXzB9JI?si=-HJb3QTeYylt9BlX",
  },
  {
    title: "Behind The Camera",
    category: "LIFE 05",
    url: "https://youtu.be/faXC7Lcdu4U?si=pFSePUV5AXOvfMTM",
  },
  {
    title: "Amazing Experience",
    category: "VLOG 06",
    url: "https://youtu.be/hsmvtZobIno?si=eLpPNPPqZdh-ypl9",
  },
  {
    title: "Weekend Vlog",
    category: "VLOG 07",
    url: "https://youtu.be/pL4rq0p3z5s?si=1DDY-wKXqrAkoeJR",
  },
  {
    title: "Daily Life",
    category: "LIFESTYLE 08",
    url: "https://youtu.be/4DneVmDxRzw?si=SuHxnml90sGuyKlo",
  },
  {
    title: "Special Video",
    category: "SPECIAL 09",
    url: "https://youtu.be/NYqQbGxSlGE?si=sVKFb1nlLqbum3gd",
  },
  {
    title: "Latest Story",
    category: "STORY 10",
    url: "https://youtu.be/TTiTHGNtx5Q?si=CnYdZUBcGVPf9s8G",
  },
];

/* =========================================================
   YOUTUBE ID
========================================================= */

function getYoutubeId(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "").split("/")[0];
    }

    if (parsed.pathname.includes("/shorts/")) {
      return parsed.pathname.split("/shorts/")[1].split("/")[0];
    }

    if (parsed.pathname.includes("/embed/")) {
      return parsed.pathname.split("/embed/")[1].split("/")[0];
    }

    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

/* =========================================================
   PARTICLES
========================================================= */

function ParticleField() {
  const points = useRef(null);

  const count = 850;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      arr[i * 3] =
        (Math.random() - 0.5) * 32;

      arr[i * 3 + 1] =
        (Math.random() - 0.5) * 22;

      arr[i * 3 + 2] =
        (Math.random() - 0.5) * 18;
    }

    return arr;
  }, []);

  useFrame((state) => {
    if (!points.current) return;

    points.current.rotation.y =
      state.clock.elapsedTime * 0.012;

    points.current.rotation.x =
      Math.sin(
        state.clock.elapsedTime * 0.12
      ) * 0.025;
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
        color="#ef4444"
        size={0.025}
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  );
}

/* =========================================================
   THREE BACKGROUND
========================================================= */

function ThreeBackground() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{
        position: [0, 0, 8],
        fov: 55,
      }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.4} />

      <Float
        speed={0.8}
        rotationIntensity={0.35}
        floatIntensity={0.5}
      >
        <mesh position={[7, 2, -4]}>
          <icosahedronGeometry args={[2.1, 2]} />

          <meshBasicMaterial
            color="#ef4444"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
      </Float>

      <Float
        speed={0.5}
        rotationIntensity={0.2}
        floatIntensity={0.3}
      >
        <mesh position={[-7, -3, -5]}>
          <sphereGeometry
            args={[2, 32, 32]}
          />

          <meshBasicMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.025}
          />
        </mesh>
      </Float>

      <ParticleField />
    </Canvas>
  );
}

/* =========================================================
   VIDEO THUMBNAIL
========================================================= */

function VideoThumbnail({
  video,
  featured = false,
  number,
}) {
  const [playing, setPlaying] =
    useState(false);

  const videoId = getYoutubeId(video.url);

  if (!videoId) return null;

  const thumbnail =
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="absolute inset-0 h-full w-full cursor-pointer text-left"
      aria-label={`Play ${video.title}`}
    >
      <img
        src={thumbnail}
        alt={video.title}
        className="
          h-full
          w-full
          object-cover
          transition
          duration-1000
          group-hover:scale-105
        "
        onError={(e) => {
          e.currentTarget.src =
            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }}
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/25
          to-black/10
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-red-600/0
          transition
          duration-700
          group-hover:bg-red-600/[0.06]
        "
      />

      {/* PLAY BUTTON */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          flex
          h-16
          w-16
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/30
          bg-red-600
          text-white
          shadow-[0_0_80px_rgba(239,68,68,.55)]
          transition
          duration-500
          group-hover:scale-125
          group-hover:bg-red-500
        "
      >
        <FaPlay className="ml-1 text-sm" />
      </div>

      {/* VIDEO INFO */}

      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-[8px] font-black tracking-[0.3em] text-red-400">
          {video.category}
        </p>

        <h3
          className={`
            mt-2
            max-w-3xl
            font-black
            leading-[0.9]
            tracking-tight
            text-white
            ${
              featured
                ? "text-3xl sm:text-5xl lg:text-6xl"
                : "text-xl sm:text-2xl"
            }
          `}
        >
          {video.title}
        </h3>
      </div>

      {/* NUMBER */}

      {number && (
        <div
          className="
            absolute
            right-5
            top-5
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/50
            text-[9px]
            font-black
            backdrop-blur-xl
          "
        >
          {String(number).padStart(2, "0")}
        </div>
      )}
    </button>
  );
}

/* =========================================================
   VIDEO CARD
========================================================= */

function VideoCard({ video, index }) {
  const card = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        card.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={card}
      className="
        group
        relative
        overflow-hidden
        bg-[#0a0a0a]
      "
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        <VideoThumbnail
          video={video}
          number={index}
        />
      </div>

      <div className="flex items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-3">
          <img
            src={channel.logo}
            alt={channel.name}
            className="
              h-9
              w-9
              rounded-full
              border
              border-white/10
              object-cover
            "
          />

          <div>
            <p className="text-[9px] font-black text-white">
              {channel.name}
            </p>

            <p className="mt-1 text-[7px] text-white/25">
              {channel.handle}
            </p>
          </div>
        </div>

        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            text-white/40
            transition
            hover:border-red-500
            hover:bg-red-600
            hover:text-white
          "
          aria-label={`Open ${video.title}`}
        >
          <FaArrowUpRightFromSquare className="text-[10px]" />
        </a>
      </div>

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          bg-red-500
          transition-all
          duration-700
          group-hover:w-full
        "
      />
    </article>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function YouTubeVideosSection() {
  const page = useRef(null);
  const logoRef = useRef(null);
  const heroTitle = useRef(null);

  const featured = videos[0];
  const remaining = videos.slice(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.fromTo(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.55,
          y: 50,
          rotate: -8,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          duration: 1.2,
        }
      )
        .fromTo(
          ".hero-label",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.6"
        )
        .fromTo(
          heroTitle.current,
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
          },
          "-=0.35"
        )
        .fromTo(
          ".hero-description, .hero-actions, .hero-stats",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.6"
        );

      /* HERO PARALLAX */

      gsap.to(".hero-content", {
        yPercent: -18,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: ".youtube-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* LOGO FLOAT */

      gsap.to(".hero-logo-ring", {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".hero-logo-glow", {
        scale: 1.25,
        opacity: 0.55,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* RED GLOW */

      gsap.to(".red-glow", {
        x: 180,
        y: 100,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={page}
      className="
        min-h-screen
        w-full
        overflow-hidden
        bg-[#030303]
        text-white
      "
    >
      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          youtube-hero
          relative
          flex
          min-h-[100svh]
          w-full
          items-center
          justify-center
          overflow-hidden
          bg-[#020202]
        "
      >
        {/* 3D */}

        <div className="pointer-events-none absolute inset-0 opacity-90">
          <ThreeBackground />
        </div>

        {/* RED GLOW */}

        <div
          className="
            red-glow
            pointer-events-none
            absolute
            -left-40
            top-20
            h-[500px]
            w-[500px]
            rounded-full
            bg-red-600/10
            blur-[150px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            bottom-0
            h-[450px]
            w-[450px]
            rounded-full
            bg-red-600/[0.07]
            blur-[150px]
          "
        />

        {/* RADIAL */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,rgba(239,68,68,.10),transparent_38%)]
          "
        />

        {/* GRID */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)]
            [background-size:80px_80px]
          "
        />

        {/* DARK VIGNETTE */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,.75)_100%)]
          "
        />

        {/* HERO CONTENT */}

        <div
          className="
            hero-content
            relative
            z-10
            flex
            min-h-[100svh]
            w-full
            flex-col
            items-center
            justify-center
            px-5
            py-20
            text-center
            sm:px-8
            lg:px-12
          "
        >
          {/* LOGO SHOWCASE */}

          <div
            ref={logoRef}
            className="
              relative
              mb-8
              h-32
              w-32
              sm:h-40
              sm:w-40
              lg:h-48
              lg:w-48
            "
          >
            {/* OUTER RING */}

            <div
              className="
                hero-logo-ring
                absolute
                -inset-5
                rounded-full
                border
                border-red-500/30
                border-t-red-500
                border-r-transparent
              "
            />

            {/* SECOND RING */}

            <div
              className="
                absolute
                -inset-2
                rounded-full
                border
                border-white/10
              "
            />

            {/* GLOW */}

            <div
              className="
                hero-logo-glow
                absolute
                -inset-10
                rounded-full
                bg-red-600/20
                blur-[50px]
              "
            />

            {/* LOGO */}

            <div
              className="
                relative
                h-full
                w-full
                overflow-hidden
                rounded-full
                border-2
                border-red-500/50
                bg-black
                p-1
                shadow-[0_0_100px_rgba(239,68,68,.35)]
              "
            >
              <img
                src={channelLogo}
                alt={channel.name}
                className="
                  h-full
                  w-full
                  rounded-full
                  object-cover
                "
              />
            </div>
          </div>

          {/* LABEL */}

          <div className="hero-label flex items-center gap-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_15px_#ef4444]" />

            <span className="text-[8px] font-black tracking-[0.35em] text-red-400 sm:text-[9px]">
              OFFICIAL YOUTUBE CHANNEL
            </span>

            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_15px_#ef4444]" />
          </div>

          {/* TITLE */}

          <h1
            ref={heroTitle}
            className="
              mt-7
              max-w-[1400px]
              text-[17vw]
              font-black
              leading-[0.72]
              tracking-[-0.11em]
              sm:text-[13vw]
              lg:text-[10vw]
            "
          >
            SVM
            <br />

            <span
              className="
                bg-gradient-to-r
                from-red-400
                via-red-500
                to-red-700
                bg-clip-text
                text-transparent
              "
            >
              TECHNICAL
            </span>

            <br />

            POINT
            <span className="text-red-500">.</span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              hero-description
              mt-7
              max-w-xl
              text-xs
              leading-6
              text-white/40
              sm:text-sm
              sm:leading-7
            "
          >
            Technology, vlogs, lifestyle,
            adventures and real stories —
            captured from behind the camera.
          </p>

          {/* ACTIONS */}

          <div
            className="
              hero-actions
              mt-7
              flex
              w-full
              flex-col
              gap-3
              sm:w-auto
              sm:flex-row
            "
          >
            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                justify-center
                gap-3
                rounded-full
                bg-red-600
                px-7
                py-4
                text-[8px]
                font-black
                tracking-[0.2em]
                shadow-[0_20px_70px_rgba(239,68,68,.3)]
                transition
                duration-300
                hover:-translate-y-1
                hover:bg-red-500
                hover:shadow-[0_25px_80px_rgba(239,68,68,.45)]
              "
            >
              <FaYoutube className="text-sm" />
              SUBSCRIBE
              <FaArrowUpRightFromSquare />
            </a>

            <a
              href="#latest-videos"
              className="
                flex
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
                px-7
                py-4
                text-[8px]
                font-black
                tracking-[0.2em]
                backdrop-blur-xl
                transition
                duration-300
                hover:-translate-y-1
                hover:border-white/20
                hover:bg-white/[0.08]
              "
            >
              <FaPlay />
              WATCH VIDEOS
            </a>
          </div>

          {/* STATS */}

          <div
            className="
              hero-stats
              mt-10
              flex
              items-center
              gap-6
              sm:gap-12
            "
          >
            <div>
              <p className="text-xl font-black sm:text-2xl">
                1.2K+
              </p>

              <p className="mt-1 text-[6px] font-bold tracking-[0.2em] text-white/25">
                SUBSCRIBERS
              </p>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div>
              <p className="text-xl font-black sm:text-2xl">
                100+
              </p>

              <p className="mt-1 text-[6px] font-bold tracking-[0.2em] text-white/25">
                VIDEOS
              </p>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div>
              <p className="text-xl font-black sm:text-2xl">
                50+
              </p>

              <p className="mt-1 text-[6px] font-bold tracking-[0.2em] text-white/25">
                STORIES
              </p>
            </div>
          </div>

          {/* SCROLL */}

          <div
            className="
              absolute
              bottom-7
              left-1/2
              hidden
              -translate-x-1/2
              items-center
              gap-3
              lg:flex
            "
          >
            <span className="text-[7px] font-black tracking-[0.3em] text-white/20">
              SCROLL TO EXPLORE
            </span>

            <FaArrowDown className="animate-bounce text-red-500" />
          </div>
        </div>
      </section>

      {/* =====================================================
          VIDEOS
      ===================================================== */}

      <section
        id="latest-videos"
        className="
          relative
          w-full
          overflow-hidden
          bg-[#060606]
        "
      >
        <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

        {/* HEADER */}

        <div
          className="
            mx-auto
            max-w-[1600px]
            px-5
            pb-14
            pt-24
            sm:px-8
            lg:px-12
            lg:pb-20
            lg:pt-36
          "
        >
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_20px_#ef4444]" />

                <span className="text-[8px] font-black tracking-[0.3em] text-red-500">
                  01 / LATEST VIDEOS
                </span>
              </div>

              <h2
                className="
                  mt-6
                  text-[16vw]
                  font-black
                  leading-[0.72]
                  tracking-[-0.1em]
                  sm:text-[12vw]
                  lg:text-[8vw]
                "
              >
                WATCH
                <br />

                <span className="text-red-500">
                  MY WORLD.
                </span>
              </h2>
            </div>

            <div className="max-w-md">
              <div className="flex items-center gap-4">
                <img
                  src={channel.logo}
                  alt={channel.name}
                  className="
                    h-14
                    w-14
                    rounded-full
                    border
                    border-red-500/30
                    object-cover
                  "
                />

                <div>
                  <h3 className="text-sm font-black">
                    {channel.name}
                  </h3>

                  <p className="mt-1 text-[8px] tracking-[0.15em] text-white/25">
                    {channel.handle}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-xs leading-6 text-white/35 sm:text-sm">
                Latest vlogs, technology,
                lifestyle and unforgettable
                experiences — all in one place.
              </p>
            </div>
          </div>
        </div>

        {/* FEATURED */}

        <div className="mx-auto max-w-[1700px] px-3 sm:px-5 lg:px-8">
          <article
            className="
              featured-video
              group
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-white/10
              bg-black
              shadow-[0_30px_100px_rgba(0,0,0,.5)]
              sm:rounded-[32px]
            "
          >
            <div
              className="
                relative
                aspect-video
                overflow-hidden
                lg:aspect-[21/9]
              "
            >
              <VideoThumbnail
                video={featured}
                featured
                number={1}
              />

              <div
                className="
                  absolute
                  left-5
                  top-5
                  z-20
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-black/60
                  px-4
                  py-2
                  text-[7px]
                  font-black
                  tracking-[0.2em]
                  backdrop-blur-xl
                "
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                FEATURED VIDEO
              </div>
            </div>

            <div
              className="
                flex
                flex-col
                gap-5
                border-t
                border-white/10
                bg-[#090909]
                p-5
                sm:p-7
                lg:flex-row
                lg:items-center
                lg:justify-between
                lg:px-8
              "
            >
              <div className="flex items-center gap-4">
                <img
                  src={channel.logo}
                  alt={channel.name}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div>
                  <p className="text-[9px] font-black">
                    {channel.name}
                  </p>

                  <p className="mt-1 text-[7px] text-white/25">
                    {channel.handle}
                  </p>
                </div>
              </div>

              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  w-fit
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/10
                  px-5
                  py-3
                  text-[7px]
                  font-black
                  tracking-[0.15em]
                  transition
                  hover:border-red-500
                  hover:bg-red-600
                "
              >
                OPEN ON YOUTUBE
                <FaArrowUpRightFromSquare />
              </a>
            </div>
          </article>
        </div>

        {/* GRID */}

        <div className="mx-auto mt-20 max-w-[1700px] px-3 sm:px-5 lg:mt-28 lg:px-8">
          <div className="mb-8 flex items-end justify-between px-2">
            <div>
              <p className="text-[7px] font-black tracking-[0.3em] text-red-500">
                MORE FROM THE CHANNEL
              </p>

              <h3 className="mt-3 text-2xl font-black sm:text-3xl">
                MORE VIDEOS
              </h3>
            </div>

            <span className="hidden text-[7px] font-bold tracking-[0.2em] text-white/20 sm:block">
              09 VIDEOS
            </span>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-px
              overflow-hidden
              rounded-[24px]
              border
              border-white/[0.06]
              bg-white/[0.06]
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {remaining.map((video, index) => (
              <VideoCard
                key={`${video.title}-${index}`}
                video={video}
                index={index + 2}
              />
            ))}
          </div>
        </div>

        {/* CTA */}

        <div className="mx-auto max-w-[1700px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-red-500/20
              bg-gradient-to-br
              from-red-600
              via-red-600
              to-red-900
              p-8
              sm:p-12
              lg:p-20
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-96
                w-96
                rounded-full
                border-[60px]
                border-white/10
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                bottom-[-150px]
                left-[-100px]
                h-80
                w-80
                rounded-full
                bg-white/10
                blur-3xl
              "
            />

            <div
              className="
                relative
                z-10
                flex
                flex-col
                justify-between
                gap-10
                lg:flex-row
                lg:items-end
              "
            >
              <div>
                <p className="text-[8px] font-black tracking-[0.3em] text-white/60">
                  ENJOYED THE VIDEOS?
                </p>

                <h2
                  className="
                    mt-5
                    text-[15vw]
                    font-black
                    leading-[0.7]
                    tracking-[-0.1em]
                    sm:text-[11vw]
                    lg:text-[8vw]
                  "
                >
                  SUBSCRIBE.
                </h2>
              </div>

              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  w-fit
                  items-center
                  gap-4
                  rounded-full
                  bg-white
                  px-7
                  py-4
                  text-[8px]
                  font-black
                  tracking-[0.18em]
                  text-red-600
                  transition
                  hover:-translate-y-1
                "
              >
                <FaYoutube />
                {channel.handle}
                <FaArrowUpRightFromSquare />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer
        className="
          flex
          w-full
          flex-col
          gap-4
          border-t
          border-white/[0.06]
          bg-[#020202]
          px-5
          py-8
          text-[7px]
          font-bold
          tracking-[0.2em]
          text-white/20
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-8
          lg:px-12
        "
      >
        <span>SVM®</span>

        <span>
          YOUTUBE / VLOGS / LIFESTYLE / TECH
        </span>

        <span>
          © {new Date().getFullYear()}
        </span>
      </footer>
    </main>
  );
}
