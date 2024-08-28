import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import Typography from "@/components/ui/Typography";

export default function NotFound() {
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
  );
}
