import { ProductRequestDto } from "../dtos/Product/Request.dto";
import { IProduct } from "../entities/IProduct";
import { v4 as uuidv4 } from "uuid";
import { Types } from "mongoose";
import { ProductResponseDto } from "../dtos/Product/Response.dto";

export class ProductMapper {

static toEntity(dto: ProductRequestDto): Partial<IProduct> {
  return {
    productId: uuidv4(),
    productName: dto.productName,
    actualPrice: dto.actualPrice,
    vendorId : dto.vendorId,
    rentPrice: dto.rentPrice,
    stock: dto.stock,
    // category: new Types.ObjectId(dto.category),
    category: dto.category,
    rentDate: new Date(dto.rentDate),
    description: dto.description,
    publisher: dto.publisher,
    author: dto.author,
    language: dto.language,
    duration: dto.duration,
    imageKey: dto.imageKey,
    status: dto.status,
  };
}

  static toResponse(entity: IProduct): ProductResponseDto {
    return {
      _id: entity._id,
      productId: entity.productId,
      vendorId: entity.vendorId,
      productName: entity.productName,
      actualPrice: entity.actualPrice,
      rentPrice: entity.rentPrice,
      stock: entity.stock,
      category: entity.category,
      description: entity.description,
      publisher: entity.publisher,
      author: entity.author,
      language: entity.language,
      rentDate: entity.rentDate ? new Date(entity.rentDate) : new Date(),
      duration: entity.duration,
      imageKey: entity.imageKey,
      status: entity.status,
      rating: entity.rating,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    };
  }

  static toResponseList(products: IProduct[]) {
    return products.map((p) => this.toResponse(p));
  }
}
