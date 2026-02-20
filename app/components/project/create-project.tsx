import type { Workspace, WorkspaceMember } from "@/types";

interface CreatePorjectProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: string;
  workspaceMember: WorkspaceMember;
}

export const CreateProject = ({
  isOpen,
  onOpenChange,
  workspaceId,
  workspaceMember,
}: CreatePorjectProps) => {
  return <div className="">
    
  </div>;
};
