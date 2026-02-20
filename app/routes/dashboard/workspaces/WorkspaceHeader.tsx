import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { WorkSpaceAvatar } from "@/components/workspace/workspace-avatar";
import type { Role, User, Workspace } from "@/types";
import { Plus, UserPenIcon, UserPlus } from "lucide-react";

interface WorkspaceHeaderProps {
  workspace: Workspace;
  onCreateProject: () => void;
  onInviteMember: () => void;
}

function WorkspaceHeader({
  workspace,
  onCreateProject,
  onInviteMember,
}: WorkspaceHeaderProps) {
  console.log("workspace from header", workspace);
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-col-reverse md:flex-row  md:justify-between md:items-center gap-3">
          <div className="flex md:items-center  gap-3">
            {workspace.color && (
              <WorkSpaceAvatar color={workspace.color} name={workspace.name} />
            )}
            <h2 className="text-xl md:text-2xl font-semibold">
              {workspace.name}
            </h2>
          </div>
          <div className="flex items-center gap-3  justify-between  md:justify-start mb-4 md:mb-0 ">
            <Button variant={"outline"} onClick={onInviteMember}>
              <UserPlus className="size-4 mr-2" />
            </Button>
            <Button onClick={onCreateProject}>
              <Plus className="size-4 mr-2" />
              create Project
            </Button>
          </div>
        </div>
        {workspace.description && (
          <p className="text-sm md:text-base text-muted-foreground">
            {" "}
            {workspace.description}
          </p>
        )}
      </div>
      {workspace?.workspaceMember?.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Members</span>
          <div className="flex space-x-2">
            {workspace.workspaceMember.map((member) => (
              <Avatar
                key={member.id}
                className="relative   h-8  rounded-full border-background overflow-hidden"
              >
                <AvatarImage
                  src={member.user.profilePicture}
                  alt={member.user.name}
                />
                <AvatarFallback>{member.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkspaceHeader;
