"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/tournaments", label: "Tournaments", icon: "🏆" },
    { href: "/admin/matches", label: "Matches", icon: "⚔️" },
    { href: "/admin/players", label: "Players", icon: "👥" },
    { href: "/admin/results", label: "Results", icon: "📈" },
    { href: "/admin/settings", label: "Settings", icon: "⚙️" },
  ]

  return (
    <div className="w-64 border-r border-border bg-card min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold">
            ⚔️
          </div>
          <span className="font-bold text-lg">Arena Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 text-left",
                pathname === item.href ? "bg-primary hover:bg-primary/90" : "hover:bg-muted",
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full bg-transparent">
          Logout
        </Button>
      </div>
    </div>
  )
}
