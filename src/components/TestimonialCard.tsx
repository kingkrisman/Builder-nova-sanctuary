import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Testimonial } from "@/lib/data";
import { getInitials } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-white backdrop-blur-sm transition-colors duration-500 hover:border-primary/50 hover:bg-white/[0.06]">
      <blockquote>
        <span aria-hidden="true" className="block font-serif text-7xl leading-none text-primary">
          “
        </span>
        <p className="-mt-4 text-lg leading-relaxed text-white/85">{testimonial.text}</p>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
        <Avatar className="h-12 w-12 border border-primary/60">
          <AvatarImage src={testimonial.imageUrl} alt="" />
          <AvatarFallback className="bg-primary font-semibold text-black">
            {getInitials(testimonial.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="whitespace-pre-line font-semibold">{testimonial.name}</p>
          <p className="text-sm text-white/60">{testimonial.location}</p>
        </div>
      </figcaption>
    </figure>
  );
}
