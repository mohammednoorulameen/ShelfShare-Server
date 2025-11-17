import { injectable } from "tsyringe";
import { BaseRepository } from "./base.repository";
import { IUser } from "../types/entities/IUser";
import { IUserRepository } from "../types/repository-interface/IUserRepository";
import { UserModel } from "../models/user.model";


@injectable()
export class UserRepository extends BaseRepository<IUser> implements IUserRepository{
    constructor(){
        super(UserModel)
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.model.findOne({ email })
    }
}