"use client"

import { PropsWithChildren, useState } from "react"
import Link from "next/link"
import { CommentServiceResponse } from "@/server/CommentService"
import { PrayerRequestAndComments } from "@/types"
import { Comment, PrayerRequest } from "@prisma/client"
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react"
import * as RPNI from "react-phone-number-input"
import { toast } from "sonner"

import { env } from "@/env.mjs"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { FlagComponent } from "@/components/ui/phone-input"

import Typography from "../../components/ui/Typography"
import PrayerRequestForm from "./PrayerRequestForm"

interface data {
  id: string
  country: string
  date: Date
  content: string
}

export default function StandardCard({
  data,
  isComment,
  showBottom = true,
  children,
}: {
  showBottom?: boolean
  data: data
  isComment?: boolean
} & PropsWithChildren) {
  function handleShare() {
    const shareData = {
      title: "Prayer Requests - NDX",
      text: "Share this anonymous prayer request to your friends",
      url: `${env.NEXT_PUBLIC_APP_URL}/${data.id}`,
    }
    toast.promise(navigator.share(shareData), {
      loading: "Sharing...",
      success: "Shared!",
      error: "Failed to share",
    })
  }
  return (
    <div className="mx-auto max-h-svh w-full space-y-3 overflow-hidden rounded-xl bg-white px-6 py-4 shadow-md dark:bg-gray-800 md:max-w-md">
      {/* Meta Head */}
      <div className="flex items-center justify-between">
        <Typography variant={"p"} affects={"large"}>
          {/* {prayerRequest.country} */}
          <FlagComponent
            country={data.country as RPNI.Country}
            countryName={data.country}
          />
        </Typography>
        <Typography variant={"p"} affects={"muted"} removeMargin>
          {new Date(data.date).toLocaleDateString()}
        </Typography>
      </div>
      {/* Prayer Content */}
      <div className="">
        <Typography variant={"p"}>{data.content}</Typography>
      </div>
      {/* Actions / Footer */}
      {showBottom && (
        <div className="flex items-center justify-between space-x-4 border-t border-gray-200  pt-4 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            {children}
            <Share2
              size={20}
              onClick={handleShare}
              className="cursor-pointer"
            />
            <Button size="icon" onClick={() => undefined}>
              🙏
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export function PrayerCard({
  prayerRequest,
}: {
  prayerRequest: PrayerRequestAndComments
}) {
  const [open, setOpen] = useState(false)
  const [comments, setComments] = useState(prayerRequest.comments)
  return (
    <div className="grid w-full grid-cols-1 gap-4">
      <StandardCard
        data={{
          id: prayerRequest.id,
          country: prayerRequest.country,
          date: prayerRequest.createdAt,
          content: prayerRequest.content,
        }}
      >
        <MessageCircle
          onClick={() => setOpen(!open)}
          className="scale-x-[-1] hover:cursor-pointer"
          size={20}
        />
      </StandardCard>
      <Collapsible onOpenChange={setOpen} open={open} className="w-full">
        <CollapsibleContent>
          <div className="grid w-full grid-cols-1 gap-2">
            <PrayerRequestForm
              isComment={true}
              prayerRequestId={prayerRequest.id}
              onCreateComment={(newComment) => {
                setComments([...comments, newComment.comments[0]])
              }}
            />
            {comments.length > 0 &&
              comments.map((comment) => (
                <StandardCard
                  key={comment.id}
                  data={{
                    id: comment.id,
                    country: comment.country,
                    date: comment.createdAt,
                    content: comment.content,
                  }}
                  showBottom={false}
                />
              ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

// export function CommentSection({
//   comments,
//   prayerRequest,
// }: {
//   comments?: Comment[]
//   prayerRequest: PrayerRequest
// }) {
//   return (
//           <CommentSection prayerRequest={prayerRequest} />
//   )
// }
