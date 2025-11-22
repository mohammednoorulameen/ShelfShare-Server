import { IUser } from "../entities/IUser";
import { IBaseRepository } from "./IBaseRepository";


export interface IAdminRepository extends IBaseRepository<IUser>{
    findByEmail(email:string): Promise <IUser| null>
}