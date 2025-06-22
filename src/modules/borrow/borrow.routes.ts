import { Router } from "express";
import { borrowABook, borrowSummary } from "./borrow.controller";

const borrowRouter = Router();
borrowRouter.post("", borrowABook);
borrowRouter.get("", borrowSummary);

export default borrowRouter;
