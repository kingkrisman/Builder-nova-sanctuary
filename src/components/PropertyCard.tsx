import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Bath, Bed, Car, MapPin, Ruler } from "lucide-react";
import { Property } from "@/lib/data";
import { SmartImage } from "@/components/SmartImage";
import { cn } from "@/lib/utils";

export const formatNaira = (price: number, compact = true) => {
  if (compact && price >= 1_000_000_000)
    return `₦${(price / 1_000_000_000).toLocaleString(undefined, { maximumFractionDigits: 2 })}B`;
  if (compact && price >= 1_000_000)
    return `₦${(price / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 1 })}M`;
  return `₦${price.toLocaleString()}`;
};

export const statusStyles: Record<Property["status"], string> = {
  "For Sale": "bg-emerald-500 text-white",
  "For Rent": "bg-sky-500 text-white",
  Sold: "bg-neutral-800 text-white",
  Rented: "bg-neutral-800 text-white",
};

interface PropertyCardProps {
  property: Property;
  className?: string;
  layout?: "grid" | "list";
  /** Extra control rendered over the image (e.g. compare toggle) */
  action?: ReactNode;
}

export function PropertyCard({ property, className, layout = "grid", action }: PropertyCardProps) {
  const specs = [
    property.bedrooms != null && { icon: Bed, label: `${property.bedrooms} Bed${property.bedrooms === 1 ? "" : "s"}` },
    property.bathrooms != null && { icon: Bath, label: `${property.bathrooms} Bath${property.bathrooms === 1 ? "" : "s"}` },
    property.size && { icon: Ruler, label: property.size },
    property.parking != null && { icon: Car, label: `${property.parking} Parking` },
  ].filter(Boolean) as { icon: typeof Bed; label: string }[];

  return (
    <article
      className={cn(
        "group relative flex h-full overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.18)]",
        layout === "list" ? "flex-col md:flex-row" : "flex-col",
        className,
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden",
          layout === "list" ? "aspect-[16/11] md:aspect-auto md:w-2/5" : "aspect-[16/11]",
        )}
      >
        <SmartImage
          src={property.imageUrl}
          alt={property.title}
          wrapperClassName="absolute inset-0"
          className="transition-transform duration-[1200ms] ease-out-expo group-hover:scale-110"
          sizes={layout === "list" ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          maxWidth={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

        <div className="absolute left-3 top-3 flex gap-2">
          <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusStyles[property.status])}>
            {property.status}
          </span>
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black backdrop-blur">
            {property.type}
          </span>
        </div>
        {action && <div className="absolute right-3 top-3 z-20">{action}</div>}

        <p className="absolute bottom-3 left-4 text-2xl font-bold text-white drop-shadow">
          {formatNaira(property.price)}
          {property.status === "For Rent" && <span className="text-sm font-medium opacity-80"> /year</span>}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
          <Link to={`/properties/${property.id}`} className="after:absolute after:inset-0 after:z-10">
            {property.title}
          </Link>
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-neutral-500">
          <MapPin className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">{property.location}</span>
        </p>

        {specs.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-black/[0.06] pt-4 text-sm text-neutral-600">
            {specs.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-neutral-400" />
                {label}
              </li>
            ))}
          </ul>
        )}

        <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-semibold">
          View property
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
