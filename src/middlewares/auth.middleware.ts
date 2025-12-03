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
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
  }
  try {
    const decoded = jwt.verify(
      token,
      config.jwt.ACCESS_TOKEN_SECRET
    ) as TokenPayload;
    req.user = decoded;
    if (decoded.role === "user") {
      req.user = decoded;
        console.log('check',req.user)
      console.log('check',req.user)
    } else if (decoded.role === "vendor") {
      req.vendor = decoded;
    } else if (decoded.role === "admin") {
      req.admin = decoded;
      console.log('check',req.admin)
      console.log('check',req.admin)
      console.log('check',req.admin)
      console.log('check',req.admin)
    } else {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: "Invalid role in token",
      });
    }

    next();
  } catch (error) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
  }
};

export const requireRole =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      console.log('checkk',userRole)
      res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: ERROR_MESSAGES.ACCESS_DENIEDE,
      });
      return;
    }

    next();
  };

export const isVendor = requireRole("vendor");
export const isAdmin = requireRole("admin");
export const isUser = requireRole("user");
