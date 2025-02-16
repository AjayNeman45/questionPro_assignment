import prisma from "../config/prismaClient";
import { handlePrismaError } from './../utils/handlePrismaError';
import bcrypt from "bcryptjs";


export const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        return { success: true, data: users };
    } catch (error) {
        const { status, message } = handlePrismaError(error);
        throw { status, message };
    }
}

export const createUser = async (user: { email: string; password: string; role: "admin" | "user" }) => {
    try {
        // Manual validation
        if (!user.email || !user.password || !user.role) {
            throw new Error("Email, password, and role are required.");
        }

        if (!["admin", "user"].includes(user.role)) {
            throw new Error("Role must be either 'admin' or 'user'.");
        }

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
        });

        if (existingUser) {
            throw new Error("Email is already registered.");
        }

        const hashedPassword = await bcrypt.hash(user.password, 10); // Salt rounds = 10
        // Create user
        const newUser = await prisma.user.create({
            data: {
                email: user.email,
                password: hashedPassword, // Hash this in real scenarios
                role: user.role,
            },
        });

        return { success: true, data: newUser, message: "User created successfull" };
    } catch (error) {
        const { status, message } = handlePrismaError(error);
        throw { status, message };
    }
};

export const fetchAvailableGroceries = async () => {
    try {
        const response = await prisma.groceryItem.findMany({ where: { quantity: { gt: 0 } } });
        return { success: true, data: response }
    } catch (error) {
        const { status, message } = handlePrismaError(error);
        throw { status, message };
    }
};

export const createOrder = async (userId: string, items: { id: string; quantity: number }[]) => {
    return await prisma.$transaction(async (prisma) => {
        try {
            // 1️⃣ Fetch all grocery items in the order
            const groceryItems = await prisma.groceryItem.findMany({
                where: { id: { in: items.map(item => item.id) } },
            });

            console.log("groceryItems ", groceryItems)

            // 2️⃣ Validate if items are available in required quantity
            for (const item of items) {
                const groceryItem = groceryItems.find(g => g.id === item.id);
                if (!groceryItem) {
                    throw new Error(`Grocery item with ID ${item.id} not found.`);
                }
                if (groceryItem.quantity < item.quantity) {
                    throw new Error(`Not enough stock for ${groceryItem.name}. Available: ${groceryItem.quantity}, Requested: ${item.quantity}`);
                }
            }

            console.log("works fine");

            // 3️⃣ Create Order & Update Inventory
            const order = await prisma.order.create({
                data: {
                    userId,
                    items: {
                        create: items.map(item => ({
                            groceryItemId: item.id,
                            quantity: Number(item.quantity),
                        })),
                    },
                },
            });

            console.log("causing error")

            // 4️⃣ Deduct ordered quantity from grocery inventory
            for (const item of items) {
                await prisma.groceryItem.update({
                    where: { id: item.id },
                    data: { quantity: { decrement: Number(item.quantity) } },
                });
            }

            return { success: true, message: "Order has been placed successfully", data: { orderId: order.id } }

        } catch (error) {
            const { status, message } = handlePrismaError(error);
            throw { status, message };
        }
    });
};
