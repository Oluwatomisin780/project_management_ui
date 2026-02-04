import { Button } from "@/components/ui/button";
import type { Route } from "./+types/home";

import { Link } from "react-router";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task Hub " },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

function Homepage() {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-4">
      <Link to="/sign-in">
        <Button className="bg-blue-500 text-white"> Login</Button>
      </Link>

      <Link to="/sign-up">
        <Button variant="outline" className="bg-blue-500 text-white">
          Signup
        </Button>
      </Link>
    </div>
  );
}

export default Homepage;
