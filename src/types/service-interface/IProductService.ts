import { ProductRequestDto } from "../dtos/Product/Request.dto";
import { ProductResponseDto } from "../dtos/Product/Response.dto";

export interface IProductService {
  createNewProduct(
    vednorId: string,
    dto: ProductRequestDto
  ): Promise<ProductResponseDto>;
  getVendorProducts(vednorId: string): Promise<ProductResponseDto[]>;
  updateProduct(
    productId: string,
    vendorId: string,
    dto: Partial<ProductRequestDto>
  ): Promise<ProductResponseDto>;
}
