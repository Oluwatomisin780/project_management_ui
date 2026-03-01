import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { getTaskStatusColor } from "@/lib";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { format } from "date-fns";
import { CalendarDays, Space } from "lucide-react";
import { Link } from "react-router";

interface ProjectCardProps {
  project: Project;
  workspaceId: string;
}

export const ProjectCard = ({ project, workspaceId }: ProjectCardProps) => {
  return (
    <Link to={`/project/${project.id}`}>
      <Card className="transition-all duration-300 hover:shadow-md  hover: translate-y-1">
        <CardHeader>
          <div className="flex  items-center justify-between">
            <CardTitle>{project.title}</CardTitle>
            <span
              className={cn(
                "text-xs rounded-full",
                getTaskStatusColor(project.status),
              )}
            >
              {project.status}
            </span>
          </div>
          <CardDescription>
            {project.description || "No description"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm  gap-2 text-muted-foreground">
                <span>{project.task ? project.task.length : 0}</span>
                <span>
                  {project.task && project.task.length > 0 ? "Tasks" : "Task"}
                </span>
              </div>
              {project.dueDate && (
                <div className="flex item-center text-xs gap-2 text-muted-foreground">
                  <CalendarDays className="w-4  h-4" />
                  <span>{format(project.dueDate, "MMM,d,yyy")}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
