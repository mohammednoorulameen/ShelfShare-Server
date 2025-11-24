import { inject, injectable } from "tsyringe";
import { IUserService } from "../types/service-interface/IUserService";
import { IUserRepository } from "../types/repository-interface/IUserRepository";
import { UserResponseDto } from "../types/dtos/user/Response.dto";
import { UserMapper } from "../types/mapper/user.mapper";

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
        {},
        { skip, limit, sort: { createdAt: 1 } }
      );

      return{
        data : UserMapper.toResponseList(data),
        total,
        page,
        limit,
        totalPages
      }
  }


}
