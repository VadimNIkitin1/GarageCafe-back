import express from "express";
import {
  createNewCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "./category.controller.js";

const router = express.Router();

router.route("/").post(createNewCategory).get(getCategory);

router.route("/:id").put(updateCategory).delete(deleteCategory);

export default router;
