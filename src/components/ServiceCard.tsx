import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Building2,
  ClipboardList,
  Hammer,
  HardHat,
  KeyRound,
  LineChart,
  Map,
  Paintbrush,
  Truck,
  Wrench,
} from "lucide-react";
import { Service } from "@/lib/data";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

// One icon per service, in the order they appear in lib/data.ts
const ICONS = [Building2, HardHat, Hammer, Paintbrush, Map, KeyRound, ClipboardList, Truck, LineChart, Wrench];

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon || ICONS[(service.id - 1) % ICONS.length] || Building2;

  return (
    <Link
      to="/services"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-7 transition-colors duration-500 hover:border-black hover:text-white"
    >
      {/* Black fill rises from the bottom on hover */}
      <span className="absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
      <span className="relative flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-black transition-colors duration-500 group-hover:bg-primary">
          <Icon className="h-6 w-6" />
        </span>
        {index !== undefined && (
          <span className="text-sm font-medium tabular-nums text-neutral-400 group-hover:text-white/40">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </span>
      <h3 className="relative mt-8 text-xl font-semibold">{service.title}</h3>
      <p className="relative mt-3 flex-1 leading-relaxed text-neutral-600 transition-colors duration-500 group-hover:text-white/70">
        {service.description}
      </p>
      <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-semibold group-hover:text-primary">
        Learn more
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
