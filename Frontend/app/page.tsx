import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LastTournamentWinner } from "@/components/last-tournament-winner"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-b from-card via-background to-background overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary rounded-full mix-blend-screen blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full mix-blend-screen blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center">
            <div className="text-center space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
                Welcome to
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Tournament Arena
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Compete in tournaments for Mortal Kombat, FIFA, and more. Track your skills, climb the leaderboard, and
                claim victory.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link href="/tournaments">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                    Browse Tournaments
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                    Admin Portal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Games */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">Featured Games</h2>
            <p className="text-muted-foreground mb-12">Compete in tournaments for these popular titles</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["Mortal Kombat", "FIFA"].map((game) => (
                <div key={game} className="group cursor-pointer">
                  <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
                    <div className="w-full h-40 bg-muted rounded-md mb-4 flex items-center justify-center text-4xl">
                      🎮
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{game}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Join tournaments and compete against top players
                    </p>
                    <Button variant="ghost" size="sm">
                      View Tournaments →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Last Tournament Winner */}
        <LastTournamentWinner />

        {/* Stats Section */}
        <section className="border-t border-border py-24 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">250+</div>
                <p className="text-muted-foreground">Active Tournaments</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">15K+</div>
                <p className="text-muted-foreground">Competitors</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">$500K</div>
                <p className="text-muted-foreground">Total Prize Pool</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">100+</div>
                <p className="text-muted-foreground">Countries</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
