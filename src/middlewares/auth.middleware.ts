import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { ERROR_MESSAGES } from "../shared/constant/messages";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { TokenPayload } from "../types/common/tokenPayload";


export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      config.jwt.ACCESS_TOKEN_SECRET
    ) as TokenPayload;

    console.log('chekc this role ',decoded.role)
    if (decoded.role === "user") req.user = decoded;
    else if (decoded.role === "vendor") req.vendor = decoded;
    else if (decoded.role === "admin") req.admin = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};


export const requireRole =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role || req.vendor?.role || req.admin?.role;

    if (!role || !roles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: ERROR_MESSAGES.FORBIDDEN,
      });
    }

    next();
  };

export const isUser = requireRole("user");
export const isVendor = requireRole("vendor");
export const isAdmin = requireRole("admin");


