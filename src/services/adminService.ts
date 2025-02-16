import prisma from "../config/prismaClient";
import { handlePrismaError } from './../utils/handlePrismaError';

export const createGrocery = async (data: any) => {
    try {
        const response = await prisma.groceryItem.create({ data });
        return { success: true, message: "Grocery added successfully", data: response }
    } catch (error) {
        const { status, message } = handlePrismaError(error);
        throw { status, message };
    }
};

export const fetchGroceries = async () => {
    try {
        const response = await prisma.groceryItem.findMany();
        return { success: true, data: response }
    } catch (error) {
        const { status, message } = handlePrismaError(error);
        throw { status, message };
    }
};

export const updateGrocery = async (id: string, data: any) => {
    try {
        const response = await prisma.groceryItem.update({ where: { id }, data });
        return { success: true, message: "Grocery updated successfully", data: response }
    } catch (error) {
        const { status, message } = handlePrismaError(error);
        throw { status, message };
    }
};

export const removeGrocery = async (id: string) => {
    try {
        const response = await prisma.groceryItem.delete({ where: { id } });
        return { success: true, message: " Grocery deleted successfully", data: response }
    } catch (error) {
        const { status, message } = handlePrismaError(error);
        throw { status, message };
    }
};
