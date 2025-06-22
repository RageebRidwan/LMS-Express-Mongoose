import { Schema, Types, model } from "mongoose";
import { IBorrow } from "./borrow.interface";

export const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Types.ObjectId,
      required: true,
      ref: "Book",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantities must have a positive number"],
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
