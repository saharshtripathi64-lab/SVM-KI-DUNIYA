import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./YouTubeShowcase.css";

gsap.registerPlugin(ScrollTrigger);

/*
|--------------------------------------------------------------------------
| VIDEO DATA
|--------------------------------------------------------------------------
| Replace ONLY the values below with your own content.
|
| thumbnail:
|   Use a direct image URL.
|
| youtubeUrl:
|   Use the full YouTube video URL.
|
| For a YouTube video ID such as:
|   https://www.youtube.com/watch?v=dQw4w9WgXcQ
|
| You can also use:
|   https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg
| as the thumbnail.
|--------------------------------------------------------------------------
*/

const videos = [
  {
    id: 1,
    title: "Building My Dream Gaming Setup",
    description:
      "A cinematic look at the setup, workflow and technology behind my creator space.",
    thumbnail:
      "https://img.youtube.com/vi/VIDEO_ID_01/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_01",
    category: "Gaming",
  },
  {
    id: 2,
    title: "The Ultimate Developer Workflow",
    description:
      "How I organize my tools, projects and creative workflow as a modern developer.",
    thumbnail:
      "https://img.youtube.com/vi/VIDEO_ID_02/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_02",
    category: "Development",
  },
  {
    id: 3,
    title: "Creating a Cinematic Portfolio",
    description:
      "Behind the scenes of designing and building a premium interactive portfolio.",
    thumbnail:
      "https://img.youtube.com/vi/VIDEO_ID_03/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_03",
    category: "Design",
  },
  {
    id: 4,
    title: "React Projects That Changed Everything",
    description:
      "A collection of experiments and React projects that pushed my development skills.",
    thumbnail:
      "https://img.youtube.com/vi/VIDEO_ID_04/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_04",
    category: "React",
  },
  {
    id: 5,
    title: "Inside My Creative Process",
    description:
      "From a blank canvas to a polished digital experience.",
    thumbnail:
      "https://img.youtube.com/vi/VIDEO_ID_05/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_05",
    category: "Creative",
  },
  {
    id: 6,
    title: "Building a Full Stack Application",
    description:
      "A practical look at designing, coding and deploying a modern full-stack application.",
    thumbnail:
      "https://img.youtube.com/vi/VIDEO_ID_06/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_06",
    category: "Full Stack",
  },
  {
    id: 7,
    title: "My Favorite Developer Tools",
    description:
      "The software and tools I use every day to build faster and better.",
    thumbnail:
      "https://img.youtube.com/vi/VIDEO_ID_07/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_07",
    category: "Tech",
  },
  {
    id: 8,
    title: "From Idea to Production",
    description:
      "The complete journey of turning an idea into a production-ready digital product.",
    thumbnail:
      "https://img.youtube.com/vi/VIDEO_ID_08/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_08",
    category: "Build",
  },
  {
    id: 9,
    title: "A Day in the Life of a Developer",
    description:
      "Coding, designing, learning and creating throughout a typical day.",
    thumbnail:
      "https://img.youtube.com/vi/VIDEO_ID_09/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_09",
    category: "Lifestyle",
  },
  {
    id: 10,
    title: "The Future of Creative Development",
    description:
      "Exploring the intersection of code, design, AI and interactive experiences.",
    thumbnail:
      "https://img.youtube.com/vi/VIDEO_ID_10/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_10",
    category: "Future",
  },
];

function formatNumber(number) {
  return String(number).padStart(2, "0");
}

function YouTubeShowcase() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const mediaRef = useRef(null);
  const contentRef = useRef(null);
  const progressFillRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const media = mediaRef.current;
    const content = contentRef.current;
    const progressFill = progressFillRef.current;

    if (!section || !stage || !media || !content || !progressFill) {
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      /*
       * Reduced motion:
       * Keep the section usable without pinning/scrub animation.
       */
      if (reduceMotion) {
        gsap.set(media, {
          opacity: 1,
          scale: 1,
          x: 0,
          clipPath: "inset(0% 0% 0% 0% round 24px)",
        });

        gsap.set(content, {
          opacity: 1,
          x: 0,
        });

        gsap.set(progressFill, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        return;
      }

      const totalVideos = videos.length;

      /*
       * Master timeline.
       *
       * There are 9 transitions between the 10 videos.
       * Each transition occupies one timeline unit.
       */
      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },
        onUpdate: function () {
          const progress = this.progress();

          const nextIndex = Math.min(
            totalVideos - 1,
            Math.floor(progress * totalVideos)
          );

          setActiveIndex((current) =>
            current === nextIndex ? current : nextIndex
          );
        },
      });

      /*
       * Initial state.
       */
      gsap.set(media, {
        opacity: 1,
        scale: 1,
        x: 0,
        clipPath: "inset(0% 0% 0% 0% round 24px)",
      });

      gsap.set(content, {
        opacity: 1,
        x: 0,
      });

      gsap.set(progressFill, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      /*
       * Progress bar.
       */
      timeline.to(
        progressFill,
        {
          scaleX: 1,
          duration: totalVideos,
        },
        0
      );

      /*
       * Cinematic transitions.
       *
       * The React state changes at each section of the timeline,
       * while GSAP handles the visual transition.
       */
      for (let i = 1; i < totalVideos; i += 1) {
        const position = i;

        timeline.to(
          media,
          {
            opacity: 0.05,
            scale: 1.08,
            x: -35,
            clipPath: "inset(0% 10% 0% 0% round 24px)",
            duration: 0.45,
          },
          position
        );

        timeline.to(
          content,
          {
            opacity: 0,
            x: -30,
            duration: 0.25,
          },
          position
        );

        timeline.set(
          media,
          {
            x: 35,
            clipPath: "inset(0% 0% 0% 10% round 24px)",
          },
          position + 0.45
        );

        timeline.to(
          media,
          {
            opacity: 1,
            scale: 1,
            x: 0,
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            duration: 0.55,
          },
          position + 0.45
        );

        timeline.to(
          content,
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
          },
          position + 0.45
        );
      }

      /*
       * Pinning:
       *
       * One transition gets roughly 100vw of scroll distance.
       * The section remains pinned until the entire timeline completes.
       */
      ScrollTrigger.create({
        animation: timeline,
        trigger: section,
        start: "top top",
        end: `+=${window.innerHeight * (totalVideos - 1)}`,
        pin: stage,
        scrub: 1.15,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const activeVideo = videos[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="youtube-showcase"
      aria-label="My YouTube Channel"
    >
      <div ref={stageRef} className="youtube-stage">
        <div className="youtube-noise" aria-hidden="true" />

        <div className="youtube-container">
          {/* LEFT */}
          <div ref={contentRef} className="youtube-content">
            <div className="youtube-eyebrow">
              <span className="youtube-eyebrow-dot" />
              MY YOUTUBE CHANNEL
            </div>

            <div className="youtube-category">
              {activeVideo.category}
            </div>

            <h2 className="youtube-title">{activeVideo.title}</h2>

            <p className="youtube-description">
              {activeVideo.description}
            </p>

            <a
              className="youtube-button"
              href={activeVideo.youtubeUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>WATCH ON YOUTUBE</span>

              <span className="youtube-button-icon" aria-hidden="true">
                ↗
              </span>
            </a>

            <div className="youtube-counter">
              <span className="youtube-counter-current">
                {formatNumber(activeVideo.id)}
              </span>

              <span className="youtube-counter-divider">/</span>

              <span>10</span>
            </div>
          </div>

          {/* RIGHT / VIDEO */}
          <div className="youtube-media-wrapper">
            <div ref={mediaRef} className="youtube-media">
              <img
                key={activeVideo.id}
                src={activeVideo.thumbnail}
                alt={`${activeVideo.title} thumbnail`}
                loading={activeIndex === 0 ? "eager" : "lazy"}
                decoding="async"
                className="youtube-thumbnail"
              />

              <div className="youtube-media-overlay" />

              <div className="youtube-media-top">
                <span>FEATURED VIDEO</span>

                <span className="youtube-media-index">
                  {formatNumber(activeVideo.id)}
                </span>
              </div>

              <a
                href={activeVideo.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="youtube-play"
                aria-label={`Watch ${activeVideo.title} on YouTube`}
              >
                <span className="youtube-play-triangle" />
              </a>

              <div className="youtube-media-bottom">
                <span>{activeVideo.category}</span>
                <span>YOUTUBE</span>
              </div>
            </div>

            <div className="youtube-glow" aria-hidden="true" />
          </div>
        </div>

        {/* BOTTOM PROGRESS */}
        <div className="youtube-bottom">
          <div className="youtube-progress">
            <div className="youtube-progress-track">
              <div
                ref={progressFillRef}
                className="youtube-progress-fill"
              />
            </div>

            <div className="youtube-progress-dots">
              {videos.map((video, index) => (
                <span
                  key={video.id}
                  className={`youtube-progress-dot ${
                    index === activeIndex ? "is-active" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="youtube-scroll-hint">
            <span>SCROLL TO EXPLORE</span>
            <span className="youtube-scroll-arrow">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default YouTubeShowcase;
