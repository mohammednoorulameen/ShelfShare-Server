import {  ObjectId, Types } from "mongoose";
import { Status } from "../../shared/constant/status";

export interface ProductRating {
  count: number;
  average: number;
}

export interface IProduct {
  _id: string | ObjectId;
  // vendorId: Types.ObjectId;
  vendorId: string;
  productId: string;
  productName: string;
  actualPrice: number;
  rentPrice: number;
  stock: number;

  // category: Types.ObjectId; 
  category: string; 

  description: string;
  publisher: string;
  author: string;
  language: string;

  rentDate: Date;           
  duration: string;

  imageKey: string[];
  status: Status;

  rating: ProductRating;
  createdAt: Date;
  updatedAt: Date;
}



