import { Status } from "../../shared/constant/status";
import { CategoryRequestDto } from "../dtos/category/CategoryRequestDto";
import { CategoryResponseDto } from "../dtos/category/CategoryResponseDto";
import { ICategory } from "../entities/ICategory";
import { v4 as uuidv4 } from "uuid";




export class CategoryMapper {
  /*--------------
    Converts incoming DTO to Entity 
   --------------------------------------*/
  static toEntity(dto: CategoryRequestDto): Partial<ICategory> {
    return {
      categoryId: uuidv4(), 
      name: dto.name,
      description: dto.description,
      status: dto.status ?? Status.ACTIVE,
      createdAt: new Date(),
    };
  }


    /*---------------
    Converts DB Entity to Response DTO
   -------------------------------------------*/
  static toResponse(entity: ICategory): CategoryResponseDto {
    return {
      _id: String(entity._id),
      categoryId: entity.categoryId,
      name: entity.name,
      description: entity.description,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: (entity as any).updatedAt ?? entity.createdAt,
    };
  }

  

  /*---------------
    Converts list of entities to list of DTOs
   ----------------------------------------------*/

  static toResponseList(categories: ICategory[]): CategoryResponseDto[] {
    return categories.map((c) => this.toResponse(c));
  }
}