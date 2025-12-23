"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data - replace with real data from API
const lastWinner = {
  id: "tournament-1",
  name: "Mortal Kombat Grand Championship",
  game: "Mortal Kombat",
  winner: "SonicFox",
  winnerRating: 2850,
  prizePool: "$10,000",
  date: "2025-12-20",
}

export function LastTournamentWinner() {
  return (
    <section className="border-t border-border py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-4">Latest Tournament Champion</h2>
        <p className="text-muted-foreground mb-12">Celebrate the most recent tournament winner</p>

        <Link href={`/tournaments/${lastWinner.id}`}>
          <Card className="cursor-pointer hover:border-primary transition-colors overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <Badge className="mb-4 bg-primary text-primary-foreground">Tournament Champion</Badge>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{lastWinner.name}</h3>
                  <p className="text-muted-foreground mb-6">
                    {lastWinner.game} Tournament • {lastWinner.date}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Champion</p>
                      <p className="text-2xl font-bold text-primary">{lastWinner.winner}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Rating</p>
                      <p className="text-2xl font-bold text-accent">{lastWinner.winnerRating}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Prize Pool</p>
                      <p className="text-2xl font-bold">{lastWinner.prizePool}</p>
                    </div>
                  </div>
                </div>

                <div className="text-7xl">🏆</div>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </section>
  )
}
