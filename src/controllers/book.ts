import { Request, Response } from "express"
import mongoose from "mongoose"
import Book from "../models/book"

const getAllBooks = (req: Request, res: Response) => {
  Book.find()
    .exec()
    .then((results) => {
      return res.status(200).json({
        books: results,
        count: results.length,
      })
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      })
    })
}

const createBook = (req: Request, res: Response) => {
  const { author, title } = req.body

  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    author,
    title,
  })

  return book
    .save()
    .then((result) => {
      return res.status(201).json({
        book: result,
      })
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      })
    })
}

export default { getAllBooks, createBook }
