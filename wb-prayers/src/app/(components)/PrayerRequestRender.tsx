import { database } from "@/appwrite"
import { PrayerRequest } from "@/types"
import { AppwriteException, Query } from "appwrite"

import { env } from "@/env.mjs"
import Typography from "@/components/ui/Typography"

import PrayerCard from "./PrayerCard"

export interface PrayerRequestResponse {
  prayerRequests: PrayerRequest[]
  items: number
  error?: string
}
export async function getPrayerRequests(): Promise<PrayerRequestResponse> {
  try {
    const createdDoc = await database.listDocuments(
      env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      [Query.orderDesc("createdAt")]
    )
    return {
      prayerRequests: createdDoc.documents as PrayerRequest[],
      items: createdDoc.total,
    }
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("Appwrite Exception:", error)
      //   throw new Exception(error.message)
      return {
        prayerRequests: [],
        items: 0,
        error: error.message,
      }
    }
    return {
      prayerRequests: [],
      items: 0,
      error: "An unknown error occurred",
    }
  }
}

export default async function PrayerRequestRender() {
  const prayerRequests = await getPrayerRequests()
  return (
    <div className="flex flex-col gap-3">
      <Typography variant={"p"} affects={"muted"} removeMargin>
        Requests: {prayerRequests.items}
      </Typography>
      <section
        id="prayer-requests"
        className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
      >
        {prayerRequests.prayerRequests.map((prayerRequest) => (
          <PrayerCard key={prayerRequest.$id} prayerRequest={prayerRequest} />
        ))}
      </section>
    </div>
  )
}
