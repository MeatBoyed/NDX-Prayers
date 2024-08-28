"use client"

import { PrayerRequest } from "@/types"
import { Bookmark, Heart, Share2 } from "lucide-react"
import * as RPNI from "react-phone-number-input"
import { toast } from "sonner"

import { env } from "@/env.mjs"
import { FlagComponent } from "@/components/ui/phone-input"

import { Button } from "../../components/ui/button"
import Typography from "../../components/ui/Typography"

export default function PrayerCard({
  prayerRequest,
}: {
  prayerRequest: PrayerRequest
}) {
  function handleShare() {
    const shareData = {
      title: "Prayer Requests - NDX",
      text: "Share this anonymous prayer request to your friends",
      url: `${env.NEXT_PUBLIC_APP_URL}/${prayerRequest.$id}`,
    }
    toast.promise(navigator.share(shareData), {
      loading: "Sharing...",
      success: "Shared!",
      error: "Failed to share",
    })
  }
  return (
    <div className="mx-auto w-full space-y-3 overflow-hidden rounded-xl bg-white px-6 py-4 shadow-md dark:bg-gray-800 md:max-w-md">
      <div className="flex items-center justify-between">
        <Typography variant={"p"} affects={"large"}>
          {/* {prayerRequest.country} */}
          <FlagComponent
            country={prayerRequest.country as RPNI.Country}
            countryName={prayerRequest.country}
          />
        </Typography>
        <Typography variant={"p"} affects={"muted"} removeMargin>
          {new Date(prayerRequest.createdAt).toLocaleDateString()}
        </Typography>
      </div>
      <div className="">
        <Typography variant={"p"}>{prayerRequest.prayerRequest}</Typography>
      </div>
      <div className="flex items-center justify-between space-x-4 border-t border-gray-200  pt-4 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          {/* <Heart size={16} /> */}
          <Share2 size={16} onClick={handleShare} className="cursor-pointer" />
          {/* TODO: include send icon for sending person a message if they have contact details */}
        </div>
        <div className="flex items-center space-x-4">
          <Bookmark size={16} />
        </div>
      </div>
    </div>
  )
}
