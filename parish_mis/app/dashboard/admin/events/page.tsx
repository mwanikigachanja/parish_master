"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

export default function AdminEventsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "event",
    isPublic: true,
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session?.user.role !== "admin") {
      router.push("/dashboard")
    } else {
      fetchEvents()
    }
  }, [session, status, router])

  const fetchEvents = async () => {
    const res = await fetch("/api/events")
    const data = await res.json()
    if (res.ok) {
      setEvents(data)
    } else {
      toast({ title: "Error", description: "Failed to fetch events", variant: "destructive" })
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    })
    const data = await res.json()
    if (res.ok) {
      toast({ title: "Success", description: "Event created successfully" })
      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        type: "event",
        isPublic: true,
      })
      fetchEvents()
    } else {
      toast({ title: "Error", description: data.error || "Failed to create event", variant: "destructive" })
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar userType="admin" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Event Management</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="mass">Mass</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="isPublic">Public</Label>
                <Select
                  value={newEvent.isPublic.toString()}
                  onValueChange={(value) => setNewEvent({ ...newEvent, isPublic: value === "true" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Is this event public?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Create Event</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Public</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell>{event.time}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.type}</TableCell>
                    <TableCell>{event.isPublic ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

