import Image from "next/image"
import Logo from "@/assets/main_logo.png"

import Typography from "../../components/ui/Typography"

export default function Banner() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Image src={Logo} alt="banner" width={200} height={200} />
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <Typography variant="h1">Need prayer? Let us know</Typography>
        <Typography variant="p" affects={"removePMargin"}>
          Want to pray for others? Scroll below.
        </Typography>
      </div>
    </div>
  )
}
