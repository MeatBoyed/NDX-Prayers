"use server"

import { CommentServiceResponse } from "@/server/CommentService"
import { PrayerServiceResponse } from "@/server/PrayerService"

import { env } from "@/env.mjs"

import apiClient from "./apiClient"
import { PrayerRequestFormSchema } from "./utils"

export async function getHomePageData() {
  const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/prayers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!res.ok) {
    console.log("Prayer Page View Error", res)
    return undefined
  }
  const data = await res.json()
  console.log("Prayer Page View Response", data)
  // TODO: Do zod validation here
  // Do zod validation here
  // catch error if validation fails
  return data as PrayerServiceResponse
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

export async function createCommentRequest(
  prayerRequest: PrayerRequestFormSchema,
  prayerRequestId: string
) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_APP_URL}/api/prayers/${prayerRequestId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prayerRequest),
    }
  )

  if (!res.ok) {
    console.log("Prayer Request Form Post Error: ", res)
    throw new Error("Failed to create prayer request")
  }

  return (await res.json()) as CommentServiceResponse
}

export async function prayForPrayerRequest(prayerId: string) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_APP_URL}/api/prayers/${prayerId}/pray`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  if (!res.ok) {
    console.log("Pray for Request Error: ", res)
    throw new Error("Failed to pray for request")
  }

  return (await res.json()) as PrayerServiceResponse
}
