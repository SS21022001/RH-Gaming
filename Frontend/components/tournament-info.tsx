import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TournamentInfoProps {
  title: string
  game: string
  status: "upcoming" | "active" | "completed"
  participants: number
  prizePool: number
  startDate: string
  description: string
}

export function TournamentInfo({
  title,
  game,
  status,
  participants,
  prizePool,
  startDate,
  description,
}: TournamentInfoProps) {
  const statusColors = {
    upcoming: "bg-blue-500/20 text-blue-400",
    active: "bg-primary/20 text-primary",
    completed: "bg-muted text-muted-foreground",
  }

  return (
    <div className="space-y-6">
      <div>
        <Badge className={statusColors[status]}>{status.toUpperCase()}</Badge>
        <h1 className="text-4xl font-bold mt-4 mb-2">{title}</h1>
        <p className="text-lg text-muted-foreground">{game}</p>
      </div>

      <p className="text-foreground leading-relaxed">{description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Participants</p>
          <p className="text-3xl font-bold">{participants}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Prize Pool</p>
          <p className="text-3xl font-bold text-primary">${prizePool.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Start Date</p>
          <p className="text-lg font-semibold">{startDate}</p>
        </div>
      </div>

      {status === "upcoming" && <Button className="bg-primary hover:bg-primary/90 px-8">Register Now</Button>}
      {status === "active" && <Button className="bg-primary hover:bg-primary/90 px-8">View Results</Button>}
      {status === "completed" && (
        <Button variant="outline" className="px-8 bg-transparent">
          View Final Results
        </Button>
      )}
    </div>
  )
}
