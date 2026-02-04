import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface WorkSpaceAvatarProps {
  color: string;
  name: string;
}

export const WorkSpaceAvatar = ({ color, name }: WorkSpaceAvatarProps) => {
  return (
    <div
      className="w-6 h-6 rounded bg-primary   flex items-center justify-center"
      style={{
        backgroundColor: color,
      }}
    >
      <span className="text-xs  font-medium text-white">
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};
