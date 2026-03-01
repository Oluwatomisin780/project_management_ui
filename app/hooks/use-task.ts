import type { CreateTaskFormData } from "@/components/task/create-task-dialog";
import { postData } from "@/lib/fetch-utils";
import { queryClient } from "@/providers/react-query.provider";
import { useMutation } from "@tanstack/react-query";

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
