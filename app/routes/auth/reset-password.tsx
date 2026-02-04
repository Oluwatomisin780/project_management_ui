import { z } from "zod";
import { ResetPasswordSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearchParams } from "react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useReducer } from "react";
import { useResetMutation } from "@/hooks/use-auth";


type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;
const ResetPassword = () => {
  const [serachParams] = useSearchParams();
  const token = serachParams.get("token");
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

   
  const onSubmit = (data: ResetPasswordFormData) => {
       const { mutate ,  isPending  ,}    =  useResetMutation()
    console.log(data);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md space-y-6">
        <div className="flex  flex-col items-center   justify-center space-y-2">
          <h1 className="text-2xl font-bold"> Reset Password</h1>
          <p className="text-muted-foreground">Enter your password</p>
        </div>
        <Card>
          <CardHeader>
            <Link to="/sign-in">
              <span>Back to sign in</span>
            </Link>
          </CardHeader>
          <CardContent>
             
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
