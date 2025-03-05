import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, ChevronRight, Clock, FileText, GraduationCap, Users } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function CatechistDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <DashboardSidebar userType="catechist" />
        <main className="flex-1 p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Welcome, Sarah</h1>
              <p className="text-muted-foreground">Here's an overview of your catechism classes and activities</p>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="classes">My Classes</TabsTrigger>
                <TabsTrigger value="applications">Mass Applications</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4</div>
                      <p className="text-xs text-muted-foreground">First Communion, Confirmation</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">48</div>
                      <p className="text-xs text-muted-foreground">Across all classes</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">This week</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Mass Applications</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-muted-foreground">Pending review</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Upcoming Classes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">First Communion - Year 1</p>
                          <p className="text-sm text-muted-foreground">Saturday, 9:00 AM - Classroom 2</p>
                        </div>
                        <div className="ml-auto">
                          <Button size="sm" variant="outline">
                            View Class
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Confirmation - Year 2</p>
                          <p className="text-sm text-muted-foreground">Sunday, 11:30 AM - Parish Hall</p>
                        </div>
                        <div className="ml-auto">
                          <Button size="sm" variant="outline">
                            View Class
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">RCIA</p>
                          <p className="text-sm text-muted-foreground">Wednesday, 7:00 PM - Conference Room</p>
                        </div>
                        <div className="ml-auto">
                          <Button size="sm" variant="outline">
                            View Class
                          </Button>
                        </div>
                      </div>

                      <Button variant="ghost" className="w-full" asChild>
                        <Link href="/dashboard/catechist/classes">
                          View all classes
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Class Progress</CardTitle>
                      <CardDescription>Current curriculum completion</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">First Communion - Year 1</div>
                          <div className="text-xs text-muted-foreground">65%</div>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Confirmation - Year 2</div>
                          <div className="text-xs text-muted-foreground">80%</div>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">RCIA</div>
                          <div className="text-xs text-muted-foreground">45%</div>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">First Communion - Year 2</div>
                          <div className="text-xs text-muted-foreground">90%</div>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>

                      <Button variant="ghost" className="w-full" asChild>
                        <Link href="/dashboard/catechist/curriculum">
                          View curriculum details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="classes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Classes</CardTitle>
                    <CardDescription>Classes you are currently teaching</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      {
                        name: "First Communion - Year 1",
                        students: 15,
                        day: "Saturday",
                        time: "9:00 AM",
                        location: "Classroom 2",
                      },
                      {
                        name: "First Communion - Year 2",
                        students: 12,
                        day: "Saturday",
                        time: "10:30 AM",
                        location: "Classroom 3",
                      },
                      {
                        name: "Confirmation - Year 2",
                        students: 18,
                        day: "Sunday",
                        time: "11:30 AM",
                        location: "Parish Hall",
                      },
                      { name: "RCIA", students: 8, day: "Wednesday", time: "7:00 PM", location: "Conference Room" },
                    ].map((cls, i) => (
                      <div key={i} className="flex items-start gap-4 rounded-lg border p-4">
                        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-md bg-primary/10 text-primary">
                          <GraduationCap className="h-8 w-8" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-semibold">{cls.name}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="mr-1 h-4 w-4" />
                            <span>{cls.students} students</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>
                              {cls.day}, {cls.time} - {cls.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">Manage</Button>
                          <Button size="sm" variant="outline">
                            Attendance
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button className="w-full">Create New Class</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mass Applications</CardTitle>
                    <CardDescription>Applications awaiting your review</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">St. Joseph SCC Mass Request</h4>
                          <span className="text-xs text-muted-foreground">2 days ago</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          St. Joseph SCC requesting a special Mass for their 10th anniversary.
                        </p>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Requested Date:</span> July 10, 2023
                          </div>
                          <div>
                            <span className="font-medium">Contact:</span> Mary Smith
                          </div>
                          <div>
                            <span className="font-medium">Phone:</span> (555) 456-7890
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> mary@example.com
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm">Approve</Button>
                          <Button size="sm" variant="outline">
                            Deny
                          </Button>
                          <Button size="sm" variant="outline">
                            Request More Info
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">Youth Group Mass Request</h4>
                          <span className="text-xs text-muted-foreground">3 days ago</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Youth Group requesting a special Mass for their retreat.
                        </p>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Requested Date:</span> June 25, 2023
                          </div>
                          <div>
                            <span className="font-medium">Contact:</span> James Wilson
                          </div>
                          <div>
                            <span className="font-medium">Phone:</span> (555) 789-0123
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> james@example.com
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm">Approve</Button>
                          <Button size="sm" variant="outline">
                            Deny
                          </Button>
                          <Button size="sm" variant="outline">
                            Request More Info
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">First Communion Class Mass</h4>
                          <span className="text-xs text-muted-foreground">5 days ago</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Request for a special Mass for First Communion students before their sacrament.
                        </p>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Requested Date:</span> July 5, 2023
                          </div>
                          <div>
                            <span className="font-medium">Contact:</span> Robert Johnson
                          </div>
                          <div>
                            <span className="font-medium">Phone:</span> (555) 234-5678
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> robert@example.com
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm">Approve</Button>
                          <Button size="sm" variant="outline">
                            Deny
                          </Button>
                          <Button size="sm" variant="outline">
                            Request More Info
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

