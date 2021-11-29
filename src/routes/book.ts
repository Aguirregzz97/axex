import express from "express";
import controller from "../controllers/book";

const router = express();

router.get("/get/books", controller.getAllBooks);
router.post("/create/book", controller.createBook);

export = router;
