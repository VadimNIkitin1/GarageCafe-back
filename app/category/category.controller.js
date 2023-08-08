import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";

// @desc    Get category
// @route   GET /api/category
// @access  Private
export const getCategory = asyncHandler(async (req, res) => {
  const category = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(category);
});

// @desc   categories
// @route  POST/api/categories
// @access Public
export const createNewCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await prisma.category.create({
    data: {
      name,
    },
  });
  res.json(category);
});

// @desc    Update category
// @route 	PUT /api/category/:id
// @access  Private
export const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  try {
    const category = await prisma.category.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name,
      },
    });

    res.json(category);
  } catch (error) {
    res.status(404);
    throw new Error("Product not found!");
  }
});

// @desc    Delete category
// @route 	DELETE /api/category/:id
// @access  Private
export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await prisma.category.delete({
      where: {
        id: +req.params.id,
      },
    });

    res.json({ message: "Category deleted!" });
  } catch (error) {
    res.status(404);
    throw new Error("Category not found!");
  }
});
