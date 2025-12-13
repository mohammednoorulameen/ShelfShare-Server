import { CategoryModel } from "../models/category.model";
import { ICategory } from "../types/entities/ICategory";
import { BaseRepository } from "./base.repository";

export class CategoryRepository extends BaseRepository<ICategory> {
  constructor() {
    super(CategoryModel);
  }

  async findByName(name: string): Promise<ICategory | null> {
    return this.model.findOne({ name }, { __v: 0 }).exec();
  }
  async findById(id: string): Promise<ICategory | null> {
    return this.model.findById(id);
  }



}
