import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/lib/schema";
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
import { useLoginMutation } from "@/hooks/use-auth";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import { useNavigate } from "react-router";
import { useAuth } from "@/providers/auth-context";
export type SigninFormData = z.infer<typeof SignInSchema>;

function SignIn() {
  const form = useForm<SigninFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutate, isPending } = useLoginMutation();
  const handleSubmit = (values: SigninFormData) => {
    mutate(values, {
      onSuccess: (data) => {
        login(data); //changing this type later
        console.log(values);
        console.log("Login successful");
        toast.success("Login successful");
        navigate("/dashboard");
      },
      onError: (error) => {
        const errorMessage = error.message || "An error occurred during login.";
        console.log("Login failed:", error.message);
        toast.error(errorMessage);
      },
    });
    console.log(values);
  };
  return (
    <div className="min-h-screen  flex flex-col  items-center justify-center bg-muted/40 p-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center mb-5">
          <CardTitle className="text-2xl font-bold">Welcome back </CardTitle>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex  items-center justify-between">
                      <FormLabel> Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-muted-foreground"
                      >
                        Forgot Password?
                      </Link>
                    </div>
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
              {isPending ? (
                <Button disabled className="w-full" type="submit">
                  <Loader className="w-10 h-10 text-grey-500 animate-spin" />
                  Signing in...
                </Button>
              ) : (
                <Button className="w-full" type="submit">
                  Sign In
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <div className="flex items-center justify-center">
            <p className="text-sm   text-muted-foreground  text-center">
              Don&apos;t have an account?
              <Link to="/sign-up">Signup</Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignIn;
