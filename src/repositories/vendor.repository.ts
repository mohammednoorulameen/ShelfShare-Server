import { injectable } from "tsyringe";
import { BaseRepository } from "./base.repository";
import { IVendor } from "../types/entities/IVendor";
import { IVendorRepository } from "../types/repository-interface/IVendorRepository";
import { VendorModel } from "../models/vendor.model";


@injectable()
export class VendorRepository
  extends BaseRepository<IVendor>
  implements IVendorRepository
{
  constructor() {
    super(VendorModel);
  }

  async findByEmail(email: string): Promise<IVendor | null> {
    return await this.model.findOne({ email });
  }

  async updateOne(
    email: string,
    update: Partial<IVendor>
  ): Promise<IVendor | null> {
    return VendorModel.findOneAndUpdate({ email }, update, { new: true });
  }

  async findAll():Promise<IVendor[]>{
    return await VendorModel.find().lean()
  }

  async updateById(id: string, data: Partial<IVendor>): Promise<IVendor | null> {
    return await VendorModel.findByIdAndUpdate(id,data, {new : true})
  }


}
