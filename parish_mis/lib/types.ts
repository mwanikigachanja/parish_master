export type UserRole = "parishioner" | "priest" | "catechist" | "leadership" | "admin"

export type EventType = {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: "mass" | "event"
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export type BulletinType = {
  id: string
  title: string
  content: string
  date: string
  isPublic: boolean
  isNew: boolean
  pdfUrl?: string
  createdAt: string
  updatedAt: string
}

export type UserType = {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export type SacramentType = {
  id: string
  type: "baptism" | "communion" | "confirmation" | "marriage" | "anointing"
  userId: string
  date: string
  location: string
  minister: string
  certificate: boolean
  createdAt: string
  updatedAt: string
}

export type DonationType = {
  id: string
  userId: string
  amount: number
  purpose: string
  date: string
  method: "cash" | "check" | "online"
  isAnonymous: boolean
  createdAt: string
  updatedAt: string
}

export type SCCType = {
  id: string
  name: string
  description: string
  leader: string
  meetingDay: string
  meetingTime: string
  meetingLocation: string
  createdAt: string
  updatedAt: string
}

export type ChurchGroupType = {
  id: string
  name: string
  type: "CMA" | "CWA" | "YACA" | "Youth" | "Choir" | "PMC" | "Other"
  description: string
  leader: string
  meetingSchedule: string
  createdAt: string
  updatedAt: string
}

export type CatechismClassType = {
  id: string
  name: string
  description: string
  catechistId: string
  dayOfWeek: string
  time: string
  location: string
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
}

export type ProjectType = {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  budget: number
  status: "planning" | "in-progress" | "completed" | "on-hold"
  createdAt: string
  updatedAt: string
}

