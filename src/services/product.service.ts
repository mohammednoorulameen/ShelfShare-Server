import { inject, injectable } from "tsyringe";
import {  ProductRepository } from "../repositories/product.repository";
import { IProduct } from "../types/entities/IProduct";
import { ProductRequestDto } from "../types/dtos/Product/Request.dto";
import { ProductResponseDto } from "../types/dtos/Product/Response.dto";
import AppError from "../shared/utils/App.Error";
import { ERROR_MESSAGES } from "../shared/constant/messages";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { ProductMapper } from "../types/mapper/product.mapper";




@injectable()

export class ProductService {
    constructor(
        @inject("IProductRepository") private _productRepository: ProductRepository 
    ){}




/*--------
create Product ( book )
----------------------------*/


async createNewProduct(
  vendorId: string,
  dto: ProductRequestDto
): Promise<ProductResponseDto> {
  console.log('check the vendor id ikkkkkkk', vendorId)
  if (!vendorId) {
    throw new AppError(
      ERROR_MESSAGES.ID_REQUIRED,
      HTTP_STATUS.NOT_FOUND
    );
  }

  const entity = ProductMapper.toEntity(dto) as any;

  entity.vendorId = vendorId;

  const createdProduct = await this._productRepository.create(entity);

  return ProductMapper.toResponse(createdProduct);
}



}








