import { database } from "@/appwrite"
import { PrayerRequest } from "@/types"
import { AppwriteException, ID, Query } from "appwrite"
import { Err, Ok, Result } from "ts-results"

import { env } from "@/env"
import { type PrayerRequestFormSchema } from "@/lib/utils"

export interface PrayerServiceResponse {
  prayerRequests: PrayerRequest[]
  total: number
}

export interface PrayerServiceError {
  code: number
  message: string
}

export async function getPrayerRequests(): Promise<
  Result<PrayerServiceResponse, PrayerServiceError>
> {
  try {
    const createdDoc = await database.listDocuments(
      env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      [Query.orderDesc("createdAt")]
    )
    console.log("Prayer Service: ", createdDoc.total)
    return Ok({
      prayerRequests: createdDoc.documents as PrayerRequest[],
      total: createdDoc.total,
    })
  } catch (error) {
    return Err(handlePrayerServiceError(error))
  }
}

export async function getPrayerRequest(
  prayerId: string
): Promise<Result<PrayerServiceResponse, PrayerServiceError>> {
  try {
    const createdDoc = await database.getDocument(
      env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      prayerId
    )
    return Ok({
      prayerRequests: [createdDoc as PrayerRequest],
      total: 1,
    })
  } catch (error) {
    return Err(handlePrayerServiceError(error))
  }
}

export async function createPrayerRequest(
  prayerRequest: PrayerRequestFormSchema
): Promise<Result<PrayerServiceResponse, PrayerServiceError>> {
  try {
    const createdDoc = await database.createDocument(
      env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      ID.unique(),
      {
        prayerRequest: prayerRequest.prayerRequest,
        country: prayerRequest.country,
        createdAt: new Date().toISOString(),
      }
    )
    // console.log("Created Prayer Request: ", createdDoc)
    return Ok({
      prayerRequests: [createdDoc as PrayerRequest],
      total: 1,
    })
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("Appwrite Exception:", error)
      return Err(handlePrayerServiceError(error))
    }
    return Err(handlePrayerServiceError(error))
  }
}

function handlePrayerServiceError(error: any): PrayerServiceError {
  console.error("PrayerRequest Render Error: ", error)
  if (error instanceof AppwriteException) {
    console.error("PrayerRequest Render Error: ", error)
    return { code: error.code, message: error.message }
  }

  return { code: 500, message: "An unexpected error occured" }
}
