import { userDto } from "../dtos/auth/createUser.dto";
import { RegisterDto } from "../dtos/auth/register.dto";
import { IUser } from "../entities/IUser";
import { IVendor } from "../entities/IVendor";




export interface IAuthService{
    register( data : RegisterDto): Promise<IUser | IVendor>;
}