"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { TournamentTable } from "@/components/tournament-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const mockTournaments = [
  {
    id: "1",
    title: "Spring Championship 2025",
    game: "Mortal Kombat",
    status: "active" as const,
    participants: 128,
    prizePool: 50000,
    startDate: "Jan 15, 2025",
  },
  {
    id: "2",
    title: "FIFA Pro League",
    game: "FIFA",
    status: "active" as const,
    participants: 256,
    prizePool: 100000,
    startDate: "Jan 10, 2025",
  },
  {
    id: "3",
    title: "Winter Finals",
    game: "Mortal Kombat",
    status: "completed" as const,
    participants: 96,
    prizePool: 45000,
    startDate: "Dec 15, 2024",
  },
]

export default function AdminTournamentsPage() {
  const [search, setSearch] = useState("")

  const filtered = mockTournaments.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card sticky top-0 z-40">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold">Tournaments</h1>
            <p className="text-muted-foreground mt-1">Manage all tournaments</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <Input
                placeholder="Search tournaments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs"
              />
              <Link href="/admin/tournaments/create">
                <Button className="bg-primary hover:bg-primary/90">+ Create Tournament</Button>
              </Link>
            </div>

            {/* Table */}
            <TournamentTable tournaments={filtered} />
          </div>
        </div>
      </div>
    </div>
  )
}
