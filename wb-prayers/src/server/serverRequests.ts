import { database } from "@/appwrite"
import { PrayerRequest } from "@/types"
import { AppwriteException, Query } from "appwrite"

import { env } from "@/env"

export async function getPrayerRequest(
  prayerId: string
): Promise<PrayerRequest | string> {
  try {
    const createdDoc = await database.getDocument(
      env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      prayerId
    )
    return createdDoc as PrayerRequest
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("Appwrite Exception:", error)
      return error.message
    }
    return "An unexpected error occured"
  }
}
