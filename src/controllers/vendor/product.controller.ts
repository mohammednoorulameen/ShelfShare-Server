import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { IProductService } from "../../types/service-interface/IProductService";
import { ICategoryServices } from "../../types/service-interface/ICategoryService";
import { HTTP_STATUS } from "../../shared/constant/http.status";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../../shared/constant/messages";
import AppError from "../../shared/utils/App.Error";

@injectable()
export class ProductController {
  constructor(
    @inject("IProductService") private _productService: IProductService
  ) {}

  /* ================= CREATE PRODUCT CONTROLLER (BOOK) ================= */

  async createNewProduct(req: Request, res: Response): Promise<void> {
    const vendorId = req.vendor?.vendorId;
    // console.log("req.body chek datas here ", req.body)

    if (!vendorId) {
      throw new AppError(
        ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const result = await this._productService.createNewProduct(
      vendorId,
      req.body
    );

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: SUCCESS_MESSAGES.PRODUCT_CREATED,
      data: result,
    });
  }

  /* ================= GET VENDOR PRODUCT ================= */

  async getVendorProducts(req: Request, res: Response): Promise<void> {
    const vendorId = req.vendor?.vendorId;

    if (!vendorId) {
      throw new AppError(
        ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const result = await this._productService.getVendorProducts(vendorId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result,
    });
  }

  /* ================= VENDOR PRODUCT UPDATE ================= */

  async updateProduct(req: Request, res: Response): Promise<void> {
    const { productId } = req.params;
    const vendorId = req.vendor?.vendorId;
    const dto = req.body;

    if (!vendorId) {
      throw new AppError(
        ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    if (!productId) {
      throw new AppError(
        ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const updatedProduct = await this._productService.updateProduct(
      productId,
      vendorId!,
      dto
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.PRODUCT_UPDATED,
      data: updatedProduct,
    });
  }

  /* ================= GET THE DATA FORM ID  ================= */

  async getUpdateDataWithId(req: Request, res: Response): Promise<void> {
    const { productId } = req.params;
    const vendorId = req.vendor?.vendorId;

    if (!productId || !vendorId) {
      throw new AppError(
        ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const getUpdateData = await this._productService.getUpdateDataWithId(
      productId,
      vendorId
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.DATA_FETCHED,
      data: getUpdateData,
    });
  }

  /* ================= GET ALL PRODUCT  ================= */

  async getAllProduct(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await this._productService.getAllProduct(page, limit);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.DATA_FETCHED,
      ...result,
    });
  }
}
