
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



import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { ERROR_MESSAGES } from "../shared/constant/messages";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { TokenPayload } from "../types/common/tokenPayload";



export const authenticate = (req:Request, res:Response, next:NextFunction) =>{
    let token = req.cookies.accessToken;
    console.log('toeken', token)
    if(!token) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS})
    }
    try {
         const decoded = jwt.verify(token, config.jwt.ACCESS_TOKEN_SECRET) as TokenPayload ;
         req.user = decoded;
         next()
        } catch (error) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS})
        }
}





export const authorizeRoles =
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



export const isAdmin = authorizeRoles("admin");
export const isVendor = authorizeRoles("vendor");
export const isUser = authorizeRoles("user");

