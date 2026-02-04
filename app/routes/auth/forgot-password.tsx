import { z } from "zod";
import { ForgetPasswordSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
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
import { useForgetMutation } from "@/hooks/use-auth";

export type ForgetPasswordFormData = z.infer<typeof ForgetPasswordSchema>;

function ForgotPassword() {
  const { mutate, isPending: isLoading, isSuccess } = useForgetMutation();
  const form = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();
  const handleSubmit = async (value: ForgetPasswordFormData) => {
    mutate(value, {
      onSuccess: () => {
        console.log(value);
        console.log("Password reset email sent");
        navigate("/sign-in");
      },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md space-y-6">
        <div className="flex  flex-col items-center   justify-center space-y-2">
          <h1 className="text-2xl font-bold"> Forgot Password</h1>
          <p className="text-muted-foreground">
            Enter your email to reset your password
          </p>
        </div>
        <Card>
          <CardHeader>
            <Link to="/sign-in" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to sign in</span>
            </Link>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
                <h1 className="text-2xl font-bold">
                  Password reset email sent{" "}
                </h1>
                <p className="text-muted-foreground"></p>
              </div>
            ) : (
              <>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                      name="email"
                      control={form.control}
                      render={(field) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter Email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full mt-4"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w4 h-4 animate-spin" />
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ForgotPassword;
