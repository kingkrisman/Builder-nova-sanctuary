import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Grid3X3,
  List,
  MapPin,
  Plus,
  Scale,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PropertyCard, formatNaira } from "@/components/PropertyCard";
import { PropertyComparison } from "@/components/PropertyComparison";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProperties } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function PropertyListing() {
  const { data: properties = [], isLoading } = useProperties();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const maxPrice = useMemo(
    () => Math.max(500_000_000, ...properties.map((p) => p.price)),
    [properties],
  );
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const range = priceRange ?? [0, maxPrice];
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Pre-fill from the home page search widget
  useEffect(() => {
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    if (search) setSearchTerm(search);
    if (type) setSelectedType(type);
    if (status) setSelectedStatus(status);
  }, [searchParams]);

  const propertyTypes = [...new Set(properties.map((p) => p.type))];
  const propertyStatuses = [...new Set(properties.map((p) => p.status))];
  const locations = [...new Set(properties.map((p) => p.location))].sort();

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const list = properties.filter(
      (p) =>
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)) &&
        (selectedType === "all" || p.type === selectedType) &&
        (selectedStatus === "all" || p.status === selectedStatus) &&
        (selectedLocation === "all" || p.location === selectedLocation) &&
        p.price >= range[0] &&
        p.price <= range[1],
    );
    const byDate = (a: string, b: string) => new Date(b).getTime() - new Date(a).getTime();
    switch (sortBy) {
      case "price-low":
        return list.sort((a, b) => a.price - b.price);
      case "price-high":
        return list.sort((a, b) => b.price - a.price);
      case "oldest":
        return list.sort((a, b) => byDate(b.dateAdded, a.dateAdded));
      default:
        return list.sort((a, b) => byDate(a.dateAdded, b.dateAdded));
    }
  }, [properties, searchTerm, selectedType, selectedStatus, selectedLocation, range, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedStatus("all");
    setSelectedLocation("all");
    setPriceRange(null);
  };

  const activeFilters = [
    selectedType !== "all",
    selectedStatus !== "all",
    selectedLocation !== "all",
    range[0] > 0 || range[1] < maxPrice,
    searchTerm.length > 0,
  ].filter(Boolean).length;

  const toggleCompare = (id: number) =>
    setCompareIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : ids.length < 4 ? [...ids, id] : ids,
    );

  const filterSelect = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    options: string[],
  ) => (
    <label className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-11 rounded-xl bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any</SelectItem>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );

  return (
    <Layout>
      <PageHeader
        title={
          <>
            Property <span className="text-primary">Listings</span>
          </>
        }
        subtitle="Discover Your Perfect Property"
        description="Residential, commercial and land opportunities across Nigeria, from luxury homes to investment plots."
        badge="Premium Properties"
        backgroundImage="https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg"
        action={{ label: "Schedule a Viewing", href: "/contact", variant: "outline" }}
      />

      {/* Sticky search & filter bar */}
      <div className="sticky-below-nav z-30 border-b bg-white/85 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Search by title, area or keyword…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 rounded-full border-neutral-200 bg-neutral-50 pl-11"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters((s) => !s)}
                aria-expanded={showFilters}
                className={cn(
                  "inline-flex h-12 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors",
                  showFilters ? "border-black bg-black text-white" : "hover:border-black",
                )}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilters > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-black">
                    {activeFilters}
                  </span>
                )}
              </button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 flex-1 rounded-full md:w-44 md:flex-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="price-low">Price: low to high</SelectItem>
                  <SelectItem value="price-high">Price: high to low</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden h-12 rounded-full border p-1 md:flex">
                {(["grid", "list"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    aria-label={`${mode} view`}
                    aria-pressed={viewMode === mode}
                    className={cn(
                      "flex w-10 items-center justify-center rounded-full transition-colors",
                      viewMode === mode ? "bg-black text-white" : "text-neutral-500 hover:text-black",
                    )}
                  >
                    {mode === "grid" ? <Grid3X3 className="h-4 w-4" /> : <List className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="grid gap-5 pb-2 pt-5 md:grid-cols-4">
                  {filterSelect("Type", selectedType, setSelectedType, propertyTypes)}
                  {filterSelect("Status", selectedStatus, setSelectedStatus, propertyStatuses)}
                  {filterSelect("Location", selectedLocation, setSelectedLocation, locations)}
                  <div className="space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Price: {formatNaira(range[0])} – {formatNaira(range[1])}
                    </span>
                    <Slider
                      value={range}
                      onValueChange={(v) => setPriceRange(v as [number, number])}
                      max={maxPrice}
                      step={1_000_000}
                    />
                  </div>
                </div>
                {activeFilters > 0 && (
                  <button
                    onClick={clearFilters}
                    className="mb-2 mt-3 inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-black"
                  >
                    <X className="h-4 w-4" /> Clear all filters
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      <section className="min-h-[60vh] bg-neutral-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <p className="mb-8 text-neutral-500">
            <motion.span
              key={filtered.length}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-2xl font-bold text-black"
            >
              {isLoading ? "…" : filtered.length}
            </motion.span>{" "}
            {filtered.length === 1 ? "property" : "properties"} found
          </p>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <motion.div
              layout
              className={cn(
                "grid gap-6",
                viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
              )}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((property, i) => {
                  const comparing = compareIds.includes(property.id);
                  return (
                    <motion.div
                      key={property.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 8) * 0.04 }}
                    >
                      <PropertyCard
                        property={property}
                        layout={viewMode}
                        action={
                          <button
                            onClick={() => toggleCompare(property.id)}
                            disabled={!comparing && compareIds.length >= 4}
                            title={comparing ? "Remove from comparison" : "Add to comparison"}
                            className={cn(
                              "flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold shadow-md backdrop-blur transition-colors disabled:opacity-40",
                              comparing ? "bg-primary text-black" : "bg-white/90 text-black hover:bg-white",
                            )}
                          >
                            {comparing ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                            Compare
                          </button>
                        }
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="py-20 text-center">
              <MapPin className="mx-auto mb-4 h-12 w-12 text-neutral-300" />
              <h3 className="text-xl font-semibold">No properties match</h3>
              <p className="mt-2 text-neutral-500">Try widening your search or clearing a filter.</p>
              <button
                onClick={clearFilters}
                className="mt-6 rounded-full border border-black px-6 py-3 font-semibold hover:bg-black hover:text-white"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Can't find it */}
      <section className="bg-white py-24">
        <Reveal className="container mx-auto max-w-3xl px-4 text-center">
          <p className="eyebrow">Personal search</p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Can't find what you're <span className="text-primary">looking for?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-600">
            Tell us what you need and our agents will search our off-market network for you.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-full bg-black px-8 py-4 font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Talk to an agent
          </Link>
        </Reveal>
      </section>

      {/* Floating compare tray */}
      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-4"
          >
            <div className="flex items-center gap-3 rounded-full bg-black py-2 pl-5 pr-2 text-white shadow-2xl">
              <Scale className="h-4 w-4 text-primary" />
              <span className="text-sm">
                {compareIds.length} of 4 selected
              </span>
              <button
                onClick={() => setCompareIds([])}
                className="rounded-full px-3 py-2 text-sm text-white/60 hover:text-white"
              >
                Clear
              </button>
              <button
                onClick={() => setShowComparison(true)}
                disabled={compareIds.length < 2}
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black disabled:opacity-50"
              >
                Compare
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showComparison && (
        <PropertyComparison
          properties={properties.filter((p) => compareIds.includes(p.id))}
          onRemoveProperty={(id) => setCompareIds((ids) => ids.filter((x) => x !== id))}
          onClose={() => setShowComparison(false)}
        />
      )}
    </Layout>
  );
}
