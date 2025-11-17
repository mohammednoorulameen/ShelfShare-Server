import { JwtPayload } from 'jsonwebtoken'

export interface ITokenPayload extends JwtPayload{
    userid : string,
    email : string,
    role : string
}

export interface ITokenService{
    generateEmailToken(payload: {email:string}): string;
    generateAccessToken(payload: ITokenPayload ): string;
}