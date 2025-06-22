import { Request, Response } from "express";
import { Book } from "./book.model";
import { formatDoc, formatDocs } from "../../utils/formatMongoose";

const getBooks = async (req: Request, res: Response) => {
  const query: any = {};
  const filter = req.query.filter as string;
  const sortBy = req.query.sortBy as string;
  const sort = req.query.sort === "desc" ? -1 : 1;
  const limit = parseInt(req.query.limit as string) || 10;

  if (filter) {
    query.genre = filter;
  }
  const data = await Book.find(query)
    .sort({ [sortBy]: sort })
    .limit(limit);
  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: formatDocs(data),
  });
};
const createBook = async (req: Request, res: Response) => {
  const payLoad = req.body;
  const data = await Book.create(payLoad);
  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: formatDoc(data),
  });
};
const getBookByID = async (req: Request, res: Response) => {
  const data = await Book.findById(req.params.bookId);
  res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: formatDoc(data),
  });
};
const updateBook = async (req: Request, res: Response) => {
  const data = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: formatDoc(data),
  });
};
const deleteBook = async (req: Request, res: Response) => {
  await Book.findByIdAndDelete(req.params.bookId);
  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
};

export { getBooks, createBook, getBookByID, updateBook, deleteBook };
