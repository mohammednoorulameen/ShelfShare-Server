import "express";
import { TokenPayload } from "../common/tokenPayload";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload
    }
  }
}
