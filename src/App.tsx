import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Loader2 } from "lucide-react";
import { LoadingProvider } from "./contexts/LoadingContext";
import { RealEstateLoader } from "./components/RealEstateLoader";
import { useLoading } from "./contexts/LoadingContext";
import { usePageLoading } from "./hooks/usePageLoading";
import { PageTransition } from "./components/motion/PageTransition";
import { SmoothScroll, scrollToTop } from "./lib/smooth-scroll";
import Home from "./pages/Home";

// Every page except Home is split into its own chunk and fetched on demand
const pages = {
  about: () => import("./pages/About"),
  services: () => import("./pages/Services"),
  projects: () => import("./pages/Projects"),
  team: () => import("./pages/Team"),
  blog: () => import("./pages/Blog"),
  blogPost: () => import("./pages/BlogPost"),
  contact: () => import("./pages/Contact"),
  propertyListing: () => import("./pages/PropertyListing"),
  propertyDetails: () => import("./pages/PropertyDetails"),
  notFound: () => import("./pages/NotFound"),
};

const About = lazy(pages.about);
const Services = lazy(pages.services);
const Projects = lazy(pages.projects);
const Team = lazy(pages.team);
const Blog = lazy(pages.blog);
const BlogPost = lazy(pages.blogPost);
const Contact = lazy(pages.contact);
const PropertyListing = lazy(pages.propertyListing);
const PropertyDetails = lazy(pages.propertyDetails);
const NotFound = lazy(pages.notFound);
const AdminApp = lazy(() => import("./admin/AdminApp"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

function PageFallback() {
  return <div className="min-h-screen bg-black" />;
}

function PublicSite() {
  const location = useLocation();
  const { isLoading, loadingMessage } = useLoading();
  usePageLoading();

  // Once the first page is up, quietly prefetch the rest so navigation never waits on a chunk
  useEffect(() => {
    const idle =
      window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2000));
    const handle = idle(() => Object.values(pages).forEach((load) => load()));
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(handle);
  }, []);

  const page = (element: JSX.Element) => (
    <PageTransition>
      <Suspense fallback={<PageFallback />}>{element}</Suspense>
    </PageTransition>
  );

  return (
    <SmoothScroll>
      {/* Scroll resets while the curtain covers the screen, so the jump is never seen */}
      <AnimatePresence mode="wait" onExitComplete={() => scrollToTop({ immediate: true })}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={page(<Home />)} />
          <Route path="/about" element={page(<About />)} />
          <Route path="/services" element={page(<Services />)} />
          <Route path="/projects" element={page(<Projects />)} />
          <Route path="/team" element={page(<Team />)} />
          <Route path="/blog" element={page(<Blog />)} />
          <Route path="/blog/:slug" element={page(<BlogPost />)} />
          <Route path="/properties" element={page(<PropertyListing />)} />
          <Route path="/properties/:id" element={page(<PropertyDetails />)} />
          <Route path="/contact" element={page(<Contact />)} />
          <Route path="*" element={page(<NotFound />)} />
        </Routes>
      </AnimatePresence>
      <Analytics />
      <SpeedInsights />

      {/* First-visit intro loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="intro-loader"
            className="fixed inset-0 z-[100]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <RealEstateLoader
              isLoading={isLoading}
              duration={3000}
              showProgress={false}
              fullScreen={true}
              message={loadingMessage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </SmoothScroll>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LoadingProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner richColors position="top-center" />
          <Routes>
            <Route
              path="/admin/*"
              element={
                <Suspense
                  fallback={
                    <div className="flex min-h-screen items-center justify-center bg-neutral-950">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  }
                >
                  <AdminApp />
                </Suspense>
              }
            />
            <Route path="*" element={<PublicSite />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LoadingProvider>
  </QueryClientProvider>
);

export default App;
