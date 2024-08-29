import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { StatusCode } from "hono/utils/http-status"
import { z } from "zod"

import {
  createPrayerRequest,
  getPrayerRequest,
  getPrayerRequests,
} from "./PrayerService"

const app = new Hono()
  .get("/", async (c) => {
    const prayerRequests = await getPrayerRequests()
    if (prayerRequests.err) {
      console.log("Prayer Requests Error", prayerRequests.val)
      throw new HTTPException((prayerRequests.val.code as StatusCode) || 500, {
        message: prayerRequests.val.message,
      })
    }
    console.log("Server Prayer Requests", prayerRequests.val.total)
    return c.json(prayerRequests.val)
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        prayerRequest: z.string().min(10).max(250),
        country: z.string().min(2).max(2),
      })
    ),
    async (c) => {
      const payload = c.req.valid("json")

      const createdPrayer = await createPrayerRequest(payload)
      if (createdPrayer.err) {
        console.log("Create Prayer Request Error", createdPrayer.val)
        throw new HTTPException((createdPrayer.val.code as StatusCode) || 500, {
          message: createdPrayer.val.message,
        })
      }
      return c.json(createdPrayer.val)
    }
  )
  .get("/:document_id", async (c) => {
    const prayerId = c.req.param("document_id")

    const prayerRequest = await getPrayerRequest(prayerId)
    if (prayerRequest.err) {
      throw new HTTPException((prayerRequest.val.code as StatusCode) || 500, {
        message: prayerRequest.val.message,
      })
    }

    return c.json(prayerRequest.val)
  })

export default app
