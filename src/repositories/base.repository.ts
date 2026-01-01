import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { IBaseRepository } from "../types/repository-interface/IBaseRepository";

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected model: Model<T>) {}

  // async findOne(query: Partial<T>): Promise<T | null> {
  //   return this.model.findOne(query, { _id: 0, __v: 0 });
  // }

  async findOne(query: FilterQuery<T>): Promise<T | null> {
      return this.model.findOne(query) 
  }

 
  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  // async update(query: any, data: any): Promise<T | null> {
  //   return this.model.findOneAndUpdate(query, data);
  // }

  

  async update(query: FilterQuery<T>, data: UpdateQuery<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(query, data, { new: true }).lean<T>();
  }


  async findWithPagination(
    query: Partial<T>,
    options: { skip?: number; limit?: number; sort?: any }
  ): Promise<{ data: T[]; total: number,totalPages: number }> {
    const { skip = 0, limit = 10, sort = { createdAt: -1 } } = options;

    const [data, total] = await Promise.all([
      this.model
        .find(query, {  __v: 0 })
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .exec(),
      this.model.countDocuments().exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return { data,total, totalPages };
  }
}















