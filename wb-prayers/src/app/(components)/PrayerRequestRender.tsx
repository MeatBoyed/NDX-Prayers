import Link from "next/link"
import { HomeIcon } from "lucide-react"

import { getPrayerRequests } from "@/lib/PrayersController"
import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/Typography"

import PrayerCard from "./PrayerCard"

export default async function PrayerRequestRender() {
  const prayerRequests = await getPrayerRequests()
  // console.log("Prayer Requests", prayerRequests?.total)

  if (!prayerRequests) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Typography variant="h1" className="mb-2 text-4xl font-bold">
          Oh my goodness!
        </Typography>
        <Typography variant="p" className="mb-8 max-w-md text-center text-xl">
          Looks like we&apos;ve got a bit of an issue. Please refresh the page
          and try again 😉
        </Typography>
        <Link href="/">
          <Button size="lg">
            <HomeIcon className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Typography variant={"p"} affects={"muted"} removeMargin>
        Requests: {prayerRequests.total}
      </Typography>
      <section
        id="prayer-requests"
        className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
      >
        {prayerRequests.prayerRequests.map((prayerRequest) => (
          <PrayerCard key={prayerRequest.$id} prayerRequest={prayerRequest} />
        ))}
      </section>
    </div>
  )
}
