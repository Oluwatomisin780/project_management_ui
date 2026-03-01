import type { ProjectStatus, TaskStatus } from "@/types";

export const PUBLIC_ROUTES = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];
// "PLANNING",
// IN_PROGRESS = "IN_PROGRESS",
// ON_HOLD = "ON_HOLD",
// COMPLETED = "COMPLETED",
// CANCELLED

export const getTaskStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "COMPLETED":
      return "bg-green-100 text-green-800 dark:bg-green dark:text-green-300";
    case "CANCELLED":
      return "bg-red-100 text-red-800 dark:gr-red-900/30 dark:text-red-300";
    case "PLANNING":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    case "ON_HOLD":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    default:
      return "bg-gray-100  text-gray-800 dark:bg-gray-800  dark:text-gray-3--";
  }
};

export const getProjectProgress = (tasks: { status: TaskStatus }[]) => {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task?.status === "DONE").length;

  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  return progress;
};