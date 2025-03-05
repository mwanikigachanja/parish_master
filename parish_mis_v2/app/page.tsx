import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronRight, Church, Users, Calendar, BookOpen, Heart, ArrowRight } from "lucide-react"
import { PublicEvents } from "@/components/public-events"
import { PublicBulletin } from "@/components/public-bulletin"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Church className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Catholic Church MIS</h1>
            </div>
            <div>
              <Button asChild variant="outline" className="mr-2">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome to Our Parish</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join our vibrant community of faith, hope, and love
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/login">
                  Member Login <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#public-info">
                  View Mass Schedule <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section id="public-info" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Parish Information</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stay updated with our latest events, masses, and announcements
              </p>
            </div>

            <Tabs defaultValue="events" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="events">Mass Schedule & Events</TabsTrigger>
                <TabsTrigger value="bulletin">Parish Bulletin</TabsTrigger>
              </TabsList>
              <TabsContent value="events" className="mt-6">
                <PublicEvents />
              </TabsContent>
              <TabsContent value="bulletin" className="mt-6">
                <PublicBulletin />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Community</CardTitle>
                  <CardDescription>Join our vibrant parish community</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Connect with fellow parishioners through Small Christian Communities and church groups.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/community">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Calendar className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Sacraments</CardTitle>
                  <CardDescription>Celebrate life's important moments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    From baptism to marriage, we're here to support you through life's sacred journeys.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/sacraments">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Faith Formation</CardTitle>
                  <CardDescription>Grow in your spiritual journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Discover our catechism classes, Bible studies, and spiritual development programs.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/faith-formation">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heart className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Outreach</CardTitle>
                  <CardDescription>Serving our community with love</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Participate in our charitable initiatives and make a difference in our community.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/outreach">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Parish Community</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Register to access member features, track your sacraments, join groups, and more.
            </p>
            <Button asChild size="lg">
              <Link href="/register">
                Register Now <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Church className="h-6 w-6" />
                <span className="font-semibold">St. Mary's Catholic Church</span>
              </div>
              <p className="text-sm text-muted-foreground">
                123 Main Street
                <br />
                Anytown, ST 12345
                <br />
                (555) 123-4567
                <br />
                info@stmarys.example.com
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Mass Times</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sunday: 8:00 AM, 10:00 AM, 12:00 PM</li>
                <li>Saturday: 5:00 PM (Vigil)</li>
                <li>Weekdays: 8:30 AM</li>
                <li>Holy Days: 8:30 AM, 7:00 PM</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/staff" className="text-muted-foreground hover:text-primary">
                    Parish Staff
                  </Link>
                </li>
                <li>
                  <Link href="/ministries" className="text-muted-foreground hover:text-primary">
                    Ministries
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-youtube"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                  <span className="sr-only">YouTube</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} St. Mary's Catholic Church. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

