import prayersController from "@/server/prayersController"
import { Hono } from "hono"
import { logger } from "hono/logger"
import { handle } from "hono/vercel"

const app = new Hono().basePath("/api")

app.use(logger())
const routes = app.route("/prayers", prayersController)

// Add your routes here
app.get("/hello", (c) => c.json({ message: "Hello from Hono!" }))
// const routes = app.route("/prayers", prayersController)

export const GET = handle(app)
export const POST = handle(app)

// export type AppType = typeof routes
export type AppType = typeof routes
