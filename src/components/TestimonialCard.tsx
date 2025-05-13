import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Testimonial } from "@/lib/data";
import { QuoteIcon } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = getInitials(testimonial.name);

  return (
    <Card className="h-full bg-black/50 border border-white/10 text-white">
      <CardContent className="pt-6 relative">
        <QuoteIcon className="absolute top-4 left-4 h-8 w-8 text-primary/50" />
        <div className="pt-6">
          <p className="text-base text-white/80 mb-4">"{testimonial.text}"</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-4 border-t border-white/10 pt-4">
        <Avatar className="border-2 border-primary">
          <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} />
          <AvatarFallback className="bg-primary text-black">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium whitespace-pre-line">{testimonial.name}</p>
          <p className="text-sm text-white/70">{testimonial.location}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
