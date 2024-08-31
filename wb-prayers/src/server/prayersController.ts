import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { StatusCode } from "hono/utils/http-status"
import { z } from "zod"

import { Create as CreateComment } from "./CommentService"
import { Create, Get, GetAll, Pray } from "./PrayerService"

const PostSchema = z.object({
  content: z.string().min(10).max(250),
  country: z.string().min(2).max(2),
})

const app = new Hono()
  .get("/", async (c) => {
    const prayerRequests = await GetAll()
    if (prayerRequests.err) {
      console.log("Prayer Requests Error", prayerRequests.val)
      throw new HTTPException((prayerRequests.val.code as StatusCode) || 500, {
        message: prayerRequests.val.message,
      })
    }
    console.log("Server Prayer Requests", prayerRequests.val.total)
    return c.json(prayerRequests.val)
  })
  .post("/", zValidator("json", PostSchema), async (c) => {
    const payload = c.req.valid("json")

    const createdPrayer = await Create(payload)
    if (createdPrayer.err) {
      console.log("Create Prayer Request Error", createdPrayer.val)
      throw new HTTPException((createdPrayer.val.code as StatusCode) || 500, {
        message: createdPrayer.val.message,
      })
    }
    return c.json(createdPrayer.val)
  })
  .get("/:document_id", async (c) => {
    const prayerRequestId = c.req.param("document_id")

    const prayerRequest = await Get(prayerRequestId)
    if (prayerRequest.err) {
      throw new HTTPException((prayerRequest.val.code as StatusCode) || 500, {
        message: prayerRequest.val.message,
      })
    }

    return c.json(prayerRequest.val)
  })
  .post("/:document_id/comments", zValidator("json", PostSchema), async (c) => {
    const prayerRequestId = c.req.param("document_id")
    const payload = c.req.valid("json")

    const createdComment = await CreateComment(prayerRequestId, payload)
    if (createdComment.err) {
      console.log("Create Comment Error", createdComment.val)
      throw new HTTPException((createdComment.val.code as StatusCode) || 500, {
        message: createdComment.val.message,
      })
    }
    return c.json(createdComment.val)
  })
  .post("/:document_id/pray", async (c) => {
    const prayerRequestId = c.req.param("document_id")

    const prayed = await Pray(prayerRequestId)
    if (prayed.err) {
      throw new HTTPException((prayed.val.code as StatusCode) || 500, {
        message: prayed.val.message,
      })
    }
    return c.json(prayed.val)
  })

export default app
