"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as RPNInput from "react-phone-number-input"
import { toast } from "sonner"
import z from "zod"

import { Exception } from "@/types/database"
import { countries } from "@/config/countries"
import { createPrayerRequest } from "@/lib/action"

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

const countryCodes = countries.map((country) => country.value.toString()) as [
  string,
  ...string[],
]

export const PrayerRequestSchema = z.object({
  prayerRequest: z
    .string()
    .min(10, "Please be as specific as possible.")
    .max(250, "Prayer request is like a Tweet, no more than 250 characters."),
  country: z.enum(countryCodes, { required_error: "Country is required" }),
})
export type PrayerRequestFormSchema = z.infer<typeof PrayerRequestSchema>

export default function PrayerRequestForm() {
  const form = useForm<PrayerRequestFormSchema>({
    resolver: zodResolver(PrayerRequestSchema),
    defaultValues: {
      prayerRequest: "",
      country: "NA",
    },
  })

  async function onSubmit(values: PrayerRequestFormSchema) {
    toast.promise(createPrayerRequest(values), {
      loading: "Creating prayer request...",
      success: "Prayer request created successfully",
      error: (error) => {
        console.log(error)
        if (error instanceof Exception) {
          return error.message
        }
        return "Failed to create prayer request"
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col items-center justify-center gap-3"
      >
        <FormField
          control={form.control}
          name="prayerRequest"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Type your prayer request, please be as specific as possible."
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
            Share prayer request
          </Button>
        </div>
      </form>
    </Form>
  )
}
