import type { WorkspaceForm } from "@/components/workspace/createWorkSpace";
import { fetchData, postData } from "@/lib/fetch-utils";
import type { Project, Workspace } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

type WorkspaceResponse = {
  workspace: Workspace;
};

export const useCreateWorkspace = () => {
  return useMutation({
    mutationFn: (data: WorkspaceForm) =>
      postData("/workspace/create-workspace", data),
  });
};

export const useGetWorkspacesQuery = () => {
  return useQuery<Workspace[]>({
    queryKey: ["workspace"],
    queryFn: () => fetchData("/workspace/get-workspaces"),
  });
};

export const useGetWorkspace = (id: string) => {
  return useQuery<WorkspaceResponse>({
    queryKey: ["workspace", id],
    queryFn: () => fetchData(`workspace/get-workspace/${id}`),
  });
};
