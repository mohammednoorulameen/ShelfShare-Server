import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../shared/constant/roles";


export interface TokenPayload extends JwtPayload {
  email: string;
  role: Role;
  userId?: string;
  vendorId?: string;
}
