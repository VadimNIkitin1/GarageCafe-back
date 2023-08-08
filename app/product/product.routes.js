import express from "express";

import {
  createNewProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./product.controller.js";

const router = express.Router();

router.route("/").post(createNewProduct).get(getProducts);

router.route("/:id").put(updateProduct).delete(deleteProduct);

export default router;
