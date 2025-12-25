import { inject, injectable } from "tsyringe";
import { IUserService } from "../types/service-interface/IUserService";
import { IUserRepository } from "../types/repository-interface/IUserRepository";
import {
  UpdateUserinfoDto,
  UpdateUserPasswordDto,
  UserResponseDto,
} from "../types/dtos/user/Response.dto";
import { UserMapper } from "../types/mapper/user.mapper";
import { Role } from "../shared/constant/roles";
import AppError from "../shared/utils/App.Error";
import { ERROR_MESSAGES } from "../shared/constant/messages";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { IUser } from "../types/entities/IUser";
import { IBcryptUtils } from "../types/common/IBcryptUtils";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IBcryptUtils") private _passwordRepository: IBcryptUtils
  ) {}

  /*-----------------
   Get all Users with pagination
 -----------------------------------------------*/

  async getAllUsers(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const { data, total, totalPages } =
      await this._userRepository.findWithPagination(
        { role: Role.USER },
        { skip, limit, sort: { createdAt: 1 } }
      );

    return {
      data: UserMapper.toResponseList(data),
      total,
      page,
      limit,
      totalPages,
    };
  }

  /*-------------
   Get Block and unblock users
 ------------------------------------*/

  async toggleAdminBlockUser(userId: string): Promise<UserResponseDto> {
    console.log('user', userId)
    console.log('user', userId)
    console.log('user', userId)
    console.log('user', userId)
    console.log('user', userId)
    console.log('user', userId)
    console.log('user', userId)
    console.log('user', userId)
    console.log('user', userId)
    console.log('user', userId)
    console.log('user', userId)
    const user = await this._userRepository.findOne({ _id: userId });
    if (!user) {
      throw new AppError(
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    let newStatus = user?.status === "active" ? "blocked" : "active";
    const updateData: any = { status: newStatus };
    const updatedUserStatus = await this._userRepository.updateById(
      userId,
      updateData
    );
    return UserMapper.toResponse(updatedUserStatus as IUser);
  }

  /**---------------------------
                ACCOUNT ALL SERVICE LOGICS 
 -----------------------------------------------------------*/


 async getUserById(userId: string): Promise<UserResponseDto> {
   const user = await this._userRepository.findOne({ userId: userId });
    if (!user) {
    throw new AppError(ERROR_MESSAGES.ACCOUNT_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }
   return UserMapper.toResponse(user);
 }



  /*-----
  update user info 
 -----------------*/

  async updateUserInfo(data: UpdateUserinfoDto): Promise<UserResponseDto> {
    const user = await this._userRepository.findOne({ userId: data.userId });
    if (!user) {
      throw new AppError(
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const updateData = {
      userName: data.userName,
      phoneNumber: data.phoneNumber,
      imageKey: data.imageKey,
    };

    const updatedUser = await this._userRepository.update(
      { userId: data.userId },
      updateData
    );

    return UserMapper.toResponse(updatedUser!);
  }


/*-----
  update user info 
 -----------------*/


  async updateUserPassword(data: UpdateUserPasswordDto): Promise<UserResponseDto> {
    const user = await this._userRepository.findOne({ userId: data.userId });

    if (!user) {
      throw new AppError(
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const isMatch = await this._passwordRepository.compare(
      data.oldPassword,
      user.password
    );

    console.log(data.oldPassword, user.password, isMatch)
    if (!isMatch) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_PASSWORD,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const hashedPassword = await this._passwordRepository.hash(
      data.newPassword
    );
     const updatedUser = await this._userRepository.update(
      { userId: data.userId },
      { password: hashedPassword }
    );
      return UserMapper.toResponse(updatedUser!);
  }
}
