"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TournamentCard } from "@/components/tournament-card"
import { TournamentFilters } from "@/components/tournament-filters"
import { Input } from "@/components/ui/input"

// Mock tournament data
const mockTournaments = [
  {
    id: "mk-spring-2025",
    title: "Spring Championship 2025",
    game: "Mortal Kombat",
    status: "active" as const,
    participants: 128,
    prizePool: 50000,
    startDate: "Jan 15, 2025",
  },
  {
    id: "fifa-pro-league",
    title: "FIFA Pro League",
    game: "FIFA",
    status: "active" as const,
    participants: 256,
    prizePool: 100000,
    startDate: "Jan 10, 2025",
  },
  {
    id: "mk-winter-finals",
    title: "Winter Finals",
    game: "Mortal Kombat",
    status: "completed" as const,
    participants: 96,
    prizePool: 45000,
    startDate: "Dec 15, 2024",
  },
  {
    id: "fifa-weekend",
    title: "Weekend Warriors Cup",
    game: "FIFA",
    status: "upcoming" as const,
    participants: 180,
    prizePool: 25000,
    startDate: "Jan 25, 2025",
  },
]

export default function TournamentsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [gameFilter, setGameFilter] = useState("all")

  const filtered = mockTournaments.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || t.status === statusFilter
    const matchesGame = gameFilter === "all" || t.game.toLowerCase().includes(gameFilter.toLowerCase())
    return matchesSearch && matchesStatus && matchesGame
  })

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="border-b border-border bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-bold mb-6">Browse Tournaments</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover and join competitive tournaments across your favorite games
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Search tournaments..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <TournamentFilters onStatusChange={setStatusFilter} onGameChange={setGameFilter} />
            </div>

            {/* Tournament Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((tournament) => (
                  <TournamentCard key={tournament.id} {...tournament} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No tournaments found matching your criteria</p>
              </div>
            )}

            <div className="text-sm text-muted-foreground pt-8 border-t border-border">
              Showing {filtered.length} of {mockTournaments.length} tournaments
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
