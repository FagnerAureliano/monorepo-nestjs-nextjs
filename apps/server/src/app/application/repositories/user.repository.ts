import { IUser } from "../interfaces/user.dto";

export abstract class UserRepository {
    abstract create(user: IUser): Promise<any>;
    abstract update(user: IUser): Promise<any>;
    abstract delete(id: number): Promise<any>;
    abstract findByEmail(email: string): Promise<IUser | null>;
  }