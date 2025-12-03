import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ICategoryServices } from "../../types/service-interface/ICategoryService";
import { HTTP_STATUS } from "../../shared/constant/http.status";
import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from "../../shared/constant/messages";
import AppError from "../../shared/utils/App.Error";

@injectable()
export class CategoryController {
  constructor(
    @inject("ICategoryServices")
    private _categoryService: ICategoryServices
  ) {}

  /*------
 create category 
--------------------*/
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

  /*---------
    get all category 
  -------------------------*/

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

 /*---------
    Block  Each category 
  -------------------------*/

  async toggleCategoryStatus(req:Request, res: Response) : Promise <void>{
    const {categoryId} = req.params;
    
     if (!categoryId) {
    throw new AppError(ERROR_MESSAGES.CATEGORY_ID_MISSED, HTTP_STATUS.BAD_REQUEST);
  }
   const updated = await this._categoryService.toggleCategoryStatus(categoryId);

   res.status(HTTP_STATUS.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.CATEGORY_UPDATED_SUCCESS,
    data: updated,
  });
  }

  

}
