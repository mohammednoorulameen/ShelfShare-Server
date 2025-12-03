import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../types/repository-interface/ICategoryRepository";
import { CreateCategoryDto } from "../types/dtos/category/ CreateCategory.dto";
import { ICategory } from "../types/entities/ICategory";
import AppError from "../shared/utils/App.Error";
import { ERROR_MESSAGES } from "../shared/constant/messages";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { Status } from "../shared/constant/status";

@injectable()
export class CategoryService {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepository
  ) {}

  /*--------
create category 
---------------------*/

  async createCategory(data: CreateCategoryDto): Promise<ICategory> {
    const { name, description } = data;

    const cleanName = name.trim();

    const isExisting = await this._categoryRepository.findByName(cleanName);
    if (isExisting) {
      throw new AppError(
        ERROR_MESSAGES.CATEGORY_EXISTED,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const payload: Partial<ICategory> = {
      name: cleanName,
      description: description,
      status: Status.ACTIVE,
    };

    const createCategory = await this._categoryRepository.create(payload);
    return createCategory;
  }

  /*--------
 GEt All category 
---------------------*/

  async getAllCategories(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const { data, total, totalPages } =
      await this._categoryRepository.findWithPagination(
        {},
        { skip, limit, sort: { createdAt: -1 } }
      );

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  /*--------
Block Each category 
---------------------*/

  async toggleCategoryStatus(categoryId: string): Promise<ICategory> {
    const category = await this._categoryRepository.findById(categoryId);
    if (!category) {
      throw new AppError(
        ERROR_MESSAGES.CATEGORY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    const newStatus = category.status === "active" ? "blocked" : "active";
    const updated = await this._categoryRepository.update(
      { _id: categoryId },
      { status: newStatus }
    );
    return updated as ICategory;
  }
}
