import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Workspace } from "@/types";
import { type LucideIcon } from "lucide-react";
import { Icon } from "lucide-react";
import { useNavigate } from "react-router";

export interface SideBarNav extends React.HtmlHTMLAttributes<HTMLElement> {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
  isCollapsed: boolean;
  currentWorkSpace: Workspace | null;
  className: string;
}

export const SideBarNav = ({
  items,
  isCollapsed,
  currentWorkSpace,
  className,
  ...props
}: SideBarNav) => {
  const navigate = useNavigate();
  return (
    <nav className={cn("flex flex-col gap-y-2", className)}>
      {items.map((item) => {
        const Icons = item.icon;
        const isActive = location.pathname === item.href;
        const handleClick = () => {
          if (item.href === "/workspace") {
            navigate(item.href);
          } else if (currentWorkSpace && currentWorkSpace._id) {
            navigate(`${item.href}?workspaceId=${currentWorkSpace._id}`);
          } else {
            navigate(item.href);
          }
        };
        return (
          <Button
            key={item.href}
            variant={isActive ? "outline" : "ghost"}
            className={cn(
              "justify-start",
              isActive && "bg-blue-800/20 text-blue-600 font font-medium",
            )}
            onClick={handleClick}
          >
            <Icons className="mr-2 size-4" />
            {isCollapsed ? (
              <span className="sr-only">{item.title}</span>
            ) : (
              item.title
            )}
          </Button>
        );
      })}
    </nav>
  );
};
