import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const mockTournamentBrackets = [
  {
    id: 1,
    title: "Spring Championship 2025",
    game: "Mortal Kombat",
    status: "active",
    rounds: [
      {
        round: 1,
        matches: [
          { id: "1-1", player1: "SonicFox", player2: "Dragon", winner: "SonicFox" },
          { id: "1-2", player1: "Tekken_Pro", player2: "GhostRider", winner: "Tekken_Pro" },
          { id: "1-3", player1: "Flash", player2: "Thunder", winner: "Flash" },
          { id: "1-4", player1: "Phoenix", player2: "Shadow", winner: "Phoenix" },
        ],
      },
      {
        round: 2,
        matches: [
          { id: "2-1", player1: "SonicFox", player2: "Tekken_Pro", winner: "SonicFox" },
          { id: "2-2", player1: "Flash", player2: "Phoenix", winner: "Flash" },
        ],
      },
      {
        round: 3,
        matches: [{ id: "3-1", player1: "SonicFox", player2: "Flash" }],
      },
    ],
  },
  {
    id: 2,
    title: "FIFA Pro League",
    game: "FIFA",
    status: "completed",
    rounds: [
      {
        round: 1,
        matches: [
          { id: "1-1", player1: "GoalKing", player2: "SkillMaster", winner: "GoalKing" },
          { id: "1-2", player1: "FootballPro", player2: "Striker99", winner: "Striker99" },
          { id: "1-3", player1: "NetBuster", player2: "Crosser", winner: "NetBuster" },
          { id: "1-4", player1: "ProShot", player2: "Finesse", winner: "ProShot" },
        ],
      },
      {
        round: 2,
        matches: [
          { id: "2-1", player1: "GoalKing", player2: "Striker99", winner: "GoalKing" },
          { id: "2-2", player1: "NetBuster", player2: "ProShot", winner: "ProShot" },
        ],
      },
      {
        round: 3,
        matches: [{ id: "3-1", player1: "GoalKing", player2: "ProShot", winner: "GoalKing" }],
      },
    ],
  },
]

export default function BracketsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="border-b border-border bg-card/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-bold mb-6">Tournament Brackets</h1>
            <p className="text-muted-foreground text-lg">View live tournament bracket progression and match results</p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {mockTournamentBrackets.map((tournament) => (
            <div key={tournament.id} className="border border-border rounded-lg overflow-hidden">
              <div className="bg-card/50 border-b border-border px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{tournament.title}</h2>
                    <Badge variant={tournament.status === "active" ? "default" : "outline"}>
                      {tournament.status === "active" ? "Active" : "Completed"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{tournament.game}</p>
                </div>
                <Link
                  href={`/tournaments/${tournament.id}`}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  View Details
                </Link>
              </div>

              <div className="p-6 space-y-4">
                {tournament.rounds.map((round) => (
                  <div key={round.round} className="border border-border rounded-lg">
                    <div className="px-4 py-3 bg-muted/30 border-b border-border">
                      <h3 className="font-semibold">Round {round.round}</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      {round.matches.map((match) => (
                        <div
                          key={match.id}
                          className="bg-card border border-border rounded p-4 flex items-center justify-between"
                        >
                          <div className="flex-1 flex items-center justify-between gap-4">
                            <div>
                              <p
                                className={`font-semibold ${
                                  match.winner === match.player1 ? "text-primary" : "text-muted-foreground"
                                }`}
                              >
                                {match.player1}
                              </p>
                            </div>
                            <p className="text-muted-foreground text-sm">vs</p>
                            <div>
                              <p
                                className={`font-semibold ${
                                  match.winner === match.player2 ? "text-primary" : "text-muted-foreground"
                                }`}
                              >
                                {match.player2}
                              </p>
                            </div>
                          </div>
                          {match.winner && (
                            <Badge className="ml-4 bg-primary/20 text-primary border-primary">{match.winner}</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}
