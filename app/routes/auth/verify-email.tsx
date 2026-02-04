import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useVerifyMutation } from "@/hooks/use-auth";
import { ArrowLeft, Check, CheckCircle, Loader, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { mutate, isPending: isVerifying } = useVerifyMutation();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setIsSuccess(false); // change this to false to indicate failure
    } else {
      setIsSuccess(true);
      mutate(token);
    }
  }, [searchParams]);
  return (
    <div className="flex flex-col items-center  justify-center h-sreen">
      <h1 className="text-2xl font-bold">verify Email</h1>
      <p className="text-sm text-grey-500"> Verifying your email...</p>
      <Card className="w-full max-w-md">
        <CardHeader>
          <Link to="/sign-in" className="flex items-center  gap-2 text-sm">
            <ArrowLeft className="w-4 h-4 gap-2" />
            Back to Sign{" "}
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            {isVerifying ? (
              <>
                <Loader className="w-10 h-10 text-grey-500 animate-spin" />
                <h3 className=""> verifying your email..</h3>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="w-10 h-10 text-green-500" />
                <h3 className="text-lg font-semibold">Email verified</h3>
                <p> Your email has been verified successfully</p>
                <Link to="/sign-in" className="text-sm  text-blue-500">
                  <Button variant="outline">Back to sign in </Button>
                </Link>
              </>
            ) : (
              <XCircle className="w-10 h-10 text-red-500" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
