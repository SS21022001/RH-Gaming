"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TournamentCard } from "@/components/tournament-card"
import { TournamentFilters } from "@/components/tournament-filters"
import { Input } from "@/components/ui/input"
import { getTournaments } from '@/lib/api'

// Client state will hold tournaments fetched from backend

export default function TournamentsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [gameFilter, setGameFilter] = useState("all")
  const [tournaments, setTournaments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getTournaments()
      .then((data) => {
        if (mounted) setTournaments(data)
      })
      .catch((err) => {
        console.error(err)
        if (mounted) setError(String(err))
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const filtered = tournaments.filter((t) => {
    const title = (t.title || t.name || '').toString().toLowerCase()
    const game = (t.game || t.gameName || '').toString().toLowerCase()
    const matchesSearch = title.includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || (t.status === statusFilter)
    const matchesGame = gameFilter === "all" || game.includes(gameFilter.toLowerCase())
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
            {loading ? (
              <div className="text-center py-16">Loading tournaments...</div>
            ) : error ? (
              <div className="text-center py-16 text-red-500">Error loading tournaments: {error}</div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((tournament) => (
                  <TournamentCard key={tournament._id || tournament.id} {...tournament} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No tournaments found matching your criteria</p>
              </div>
            )}

            <div className="text-sm text-muted-foreground pt-8 border-t border-border">
              Showing {filtered.length} of {tournaments.length} tournaments
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
