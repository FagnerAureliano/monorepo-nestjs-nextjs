export interface UserRequest {
  email: string;
  name?: string;
  password: string;
  photo?: string;
}

export interface UpdateUserRequest {
  id: string;
  email?: string;
  name?: string;
  photo?: string | undefined;
  password?: string;
  newPassword?: string | undefined;
}
