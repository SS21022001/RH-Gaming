import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface TournamentCardProps {
  id: string
  title: string
  game: string
  status: "upcoming" | "active" | "completed"
  participants: number
  prizePool: number
  startDate: string
  image?: string
}

export function TournamentCard({ id, title, game, status, participants, prizePool, startDate }: TournamentCardProps) {
  const statusColors = {
    upcoming: "bg-blue-500/20 text-blue-400",
    active: "bg-primary/20 text-primary",
    completed: "bg-muted text-muted-foreground",
  }

  return (
    <Link href={`/tournaments/${id}`}>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors group cursor-pointer">
        <div className="aspect-video bg-muted flex items-center justify-center text-5xl group-hover:bg-muted/80 transition-colors">
          🎮
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Badge className={statusColors[status]}>{status.toUpperCase()}</Badge>
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground">{game}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Players</p>
              <p className="font-semibold text-lg">{participants}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Prize Pool</p>
              <p className="font-semibold text-lg text-primary">${prizePool.toLocaleString()}</p>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground mb-3">Starts {startDate}</p>
            <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
