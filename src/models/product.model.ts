import { Schema, model, Types } from "mongoose";
import { IProduct } from "../types/entities/IProduct";
import { Status } from "../shared/constant/status";



const bookSchema = new Schema<IProduct>(
  {
    
    vendorId: {
      // type: Schema.Types.ObjectId,
      // ref: "Vendor",
       type: String,
      required: true,
      // required: true,
    },
     productId: {
      type: String,
      required: true,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    actualPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    rentPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },

    category: {
      // type: Schema.Types.ObjectId,
      // ref: "Category",
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    publisher: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    language: {
      type: String,
      required: true,
      trim: true,
      default: "English",
    },

    rentDate: {
      type: Date,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    imageKey: {
      type: [String],
      required: true,
      default: [],
    },

    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.ACTIVE,
    },

    rating: {
      count: { type: Number, default: 0 },
      average: { type: Number, default: 0 },
    },

  },
  {
    timestamps: true, 
  }
);

export const ProductModel = model<IProduct>("Book", bookSchema);