import { Router } from "express";
import { createCategory, updateCategory, deleteCategory, getCategory } from "../controllers/categoryController.js";

const router = Router()

router.post("/create", createCategory)
router.get("/:categoryId/get", getCategory)
router.put("/:categoryId/update", updateCategory)
router.delete("/:categoryId/delete", deleteCategory)

export default router