interface PetopiaLogoProps {
  className?: string
  variant?: "default" | "white"
  size?: "sm" | "md" | "lg"
}

export function PetopiaLogo({ className = "", variant = "default", size = "md" }: PetopiaLogoProps) {
  const isWhite = variant === "white"
  const textColor = isWhite ? "text-white" : "text-[#FD704E]"
  const dotBg = isWhite ? "bg-white" : "bg-[#FD704E]"

  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  }[size]

  return (
    <div className={`inline-flex items-center font-brand font-black tracking-tight select-none ${sizeClasses} ${textColor} ${className}`}>
      <span>Pet</span>
      <span className="relative inline-flex items-center justify-center">
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex gap-0.5">
          <span className={`w-1 h-1 rounded-full ${dotBg}`} />
          <span className={`w-1 h-1 rounded-full ${dotBg}`} />
        </span>
        <span>o</span>
      </span>
      <span>pia</span>
    </div>
  )
}

export default PetopiaLogo

