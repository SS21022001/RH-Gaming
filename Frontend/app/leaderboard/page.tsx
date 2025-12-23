"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlayerRank } from "@/components/player-rank"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockLeaderboardData = {
  "mortal-kombat": [
    { rank: 1, name: "SonicFox", game: "Mortal Kombat", rating: 2850, wins: 143, losses: 12, trend: "up" as const },
    { rank: 2, name: "Tekken_Pro", game: "Mortal Kombat", rating: 2720, wins: 128, losses: 18, trend: "up" as const },
    { rank: 3, name: "Dragon", game: "Mortal Kombat", rating: 2650, wins: 115, losses: 25, trend: "down" as const },
    { rank: 4, name: "Phoenix", game: "Mortal Kombat", rating: 2580, wins: 98, losses: 32, trend: "up" as const },
    { rank: 5, name: "Shadow", game: "Mortal Kombat", rating: 2520, wins: 87, losses: 41 },
  ],
  fifa: [
    { rank: 1, name: "GoalKing", game: "FIFA", rating: 2900, wins: 156, losses: 8, trend: "up" as const },
    { rank: 2, name: "SkillMaster", game: "FIFA", rating: 2750, wins: 132, losses: 15, trend: "up" as const },
    { rank: 3, name: "Striker99", game: "FIFA", rating: 2680, wins: 118, losses: 22, trend: "down" as const },
    { rank: 4, name: "FootballPro", game: "FIFA", rating: 2610, wins: 105, losses: 30, trend: "up" as const },
    { rank: 5, name: "NetFinder", game: "FIFA", rating: 2550, wins: 92, losses: 39 },
  ],
}

export default function LeaderboardPage() {
  const [activeGame, setActiveGame] = useState("mortal-kombat")

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Header Section */}
        <section className="border-b border-border bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-bold mb-6">Global Leaderboards</h1>
            <p className="text-muted-foreground text-lg">Compete to claim the top spot in your favorite games</p>
          </div>
        </section>

        {/* Leaderboards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs value={activeGame} onValueChange={setActiveGame}>
            <TabsList className="bg-card border border-border mb-8 w-full justify-start">
              <TabsTrigger value="mortal-kombat">Mortal Kombat</TabsTrigger>
              <TabsTrigger value="fifa">FIFA</TabsTrigger>
            </TabsList>

            {Object.entries(mockLeaderboardData).map(([gameKey, players]) => (
              <TabsContent key={gameKey} value={gameKey} className="space-y-4">
                <div className="space-y-3">
                  {players.map((player) => (
                    <PlayerRank key={player.rank} {...player} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Leaderboard Info */}
          <div className="mt-12 border-t border-border pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">How it Works</h3>
                <p className="text-sm text-muted-foreground">
                  Win tournaments and matches to earn rating points. Rankings update in real-time based on recent
                  performance.
                </p>
              </div>
              <div className="bg-card border border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Rating System</h3>
                <p className="text-sm text-muted-foreground">
                  Players are ranked by ELO rating. Higher ratings indicate stronger competitors. Minimum 10 matches to
                  rank.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Monthly Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Top 100 players receive monthly bonuses and exclusive badges. Compete every month for fresh rewards.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
