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
    <Card className="h-full bg-white">
      <CardContent className="pt-6 relative">
        <QuoteIcon className="absolute top-4 left-4 h-8 w-8 text-primary/20" />
        <div className="pt-6">
          <p className="text-base text-muted-foreground mb-4">
            "{testimonial.text}"
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-4 border-t pt-4">
        <Avatar>
          <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">
            {testimonial.location}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
