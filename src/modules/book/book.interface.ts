import { Model } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY"
    | "Not selected";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}
export interface BookInstanceMethods {
  borrow(quantity: number): Promise<void>;
}
