import { hc, InferResponseType } from "hono/client"

import { env } from "@/env.mjs"
import { AppType } from "@/app/api/[[...route]]/route"

const apiClient = hc<AppType>(env.NEXT_PUBLIC_APP_URL)

export default apiClient
