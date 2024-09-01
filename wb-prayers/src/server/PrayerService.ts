import db from "@/db"
import { PrayerRequestAndComments } from "@/types"
import { Prisma } from "@prisma/client"
import { Err, Ok, Result } from "ts-results"

import { type PrayerRequestFormSchema } from "@/lib/utils"

import { handlePrismaError } from "./lib/PrismaExceptions"

// Update the PrayerServiceResponse interface
export interface PrayerServiceResponse {
  prayerRequests: PrayerRequestAndComments[]
  total: number
}

export interface PrayerServiceError {
  code: number
  message: string
}

export async function GetAll(): Promise<
  Result<PrayerServiceResponse, PrayerServiceError>
> {
  try {
    const prayerRequests = await db.prayerRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        comments: true,
      },
    })
    return Ok({
      prayerRequests,
      total: prayerRequests.length,
    })
  } catch (error) {
    return Err(handlePrayerServiceError(error))
  }
}

export async function Get(
  prayerId: string
): Promise<Result<PrayerServiceResponse, PrayerServiceError>> {
  try {
    const prayerRequest = await db.prayerRequest.findUniqueOrThrow({
      where: {
        id: prayerId,
      },
      include: {
        comments: true,
      },
    })
    return Ok({
      prayerRequests: [prayerRequest],
      total: 1,
    })
  } catch (error) {
    return Err(handlePrayerServiceError(error))
  }
}

export async function Create(
  prayerRequest: PrayerRequestFormSchema
): Promise<Result<PrayerServiceResponse, PrayerServiceError>> {
  try {
    const createdPrayer = await db.prayerRequest.create({
      data: {
        content: prayerRequest.content,
        country: prayerRequest.country,
        visibility: "PUBLIC",
      },
      include: {
        comments: true,
      },
    })
    return Ok({
      prayerRequests: [createdPrayer],
      total: 1,
    })
  } catch (error) {
    return Err(handlePrayerServiceError(error))
  }
}

export async function Pray(
  prayerId: string
): Promise<Result<PrayerServiceResponse, PrayerServiceError>> {
  try {
    const prayerRequest = await db.prayerRequest.update({
      where: {
        id: prayerId,
      },
      data: {
        prayers: {
          increment: 1,
        },
      },
      include: {
        comments: true,
      },
    })
    return Ok({
      prayerRequests: [prayerRequest],
      total: 1,
    })
  } catch (error) {
    return Err(handlePrayerServiceError(error))
  }
}

function handlePrayerServiceError(error: any): PrayerServiceError {
  console.error("PrayerRequest Render Error: ", error)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error)
  }

  return { code: 500, message: "An unexpected error occured" }
}
