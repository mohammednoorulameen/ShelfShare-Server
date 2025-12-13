import { ProductModel } from "../models/product.model";
import { IProduct } from "../types/entities/IProduct";
import { BaseRepository } from "./base.repository";

export class ProductRepository extends BaseRepository<IProduct> {
  constructor() {
    super(ProductModel);
  }

  async findByName(name: string): Promise<IProduct | null> {
    return this.model.findOne({ name }, { __v: 0 }).exec();
  }

  async findByVendorId(vendorId: string) {
    return ProductModel.find({ vendorId }).sort({ createdAt: -1 });
  }
}
