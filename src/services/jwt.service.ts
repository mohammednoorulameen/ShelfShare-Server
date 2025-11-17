import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import { ITokenPayload, ITokenService } from "../types/service-interface/ITokenService";
import { config } from "../config";

@injectable()
export class TokenService implements ITokenService {
  private _accessSecret: string;
  private _refreshSecret: string;
  private _verificationSecret: string;
  constructor() {
    this._accessSecret = config.jwt.ACCESS_TOKEN_SECRET;
    this._refreshSecret = config.jwt.REFRESH_TOKEN_SECRET;
    this._verificationSecret = config.jwt.VERIFICATION_TOKEN_SECRET;
  }

  generateEmailToken(payload: { email: string }): string {
    return jwt.sign(payload, this._verificationSecret, { expiresIn: "1h" });
  }

  generateAccessToken(payload: ITokenPayload): string {
    return jwt.sign(payload, this._accessSecret, { expiresIn: "1h" });
  }
  generateRefreshToken(payload: ITokenPayload): string {
    return jwt.sign(payload, this._refreshSecret, { expiresIn: "7d" });
  }
}