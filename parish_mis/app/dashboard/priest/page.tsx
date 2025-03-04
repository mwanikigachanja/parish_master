"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

export default function PriestDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [events, setEvents] = useState([])
  const [massApplications, setMassApplications] = useState([])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session?.user.role !== "priest") {
      router.push("/dashboard")
    } else {
      fetchEvents()
      fetchMassApplications()
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

  const fetchMassApplications = async () => {
    const res = await fetch("/api/mass-applications?status=pending")
    const data = await res.json()
    if (res.ok) {
      setMassApplications(data)
    } else {
      toast({ title: "Error", description: "Failed to fetch mass applications", variant: "destructive" })
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar userType="priest" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Priest Dashboard</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell>{event.time}</TableCell>
                    <TableCell>{event.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Mass Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Requested Date</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {massApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>{application.title}</TableCell>
                    <TableCell>{new Date(application.requestedDate).toLocaleDateString()}</TableCell>
                    <TableCell>{application.applicant.name}</TableCell>
                    <TableCell>
                      <Button size="sm" className="mr-2">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Deny
                      </Button>
                    </TableCell>
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

