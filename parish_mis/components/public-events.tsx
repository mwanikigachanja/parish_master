"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { fetchPublicEvents } from "@/lib/data"
import type { EventType } from "@/lib/types"

export function PublicEvents() {
  const [events, setEvents] = useState<EventType[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "mass" | "event">("all")

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchPublicEvents()
        setEvents(data)
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setLoading(false)
      }
    }

    getEvents()
  }, [])

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true
    return event.type === filter
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Upcoming Masses & Events</h3>
        <div className="flex gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            All
          </Button>
          <Button variant={filter === "mass" ? "default" : "outline"} size="sm" onClick={() => setFilter("mass")}>
            Masses
          </Button>
          <Button variant={filter === "event" ? "default" : "outline"} size="sm" onClick={() => setFilter("event")}>
            Events
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Skeleton className="h-16 w-16 rounded-md" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-md bg-primary/10 text-primary">
                    {event.type === "mass" ? <Calendar className="h-8 w-8" /> : <Users className="h-8 w-8" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{event.title}</h4>
                      <Badge variant={event.type === "mass" ? "default" : "secondary"}>
                        {event.type === "mass" ? "Mass" : "Event"}
                      </Badge>
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No events found for the selected filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

