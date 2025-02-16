import express from "express";
import {
    addGrocery,
    getGroceries,
    updateGrocery,
    deleteGrocery,
} from "../controllers/adminController";

const router = express.Router();

router.post("/grocery", addGrocery);
router.get("/groceries", getGroceries);
router.put("/grocery/:id", updateGrocery);
router.delete("/grocery/:id", deleteGrocery);

export default router;
