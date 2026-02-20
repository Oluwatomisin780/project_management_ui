import { Header } from "@/components/layouts/header";
import { Loader } from "@/components/ui/Loader";
import { useAuth } from "@/providers/auth-context";
import { SidebarComponent } from "@/components/layouts/sidebar-component";
import type { Workspace } from "@/types";
import { useState } from "react";
import { Navigate, Outlet } from "react-router";
import { CreateWorkspace } from "@/components/workspace/createWorkSpace";
import { fetchData } from "@/lib/fetch-utils";

export const clientLoader = async () => {
  try {
    const [workspaces] = await Promise.all([
      fetchData("/workspace/get-workspaces"),
    ]);
    console.log(workspaces);
    return workspaces;
  } catch (error) {}
};
const DashboardLayout = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const [isCreatingWorkSpace, setIsCreatingWorkSpace] = useState(false);
  const [currentWorkSpace, setCurrentWorkSpace] = useState<Workspace | null>(
    null,
  );

  const handleWorkSpaceSelected = (workspace: Workspace) => {
    setCurrentWorkSpace(workspace);
  };
  if (isLoading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/sign-in" />;
  return (
    <div className="flex h-screen w-full">
      {/* side bar component */}
      <SidebarComponent currentWorkSpace={currentWorkSpace} />
      <div className="flex flex-1  flex-col  h-full">
        {/*  Header component */}
        <Header
          onWorkSpaceSelected={handleWorkSpaceSelected}
          selectedWorkSpace={currentWorkSpace}
          onCreateWorkSpace={() => setIsCreatingWorkSpace(true)}
        />

        <main className="flex-1 overflow-y-auto   h-full w-full">
          <div className="mx-auto container px-2 sm:px-6  lg:px-8 py-0  md:py-8 w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>
      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkSpace}
        setIsCreateWorkspace={setIsCreatingWorkSpace}
      />
    </div>
  );
};

export default DashboardLayout;
