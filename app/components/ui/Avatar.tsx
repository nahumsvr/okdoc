import React from "react"

interface AvatarProps {
  initials: string
}

export function Avatar({ initials }: AvatarProps) {
  return (
    <div className="w-8 h-8 rounded-full bg-[#002D58] flex items-center justify-center text-white text-xs font-bold">
      {initials}
    </div>
  )
}
