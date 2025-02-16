import { Prisma } from '@prisma/client';

export const handlePrismaError = (error: unknown) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002': // Unique constraint violation
                return { status: 400, message: `Duplicate value. A record with this value already exists.` };

            case 'P2003': // Foreign key constraint failed
                return { status: 400, message: `Invalid reference. The related record does not exist.` };

            case 'P2025': // Record not found
                return { status: 404, message: `Record not found.` };

            default:
                return { status: 500, message: `Database error: ${error.message}` };
        }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        return { status: 400, message: `Invalid input data. Please check your request.` };
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
        return { status: 500, message: `Prisma engine crashed. Please try again later.` };
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
        return { status: 500, message: `Database connection failed. Please check your database.` };
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        return { status: 500, message: `An unknown database error occurred.` };
    }

    return { status: 500, message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}` };
};
