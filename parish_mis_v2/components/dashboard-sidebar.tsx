"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  Calendar,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  Church,
  Heart,
  BookOpen,
  Briefcase,
} from "lucide-react"

const routes = {
  admin: [
    { title: "Dashboard", href: "/dashboard/admin", icon: Home },
    { title: "Users", href: "/dashboard/admin/users", icon: Users },
    { title: "Events", href: "/dashboard/admin/events", icon: Calendar },
    { title: "Bulletins", href: "/dashboard/admin/bulletins", icon: FileText },
    { title: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ],
  priest: [
    { title: "Dashboard", href: "/dashboard/priest", icon: Home },
    { title: "Mass Schedule", href: "/dashboard/priest/masses", icon: Church },
    { title: "Sacraments", href: "/dashboard/priest/sacraments", icon: Heart },
    { title: "Parishioners", href: "/dashboard/priest/parishioners", icon: Users },
    { title: "Events", href: "/dashboard/priest/events", icon: Calendar },
  ],
  catechist: [
    { title: "Dashboard", href: "/dashboard/catechist", icon: Home },
    { title: "Classes", href: "/dashboard/catechist/classes", icon: BookOpen },
    { title: "Students", href: "/dashboard/catechist/students", icon: Users },
    { title: "Events", href: "/dashboard/catechist/events", icon: Calendar },
  ],
  leadership: [
    { title: "Dashboard", href: "/dashboard/leadership", icon: Home },
    { title: "Projects", href: "/dashboard/leadership/projects", icon: Briefcase },
    { title: "Finances", href: "/dashboard/leadership/finances", icon: FileText },
    { title: "Events", href: "/dashboard/leadership/events", icon: Calendar },
  ],
  parishioner: [
    { title: "Dashboard", href: "/dashboard/parishioner", icon: Home },
    { title: "My Profile", href: "/dashboard/parishioner/profile", icon: Users },
    { title: "Events", href: "/dashboard/parishioner/events", icon: Calendar },
    { title: "Donations", href: "/dashboard/parishioner/donations", icon: Heart },
  ],
}

export function DashboardSidebar({ userType }) {
  const pathname = usePathname()

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <MobileSidebar userType={userType} pathname={pathname} />
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col md:flex">
        <DesktopSidebar userType={userType} pathname={pathname} />
      </aside>
    </>
  )
}

function MobileSidebar({ userType, pathname }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Church className="h-6 w-6" />
          <span className="font-bold">Church MIS</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4 py-4">
          {routes[userType].map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.title}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/api/auth/signout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )
}

function DesktopSidebar({ userType, pathname }) {
  return (
    <div className="flex h-full flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Church className="h-6 w-6" />
          <span className="font-bold">Church MIS</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4 py-4">
          {routes[userType].map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.title}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/api/auth/signout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )
}

