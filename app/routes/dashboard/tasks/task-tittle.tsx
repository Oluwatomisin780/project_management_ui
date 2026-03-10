import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateTaskMutation } from "@/hooks/use-task";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { fa } from "zod/v4/locales";

export type TittleProps = {
  title: string;
  taskId: string;
};

export const TaskTittle = ({ title, taskId }: TittleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(title);
  const { mutate, isPending } = useUpdateTaskMutation();
  const updateTittle = () => {
    mutate(
      { taskId, name: newName },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("task name has been successfully updated");
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  return (
    <div className="flex  items-center gap-2">
      {isEditing ? (
        <Input
          className="text-xl  font-semibold w-full  min-w-3xl"
          value={newName}
          onChange={(e) => {
            e.target.value;
          }}
        />
      ) : (
        <h2 className="text-xl flex-1 font-semibold"> {title}</h2>
      )}
      <div>
        {isEditing ? (
          <Button className="py-0" size="sm" onClick={updateTittle}>
            save
          </Button>
        ) : (
          <Edit
            className="size-3 cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        )}
      </div>
    </div>
  );
};
