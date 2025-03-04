import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, ChevronRight, Church, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function ParishionerDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <DashboardSidebar userType="parishioner" />
        <main className="flex-1 p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Welcome, John Doe</h1>
              <p className="text-muted-foreground">Here's what's happening in your parish community</p>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="events">Upcoming Events</TabsTrigger>
                <TabsTrigger value="sacraments">My Sacraments</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Next Mass</CardTitle>
                      <Church className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Sunday, 10:00 AM</div>
                      <p className="text-xs text-muted-foreground">Main Church</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">SCC Meeting</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Saturday, 4:00 PM</div>
                      <p className="text-xs text-muted-foreground">St. Joseph SCC</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">This week</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Announcements</CardTitle>
                      <Bell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-muted-foreground">New this week</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Parish Bazaar</p>
                          <p className="text-sm text-muted-foreground">Saturday, 10:00 AM - 4:00 PM</p>
                        </div>
                        <div className="ml-auto">
                          <Button size="sm" variant="outline">
                            RSVP
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Youth Group Meeting</p>
                          <p className="text-sm text-muted-foreground">Friday, 6:00 PM</p>
                        </div>
                        <div className="ml-auto">
                          <Button size="sm" variant="outline">
                            RSVP
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                          <Church className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Adoration</p>
                          <p className="text-sm text-muted-foreground">Wednesday, 7:00 PM</p>
                        </div>
                        <div className="ml-auto">
                          <Button size="sm" variant="outline">
                            RSVP
                          </Button>
                        </div>
                      </div>

                      <Button variant="ghost" className="w-full" asChild>
                        <Link href="/dashboard/parishioner/calendar">
                          View all events
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Parish Bulletin</CardTitle>
                      <CardDescription>Latest announcements</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="font-medium">Special Collection</div>
                          <div className="ml-auto text-xs text-muted-foreground">2 days ago</div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This weekend we will have a special collection for the building fund.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="font-medium">Volunteer Opportunity</div>
                          <div className="ml-auto text-xs text-muted-foreground">3 days ago</div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          We need volunteers for the upcoming parish festival. Please sign up after Mass.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="font-medium">Mass Schedule Change</div>
                          <div className="ml-auto text-xs text-muted-foreground">5 days ago</div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Please note that the weekday Mass schedule will change starting next week.
                        </p>
                      </div>

                      <Button variant="ghost" className="w-full" asChild>
                        <Link href="/dashboard/parishioner/bulletin">
                          View all announcements
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Events you can attend in the coming weeks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-start gap-4 rounded-lg border p-4">
                        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-md bg-primary/10 text-primary">
                          <span className="text-xl font-bold">{10 + i}</span>
                          <span className="text-xs">June</span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-semibold">Parish Event {i}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>10:00 AM - 12:00 PM</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          </p>
                        </div>
                        <Button>RSVP</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sacraments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Sacraments</CardTitle>
                    <CardDescription>Your sacramental record</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg border p-4">
                          <h4 className="font-semibold">Baptism</h4>
                          <p className="text-sm text-muted-foreground">June 15, 1990</p>
                          <p className="text-sm text-muted-foreground">St. Mary's Church</p>
                          <div className="mt-2">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Completed
                            </span>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <h4 className="font-semibold">First Communion</h4>
                          <p className="text-sm text-muted-foreground">May 8, 1998</p>
                          <p className="text-sm text-muted-foreground">St. Mary's Church</p>
                          <div className="mt-2">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Completed
                            </span>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <h4 className="font-semibold">Confirmation</h4>
                          <p className="text-sm text-muted-foreground">April 12, 2002</p>
                          <p className="text-sm text-muted-foreground">St. Mary's Church</p>
                          <div className="mt-2">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Completed
                            </span>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <h4 className="font-semibold">Marriage</h4>
                          <p className="text-sm text-muted-foreground">Not yet received</p>
                          <div className="mt-2">
                            <Button size="sm" variant="outline" className="w-full">
                              Request
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h4 className="font-semibold mb-2">Request a Sacrament</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Need to request a sacrament or get a certificate? Click below.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            Request Certificate
                          </Button>
                          <Button variant="outline" size="sm">
                            Request Baptism
                          </Button>
                          <Button variant="outline" size="sm">
                            Request Marriage
                          </Button>
                          <Button variant="outline" size="sm">
                            Request Anointing
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

