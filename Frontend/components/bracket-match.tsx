interface BracketMatchProps {
  player1: string
  player2: string
  winner?: string
  round: number
}

export function BracketMatch({ player1, player2, winner }: BracketMatchProps) {
  return (
    <div className="border border-border rounded bg-card p-3 min-w-64 text-sm">
      <div className={`p-2 border-b border-border ${winner === player1 ? "bg-primary/10 text-primary" : ""}`}>
        <p className="font-semibold">{player1}</p>
      </div>
      <div className={`p-2 ${winner === player2 ? "bg-primary/10 text-primary" : ""}`}>
        <p className="font-semibold">{player2}</p>
      </div>
    </div>
  )
}
