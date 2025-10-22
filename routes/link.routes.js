import { Router } from "express";
import { createLink, updateLink, categorizeLink, deleteLink } from "../controllers/linkController.js";

const router = Router()

router.post("/create", createLink)
router.put("/:linkId/update", updateLink)
router.put("/:linkId/add/:categoryId", categorizeLink)
router.delete("/:linkId/delete", deleteLink)

export default router