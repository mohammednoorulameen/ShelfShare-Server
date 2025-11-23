import { VendorResponseDto } from "../dtos/vendor/ResponseDTO";

export interface IVendorService {
  getAllVendors(
    page?: number,
    limit?: number
  ): Promise<{
    data: VendorResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
}
