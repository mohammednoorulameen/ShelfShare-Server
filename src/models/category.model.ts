import { model, Schema } from "mongoose";
import { ICategory } from "../types/entities/ICategory";
import { Status } from "../shared/constant/status";

const categorySechema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    discription: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = model<ICategory>("Category", categorySechema);
