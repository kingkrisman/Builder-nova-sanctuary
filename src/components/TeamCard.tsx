import { TeamMember } from "@/lib/data";
import { getInitials } from "@/lib/utils";
import { resizeImage } from "@/lib/image";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const photo = member.imageUrl;

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900">
        {photo ? (
          <img
            src={resizeImage(photo, 640)}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover grayscale transition-[filter,transform] duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-800 to-black">
            <span className="font-serif text-6xl italic text-primary">{getInitials(member.name)}</span>
          </div>
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
          {member.department}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-snug">{member.name}</h3>
      <p className="text-sm text-neutral-500">
        {member.position}
        {member.qualifications && <span> · {member.qualifications}</span>}
      </p>
    </article>
  );
}
