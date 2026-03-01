import { ProjectSchema } from "@/lib/schema";
import {
  ProjectStatus,
  type Member,
  type Workspace,
  type WorkspaceMember,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Z } from "node_modules/react-router/dist/development/router-CwNp5l9u.mjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import type z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { file } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateProject } from "@/hooks/use-project";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface CreatePorjectProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: string;
  workspaceMember: WorkspaceMember[];
}

export type CreateProjectForm = z.infer<typeof ProjectSchema>;

export const CreateProject = ({
  isOpen,
  onOpenChange,
  workspaceId,
  workspaceMember,
}: CreatePorjectProps) => {
  const { mutate, isPending } = useCreateProject();
  const form = useForm<CreateProjectForm>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      status: ProjectStatus.PLANNING,
      startDate: "",
      dueDate: "",
      tags: "",
      projectMembers: [],
    },
  });

  const navigate = useNavigate();
  const onSubmit = (data: CreateProjectForm) => {
    console.log("workspace id", workspaceId);
    console.log(data);
    mutate(
      {
        projectData: data,
        workspaceId: workspaceId,
      },
      {
        onSuccess: (data: any) => {
          form.reset();
          toast.success("project is sucessfully  created");
          navigate("");
        },
        onError: (error) => {
          console.log(error);
          toast.error("failed  to create  project");
        },
      },
    );
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle> Create Project</DialogTitle>
          <DialogDescription>
            create a new project and assign members to it
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="py-4  space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Project title" {...field} />
                    </FormControl>
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
                      <Textarea placeholder="Project description" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>project status</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full ">
                          <SelectValue placeholder="select project status" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(ProjectStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>start Date</FormLabel>
                    <FormControl>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={
                              "w-full justify-start text-left font-normal" +
                              (field.value ? "text-muted-foreground" : "")
                            }
                          >
                            <CalendarIcon className="size-4 mr-2" />
                            {field.value ? (
                              format(new Date(field.value), "PPPP")
                            ) : (
                              <span>select start date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(date?.toISOString() || undefined)
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* DueDate */}

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>due Date</FormLabel>
                    <FormControl>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={
                              "w-full justify-start text-left font-normal" +
                              (field.value ? "text-muted-foreground" : "")
                            }
                          >
                            <CalendarIcon className="size-4 mr-2" />
                            {field.value ? (
                              format(new Date(field.value), "PPPP")
                            ) : (
                              <span>select Due date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(date?.toISOString() || undefined)
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags </FormLabel>
                  <FormControl>
                    <Input placeholder="tags" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectMembers"
              render={({ field }) => {
                const selectedMembers = Array.isArray(field.value)
                  ? field.value
                  : [];
                return (
                  <FormItem>
                    <FormLabel>Members</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            className="w-full  jsutify-start  text-left  font-normal min-h-11"
                            variant={"outline"}
                          >
                            {selectedMembers.length === 0 ? (
                              <span>Select a member </span>
                            ) : selectedMembers.length <= 2 ? (
                              selectedMembers.map((m) => {
                                const member = workspaceMember.find(
                                  (mw) => mw.user.id === m.userId,
                                );
                                return `${member?.user.name} ${member?.role}`;
                              })
                            ) : (
                              `${selectedMembers.length}members selected`
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-full max-w-60 overflow-y-auto"
                          align="start"
                        >
                          <div className="flex-col-2 gap-2">
                            {workspaceMember.map((member) => {
                              const isSelected = selectedMembers.find(
                                (m) => m.userId === member.user.id,
                              );

                              return (
                                <div
                                  key={member.id}
                                  className="flex items-center  gap-2 border rounded"
                                >
                                  <Checkbox
                                    checked={!!isSelected}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([
                                          ...selectedMembers,
                                          {
                                            userId: member.user.id,
                                            role: "CONTRIBUTOR",
                                          },
                                        ]);
                                      } else {
                                        field.onChange(
                                          selectedMembers.filter(
                                            (m) => m.userId !== member.user.id,
                                          ),
                                        );
                                      }
                                    }}
                                    id={`member-${member.id}`}
                                  />
                                  <span className="truncate">
                                    {member.user.name}
                                  </span>
                                  {isSelected && (
                                    <Select
                                      value={isSelected.role}
                                      onValueChange={(role) => {
                                        field.onChange(
                                          selectedMembers.map((m) =>
                                            m.userId === member.user.id
                                              ? {
                                                  ...m,
                                                  role,
                                                }
                                              : m,
                                          ),
                                        );
                                      }}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder=" select Role" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="VIEWER">
                                          VIEWER
                                        </SelectItem>
                                        <SelectItem value="CONTRIBUTOR">
                                          CONTRIBUTOR
                                        </SelectItem>
                                        <SelectItem value="MANAGER">
                                          manager
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Project"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
