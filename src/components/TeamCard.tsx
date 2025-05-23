import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeamMember } from "@/lib/data";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const initials = getInitials(member.name);

  // Special handling for Engr. David Adediran
  const isEngDavidAdediran = member.name === "Engr. David Adediran";
  const backgroundImageUrl = isEngDavidAdediran
    ? "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F84f63fab8ef94516ad5d1f51db95731f"
    : undefined;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg text-center">
      <CardHeader className="pt-6 pb-2">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={member.imageUrl} alt={member.name} />
          <AvatarFallback
            className={cn(
              backgroundImageUrl && "bg-cover bg-center bg-no-repeat",
            )}
            style={
              backgroundImageUrl
                ? { backgroundImage: `url(${backgroundImageUrl})` }
                : undefined
            }
          >
            {!backgroundImageUrl && initials}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-lg">{member.name}</CardTitle>
        <CardDescription className="text-sm">
          {member.position}
          {member.qualifications && <span> ({member.qualifications})</span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">{member.department}</p>
      </CardContent>
    </Card>
  );
}
