"use client"

import { BracketMatch } from "./bracket-match"
import { useEffect, useState } from "react"
import { getTournaments } from "../lib/api"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

interface BracketData {
  round: number
  matches: Array<{
    id: string
    player1: string
    player2: string
    winner?: string
  }>
}

const mockBracketData: BracketData[] = []

export function TournamentBracket() {
  const [expandedRound, setExpandedRound] = useState<number | null>(null)
  const [bracketData, setBracketData] = useState<BracketData[]>(mockBracketData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        // try to get first tournament and its matches
        const tournaments = await getTournaments()
        const first = tournaments && tournaments.length ? tournaments[0] : null
        if (!first) return
        const res = await fetch(`${API_BASE}/api/matches?tournament_id=${first._id}`)
        if (!res.ok) throw new Error('Failed to fetch matches')
        const matches = await res.json()

        // Map matches into a single round (backend doesn't store round info)
        const roundMatches = matches.map((m: any) => ({
          id: String(m._id || m.id),
          player1: String(m.playerA || m.player_a_id || ''),
          player2: String(m.playerB || m.player_b_id || ''),
          winner: m.scoreA > m.scoreB ? String(m.playerA || m.player_a_id) : (m.scoreB > m.scoreA ? String(m.playerB || m.player_b_id) : undefined),
        }))

        if (mounted) setBracketData([{ round: 1, matches: roundMatches }])
      } catch (e) {
        // keep mock data (empty) on error
        console.warn('Could not load bracket from API', e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Tournament Bracket</h2>
        <p className="text-muted-foreground mb-6">Single elimination format</p>
      </div>

      <div className="space-y-4">
        {loading && <div className="p-4">Loading bracket…</div>}
        {bracketData.map((round) => (
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
