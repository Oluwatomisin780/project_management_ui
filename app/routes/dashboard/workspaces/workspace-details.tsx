import { CreateProject } from "@/components/project/create-project";
import { ProjectList } from "@/components/workspace/project-list";
import { useGetWorkspace } from "@/hooks/use-workspace";
import WorkspaceHeader from "@/routes/dashboard/workspaces/WorkspaceHeader";
import type { WorkspaceMember } from "@/types";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

const workspaceDetails = () => {
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [isInviteMember, SetIsInviteMember] = useState(false);
  const { workspaceId } = useParams<{ workspaceId: string }>();
  if (!workspaceId) return <div>No workspace found</div>;
  const { data: workspace, isLoading } = useGetWorkspace(workspaceId);
  console.log(workspace, "workspace details datails");
  if (isLoading) return <Loader />;

  if (!workspace?.workspace) return <div>Workspace not found</div>;

  return (
    <div className="space-y-8">
      <WorkspaceHeader
        workspace={workspace?.workspace}
        onCreateProject={() => setIsCreatingProject(true)}
        onInviteMember={() => SetIsInviteMember(true)}
      />
      <ProjectList
        workspaceId={workspaceId}
        onCreateProject={() => setIsCreatingProject(true)}
        projects={workspace.workspace.project}
      />
      <CreateProject
        isOpen={isCreatingProject}
        onOpenChange={setIsCreatingProject}
        workspaceId={workspaceId}
        workspaceMember={workspace.workspace.workspaceMember as any}
      />
    </div>
  );
};

export default workspaceDetails;
