import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/auth-context";
import { Role, type Workspace } from "@/types";
import { Bell, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router";
import { WorkSpaceAvatar } from "@/components/workspace/workspace-avatar";

interface HeaderProps {
  onWorkSpaceSelected: (workspace: Workspace) => void;
  selectedWorkSpace: Workspace | null;
  onCreateWorkSpace: () => void;
}

const workspaces: Workspace[] = [
  {
    _id: "1",
    name: "Design Team",
    color: "#FF5733",
    createdAt: new Date(),
    updatedAt: new Date(),
    owner: "user1",
    members: [
      {
        user: {
          name: "Alice",
          email: "tomso@",
          isEmailVerified: true,
          _id: "user1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        role: Role.ADMIN,
        joinedAt: new Date(),
      },
    ],
  },
];
export const Header = ({
  onCreateWorkSpace,
  onWorkSpaceSelected,
  selectedWorkSpace,
}: HeaderProps) => {
  const { user, logout } = useAuth();
  return (
    <div className="bg-background sticky top-0 z-40 border-b">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedWorkSpace ? (
                <>
                  {selectedWorkSpace.color && (
                    <WorkSpaceAvatar
                      color={selectedWorkSpace.color}
                      name={selectedWorkSpace.name}
                    />
                  )}

                  <span className="font-medium">{selectedWorkSpace?.name}</span>
                </>
              ) : (
                <>
                  <span className="font-medium">Select Workspace</span>
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace._id}
                  onClick={() => onWorkSpaceSelected(workspace)}
                >
                  {workspace.color && (
                    <WorkSpaceAvatar
                      color={workspace.color}
                      name={workspace.name}
                    />
                  )}
                  <span className="ml-2">{workspace.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onCreateWorkSpace}>
                <PlusCircle className="w-4 h-4  mr-2" />
                Create New Workspace
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full border p-1 w-8  h-8">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/user/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
