import { User } from "lucide-react";

export enum Role {
  ADMIN = "admin",
  MEMBER = "member",
  OWNER = "owner",
  VIEWER = "viewer",
}

export enum ProjectStatus {
  PLANNING = "PLANNING",
  IN_PROGRESS = "IN_PROGRESS",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface BaseType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseType {
  email: string;
  name: string;
  isEmailVerified: boolean;
  profilePicture?: string;
}

export interface Workspace extends BaseType {
  name: string;
  description?: string;
  owner: User | string;
  color: string;
  workspaceMember: WorkspaceMember[];
  project: Project[];
}

export interface WorkspaceMember extends BaseType {
  user: User;
  role: Role;
  joinedAt: Date;
}
export enum Taskpriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface SubTask extends BaseType {
  title: string;
  completed: boolean;
}
export interface Task extends BaseType {
  name: string;
  description: string;
  assignee: User[];
  watcher: User[];
  dueDate: Date;
  taskPriority: Taskpriority;
  attachment: Attachment; // coming back to  this
  subTask: SubTask[];
}
export interface Project extends BaseType {
  title: string;
  description: string;
  status: ProjectStatus;
  task: Task[];
  tags: string[];
  startDate: Date;
  dueDate: Date;
  progress: number;
  workspace: Workspace;
  isArchived: boolean;
  createdBy: User;
  projectMembers: Member[];
}

export enum MemberRole {
  CONTRIBUTOR = "CONTRIBUTOR",
  VIEWER = "VIEWER",
  MANAGER = "MANAGER",
}

export interface Member {
  user: User;
  role: MemberRole;
}

export interface Uploads extends BaseType {
  name: string;
  url: string;
  type: string;
  size: string;
  user: User;
}

export interface Attachment extends BaseType {
  uploads: Uploads[];
  task: Task[];
}
