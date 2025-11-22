import { injectable } from "tsyringe";
import { BaseRepository } from "./base.repository";
import { IUser } from "../types/entities/IUser";
import { UserModel } from "../models/user.model";
import { IAdminRepository } from "../types/repository-interface/IAdminRepository";
import { Role } from "../shared/constant/roles";

@injectable()
export class AdminRepository
  extends BaseRepository<IUser>
  implements IAdminRepository
{
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email, role: Role.ADMIN, isAdmin: true });
  }
}
