import { PrayerRequest, Visibility } from "@prisma/client"

export type SiteConfig = {
  name: string
  author: string
  description: string
  keywords: Array<string>
  url: {
    base: string
    author: string
  }
  links: {
    github: string
  }
  ogImage: string
}

export type PrayerRequestAndComments = PrayerRequest & {
  comments: {
    id: string
    content: string
    country: string
    visibility: Visibility
    createdAt: Date
    updatedAt: Date
    prayerRequestId: string
  }[]
}
