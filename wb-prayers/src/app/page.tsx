import { Suspense } from "react"

import Typography from "@/components/ui/Typography"
import Banner from "@/app/(components)/Banner"
import PrayerRequestForm from "@/app/(components)/PrayerRequestForm"

import PrayerRequestRender from "./(components)/PrayerRequestRender"

export default async function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center gap-20 px-5 pb-16 pt-4">
      <div className="flex w-full flex-col items-center justify-center gap-14 md:max-w-lg lg:max-w-4xl">
        <Banner />
        <PrayerRequestForm />
        <Suspense
          fallback={
            <Typography variant="p" affects="large">
              Loading...
            </Typography>
          }
        >
          <PrayerRequestRender />
        </Suspense>
      </div>
    </main>
  )
}
