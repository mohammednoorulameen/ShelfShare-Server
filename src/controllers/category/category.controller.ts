import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ICategoryServices } from "../../types/service-interface/ICategoryService";
import { HTTP_STATUS } from "../../shared/constant/http.status";
import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from "../../shared/constant/messages";
import AppError from "../../shared/utils/App.Error";
import { ICategoryController } from "../../types/controller-interfaces/ICategoryController";

@injectable()
export class CategoryController implements ICategoryController {
  constructor(
    @inject("ICategoryServices")
    private _categoryService: ICategoryServices
  ) {}

  /* ================= ADMIN CREATE CATEGORY ================= */

  async createCategory(req: Request, res: Response): Promise<void> {
    const { name, description } = req.body;
    if (!name || !description) {
      throw new AppError(
        ERROR_MESSAGES.ALL_FIELDS_REQUIRED,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const createdCategory = await this._categoryService.createCategory({
      name,
      description,
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: SUCCESS_MESSAGES.CATEGORY_CREATED_SUCCESS,
      data: createdCategory,
    });
  }

  /* ================= ADMIN GET ALL CATEGORY ================= */

  async getAllCategories(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await this._categoryService.getAllCategories(page, limit);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.CATEGORY_FETCHED_SUCCESS,
      ...result,
    });
  }

  /* ================= ADMIN BLOCK EACH CATEGORY ================= */

  async toggleCategoryStatus(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;

    if (!categoryId) {
      throw new AppError(
        ERROR_MESSAGES.CATEGORY_ID_MISSED,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const updated = await this._categoryService.toggleCategoryStatus(
      categoryId
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.CATEGORY_UPDATED_SUCCESS,
      data: updated,
    });
  }

  /* ================= ADMIN EDIT THE CATEGORY ================= */


async editCategoryData(req: Request, res: Response): Promise<void>{
  const {categoryId} = req.params;
  const {name, description} = req.body
  console.log('edit name, description', name, description)

  if(!categoryId){
    throw new AppError(ERROR_MESSAGES.CATEGORY_ID_MISSED, HTTP_STATUS.BAD_REQUEST)
  }

  if(!name || !description){
    throw new AppError(ERROR_MESSAGES.ALL_FIELDS_REQUIRED, HTTP_STATUS.BAD_REQUEST)
  }

  const updateCategory = await this._categoryService.editCategoryData(categoryId, {name, description})

  console.log('checkt he latest data',updateCategory)

}



}
