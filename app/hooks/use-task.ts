import type { CreateTaskFormData } from "@/components/task/create-task-dialog";
import { fetchData, postData, updateData } from "@/lib/fetch-utils";
import { queryClient } from "@/providers/react-query.provider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateTaskMutation = () => {
  return useMutation({
    mutationFn: (data: { taskData: CreateTaskFormData; projectId: string }) => {
      data.taskData.assigneeId = data.taskData.assignee[0];
      const { assignee, ...rest } = data.taskData;

      return postData(`/tasks/${data.projectId}`, rest);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["project", data.project],
      });
    },
  });
};

export const useGetTaskQuery = (taskId: string) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => fetchData(`/tasks/${taskId}`),
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { taskId: string; name: string }) => {
      return updateData(`/update/task/${data.taskId}`, { name: data.name });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["task", data.id],
      });
    },
  });
};
