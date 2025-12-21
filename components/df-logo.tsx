interface DFLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function DFLogo({ size = "md", className = "" }: DFLogoProps) {
  const sizes = {
    sm: "w-8 h-8 text-base",
    md: "w-10 h-10 text-xl",
    lg: "w-12 h-12 text-2xl",
  }

  return (
    <div
      className={`${sizes[size]} rounded-md bg-white flex items-center justify-center font-bold text-[#2563eb] ${className}`}
      aria-label="DataFixer Logo"
    >
      DF
    </div>
  )
}
