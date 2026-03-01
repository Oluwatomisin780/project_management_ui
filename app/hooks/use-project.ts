import type { CreateProjectForm } from "@/components/project/create-project";
import { fetchData, postData } from "@/lib/fetch-utils";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      projectData: CreateProjectForm;
      workspaceId: string;
    }) =>
      postData(`project/${data.workspaceId}/create-project`, data.projectData),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.workspace],
      });
    },
  });
};

export const useGetProjectQuery = (projectId: string) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchData(`project/${projectId}`),
  });
};
