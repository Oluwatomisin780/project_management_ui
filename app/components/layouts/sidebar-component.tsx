import type { Workspace } from "@/types";

import { useAuth } from "@/providers/auth-context";
import { useState } from "react";
import {
  CheckCircle2,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Icon,
  icons,
  LayoutDashboard,
  ListCheck,
  LogOut,
  Settings,
  User,
  Users,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SideBarNav } from "@/components/layouts/sidebar-nav";
import type { title } from "process";

export const SidebarComponent = ({
  currentWorkSpace,
}: {
  currentWorkSpace: Workspace | null;
}) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "workspaces", href: "/workspaces", icon: User },
    { title: "My Tasks", href: "/tasks", icon: ListCheck },
    { title: "Members", href: "/members", icon: Users },
    { title: "Achieved", href: "/achived", icon: CheckCircle2 },
    { title: "settings", href: "/settings", icon: Settings },
  ];
  return (
    <div
      className={cn(
        "flex flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16  md:w[80px]" : "w-16 md:w-[240px]",
      )}
    >
      <div className="flex h-14 items-center border-b  px-4  mb-4">
        <Link to="/dashboard">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Wrench className="size-6   text-black-600" />

              <span className="font-semibold text-lg hidden md:block">
                Task Hub
              </span>
            </div>
          )}
          {isCollapsed && <Wrench className="size-6 text-black-600" />}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto hidden md:block"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1  px-3 py-2">
        <SideBarNav
          items={navItems}
          isCollapsed={isCollapsed}
          currentWorkSpace={currentWorkSpace}
          className={cn(isCollapsed && "items-center space-y-2")}
        />
      </ScrollArea>
      <div>
        <Button
          variant={"ghost"}
          size={isCollapsed ? "icon" : "default"}
          onClick={logout}
        >
          <LogOut className={cn("size-4", isCollapsed && "mr-2")} />
          <span className="hidden md:block "> Logout</span>
        </Button>
      </div>
    </div>
  );
};
