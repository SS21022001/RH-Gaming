interface StatCardProps {
  label: string
  value: string | number
  change?: string
  icon: string
}

export function StatCard({ label, value, change, icon }: StatCardProps) {
  const isPositive = change?.startsWith("+")

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm mb-2">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && <p className={`text-xs mt-2 ${isPositive ? "text-primary" : "text-destructive"}`}>{change}</p>}
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  )
}
