"use client"

import { useState } from "react"
import { LayoutDashboard, ChevronUp, Zap, Github, Magnet } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Idea", href: "/dashboard", icon: LayoutDashboard },
  { name: "Code", href: "/nocode", icon: Github },
  { name: "Marketing", href: "/marketing", icon: Magnet },
]

export function Sidebar() {
  const [expanded, setExpanded] = useState(false)

  return (
    <aside
      className={cn(
        "fixed right-6 bottom-6 flex flex-col-reverse gap-2 z-50 transition-all duration-300",
        expanded ? "h-auto" : "h-auto",
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg hover:shadow-red-500/50 transition-all",
          expanded && "bg-red-600",
        )}
        title={expanded ? "Collapse" : "Expand"}
      >
        <ChevronUp className={cn("w-6 h-6 transition-transform", !expanded && "rotate-180")} />
      </button>

      {/* Navigation Items - Vertical Stack Going Up */}
      {expanded && (
        <nav className="flex flex-col-reverse gap-2 pb-2">
          {navigation.map((item, index) => {
            const isActive = typeof window !== "undefined" && 
              (window.location.pathname === item.href || 
              (item.href !== "/" && window.location.pathname.startsWith(item.href)))
            
            return (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg animate-in fade-in slide-in-from-bottom-2",
                  isActive
                    ? "bg-red-500 text-white" 
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200",
                )}
                title={item.name}
              >
                <item.icon className="w-6 h-6" />
              </a>
            )
          })}
        </nav>
      )}
    </aside>
  )
}