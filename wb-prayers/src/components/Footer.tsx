import Link from "next/link"
import { FaWhatsapp } from "react-icons/fa"
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa6"

import { links } from "@/config/site"

import Branding from "./Branding"
import Typography from "./ui/Typography"

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-8 border-t border-foreground pt-10  ">
      <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-14 lg:px-28">
        <FooterContent />
      </div>
      <Branding />
    </footer>
  )
}

export function FooterContent() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 md:gap-16">
      <div className="flex w-full flex-col items-center justify-center gap-10 md:items-center">
        <div className="grid grid-rows-1 items-center justify-center text-center">
          <Typography variant={"p"} removeMargin>
            Created by
          </Typography>
          <Typography
            variant={"p"}
            affects="large"
            className="text-start"
            removeMargin
          >
            <Link href={links.author}>Charles Rossouw</Link>
          </Typography>
        </div>

        {/* <!-- Links --> */}
        <div className="flex items-start justify-center gap-3 md:flex-row md:items-center md:gap-5">
          <Link href={links.instagram}>
            <FaInstagram className="h-7 w-7 hover:text-purple-600" />
          </Link>
          <Link href={links.github}>
            <FaGithub className="h-7 w-7 hover:text-gray-600" />
          </Link>
          <Link href={links.facebook}>
            <FaFacebook className="h-7 w-7 hover:text-blue-600" />
          </Link>
        </div>
      </div>
    </div>
  )
}
