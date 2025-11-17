import { NextFunction, Response, Request } from "express";
import { injectable } from "tsyringe";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { ERROR_MESSAGES } from "../shared/constant/messages";
import AppError from "../shared/utils/App.Error";



@injectable()
export class ErrorHandlingMiddleWare {
    public handleError(
        err:any,
        req:Request,
        res:Response,
        next: NextFunction
    ){
        let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        let message = ERROR_MESSAGES.UNEXPECTED_SERVER_ERROR;
        if(err instanceof AppError){
            statusCode = err.statusCode;
            message = err.message
        }else{
            statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
            message = err.message || ERROR_MESSAGES.UNEXPECTED_SERVER_ERROR
        }
        console.log(`[${statusCode}] ${message}`);
        console.log(err)
        res.status(statusCode).json({
            succuss: false,
            message
        })
    }
}