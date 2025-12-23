"use client"

import { BracketMatch } from "./bracket-match"
import { useState } from "react"

interface BracketData {
  round: number
  matches: Array<{
    id: string
    player1: string
    player2: string
    winner?: string
  }>
}

const mockBracketData: BracketData[] = [
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
]

export function TournamentBracket() {
  const [expandedRound, setExpandedRound] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Tournament Bracket</h2>
        <p className="text-muted-foreground mb-6">Single elimination format</p>
      </div>

      <div className="space-y-4">
        {mockBracketData.map((round) => (
          <div key={round.round} className="border border-border rounded-lg">
            <button
              onClick={() => setExpandedRound(expandedRound === round.round ? null : round.round)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-semibold">Round {round.round}</h3>
              <span className="text-muted-foreground">{round.matches.length} matches</span>
            </button>

            {expandedRound === round.round && (
              <div className="border-t border-border p-6 bg-card/50 space-y-4">
                {round.matches.map((match) => (
                  <BracketMatch
                    key={match.id}
                    player1={match.player1}
                    player2={match.player2}
                    winner={match.winner}
                    round={round.round}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
