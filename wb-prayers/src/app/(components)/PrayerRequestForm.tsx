"use client"

import { useRouter } from "next/navigation"
import { CommentServiceResponse } from "@/server/CommentService"
import { PrayerServiceResponse } from "@/server/PrayerService"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as RPNInput from "react-phone-number-input"
import { toast } from "sonner"

import { Exception } from "@/types/database"
import { countries } from "@/config/countries"
import { createCommentRequest, createPrayerRequest } from "@/lib/RequestService"
import { PrayerRequestSchema, type PrayerRequestFormSchema } from "@/lib/utils"

import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form"
import { CountrySelect } from "../../components/ui/phone-input"
import { Textarea } from "../../components/ui/textarea"

export default function PrayerRequestForm({
  isComment = false,
  onCreateComment,
  prayerRequestId,
}: {
  isComment?: boolean
  prayerRequestId?: string
  onCreateComment?: (data: CommentServiceResponse) => void
}) {
  const router = useRouter()
  const form = useForm<PrayerRequestFormSchema>({
    resolver: zodResolver(PrayerRequestSchema),
    defaultValues: {
      content: "",
      country: "NA",
    },
  })

  async function onSubmit(values: PrayerRequestFormSchema) {
    if (isComment && prayerRequestId) {
      toast.promise(createCommentRequest(values, prayerRequestId), {
        loading: "Creating prayer request...",
        success: (data: CommentServiceResponse) => {
          console.log("Created Prayer Request: ", data)
          onCreateComment?.(data)
          return "Your comment has been created!"
        },
        error: (error) => {
          console.log(error)
          if (error instanceof Exception) {
            return error.message
          }
        },
      })
    } else {
      toast.promise(createPrayerRequest(values), {
        loading: "Creating prayer request...",
        success: (data: PrayerServiceResponse) => {
          console.log("Created Prayer Request: ", data)
          return "Your Prayer Request has been created! Please refresh the page to see it."
        },
        error: (error) => {
          console.log(error)
          if (error instanceof Exception) {
            return error.message
          }
          return "Failed to create prayer request"
        },
      })
    }
    router.push("/")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col items-center justify-center gap-3"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={
                    isComment
                      ? "Type your comment here."
                      : "Type your prayer request, please be as specific as possible."
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full items-center justify-center gap-2">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="max-w-[40%]">
                <FormControl>
                  <CountrySelect
                    value={field.value as RPNInput.Country}
                    onChange={(value) => {
                      field.onChange(value)
                    }}
                    options={countries}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Share {isComment ? "comment" : "prayer request"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
