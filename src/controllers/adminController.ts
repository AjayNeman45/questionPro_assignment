import { Request, Response } from "express";
import * as adminService from "../services/adminService";

export const addGrocery = async (req: Request, res: Response) => {
    try {
        const grocery = await adminService.createGrocery(req.body);
        res.status(201).json(grocery);
    } catch (error: any) {
        res.status(error.status || 500).json({ success: false, error: error.message || "Internal Server Error" });
    }
};

export const getGroceries = async (_req: Request, res: Response) => {
    try {
        const groceries = await adminService.fetchGroceries();
        res.json(groceries);
    } catch (error: any) {
        res.status(error.status || 500).json({ success: false, error: error.message || "Internal Server Error" });
    }
};

export const updateGrocery = async (req: Request, res: Response) => {
    try {
        const updatedItem = await adminService.updateGrocery(req.params.id, req.body);
        res.json(updatedItem);
    } catch (error: any) {
        res.status(error.status || 500).json({ success: false, error: error.message || "Internal Server Error" });
    }
};

export const deleteGrocery = async (req: Request, res: Response) => {
    try {
        const response = await adminService.removeGrocery(req.params.id);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(error.status || 500).json({ success: false, error: error.message || "Internal Server Error" });
    }
};
