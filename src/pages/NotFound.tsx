import { NotFoundSEO } from "@/components/RealEstateSEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const NotFound = () => (
  <Layout>
    <NotFoundSEO />
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-black text-white">
      <motion.p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-serif text-[40vw] italic leading-none text-white/[0.04]"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        404
      </motion.p>
      <div className="container relative mx-auto px-4 text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          This address doesn't <span className="text-primary">exist yet.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-white/65">
          The page may have moved, or the link might be mistyped. Let's get you back on solid
          ground.
        </p>
        <Link
          to="/"
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-black transition-transform hover:scale-[1.03]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>
      </div>
    </section>
  </Layout>
);

export default NotFound;
