import Image from "next/image"
import Link from "next/link"

interface EasyPaisaLogoProps {
  className?: string
  width?: number
  height?: number
  variant?: "default" | "white" | "compact"
  clickable?: boolean
  mobile?: boolean
}

export function EasyPaisaLogo({
  className = "",
  width = 180,
  height = 60,
  variant = "default",
  clickable = true,
  mobile = false,
}: EasyPaisaLogoProps) {
  const logoStyles = {
    default: "drop-shadow-sm",
    white: "brightness-0 invert drop-shadow-sm",
    compact: "drop-shadow-sm",
  }

  // Mobile responsive sizing
  const mobileWidth = mobile ? Math.floor(width * 0.7) : width
  const mobileHeight = mobile ? Math.floor(height * 0.7) : height

  const logoContent = (
    <div
      className={`backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-lg border border-gray-100 text-black bg-transparent transition-all duration-300 ${
        clickable ? "hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer" : ""
      }`}
    >
      <Image
        src="/easypaisa-black-logo.png"
        alt="EasyPaisa Digital Bank"
        width={mobileWidth}
        height={mobileHeight}
        className={`object-contain ${logoStyles[variant]} w-auto h-auto`}
        priority
        style={{
          filter: variant === "white" ? "brightness(0) invert(1)" : "none",
        }}
      />
    </div>
  )

  if (clickable) {
    return (
      <div className={`flex items-center ${className}`}>
        <Link href="/" className="block touch-manipulation">
          {logoContent}
        </Link>
      </div>
    )
  }

  return <div className={`flex items-center ${className}`}>{logoContent}</div>
}
