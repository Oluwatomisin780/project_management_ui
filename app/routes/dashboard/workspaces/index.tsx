import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/Loader";
import { NoDataFound } from "@/components/ui/no-data-found";
import { CreateWorkspace } from "@/components/workspace/createWorkSpace";
import { WorkSpaceAvatar } from "@/components/workspace/workspace-avatar";
import { useGetWorkspacesQuery } from "@/hooks/use-workspace";
import type { Workspace } from "@/types";
import { format } from "date-fns";
import { PlusCircle, User, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

interface WorkSpaceCardProps {
  workspace: Workspace;
}

const Workspaces = () => {
  const [isCreatingWrokspace, setIsCreatingSpace] = useState(false);
  const { isLoading, data: workspaces } = useGetWorkspacesQuery();
  if (isLoading) return <Loader />;

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-3xl font-bold"> Workspaces </h2>

          <Button onClick={() => setIsCreatingSpace(true)}>
            <PlusCircle className="size-4 mr-2" />
            New Workspace
          </Button>
        </div>
      </div>

      <div className="grid gap-6  sm:grid-cols-2 lg:grid-cols-3">
        {workspaces?.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))}

        {workspaces?.length === 0 && (
          <NoDataFound
            title="No workspace Found"
            description="Create a new worksapce to get started"
            buttonText="Create Workspace"
            buttonAction={() => setIsCreatingSpace(true)}
          />
        )}
      </div>
      <CreateWorkspace
        setIsCreateWorkspace={setIsCreatingSpace}
        isCreatingWorkspace={isCreatingWrokspace}
      />
    </>
  );
};

export default Workspaces;

const WorkspaceCard = ({ workspace }: WorkSpaceCardProps) => {
  console.log(workspace);
  return (
    <Link to={`/workspaces/${workspace.id}`}>
      <Card className="mt-4 transistion-all  hover:shadow-md   hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <WorkSpaceAvatar name={workspace.name} color={workspace.color} />
              <div>
                <CardTitle>{workspace.name}</CardTitle>
                <span className="text-sm  text-muted-foreground">
                  created at{" "}
                  {format(workspace.createdAt, "MMM d,yyy h:m a")}{" "}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="size-4 mr-1" />
              <span className="text-xs">
                {workspace.workspaceMember.length}
              </span>
            </div>
          </div>
          <CardDescription>
            {workspace.description || "No Description"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm  text-muted-foreground">
            View workspace details and projects
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
