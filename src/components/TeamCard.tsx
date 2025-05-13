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

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const initials = getInitials(member.name);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg text-center">
      <CardHeader className="pt-6 pb-2">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={member.imageUrl} alt={member.name} />
          <AvatarFallback>{initials}</AvatarFallback>
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
