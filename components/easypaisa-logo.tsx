import Image from "next/image"

interface EasyPaisaLogoProps {
  className?: string
  width?: number
  height?: number
  variant?: "default" | "white" | "compact"
}

export function EasyPaisaLogo({ className = "", width = 180, height = 60, variant = "default" }: EasyPaisaLogoProps) {
  const logoStyles = {
    default: "drop-shadow-sm",
    white: "brightness-0 invert drop-shadow-sm",
    compact: "drop-shadow-sm",
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100 text-black bg-transparent">
        <Image
          src="/easypaisa-black-logo.png"
          alt="EasyPaisa Digital Bank"
          width={width}
          height={height}
          className={`object-contain ${logoStyles[variant]}`}
          priority
          style={{
            filter: variant === "white" ? "brightness(0) invert(1)" : "none",
          }}
        />
      </div>
    </div>
  )
}
