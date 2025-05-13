import { cn } from "@/lib/utils";

interface StatsProps {
  className?: string;
}

export function Stats({ className }: StatsProps) {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "200+", label: "Projects Completed" },
    { value: "500+", label: "Happy Clients" },
    { value: "20+", label: "Awards" },
  ];

  return (
    <section className={cn("py-12 bg-primary/5", className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
