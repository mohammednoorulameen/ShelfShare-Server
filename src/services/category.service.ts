import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../types/repository-interface/ICategoryRepository";
import { CreateCategoryDto } from "../types/dtos/category/ CreateCategory.dto";
import { ICategory } from "../types/entities/ICategory";
import AppError from "../shared/utils/App.Error";
import { ERROR_MESSAGES } from "../shared/constant/messages";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { Status } from "../shared/constant/status";
import { v4 as uuidv4 } from "uuid";
import { CategoryMapper } from "../types/mapper/category.mapper";
import { ICategoryServices } from "../types/service-interface/ICategoryService";

@injectable()
export class CategoryService implements ICategoryServices {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepository
  ) {}

  /* ================= CREATE CATEGORY ================= */

  async createCategory(data: CreateCategoryDto): Promise<ICategory> {
    const { name, description } = data;

    const cleanName = name.trim().toUpperCase();

    const isExisting = await this._categoryRepository.findByName(cleanName);
    if (isExisting) {
      throw new AppError(
        ERROR_MESSAGES.CATEGORY_EXISTED,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    
    const payload = CategoryMapper.toEntity({
      name: cleanName,
      description: description,
    });

    const createCategory = await this._categoryRepository.create(payload);
    return createCategory;
  }

  /* ================= GET ALL CATEGORY ================= */

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

  /* ================= ADMIN BLOCK EACH CATEGORY ================= */

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

  /* ================= ADMIN EDIT THE CATEGORY ================= */

  async editCategoryData(
    categoryId: string,
    data: { name: string; description: string }
  ) {

    const cleanName = data.name.trim().toUpperCase();
    const existingCategory = await this._categoryRepository.findOne({
      name: cleanName,
       categoryId: { $ne: categoryId },
    });


    if(existingCategory){
      // return console.log('check this what return the error ')
      throw new AppError(ERROR_MESSAGES.ALLREADY_EXISTED, HTTP_STATUS.CONFLICT)
    }

    const updateCategory = await this._categoryRepository.findOneAndUpdate(
      {categoryId},
      {$set: {
        name: cleanName,
        description : data.description.trim()
      }}
    );

    if(!updateCategory){
      throw new  AppError( ERROR_MESSAGES.CATEGORY_NOT_FOUND, HTTP_STATUS.NOT_FOUND)
    }
    return updateCategory
  }
}
