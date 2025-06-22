import { Router } from "express";
import bookRouter from "../book/book.routes";
import borrowRouter from "../borrow/borrow.routes";

const router = Router();
router.use("/api/books", bookRouter)
router.use("/api/borrow", borrowRouter)

export default router;
