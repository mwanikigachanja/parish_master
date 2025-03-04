import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

// Mock database implementation instead of Prisma
// This file replaces the Prisma client with mock data functions

// This is a simple in-memory store for development/preview purposes
const db = {
  users: [],
  events: [],
  bulletins: [],
  sacraments: [],
  donations: [],
  massApplications: [],
  // Add other collections as needed
}

export const mockDb = {
  // Mock implementation of database operations
  user: {
    findUnique: async ({ where }) => {
      return db.users.find((user) => user.email === where.email)
    },
    create: async ({ data }) => {
      const newUser = { id: `user-${Date.now()}`, ...data }
      db.users.push(newUser)
      return newUser
    },
  },
  event: {
    findMany: async ({ where, orderBy }) => {
      let results = [...db.events]

      // Apply filters
      if (where) {
        if (where.isPublic !== undefined) {
          results = results.filter((event) => event.isPublic === where.isPublic)
        }
        if (where.type) {
          results = results.filter((event) => event.type === where.type)
        }
      }

      // Apply sorting
      if (orderBy && orderBy.date) {
        results.sort((a, b) => {
          return orderBy.date === "asc"
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
        })
      }

      return results
    },
    create: async ({ data }) => {
      const newEvent = { id: `event-${Date.now()}`, ...data }
      db.events.push(newEvent)
      return newEvent
    },
  },
  bulletin: {
    findMany: async ({ where, orderBy }) => {
      let results = [...db.bulletins]

      // Apply filters
      if (where && where.isPublic !== undefined) {
        results = results.filter((bulletin) => bulletin.isPublic === where.isPublic)
      }

      // Apply sorting
      if (orderBy && orderBy.date) {
        results.sort((a, b) => {
          return orderBy.date === "desc"
            ? new Date(b.date).getTime() - new Date(a.date).getTime()
            : new Date(a.date).getTime() - new Date(b.date).getTime()
        })
      }

      return results
    },
    create: async ({ data }) => {
      const newBulletin = { id: `bulletin-${Date.now()}`, ...data }
      db.bulletins.push(newBulletin)
      return newBulletin
    },
  },
  // Add other models as needed
}

// Initialize with some sample data
import { mockEvents, mockBulletins } from "./data"
db.events = mockEvents
db.bulletins = mockBulletins

// Export a mock prisma object that mimics the Prisma client
// export const prisma = mockDb
export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") global.prisma = prisma

