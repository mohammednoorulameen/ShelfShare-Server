import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { ERROR_MESSAGES } from "../shared/constant/messages";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { TokenPayload } from "../types/common/tokenPayload";
import { decode } from "punycode";

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
    } else if (decoded.role === "vendor") {
      req.vendor = decoded;
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
      res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: "Access denied. You do not have permission.",
      });
      return;
    }

    next();
  };

export const isVendor = requireRole("vendor");
export const isUser = requireRole("user");

// import { Request, Response, NextFunction } from "express";
// import { HTTP_STATUS } from "../shared/constant/http.status";
// import { ERROR_MESSAGES } from "../shared/constant/messages";

// export const authorizeRoles = (...allowedRoles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction): void => {
//     const user = req.user;

//     if (!user) {
//       res.status(HTTP_STATUS.UNAUTHORIZED).json({
//         success: false,
//         message: ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN,
//       });
//       return;
//     }

//     if (!allowedRoles.includes(user.role)) {
//       res.status(HTTP_STATUS.FORBIDDEN).json({
//         success: false,
//         message: ERROR_MESSAGES.TOKEN_EXPIRED_OR_INVALID,
//       });
//       return;
//     }

//     next();
//   };
// };

// export const isAdmin = authorizeRoles("admin");
// export const isVendor = authorizeRoles("vendor");
// export const isUser = authorizeRoles("user");

// export const authenticateVendor = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.cookies.vendorAccessToken;

//   if (!token) {
//     return res.status(401).json({ message: "Vendor token missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, config.jwt.ACCESS_TOKEN_SECRET) as TokenPayload;
//     req.vendor = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid vendor token" });
//   }
// };
