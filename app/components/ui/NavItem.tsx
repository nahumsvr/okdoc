import Link from "next/link"
import React from "react"

interface NavItemProps {
  label: string
  href: string
  icon: React.ReactNode
  isActive: boolean
}

export function NavItem({ label, href, icon, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
        isActive
          ? "bg-blue-50 text-[#002D58] font-semibold"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span className={isActive ? "opacity-100" : "opacity-60"}>{icon}</span>
      {label}
    </Link>
  )
}
