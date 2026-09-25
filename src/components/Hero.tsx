import { Fragment, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PropertySearchWidget } from "@/components/PropertySearchWidget";
import { useLoading } from "@/contexts/LoadingContext";
import { ArrowRight, Pause, Play, Search, X } from "lucide-react";

// Modern house exterior by Kindel Media on Pexels (free licence):
// https://www.pexels.com/video/an-exterior-design-of-a-modern-house-7578541/
const VIDEO_HD =
  "https://videos.pexels.com/video-files/7578541/7578541-hd_1920_1080_30fps.mp4";
const VIDEO_SD =
  "https://videos.pexels.com/video-files/7578541/7578541-sd_960_540_30fps.mp4";
// First frame of the video, so there is no visible swap when playback starts.
const POSTER = "/hero-poster.jpg";

// Strong ease-out: fast start, long settle. Reads as confident rather than floaty.
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const headline = [
  { text: "Transforming", accent: true },
  { text: "Spaces.", accent: false },
  { text: "Building", accent: true },
  { text: "Trust.", accent: false },
];

export function Hero() {
  const [showSearch, setShowSearch] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // Hold the entrance until the first-visit intro loader has cleared, so it is actually seen.
  const { isLoading } = useLoading();
  const ready = !isLoading;

  // Gentle parallax: the video drifts slower than the page and the copy fades as you leave.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-8%"]);

  // Respect reduced motion: show the still poster instead of autoplaying.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
      setIsPlaying(false);
    }
  }, [reduceMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const reveal = (delay: number) =>
    reduceMotion
      ? {
          initial: { opacity: 0 },
          animate: ready ? { opacity: 1 } : { opacity: 0 },
          transition: { duration: 0.3 },
        }
      : {
          initial: { opacity: 0, y: 24, filter: "blur(6px)" },
          animate: ready
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 24, filter: "blur(6px)" },
          transition: { duration: 0.9, delay, ease: EASE_OUT },
        };

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden bg-black text-white"
    >
      {/* Background video */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 will-change-transform"
        style={reduceMotion ? undefined : { y: videoY }}
      >
        <motion.video
          ref={videoRef}
          className="h-[118%] w-full object-cover"
          poster={POSTER}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoReady(true)}
          initial={{ scale: reduceMotion ? 1 : 1.12, opacity: 0.4 }}
          animate={{ scale: 1, opacity: videoReady || reduceMotion ? 1 : 0.4 }}
          transition={{ duration: 2.4, ease: EASE_OUT }}
        >
          <source src={VIDEO_SD} type="video/mp4" media="(max-width: 767px)" />
          <source src={VIDEO_HD} type="video/mp4" />
        </motion.video>
      </motion.div>

      {/* Legibility scrims: heavier on the left where the copy sits */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-black/90 to-transparent"
      />

      <motion.div
        className="container mx-auto flex w-full flex-1 flex-col justify-center px-4 py-16 md:py-24"
        style={
          reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }
        }
      >
        <div className="max-w-3xl">
          <motion.div {...reveal(0.1)} className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Nigeria's Premier Real Estate Company
            </span>
          </motion.div>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {headline.map((word, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span
                    className={`inline-block ${word.accent ? "text-primary" : ""}`}
                    initial={reduceMotion ? { opacity: 0 } : { y: "105%" }}
                    animate={
                      !ready
                        ? reduceMotion
                          ? { opacity: 0 }
                          : { y: "105%" }
                        : reduceMotion
                          ? { opacity: 1 }
                          : { y: "0%" }
                    }
                    transition={{
                      duration: reduceMotion ? 0.3 : 0.9,
                      delay: 0.2 + i * 0.08,
                      ease: EASE_OUT,
                    }}
                  >
                    {word.text}
                  </motion.span>
                </span>{" "}
                {i === 1 && <br className="hidden sm:block" />}
              </Fragment>
            ))}
          </h1>

          <motion.p
            {...reveal(0.55)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl"
          >
            Da'sayonce Real Estate and Properties delivers exceptional real
            estate solutions that reflect quality, value, and client aspirations
            across Nigeria.
          </motion.p>

          <motion.div
            {...reveal(0.7)}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button
              onClick={() => setShowSearch((s) => !s)}
              size="lg"
              aria-expanded={showSearch}
              aria-controls="hero-search"
              className="group h-14 bg-primary px-8 text-base text-black transition-transform duration-150 hover:bg-primary/90 active:scale-[0.97]"
            >
              {showSearch ? (
                <X className="mr-2 h-5 w-5" />
              ) : (
                <Search className="mr-2 h-5 w-5" />
              )}
              {showSearch ? "Close Search" : "Find Your Dream Home"}
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group h-14 border-white/40 bg-white/5 px-8 text-base text-white backdrop-blur-md transition-[background-color,color,transform] duration-200 hover:bg-white hover:text-black active:scale-[0.97]"
            >
              <Link to="/properties">
                Browse Properties
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {showSearch && (
            <motion.div
              id="hero-search"
              key="search"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE_OUT }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: reduceMotion ? 0 : 12 }}
                animate={{ y: 0 }}
                exit={{ y: reduceMotion ? 0 : 8 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="max-w-4xl pt-8"
              >
                <PropertySearchWidget />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Video control (WCAG 2.2.2: moving content must be pausable) */}
      <motion.button
        {...reveal(0.9)}
        type="button"
        onClick={togglePlayback}
        aria-label={
          isPlaying ? "Pause background video" : "Play background video"
        }
        className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white/80 backdrop-blur-md transition-[background-color,color,transform] duration-150 hover:bg-white hover:text-black active:scale-90"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </motion.button>
    </section>
  );
}
