import { getImagePath } from "@/lib/utils"

interface SGDFLogoProps {
  variant?: "horizontal" | "vertical"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SGDFLogo({ variant = "horizontal", size = "md", className = "" }: SGDFLogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
  }

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={getImagePath("/logo.png")}
        alt="Scouts et Guides de France"
        className={`${sizeClasses[size]} w-auto object-contain`}
      />
    </div>
  )
}
