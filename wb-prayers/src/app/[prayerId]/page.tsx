import Link from "next/link"
import { HomeIcon } from "lucide-react"

import { getPrayerPageData, getPrayerRequests } from "@/lib/RequestService"
import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/Typography"
import AnimatedBorderTrail from "@/components/animata/container/animated-border-trail"

import { PrayerCard } from "../(components)/PrayerCard"

export const dynamicParams = true

// export async function generateStaticParams() {
//   const prayerRequests = await getPrayerRequests()

//   if (!prayerRequests) {
//     return []
//   }

//   return prayerRequests.prayerRequests.map((prayer) => ({
//     prayerId: prayer.id,
//   }))
// }

export const revalidate = 43200 // Revalidate every 12 hours

export default async function PrayerRequestPage({
  params: { prayerId },
}: {
  params: { prayerId: string }
}) {
  const prayerRequest = await getPrayerPageData(prayerId)
  // console.log("Prayer Request", prayerRequest)

  if (!prayerRequest) {
    console.log("Prayer Page View Error", prayerRequest)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Typography variant="h1" className="mb-2 text-4xl font-bold">
          Whoa there!
        </Typography>
        <Typography variant="p" className="mb-8 max-w-md text-center text-xl">
          Looks like you&apos;ve wandered off the trail. Let&apos;s get you back
          on track.
        </Typography>
        <Link href="/">
          <Button size="lg">
            <HomeIcon className="mr-2 h-4 w-4" />
            Back to the home
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center gap-20 px-5 pb-16 pt-4">
      <div className="flex w-full flex-col items-center justify-center gap-14 md:max-w-lg lg:max-w-4xl">
        {/* <AnimatedBorderTrail
          color="purple"
          trailSize="md"
          duration="10s"
          className="min-w-fit md:max-w-md"
        > */}

        <PrayerCard prayerRequest={prayerRequest.prayerRequests[0]} />
        {/* </AnimatedBorderTrail> */}

        {/* <Collapsible className="w-full">
          <CollapsibleTrigger>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid w-full grid-cols-1 gap-4">
              <PrayerCard prayerRequest={prayerRequest.prayerRequests[0]}>
                <CommentFooter />
              </PrayerCard>
            </div>
          </CollapsibleContent>
        </Collapsible> */}
      </div>
    </main>
  )
}
