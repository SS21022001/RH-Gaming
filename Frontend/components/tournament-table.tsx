import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Tournament {
  id: string
  title: string
  game: string
  status: "upcoming" | "active" | "completed"
  participants: number
  prizePool: number
  startDate: string
}

interface TournamentTableProps {
  tournaments: Tournament[]
}

export function TournamentTable({ tournaments }: TournamentTableProps) {
  const statusColors = {
    upcoming: "bg-blue-500/20 text-blue-400",
    active: "bg-primary/20 text-primary",
    completed: "bg-muted text-muted-foreground",
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Tournament</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Game</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Players</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Prize Pool</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((tournament, idx) => (
              <tr
                key={tournament.id}
                className={`border-t border-border ${idx % 2 === 0 ? "bg-transparent" : "bg-card/50"}`}
              >
                <td className="px-6 py-4 font-semibold">{tournament.title}</td>
                <td className="px-6 py-4 text-muted-foreground">{tournament.game}</td>
                <td className="px-6 py-4">
                  <Badge className={statusColors[tournament.status]}>{tournament.status}</Badge>
                </td>
                <td className="px-6 py-4">{tournament.participants}</td>
                <td className="px-6 py-4 text-primary font-semibold">${tournament.prizePool.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
