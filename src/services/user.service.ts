import { inject, injectable } from "tsyringe";
import { IUserService } from "../types/service-interface/IUserService";
import { IUserRepository } from "../types/repository-interface/IUserRepository";
import { UserResponseDto } from "../types/dtos/user/Response.dto";
import { UserMapper } from "../types/mapper/user.mapper";
import { Role } from "../shared/constant/roles";
import AppError from "../shared/utils/App.Error";
import { ERROR_MESSAGES } from "../shared/constant/messages";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { IUser } from "../types/entities/IUser";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository
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
}


/**------------------------------
                ACCOUNT ALL SERVICE LOGICS 
 -----------------------------------------------------------*/ 


 