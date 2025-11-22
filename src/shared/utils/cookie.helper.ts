import {Response} from 'express'


const isProduction = process.env.NODE_ENV === "development";



export const clearCookie = (res: Response, key:string)=>{
  res.clearCookie(key,{
        httpOnly: true,
        secure: isProduction,
        sameSite : isProduction ? "none" : "lax",
        maxAge : 0
      })
}
