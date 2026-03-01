import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateTaskMutation } from "@/hooks/use-task";
import { CreateTaskSchema } from "@/lib/schema";
import { Taskpriority, TaskStatus, type MemberRole, type User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectMembers: { user: User; role: MemberRole }[];
}

export type CreateTaskFormData = z.infer<typeof CreateTaskSchema>;

export const CreateTaskDialog = ({
  open,
  onOpenChange,
  projectId,
  projectMembers,
}: CreateTaskDialogProps) => {
  const form = useForm<CreateTaskFormData>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      name: "",
      description: "",
      status: TaskStatus.TODO,
      taskPriority: Taskpriority.MEDIUM,
      dueDate: "",
      assigneeId: "",
    },
  });

  const { mutate, isPending } = useCreateTaskMutation();
  console.log("projectMembers", projectMembers);
  const onSubmit = (values: CreateTaskFormData) => {
    console.log("submitted", values);
    
    console.log("values", values);
    
    mutate(
      {
        projectId,
        taskData: values
      },
      {
        onSuccess: () => {
          toast.success("Task created successfully");
          form.reset();
          onOpenChange(false);
        },
        onError: (error: any) => {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
          console.log(error);
        },
      },
    );
  };
  console.log("form", form.formState.errors);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter task name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter task description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormItem>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                <SelectItem value="TODO">To Do</SelectItem>
                                <SelectItem value="IN_PROGRESS">
                                  In Progress
                                </SelectItem>
                                <SelectItem value="DONE">Done</SelectItem>
                              </SelectContent>
                            </FormItem>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="taskPriority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormItem>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                <SelectItem value="LOW">Low</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="HIGH">High</SelectItem>
                              </SelectContent>
                            </FormItem>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Popover modal={true}>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={
                                "w-full justify-start text-left font-normal" +
                                (!field.value ? "text-muted-foreground" : "")
                              }
                            >
                              <CalendarIcon className="size-4 mr-2" />
                              {field.value ? (
                                format(new Date(field.value), "PPPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent>
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) => {
                                field.onChange(
                                  date?.toISOString() || undefined,
                                );
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignee"
                  render={({ field }) => {
                    const selectedMembers = field.value || [];

                    return (
                      <FormItem>
                        <FormLabel>Assignees</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal min-h-11"
                              >
                                {selectedMembers.length === 0 ? (
                                  <span className="text-muted-foreground">
                                    Select assignees
                                  </span>
                                ) : selectedMembers.length <= 2 ? (
                                  selectedMembers
                                    .map((m) => {
                                      const member = projectMembers.find(
                                        (wm) => wm.user.id === m,
                                      );
                                      return `${member?.user.name}`;
                                    })
                                    .join(", ")
                                ) : (
                                  `${selectedMembers.length} assignees selected`
                                )}
                              </Button>
                            </PopoverTrigger>

                            <PopoverContent
                              className="w-sm max-h-60 overflow-y-auto p-2"
                              align="start"
                            >
                              <div className="flex flex-col gap-2">
                                {projectMembers.map((member) => {
                                  const selectedMember = selectedMembers.find(
                                    (m) => m === member.user?.id,
                                  );
                                  return (
                                    <div
                                      key={member.user.id}
                                      className="flex items-center gap-2 p-2 border rounded"
                                    >
                                      <Checkbox
                                        checked={!!selectedMember}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([
                                              ...selectedMembers,

                                              member.user.id,
                                            ]);
                                          } else {
                                            field.onChange(
                                              selectedMembers.filter(
                                                (m) => m !== member.user.id,
                                              ),
                                            );
                                          }
                                        }}
                                        id={`member-${member.user.id}`}
                                      />
                                      <span className="truncate flex-1">
                                        {member.user.name}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
