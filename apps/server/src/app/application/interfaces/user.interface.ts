export interface UserRequest {
  email: string;
  name?: string;
  password: string;
  photo?: string;
  role?: string;
}

export interface UpdateUserRequest {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  photo?: string | undefined;
  password?: string;
  newPassword?: string | undefined;
}
