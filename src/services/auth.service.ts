import { inject, injectable } from "tsyringe";
import { IAuthService } from "../types/service-interface/IAuthService";
import { IUserRepository } from "../types/repository-interface/IUserRepository";
import { IBcryptUtils } from "../types/common/IBcryptUtils";
import { userDto } from "../types/dtos/auth/createUser.dto";
import { IUser } from "../types/entities/IUser";
import AppError from "../shared/utils/App.Error";
import { HTTP_STATUS } from "../shared/constant/http.status";
import {  authEvents, AuthEvents } from "../events/auth.events";
import { v4 as uuidv4 } from "uuid";


@injectable()
export class AuthService implements IAuthService{
    constructor(
        @inject("IUserRepository") private _userRepository : IUserRepository,
        @inject("IBcryptUtils") private _passwordBcrypt : IBcryptUtils 
    ){}

    async register(user: userDto): Promise<IUser> {
        const {email, userName, phoneNumber, password, referralCode, imageKey} = user;
        const emailExist = await this._userRepository.findByEmail(email);
        console.log(email, userName, phoneNumber)
        if(emailExist){
            throw new AppError("User Already Existed", HTTP_STATUS.CONFLICT)
        }

        const hashedPassword = await this._passwordBcrypt.hash(password);
        const newUser = await this._userRepository.create({
             userId: uuidv4(),
            userName,
            email,
            phoneNumber,
            imageKey: imageKey ?? "",
            referralCode: referralCode ?? "",
            password: hashedPassword
        });
        authEvents.emit(AuthEvents.UserRegistered, { userEmail: email});
        console.log('check user authEvents', authEvents)
        return newUser
    }
}