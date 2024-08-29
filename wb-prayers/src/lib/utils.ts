import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

import { countries } from "@/config/countries"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const countryCodes = countries.map((country) =>
  country.value.toString()
) as [string, ...string[]]

export const PrayerRequestSchema = z.object({
  prayerRequest: z
    .string()
    .min(10, "Please be as specific as possible.")
    .max(250, "Prayer request is like a Tweet, no more than 250 characters."),
  country: z.enum(countryCodes, { required_error: "Country is required" }),
})
export type PrayerRequestFormSchema = z.infer<typeof PrayerRequestSchema>
