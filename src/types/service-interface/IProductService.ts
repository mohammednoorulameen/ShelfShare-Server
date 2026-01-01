import { ProductRequestDto } from "../dtos/Product/Request.dto";
import { ProductResponseDto } from "../dtos/Product/Response.dto";
import { IProduct } from "../entities/IProduct";

export interface IProductService {
  
  /* ================= CREATE ================= */

  createNewProduct(
    vednorId: string,
    dto: ProductRequestDto
  ): Promise<ProductResponseDto>;

  /* ================= VENDOR PRODUCTS ================= */

  getVendorProducts(vednorId: string): Promise<ProductResponseDto[]>;

  /* ================= UPDATE PRODUCT ================= */

  updateProduct(
    productId: string,
    vendorId: string,
    dto: Partial<ProductRequestDto>
  ): Promise<ProductResponseDto>;

  /* ================= GET FOR UPDATE ================= */

  getUpdateDataWithId(
    productId: string,
    vendorId: string
  ): Promise<ProductResponseDto>;

  /* =================  ALL PRODUCTS ================= */

  getAllProduct(
    page?: number,
    limit?: number
  ): Promise<{
    data: IProduct[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
}
