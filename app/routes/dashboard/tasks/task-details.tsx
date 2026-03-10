import { BackButton } from "@/components/ui/backbutton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/Loader";
import { useGetTaskQuery } from "@/hooks/use-task";
import { useAuth } from "@/providers/auth-context";
import { TaskTittle } from "@/routes/dashboard/tasks/task-tittle";
import type { Project, Task } from "@/types";
import { da } from "date-fns/locale";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams } from "react-router";

export type Parameters = {
  workspaceId: string;
  taskId: string;
  projectId: string;
};
const TaskDetail = () => {
  const { workspaceId, projectId, taskId } = useParams<Parameters>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isLoading, data } = useGetTaskQuery(taskId!) as {
    data: {
      task: Task;
      project: Project;
    };
    isLoading: boolean;
  };

  if (isLoading) return <Loader />;
  console.log("data", data);
  if (!data)
    return (
      <div className="flex items-center justify-center  h-screen">
        <div className="text-2xl font-bold">Task not found</div>
      </div>
    );
  const { task, project } = data;
  const isUserWatching = task.watcher.some(
    (watcher) => watcher.id.toString() === user?.id.toString(),
  );
  const goback = () => navigate(-1);
  const members = task.assignee || [];
  return (
    <div className="container mx-auto p-0 py-4 md:px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex flex-col md:flex-row md:items-center">
          <BackButton />
          <h1 className="text-xl md:text:2xl font-bold">{task.name}</h1>
          {task.isArchived && (
            <Badge className="mr-4 w-fit  px-0  md:px-4" variant={"outline"}>
              Archived
            </Badge>
          )}
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button
            variant={"outline"}
            size="sm"
            onClick={() => {}}
            className="w-fit"
          >
            {isUserWatching ? (
              <>
                <EyeOff className="mr-2  size-4" />
                unWatch
              </>
            ) : (
              <>
                <Eye className="mr-2  size-4" />
                Watch
              </>
            )}
          </Button>
          <Button
            className="w-fit"
            variant={"outline"}
            size="sm"
            onClick={() => {}}
          >
            {task.isArchived ? "unarchive" : "archive"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg p-6 shadow">
            <div className="flex flex-col  md:flex-row justify-between  items-start mb-4">
              <Badge
                variant={
                  task.taskPriority === "HIGH"
                    ? "destructive"
                    : task.taskPriority === "MEDIUM"
                      ? "default"
                      : "outline"
                }
                className="mb-2  capitalize"
              >
                {task.taskPriority} priority
              </Badge>
            </div>
            <TaskTittle title={task.name} taskId={task.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskDetail;
