import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { ERROR_MESSAGES } from "../shared/constant/messages";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { TokenPayload } from "../types/common/tokenPayload";


/* -------------
check the authenticated or not
 ---------------------------------*/

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.cookies.accessToken;
  if (!token) {
     return res.status(HTTP_STATUS.UNAUTHORIZED).json( {success: false, message:ERROR_MESSAGES.UNAUTHORIZED_ACCESS});
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
 return res.status(HTTP_STATUS.UNAUTHORIZED).json( {success: false, message:ERROR_MESSAGES.UNAUTHORIZED_ACCESS});
  }
};



/* ------------
check the role middleware
 ---------------------------------*/



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








// ---------------------------------------------------------------------










































// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { config } from "../config";
// import { TokenPayload } from "../types/common/tokenPayload";
// import { ERROR_MESSAGES } from "../shared/constant/messages";
// import { HTTP_STATUS } from "../shared/constant/http.status";

// export const authenticate = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.cookies.accessToken;

//   if (!token) {
//     return res.status(HTTP_STATUS.UNAUTHORIZED).json( {success: false, message:ERROR_MESSAGES.UNAUTHORIZED_ACCESS});
//   }

//   try {
//     const decoded = jwt.verify(
//       token,
//       config.jwt.ACCESS_TOKEN_SECRET
//     ) as TokenPayload;

//     req.user = decoded;
//     console.log('check the role here middleware',req.user)
//     next();
//   } catch {
//     return res.status(HTTP_STATUS.UNAUTHORIZED).json( {success: false, message:ERROR_MESSAGES.UNAUTHORIZED_ACCESS});
//   }
// };




// export const requireRole =
//   (...roles: Array<"user" | "vendor" | "admin">) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     const role = req.user?.role;

//     if (!role || !roles.includes(role)) {
//       return res.status(HTTP_STATUS.FORBIDDEN).json({
//         success: false,
//         message: ERROR_MESSAGES.FORBIDDEN,
//       });
//     }
//     next();
//   };


// export const isUser = requireRole("user");
// export const isVendor = requireRole("vendor");
// export const isAdmin = requireRole("admin");






