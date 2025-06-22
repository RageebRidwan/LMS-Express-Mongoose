import { Request, Response } from "express";
import { Book } from "../book/book.model";
import { Borrow } from "./borrow.model";
import { formatDoc } from "../../utils/formatMongoose";
const borrowABook = async (req: Request, res: Response) => {
  console.log(req.body);
  const { book, quantity, dueDate } = req.body;

  if (!book || !quantity || !dueDate) {
    res.status(400).json({
      success: false,
      messsage: "Missing required fields",
    });
  }
  const bookInstance = await Book.findById(book);
  if (!bookInstance) {
    res.status(404).json({ success: false, message: "Book not found" });
  }
  await bookInstance!.borrow(quantity);
  const data = await Borrow.create(req.body);
  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    data: formatDoc(data),
  });
};
const borrowSummary = async (req: Request, res: Response) => {
  const data = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: {
          $sum: "$quantity",
        },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails",
      },
    },
    {
      $unwind: "$bookDetails",
    },
    {
      $project: {
        _id: 0,
        book: {
          title: "$bookDetails.title",
          isbn: "$bookDetails.isbn",
        },
        totalQuantity: "$totalQuantity",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data,
  });
};
export { borrowABook, borrowSummary };
