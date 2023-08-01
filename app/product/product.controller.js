import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";

// @desc   product
// @route  POST/api/product
// @access Public
export const createNewProduct = asyncHandler(async (req, res) => {
  const { name, price, imagePath, description, category } = req.body;

  const product = await prisma.product.create({
    data: {
      name,
      price,
      imagePath,
      description,
      category,
    },
  });
  res.json(product);
});

// @desc    Get products
// @route   GET /api/product
// @access  Private
export const getProducts = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(products);
});
