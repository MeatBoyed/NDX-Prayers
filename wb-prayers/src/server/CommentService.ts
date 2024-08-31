import db from "@/db"
import { Comment, Prisma } from "@prisma/client"
import { Err, Ok, Result } from "ts-results"

import { type PrayerRequestFormSchema } from "@/lib/utils"

import { handlePrismaError } from "./lib/PrismaExceptions"

export interface CommentServiceResponse {
  comments: Comment[]
  total: number
}

export interface CommentServiceError {
  code: number
  message: string
}

export async function GetAll(): Promise<
  Result<CommentServiceResponse, CommentServiceError>
> {
  try {
    const comments = await db.comment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return Ok({
      comments,
      total: comments.length,
    })
  } catch (error) {
    return Err(handleCommentServiceError(error))
  }
}

export async function Get(
  prayerId: string
): Promise<Result<CommentServiceResponse, CommentServiceError>> {
  try {
    const comments = await db.comment.findMany({
      where: {
        prayerRequestId: prayerId,
      },
    })
    return Ok({
      comments,
      total: comments.length,
    })
  } catch (error) {
    return Err(handleCommentServiceError(error))
  }
}

export async function Create(
  prayerRequestId: string,
  commentPayload: PrayerRequestFormSchema
): Promise<Result<CommentServiceResponse, CommentServiceError>> {
  try {
    const createdComment = await db.comment.create({
      data: {
        content: commentPayload.content,
        country: commentPayload.country,
        visibility: "PUBLIC",
        prayerRequestId: prayerRequestId,
      },
    })
    return Ok({
      comments: [createdComment],
      total: 1,
    })
  } catch (error) {
    return Err(handleCommentServiceError(error))
  }
}

function handleCommentServiceError(error: any): CommentServiceError {
  console.error("PrayerRequest Render Error: ", error)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error)
  }

  return { code: 500, message: "An unexpected error occured" }
}
