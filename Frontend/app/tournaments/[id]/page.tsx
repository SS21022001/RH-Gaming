import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TournamentInfo } from "@/components/tournament-info"
import { TournamentBracket } from "@/components/tournament-bracket"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TournamentDetailPage({ params }: PageProps) {
  const { id } = await params

  // Mock data for tournament details
  const tournamentData = {
    id: id,
    title: "Spring Championship 2025",
    game: "Mortal Kombat",
    status: "active" as const,
    participants: 128,
    prizePool: 50000,
    startDate: "Jan 15, 2025",
    description:
      "Join the biggest Mortal Kombat tournament of the season! Compete against the world's best players for glory and prizes. This is the premier event where legends are made and champions are crowned. Features best-of-3 matches in single elimination format.",
    organizer: "Tournament Arena",
    format: "Single Elimination",
    prizeBreakdown: [
      { place: "1st Place", amount: 25000 },
      { place: "2nd Place", amount: 15000 },
      { place: "3rd Place", amount: 7500 },
      { place: "4th Place", amount: 2500 },
    ],
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="border-b border-border bg-card/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <TournamentInfo {...tournamentData} />
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs defaultValue="bracket" className="space-y-6">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="bracket">Bracket</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
              <TabsTrigger value="prizes">Prizes</TabsTrigger>
            </TabsList>

            <TabsContent value="bracket" className="space-y-6">
              <TournamentBracket />
            </TabsContent>

            <TabsContent value="participants" className="space-y-6">
              <h2 className="text-2xl font-bold">Registered Players</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">{i + 1}</div>
                      <div>
                        <p className="font-semibold">Player {i + 1}</p>
                        <p className="text-xs text-muted-foreground">Rank #{i * 10 + 1}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">5W-2L</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="prizes" className="space-y-6">
              <h2 className="text-2xl font-bold">Prize Distribution</h2>
              <div className="space-y-3">
                {tournamentData.prizeBreakdown.map((prize, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-card border border-border rounded-lg p-4"
                  >
                    <p className="font-semibold">{prize.place}</p>
                    <p className="text-primary font-bold text-lg">${prize.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </>
  )
}
