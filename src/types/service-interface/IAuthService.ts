import { userDto } from "../dtos/auth/createUser.dto";
import { IUser } from "../entities/IUser";




export interface IAuthService{
    register( user : userDto): Promise<IUser>;
}