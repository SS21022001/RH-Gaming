interface PlayerRankProps {
  rank: number
  name: string
  game: string
  rating: number
  wins: number
  losses: number
  trend?: "up" | "down"
}

export function PlayerRank({ rank, name, game, rating, wins, losses, trend }: PlayerRankProps) {
  const getMedalIcon = (rank: number) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return rank
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:border-primary transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center font-bold text-lg">
          {getMedalIcon(rank)}
        </div>
        <div>
          <p className="font-semibold text-lg">{name}</p>
          <p className="text-sm text-muted-foreground">{game}</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-right">
          <p className="font-bold text-primary text-xl">{rating}</p>
          <p className="text-xs text-muted-foreground">Rating</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">
            {wins}W-{losses}L
          </p>
          <p className="text-xs text-muted-foreground">Record</p>
        </div>
        {trend && (
          <div className="text-right">
            <p className={`text-lg ${trend === "up" ? "text-primary" : "text-destructive"}`}>
              {trend === "up" ? "📈" : "📉"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
