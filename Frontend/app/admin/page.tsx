import { AdminSidebar } from "@/components/admin-sidebar"
import { StatCard } from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Admin Dashboard - Tournament Arena",
}

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Admin Header */}
        <div className="border-b border-border bg-card sticky top-0 z-40">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, Admin</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            {/* Key Metrics */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Active Tournaments" value="12" change="+2 this week" icon="🏆" />
                <StatCard label="Total Players" value="15,432" change="+328 this month" icon="👥" />
                <StatCard label="Prize Pool" value="$500K" change="+$75K this month" icon="💰" />
                <StatCard label="Matches Completed" value="1,245" change="+143 this week" icon="⚔️" />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/admin/tournaments/create">
                  <Button className="w-full bg-primary hover:bg-primary/90 h-12">Create New Tournament</Button>
                </Link>
                <Link href="/admin/matches">
                  <Button variant="outline" className="w-full bg-transparent h-12">
                    Record Match Results
                  </Button>
                </Link>
                <Link href="/admin/players">
                  <Button variant="outline" className="w-full bg-transparent h-12">
                    Manage Players
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button variant="outline" className="w-full bg-transparent h-12">
                    System Settings
                  </Button>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: "Tournament Created", detail: "Spring Championship 2025", time: "2 hours ago" },
                  { action: "Match Result Recorded", detail: "SonicFox vs Tekken_Pro", time: "4 hours ago" },
                  { action: "Player Registered", detail: "New player: Phoenix", time: "1 day ago" },
                  { action: "Tournament Ended", detail: "Winter Finals completed", time: "2 days ago" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-t border-border pt-4 first:border-0 first:pt-0"
                  >
                    <div>
                      <p className="font-semibold">{item.action}</p>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
