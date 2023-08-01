import express from "express";

import { createNewProduct, getProducts } from "./product.controller.js";

const router = express.Router();

router.route("/").post(createNewProduct).get(getProducts);

export default router;
