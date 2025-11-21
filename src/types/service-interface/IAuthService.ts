import { promises } from "dns";
import { Role } from "../../shared/constant/roles";
import { userDto } from "../dtos/auth/createUser.dto";
import { RegisterDto } from "../dtos/auth/register.dto";
import { IUser } from "../entities/IUser";
import { IVendor } from "../entities/IVendor";
import { LoginDto } from "../dtos/auth/login.dto";

export interface IAuthService {
  register(data: RegisterDto): Promise<IUser | IVendor>;
  login(
    data: LoginDto
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    data: IUser | IVendor;
  }>;
  refreshAccessToken(refreshToken:string) : Promise<{ accessToken: string;}>
}
