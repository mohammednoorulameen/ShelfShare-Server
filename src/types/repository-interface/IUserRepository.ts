import { IUser } from "../entities/IUser";
import { IBaseRepository } from "./IBaseRepository";


export interface IUserRepository extends IBaseRepository<IUser>{
    findByEmail(email:string): Promise <IUser| null>
    updateOne(filter: any, update: Partial<IUser>): Promise<IUser | null>;
    updateById(id:string, data: Partial<IUser>): Promise <IUser | null>
}