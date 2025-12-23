import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">⚔️</span>
            </div>
            <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
              Tournament Arena
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/tournaments" className="text-muted-foreground hover:text-foreground transition-colors">
              Tournaments
            </Link>
            <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Leaderboard
            </Link>
            <Link href="/brackets" className="text-muted-foreground hover:text-foreground transition-colors">
              Brackets
            </Link>
          </nav>

          <div className="flex items-center gap-3"></div>
        </div>
      </div>
    </header>
  )
}
