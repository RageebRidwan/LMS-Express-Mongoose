import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookByID,
  getBooks,
  updateBook,
} from "./book.controller";

const bookRouter = Router();

bookRouter.get("", getBooks);
bookRouter.post("", createBook);
bookRouter.get("/:bookId", getBookByID);
bookRouter.patch("/:bookId", updateBook);
bookRouter.delete("/:bookId", deleteBook);

export default bookRouter;
