import { ProjectCard } from "@/components/project/project-card";
import { NoDataFound } from "@/components/ui/no-data-found";
import type { Project } from "@/types";

interface ProjectListProps {
  workspaceId: string;
  projects: Project[];
  onCreateProject: () => void;
}

export const ProjectList = ({
  workspaceId,
  projects,
  onCreateProject,
}: ProjectListProps) => {
  console.log("projects in project list", projects);
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Projects</h2>
      <div className="grid gap-6  sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <NoDataFound
            title="No project  found"
            description="Create a project  to get started"
            buttonAction={onCreateProject}
            buttonText="Create project"
          />
        ) : (
          projects.map((project) => {
            const projectProress = 0;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                workspaceId={workspaceId}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
