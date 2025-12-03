import { UpdateUserinfoDto, UpdateUserPasswordDto, UserResponseDto } from "../dtos/user/Response.dto";

export interface IUserService {
  getAllUsers(
    page?: number,
    limit?: number
  ): Promise<{
    data: UserResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;

  toggleAdminBlockUser(userId : string): Promise<UserResponseDto>
  updateUserInfo(data: UpdateUserinfoDto): Promise<UserResponseDto>
  updateUserPassword(data: UpdateUserPasswordDto): Promise<UserResponseDto>
  getUserById(userId : string) : Promise <UserResponseDto>
}