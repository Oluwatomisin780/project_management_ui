import { WorkspaceSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/hooks/use-workspace";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface CreateWorkSpaceProps {
  isCreatingWorkspace: boolean;
  setIsCreateWorkspace: (creatingWorkspace: boolean) => void;
}

export const colorsOptions = [
  "#FF5733", //Red-orange
  "#33c1FF", //Blue
  "#28A745", //Green
  "#FFC300", //Yellow
  "#8E44AD", // Purple
  "#E67E22", // Orange
  "#2ECC71", // Light Green
  "#34495E", // Navy
];
export type WorkspaceForm = z.infer<typeof WorkspaceSchema>;
export const CreateWorkspace = ({
  isCreatingWorkspace,
  setIsCreateWorkspace,
}: CreateWorkSpaceProps) => {
  const navigate = useNavigate();
  const { isPending, mutate, error } = useCreateWorkspace();
  const form = useForm<WorkspaceForm>({
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: {
      name: "",
      color: colorsOptions[0],
      description: "",
    },
  });
  const handleSubmit = (values: WorkspaceForm) => {
    mutate(values, {
      onSuccess: (data: any) => {
        form.reset();
        setIsCreateWorkspace(false);
        toast.success("workspace successfully created");
        navigate(`/workspaces/${data.id}`);
      },
      onError: (error) => {
        console.log(error);
        toast.error("something went wrong");
      },
    });
  };
  return (
    <Dialog
      open={isCreatingWorkspace}
      onOpenChange={setIsCreateWorkspace}
      modal={true}
    >
      <DialogContent className="max-h-[80vh]  overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="py-4  space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="workspace name " />
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
                      <Textarea
                        placeholder="workspace description"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <div className="flex gap-3 flex-wrap">
                        {colorsOptions.map((color) => (
                          <div
                            key={color}
                            onClick={() => field.onChange(color)}
                            className={cn(
                              "w-6 h-6  rounded-full cursor-pointer",
                              field.value === color &&
                                "ring ring-offset-2  ring-blue-500",
                            )}
                            style={{
                              backgroundColor: color,
                            }}
                          ></div>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
