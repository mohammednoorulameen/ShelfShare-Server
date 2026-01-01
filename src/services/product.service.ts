import { inject, injectable } from "tsyringe";
import { ProductRepository } from "../repositories/product.repository";
import { IProduct } from "../types/entities/IProduct";
import { ProductRequestDto } from "../types/dtos/Product/Request.dto";
import { ProductResponseDto } from "../types/dtos/Product/Response.dto";
import AppError from "../shared/utils/App.Error";
import { ERROR_MESSAGES } from "../shared/constant/messages";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { ProductMapper } from "../types/mapper/product.mapper";
import { IProductService } from "../types/service-interface/IProductService";

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject("IProductRepository") private _productRepository: ProductRepository
  ) {}

  /* ================= CREATE PRODUCT (BOOK) ================= */

  async createNewProduct(
    vendorId: string,
    dto: ProductRequestDto
  ): Promise<ProductResponseDto> {
    console.log("check the vendor id ikkkkkkk", vendorId, dto);
    if (!vendorId) {
      throw new AppError(ERROR_MESSAGES.ID_REQUIRED, HTTP_STATUS.NOT_FOUND);
    }

    const existProduct = await this._productRepository.findOne({
      vendorId,
      productName: dto.productName.trim().toLowerCase(),
    });

    if (existProduct) {
      throw new AppError(
        ERROR_MESSAGES.ALLREADY_EXISTED,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const entity = ProductMapper.toEntity(dto) as any;
    entity.vendorId = vendorId;
    const createdProduct = await this._productRepository.create(entity);

    return ProductMapper.toResponse(createdProduct);
  }

  //! NEED PAGINATION
  /* ================= GET VENDOR PRODUCT ================= */

  async getVendorProducts(vendorId: string) {
    const products = await this._productRepository.findByVendorId(vendorId);
    return ProductMapper.toResponseList(products);
  }

  /* ================= GET UPDATE PRODUCT WITH ID ================= */

  async getUpdateDataWithId(productId: string, vendorId: string) {
    const product = await this._productRepository.findOne({
      productId,
      vendorId,
    });

    console.log("product ", product);

    if (!product) {
      throw new AppError(ERROR_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return ProductMapper.toResponse(product);
  }

  /* ================= UPDATE PRODUCT ================= */

  async updateProduct(
    productId: string,
    vendorId: string,
    dto: any
  ): Promise<ProductResponseDto> {
    const product = await this._productRepository.findOne({ productId });

    if (!product) {
      throw new AppError(
        ERROR_MESSAGES.PRODUCT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    if (product.vendorId !== vendorId) {
      throw new AppError(
        ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }
    const updated = await this._productRepository.update({ productId }, dto);

    return ProductMapper.toResponse(updated!);
  }

  /* ================= GET PRODUCT ================= */

  async getAllProduct(page: 1, limit: 10) {
    const skip = (page - 1) * limit;
    const { data, total, totalPages } =
      await this._productRepository.findWithPagination(
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
}
