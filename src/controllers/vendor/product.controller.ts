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

  /*------------
create product controller (book)
-------------------------------------*/

  async createNewProduct(req: Request, res: Response): Promise<void> {
    const vendorId = req.vendor?.vendorId;
    // console.log("req.body chek datas here ", req.body);
    console.log("check the vendor fo the id", vendorId);
    console.log("check the vendor fo the id", vendorId);
    console.log("check the vendor fo the id", vendorId);
    console.log("check the vendor fo the id", vendorId);
    console.log("check the vendor fo the id", vendorId);
    console.log("check the vendor fo the id", vendorId);
    console.log("check the vendor fo the id", vendorId);

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

/*--------
get vendor product 
-------------------------*/

  async getVendorProducts(req: Request, res: Response): Promise<void> {
    const vendorId = req.vendor?.vendorId;
    console.log('check the vendor id', vendorId)
    console.log('check the vendor id', vendorId)
    console.log('check the vendor id', vendorId)
    console.log('check the vendor id', vendorId)
    console.log('check the vendor id', vendorId)
    console.log('check the vendor id', vendorId)
    console.log('check the vendor id', vendorId)
    console.log('check the vendor id', vendorId)
    console.log('check the vendor id', vendorId)
    console.log('check the vendor id', vendorId)
    if (!vendorId) {
      throw new AppError(
        ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const result = await this._productService.getVendorProducts(vendorId);

    res.status(200).json({
      success: true,
      data: result,
    });
  }



/*--------
 vendor product update 
-------------------------*/


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










}
