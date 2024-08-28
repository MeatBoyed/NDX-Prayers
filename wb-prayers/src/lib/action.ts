import { database } from "@/appwrite"
import { PrayerRequest } from "@/types"
import { AppwriteException, ID, Query } from "appwrite"

import { env } from "@/env.mjs"
import { Exception } from "@/types/database"
import { PrayerRequestFormSchema } from "@/app/(components)/PrayerRequestForm"

export async function createPrayerRequest(
  prayerRequest: PrayerRequestFormSchema
): Promise<PrayerRequest> {
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
    return createdDoc as PrayerRequest
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("Appwrite Exception:", error)
      throw new Exception(error.message)
    }
    throw new Error()
  }
}
