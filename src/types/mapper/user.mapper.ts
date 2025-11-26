import { Role } from "../../shared/constant/roles";
import { UserRequestDto } from "../dtos/user/Request.dto";
import { UserResponseDto } from "../dtos/user/Response.dto";
import { IUser } from "../entities/IUser";
import { v4 as uuidv4 } from "uuid";


export class UserMapper {
  static toEntity(dto: UserRequestDto): Partial<IUser> {
    return {
      userId: uuidv4(),
      email: dto.email,
      userName: dto.userName,
      phoneNumber: dto.phoneNumber,
      imageKey: dto.imageKey ?? "",
      referralCode: dto.referralCode ?? "",
      role: Role.USER,
    };
  }

  static toResponse(entity: IUser): UserResponseDto {
    return {
      _id: entity._id,
      userId: entity.userId,
      email: entity.email,
      userName: entity.userName,
      phoneNumber: entity.phoneNumber,
      password: entity.password,
      referralCode: entity.referralCode,
      imageKey: entity.imageKey,
      status: entity.status,
      role: entity.role,
      isEmailVerified: entity.isEmailVerified,
      isAdmin: entity.isAdmin ?? false,
      createdAt: entity.createdAt,
    };
  }

  static toResponseList(users : IUser[]): UserResponseDto[]{
    return users.map((v)=> UserMapper.toResponse(v))
  }
}
