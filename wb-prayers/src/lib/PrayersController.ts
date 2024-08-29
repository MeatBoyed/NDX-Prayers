import { PrayerServiceResponse } from "@/server/PrayerService"

import { env } from "@/env.mjs"

import { PrayerRequestFormSchema } from "./utils"

export async function getPrayerRequests() {
  const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/prayers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!res.ok) {
    console.log("Prayer Request Render Error", res)
    return undefined
  }
  //   console.log("Prayer Requests data: ", data.total)
  return (await res.json()) as PrayerServiceResponse
}

export async function getPrayerPageData(prayerId: string) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_APP_URL}/api/prayers/${prayerId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  if (!res.ok) {
    console.log("Prayer Page View Error", res)
    return undefined
  }

  return (await res.json()) as PrayerServiceResponse
}

// Toast promise expects an error
export async function createPrayerRequest(
  prayerRequest: PrayerRequestFormSchema
) {
  const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/prayers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prayerRequest),
  })

  if (!res.ok) {
    console.log("Prayer Request Form Post Error: ", res)
    throw new Error("Failed to create prayer request")
  }

  return (await res.json()) as PrayerServiceResponse
}
