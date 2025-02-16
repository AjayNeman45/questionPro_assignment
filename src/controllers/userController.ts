import { Request, Response } from "express";
import * as userService from "../services/userService";

export const getAvailableGroceries = async (_req: Request, res: Response) => {
    try {
        const groceries = await userService.fetchAvailableGroceries();
        res.json(groceries);
    } catch (error: any) {
        res.status(error.status || 500).json({ success: false, error: error.message || "Internal Server Error" });
    }

};

export const placeOrder = async (req: Request, res: Response) => {
    try {
        const order = await userService.createOrder(req.body.userId, req.body.items);
        res.status(201).json(order);
    } catch (error: any) {
        res.status(error.status || 500).json({ success: false, error: error.message || "Internal Server Error" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(error.status || 500).json({ success: false, error: error.message || "Internal Server Error" });
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(error.status || 500).json({ success: false, error: error.message || "Internal Server Error" });
    }
}