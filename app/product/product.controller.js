import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";

// @desc   product
// @route  POST/api/product
// @access Public
export const createNewProduct = asyncHandler(async (req, res) => {
  const { name, price, imagePath, description, categoryId } = req.body;

  const product = await prisma.product.create({
    data: {
      name,
      price,
      imagePath,
      description,
      categoryId,
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

// @desc    Update product
// @route 	PUT /api/products/:id
// @access  Private
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, imagePath, description, categoryId } = req.body;

  try {
    const product = await prisma.product.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name,
        price,
        imagePath,
        description,
        categoryId,
      },
    });

    res.json(product);
  } catch (error) {
    res.status(404);
    throw new Error("Product not found!");
  }
});

// @desc    Delete product
// @route 	DELETE /api/product/:id
// @access  Private
export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: +req.params.id,
      },
    });

    res.json({ message: "Product deleted!" });
  } catch (error) {
    res.status(404);
    throw new Error("Product not found!");
  }
});
