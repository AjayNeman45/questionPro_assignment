import express from "express";
import { getAvailableGroceries, placeOrder, createUser, getAllUsers } from "../controllers/userController";

const router = express.Router();

router.post("/create", createUser)
router.get("/getAllUsers", getAllUsers)
router.get("/groceries", getAvailableGroceries);
router.post("/order", placeOrder);

export default router;
