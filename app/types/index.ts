export enum Role {
  ADMIN = "admin",
  MEMBER = "member",
  OWNER = "owner",
  VIEWER = "viewer",
}

export interface BaseType {
  _id: string;
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
  members: {
    user: User;
    role: Role;
    joinedAt: Date;
  }[];
}
