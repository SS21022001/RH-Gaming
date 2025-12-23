"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface FilterProps {
  onStatusChange: (status: string) => void
  onGameChange: (game: string) => void
}

export function TournamentFilters({ onStatusChange, onGameChange }: FilterProps) {
  const [status, setStatus] = useState("all")
  const [game, setGame] = useState("all")

  const handleStatusChange = (value: string) => {
    setStatus(value)
    onStatusChange(value)
  }

  const handleGameChange = (value: string) => {
    setGame(value)
    onGameChange(value)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="upcoming">Upcoming</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={game} onValueChange={handleGameChange}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Filter by game" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Games</SelectItem>
          <SelectItem value="mortal-kombat">Mortal Kombat</SelectItem>
          <SelectItem value="fifa">FIFA</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={() => {
          setStatus("all")
          setGame("all")
          onStatusChange("all")
          onGameChange("all")
        }}
      >
        Reset
      </Button>
    </div>
  )
}
