import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../shared/constant/roles";

export interface ITokenPayload extends JwtPayload {
  userId?: string;
  vendorId?: string;
  email: string;
  isAdmin?: boolean
  role: Role;
}

export interface ITokenService {
  generateEmailToken(payload: {
    email: string;
    role: Role;
    userId?: string;
    vendorId?: string;
  }): string;
  generateAccessToken(payload: ITokenPayload): string;
  generateRefreshToken(payload: ITokenPayload): string;
  verifyRefreshToken(token: string): ITokenPayload | null;

  verifyEmailToken(token: string): {
    email: string;
    role: Role;
    userId?: string;
    vendorId?: string;
  } | null;
}
