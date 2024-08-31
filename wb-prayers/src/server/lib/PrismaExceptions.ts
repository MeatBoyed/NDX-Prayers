import { Prisma } from "@prisma/client"

export function handlePrismaError(error: unknown): {
  code: number
  message: string
} {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return { code: 409, message: "Unique constraint violation." }
      case "P2014":
        return { code: 400, message: "Invalid ID provided." }
      case "P2003":
        return { code: 400, message: "Foreign key constraint failed." }
      case "P2025":
        return { code: 404, message: "Record not found." }
      case "P2001":
        return {
          code: 400,
          message: "Record search failed due to invalid data.",
        }
      case "P2015":
        return { code: 400, message: "Related record not found." }
      case "P2021":
        return { code: 500, message: "Table does not exist in the database." }
      case "P2022":
        return { code: 500, message: "Column does not exist in the database." }
      default:
        console.error("Unhandled Prisma Error:", error)
        return { code: 500, message: "An unexpected database error occurred." }
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return { code: 400, message: "Invalid data provided." }
  } else {
    console.error("Unexpected Error:", error)
    return { code: 500, message: "An unexpected error occurred." }
  }
}
