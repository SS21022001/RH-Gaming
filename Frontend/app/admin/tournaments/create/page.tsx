"use client"

import type React from "react"

import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function CreateTournamentPage() {
  const [formData, setFormData] = useState({
    title: "",
    game: "",
    status: "upcoming",
    maxPlayers: "",
    prizePool: "",
    startDate: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Tournament created:", formData)
    // Handle form submission
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card sticky top-0 z-40">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold">Create Tournament</h1>
            <p className="text-muted-foreground mt-1">Set up a new tournament</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold">Tournament Title</label>
                <Input
                  name="title"
                  placeholder="e.g., Spring Championship 2025"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Game</label>
                  <Select value={formData.game} onValueChange={(v) => handleSelectChange("game", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select game" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mortal-kombat">Mortal Kombat</SelectItem>
                      <SelectItem value="fifa">FIFA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Status</label>
                  <Select value={formData.status} onValueChange={(v) => handleSelectChange("status", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Max Players</label>
                  <Input
                    name="maxPlayers"
                    type="number"
                    placeholder="128"
                    value={formData.maxPlayers}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Prize Pool ($)</label>
                  <Input
                    name="prizePool"
                    type="number"
                    placeholder="50000"
                    value={formData.prizePool}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold">Start Date</label>
                <Input name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold">Description</label>
                <textarea
                  name="description"
                  placeholder="Describe the tournament..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-border bg-background text-foreground rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
                />
              </div>

              <div className="flex gap-3 pt-6">
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Create Tournament
                </Button>
                <Button variant="outline" className="bg-transparent" type="button">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
