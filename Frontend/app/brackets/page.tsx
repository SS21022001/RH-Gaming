"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TournamentBracket } from "@/components/tournament-bracket"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// Mock tournament data with brackets
const tournaments = [
  {
    id: "1",
    name: "Mortal Kombat Grand Championship",
    game: "Mortal Kombat",
    status: "ongoing",
    participants: 16,
  },
  {
    id: "2",
    name: "FIFA Pro League",
    game: "FIFA",
    status: "completed",
    participants: 32,
  },
  {
    id: "3",
    name: "Mortal Kombat Regional Qualifier",
    game: "Mortal Kombat",
    status: "ongoing",
    participants: 8,
  },
]

export default function BracketsPage() {
  const [selectedTournament, setSelectedTournament] = useState(tournaments[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTournaments = tournaments.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.game.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Tournament Brackets</h1>
            <p className="text-muted-foreground">View live brackets and match results for all tournaments</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Tournament List Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Search tournaments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-card"
                  />
                </div>

                <div className="space-y-2">
                  {filteredTournaments.map((tournament) => (
                    <button
                      key={tournament.id}
                      onClick={() => setSelectedTournament(tournament)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        selectedTournament.id === tournament.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <p className="font-semibold text-sm mb-1">{tournament.name}</p>
                      <p className="text-xs text-muted-foreground">{tournament.game}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{tournament.participants} players</span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            tournament.status === "ongoing"
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {tournament.status === "ongoing" ? "Live" : "Completed"}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bracket Display */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">{selectedTournament.name}</h2>
                  <p className="text-muted-foreground">
                    {selectedTournament.game} • {selectedTournament.participants} Participants
                  </p>
                </div>

                <TournamentBracket />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
