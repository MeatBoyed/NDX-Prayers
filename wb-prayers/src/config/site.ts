import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "Prayer Requests - NDX",
  author: "Charles Rossouw",
  description:
    "Pray Requests (NDX Prayers) is an anonyms prayer request website for my family and friends.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Radix UI",
    "shadcn/ui",
    "NDX Prayers",
    "Nerf Designs",
    "Prayer Requests",
    "Walvis Bay Baptist Church",
  ],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://rdev.pro",
  },
  links: {
    github: "https://github.com/meatboyed",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}

export const links = {
  instagram: "https://www.instagram.com/nerfdesigns/",
  whatsapp: "https://wa.me/message/7777777777",
  github: "https://github.com/meatboyed",
  facebook: "https://www.facebook.com/charlesrossouw",
  author: "https://www.instagram.com/charlesrossouw/",
}
