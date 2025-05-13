import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-2 mb-10 flex flex-col",
        centered && "text-center",
        className,
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-3xl m-auto">{subtitle}</p>
      )}
    </div>
  );
}
