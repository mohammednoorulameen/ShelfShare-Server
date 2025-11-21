import { FilterQuery, Model } from "mongoose";
import { IBaseRepository } from "../types/repository-interface/IBaseRepository";

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected model: Model<T>) {}

  async findOne(query: Partial<T>): Promise<T | null> {
    return this.model.findOne(query, { _id: 0, __v: 0 });
  }


  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(query: any, data: any): Promise<T | null> {
    return this.model.findOneAndUpdate(query, data);
  }


}



















// import { IBaseRepository } from "../types/repository.interface/IBaseRepository";


// export class BaseRepository<T> implements IBaseRepository<T>{
//     constructor(protected model: model:<T>){}

//     async findOne(query: Partial<T>): Promise<T | null>{
//         return this.model.findOne(query, {_id:0, _v:0});
//     }


// async find(
//     query: FilterQuery<T>,
//     options: {skip?: number: limit?: number; sort?: any} = {}
// ): Promise<T[]>{
//     let q = this.model.find(query, {_id: 0, __v:0 });

//     if(options.skip){
//         q.skip(options)
//     }
// }





// }