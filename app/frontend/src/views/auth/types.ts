export interface SessionData {
  recoveringSession: boolean;
  logged: boolean;
  access_token: string;
}

export interface AuthData {
  email: string;
  password: string;
}

export enum UserRole {
  ADMINISTRATOR = "ADMIN",
  USER = "USER",
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  canceledAt: Date;
}

export enum AuthDrawerMode {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}

export interface AuthState {
  isLoading: boolean;
  session: SessionData;
  data: AuthData;
  user: UserData | null;
  drawerMode: AuthDrawerMode;
  drawerOpen: boolean;
}
