import { Account, Client, Databases } from "appwrite"

import { env } from "@/env"

export const client = new Client()

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) // Replace with your project ID

// export const account = new Account(client)
export const database = new Databases(client)

export { ID } from "appwrite"
