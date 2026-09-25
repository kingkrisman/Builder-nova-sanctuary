import { PropertySEO } from "@/components/RealEstateSEO";
import { track } from "@/lib/analytics";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  Bath,
  Bed,
  Calendar,
  Camera,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Expand,
  Mail,
  MapPin,
  Phone,
  Ruler,
  Share2,
  Sofa,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PropertyCard, formatNaira, statusStyles } from "@/components/PropertyCard";
import { SmartImage } from "@/components/SmartImage";
import { VirtualTourModal } from "@/components/VirtualTourModal";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useProperties } from "@/lib/content";
import { resizeImage } from "@/lib/image";
import { cn } from "@/lib/utils";

export default function PropertyDetails() {
  const { id } = useParams();
  const { data: properties = [], isLoading } = useProperties();
  const property = properties.find((p) => p.id === Number(id));
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showTour, setShowTour] = useState(false);

  const similar = useMemo(() => {
    if (!property) return [];
    const city = property.location.split(",").pop()?.trim();
    return properties
      .filter((p) => p.id !== property.id)
      .map((p) => ({
        p,
        score:
          (p.type === property.type ? 2 : 0) +
          (city && p.location.includes(city) ? 2 : 0) +
          (p.status === property.status ? 1 : 0) +
          (Math.abs(p.price - property.price) / Math.max(property.price, 1) < 0.5 ? 1 : 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => x.p);
  }, [properties, property]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto space-y-6 px-4 py-12">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="aspect-[21/9] w-full rounded-3xl" />
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="flex min-h-[70vh] items-center justify-center px-4 text-center">
          <div>
            <p className="font-serif text-8xl italic text-primary">404</p>
            <h1 className="mt-4 text-3xl font-bold">This property isn't available</h1>
            <p className="mt-2 text-neutral-500">It may have been sold or taken off the market.</p>
            <Link
              to="/properties"
              className="mt-8 inline-flex rounded-full bg-black px-7 py-4 font-semibold text-white"
            >
              Browse all properties
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const images = property.images.length ? property.images : [property.imageUrl];

  const share = async () => {
    track("share");
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: property.title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      }
    } catch {
      /* user cancelled */
    }
  };

  const facts = [
    property.bedrooms != null && { icon: Bed, label: "Bedrooms", value: property.bedrooms },
    property.bathrooms != null && { icon: Bath, label: "Bathrooms", value: property.bathrooms },
    property.size && { icon: Ruler, label: "Size", value: property.size },
    property.parking != null && { icon: Car, label: "Parking", value: property.parking },
    property.yearBuilt && { icon: Calendar, label: "Built", value: property.yearBuilt },
    property.furnished != null && { icon: Sofa, label: "Furnished", value: property.furnished ? "Yes" : "No" },
  ].filter(Boolean) as { icon: typeof Bed; label: string; value: string | number }[];

  return (
    <Layout>
      <PropertySEO property={property} />
      {/* Title */}
      <section className="bg-white pb-8 pt-10 md:pt-14">
        <div className="container mx-auto px-4">
          <Link
            to="/properties"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All properties
          </Link>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <div className="flex flex-wrap gap-2">
                <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusStyles[property.status])}>
                  {property.status}
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold">{property.type}</span>
              </div>
              <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">{property.title}</h1>
              <p className="mt-3 flex items-center gap-2 text-neutral-500">
                <MapPin className="h-4 w-4 text-primary" />
                {property.address || property.location}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:text-right">
              <p className="text-4xl font-bold md:text-5xl">
                {formatNaira(property.price, false)}
                {property.status === "For Rent" && <span className="text-lg font-medium text-neutral-500"> /year</span>}
              </p>
              <div className="mt-4 flex gap-2 lg:justify-end">
                <button
                  onClick={share}
                  className="inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-semibold hover:border-black"
                >
                  <Share2 className="h-4 w-4" /> Share
                </button>
                {images.length > 1 && (
                  <button
                    onClick={() => setShowTour(true)}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-white"
                  >
                    <Camera className="h-4 w-4" /> Virtual tour
                  </button>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mosaic gallery */}
      <section className="bg-white pb-12">
        <div className="container mx-auto px-4">
          <Reveal variant="clip">
            <div className="grid h-[60vh] min-h-[380px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-3xl md:gap-3">
              {images.slice(0, 5).map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setLightbox(i)}
                  className={cn(
                    "group relative overflow-hidden",
                    i === 0
                      ? "col-span-4 row-span-2 md:col-span-2"
                      : "hidden md:block",
                    images.length === 2 && i === 1 && "md:col-span-2 md:row-span-2",
                    images.length === 3 && i > 0 && "md:col-span-2",
                    images.length === 4 && i === 3 && "md:col-span-2",
                  )}
                  aria-label={`Open photo ${i + 1}`}
                >
                  <SmartImage
                    src={src}
                    alt={`${property.title}, photo ${i + 1}`}
                    priority={i === 0}
                    wrapperClassName="absolute inset-0"
                    className="transition-transform duration-[1200ms] ease-out-expo group-hover:scale-105"
                    sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "25vw"}
                  />
                  {i === 4 && images.length > 5 && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-xl font-semibold text-white">
                      +{images.length - 5}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Reveal>
          <button
            onClick={() => setLightbox(0)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
          >
            <Expand className="h-4 w-4" /> View all {images.length} photos
          </button>
        </div>
      </section>

      {/* Details + sticky agent card */}
      <section className="bg-white pb-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-3">
          <div className="space-y-14 lg:col-span-2">
            {facts.length > 0 && (
              <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-neutral-200 sm:grid-cols-3">
                {facts.map(({ icon: Icon, label, value }) => (
                  <RevealItem key={label} className="bg-white p-5">
                    <Icon className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-xl font-semibold">{value}</p>
                    <p className="text-sm text-neutral-500">{label}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            )}

            <Reveal>
              <h2 className="text-2xl font-bold">About this property</h2>
              <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-neutral-700">
                {property.description}
              </p>
            </Reveal>

            {property.features.length > 0 && (
              <div>
                <Reveal>
                  <h2 className="text-2xl font-bold">Features & amenities</h2>
                </Reveal>
                <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2" stagger={0.04}>
                  {property.features.map((f) => (
                    <RevealItem key={f} className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />
                      </span>
                      {f}
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            )}
          </div>

          <aside>
            <div className="sticky-below-nav pt-4">
              <Reveal variant="right" className="rounded-3xl bg-black p-7 text-white">
                <p className="eyebrow">Interested?</p>
                <p className="mt-3 text-2xl font-semibold">Speak with {property.agent.name || "our team"}</p>
                <p className="mt-1 text-sm text-white/60">Property agent · Ref #{String(property.id).padStart(4, "0")}</p>
                <div className="mt-6 space-y-3">
                  {property.agent.phone && (
                    <a
                      href={`tel:${property.agent.phone.replace(/\s/g, "")}`}
                      className="flex h-12 items-center justify-center gap-2 rounded-full bg-primary font-semibold text-black transition-transform hover:scale-[1.02]"
                    >
                      <Phone className="h-4 w-4" /> Call {property.agent.phone}
                    </a>
                  )}
                  {property.agent.email && (
                    <a
                      href={`mailto:${property.agent.email}?subject=${encodeURIComponent(`Enquiry: ${property.title}`)}`}
                      className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 font-semibold transition-colors hover:bg-white hover:text-black"
                    >
                      <Mail className="h-4 w-4" /> Email agent
                    </a>
                  )}
                  <Link
                    to="/contact"
                    className="flex h-12 items-center justify-center rounded-full text-sm font-semibold text-white/70 hover:text-white"
                  >
                    Book a viewing
                  </Link>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="bg-neutral-100 py-24">
          <div className="container mx-auto px-4">
            <SectionHeading
              eyebrow="You may also like"
              title={
                <>
                  Similar <span className="text-primary">properties</span>
                </>
              }
            />
            <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <RevealItem key={p.id}>
                  <PropertyCard property={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <Dialog open={lightbox !== null} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-6xl border-0 bg-black p-0 text-white sm:rounded-2xl">
          <DialogTitle className="sr-only">{property.title} photos</DialogTitle>
          {lightbox !== null && (
            <div className="relative aspect-[3/2] overflow-hidden sm:rounded-2xl">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.img
                  key={lightbox}
                  src={resizeImage(images[lightbox], 1920)}
                  alt={`${property.title}, photo ${lightbox + 1}`}
                  className="absolute inset-0 h-full w-full object-contain"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setLightbox((lightbox - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 backdrop-blur hover:bg-white/25"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setLightbox((lightbox + 1) % images.length)}
                    className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 backdrop-blur hover:bg-white/25"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm tabular-nums">
                {lightbox + 1} / {images.length}
              </span>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <VirtualTourModal property={property} isOpen={showTour} onClose={() => setShowTour(false)} />
    </Layout>
  );
}
