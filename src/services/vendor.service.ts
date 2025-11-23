import { inject, injectable } from "tsyringe";
import { IVendorRepository } from "../types/repository-interface/IVendorRepository";
import { IVendorService } from "../types/service-interface/IVendorService";
import { VendorMapper } from "../types/mapper/vendorMapper";



@injectable()
export class VendorService implements IVendorService {
  constructor(
    @inject("IVendorRepository") private _vendorRepository: IVendorRepository
  ) {}

  async getAllVendors(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const { data, total, totalPages } =
      await this._vendorRepository.findWithPagination(
        {},
        { skip, limit, sort: { createdAt: -1 } }
      );

    return {
      data: VendorMapper.toResponseList(data),
      total,
      page,
      limit,
      totalPages,
    };
  }
}
