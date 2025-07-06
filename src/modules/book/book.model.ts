import { Model, Schema } from "mongoose";
import { model } from "mongoose";
import { BookInstanceMethods, IBook } from "./book.interface";
import { NextFunction } from "express";

export const bookSchema = new Schema<
  IBook,
  Model<IBook, {}, BookInstanceMethods>,
  BookInstanceMethods
>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
          "Not selected"
        ],
        message: "Genre must be a valid category",
      },
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
bookSchema.pre("save", function (next) {
  this.title = this.title.trim();
  this.author = this.author.trim();
  next();
});
bookSchema.post("save", function(doc){
  console.log(`✅ Book "${doc.title}" saved successfully!`);
})
bookSchema.method("borrow", async function (quantity: number) {
  if (this.copies < quantity) {
    throw new Error("Not enough copy available");
  }
  this.copies -= quantity;
  if (this.copies === 0) {
    this.available = false;
  }
  await this.save();
});
export const Book = model<IBook, Model<IBook, {}, BookInstanceMethods>>(
  "Book",
  bookSchema
);
