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
      {/* SGDF Symbol */}
      <div className={`${sizeClasses[size]} aspect-square bg-primary rounded-sm flex items-center justify-center mr-3`}>
        <svg viewBox="0 0 24 24" className="w-3/4 h-3/4 fill-primary-foreground">
          <path d="M12 2L3 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-9-5z" />
          <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Text */}
      <div className={variant === "vertical" ? "flex flex-col" : "flex flex-col"}>
        <span className="font-bold text-primary text-sm leading-tight">SCOUTS ET GUIDES</span>
        <span className="font-bold text-primary text-sm leading-tight">DE FRANCE</span>
      </div>
    </div>
  )
}
