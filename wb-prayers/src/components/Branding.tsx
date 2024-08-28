import Typography from "./ui/Typography"

export default function Branding() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 bg-black py-10 text-white">
      <div className="flex flex-col items-center justify-center">
        <Typography variant="h3" className="">
          Powered by
        </Typography>
        <Typography variant="h2" className="text-[#00AAFF] ">
          Nerf Designs
        </Typography>
        <Typography variant="p" className="">
          Nerf your competition
        </Typography>
      </div>

      <Typography variant="p" className="text-center ">
        Copyright © {new Date().getFullYear()} Nerf Designs. All Rights
        Reserved
      </Typography>
    </div>
  )
}
