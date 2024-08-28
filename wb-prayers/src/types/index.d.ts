import { Models } from "appwrite"

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

export type PrayerRequest = Models.Document & {
  country: string
  prayerRequest: string
  createdAt: string
}
