import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignUpSchema } from "@/lib/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useSignupMutation } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export type SignupFormData = z.infer<typeof SignUpSchema>;
//export type SignupFormValue = Omit<SignupFormData, "confirmPassword">;

export const SignupFormValue = SignUpSchema.transform(
  ({ confirmPassword, ...rest }) => rest,
);

export type payload = z.infer<typeof SignupFormValue>;

function SignUp() {
  const navigate = useNavigate();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  const { isPending, isSuccess, mutate } = useSignupMutation();
  const handleSubmit = (values: SignupFormData) => {
    const parsePayload: payload = SignupFormValue.parse(values);
    mutate(parsePayload, {
      onSuccess: () => {
        toast.success("Account created successfully");
        form.reset();
        navigate("/sign-in");
      },
      onError: (error) => {
        console.log(error);
        // toast.error(error.response?.data.message);
      },
    });
  };

  return (
    <div className="min-h-screen  flex flex-col  items-center justify-center bg-muted/40 p-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center mb-5">
          <CardTitle className="text-2xl font-bold">
            Create an Account{" "}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foregrounds">
            Signin to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter name..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> ConfirmPassword</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex  items-center justify-center ">
          <div className="flex items-center justify-center">
            <p className="text-sm   text-muted-foreground">
              Already have an account?
              <Link to="/sign-in" className="text-slate-700">
                {" "}
                Signin
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUp;
