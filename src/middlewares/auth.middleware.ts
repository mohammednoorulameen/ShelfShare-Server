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