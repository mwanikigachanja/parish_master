import type { EventType, BulletinType, UserType, SacramentType } from "./types"

// Mock data for development - in production, these would fetch from the database
const mockEvents: EventType[] = [
  {
    id: "1",
    title: "Sunday Mass",
    description: "Regular Sunday Mass",
    date: "2023-06-11",
    time: "8:00 AM",
    location: "Main Church",
    type: "mass",
    isPublic: true,
    createdAt: "2023-06-01T10:00:00Z",
    updatedAt: "2023-06-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Weekday Mass",
    description: "Daily Mass",
    date: "2023-06-12",
    time: "6:30 AM",
    location: "Chapel",
    type: "mass",
    isPublic: true,
    createdAt: "2023-06-01T10:00:00Z",
    updatedAt: "2023-06-01T10:00:00Z",
  },
  {
    id: "3",
    title: "Parish Bazaar",
    description: "Annual fundraising event with games, food, and entertainment for the whole family",
    date: "2023-06-17",
    time: "10:00 AM - 4:00 PM",
    location: "Parish Grounds",
    type: "event",
    isPublic: true,
    createdAt: "2023-06-01T10:00:00Z",
    updatedAt: "2023-06-01T10:00:00Z",
  },
  {
    id: "4",
    title: "Youth Group Meeting",
    description: "Weekly gathering for high school students",
    date: "2023-06-16",
    time: "6:00 PM",
    location: "Parish Hall",
    type: "event",
    isPublic: true,
    createdAt: "2023-06-01T10:00:00Z",
    updatedAt: "2023-06-01T10:00:00Z",
  },
  {
    id: "5",
    title: "Adoration",
    description: "Eucharistic Adoration",
    date: "2023-06-14",
    time: "7:00 PM",
    location: "Chapel",
    type: "event",
    isPublic: true,
    createdAt: "2023-06-01T10:00:00Z",
    updatedAt: "2023-06-01T10:00:00Z",
  },
]

const mockBulletins: BulletinType[] = [
  {
    id: "1",
    title: "Weekly Bulletin - June 11, 2023",
    content: `
      <h2>Pastor's Message</h2>
      <p>Dear Parishioners,</p>
      <p>As we enter Ordinary Time, let us remember that there is nothing "ordinary" about our faith journey. Each day presents new opportunities to grow closer to Christ.</p>
      <p>This week, I encourage everyone to participate in our parish bazaar. It's a wonderful opportunity to build community and support our parish projects.</p>
      <p>God bless you all,</p>
      <p>Fr. Michael</p>
      
      <h2>Announcements</h2>
      <ul>
        <li>The Parish Bazaar is scheduled for Saturday, June 17th. Volunteers are still needed!</li>
        <li>Registration for Vacation Bible School is now open. Please register your children by June 30th.</li>
        <li>The Knights of Columbus will be hosting a pancake breakfast after all Sunday Masses next weekend.</li>
      </ul>
      
      <h2>Weekly Schedule</h2>
      <p>Monday - Friday: Daily Mass at 6:30 AM</p>
      <p>Wednesday: Adoration at 7:00 PM</p>
      <p>Saturday: Confessions 3:30-4:30 PM, Vigil Mass 5:00 PM</p>
      <p>Sunday: Masses at 8:00 AM, 10:00 AM, 12:00 PM</p>
    `,
    date: "2023-06-11",
    isPublic: true,
    isNew: true,
    pdfUrl: "/bulletins/june-11-2023.pdf",
    createdAt: "2023-06-09T10:00:00Z",
    updatedAt: "2023-06-09T10:00:00Z",
  },
  {
    id: "2",
    title: "Weekly Bulletin - June 4, 2023",
    content: `
      <h2>Pastor's Message</h2>
      <p>Dear Parishioners,</p>
      <p>Today we celebrate Pentecost Sunday, the birthday of the Church. Let us pray for a renewed outpouring of the Holy Spirit in our lives and in our parish.</p>
      <p>God bless you all,</p>
      <p>Fr. Michael</p>
      
      <h2>Announcements</h2>
      <ul>
        <li>The Parish Council will meet this Tuesday at 7:00 PM.</li>
        <li>The St. Vincent de Paul Society is collecting non-perishable food items for the local food bank.</li>
        <li>Please keep our Confirmation candidates in your prayers as they prepare to receive the sacrament next month.</li>
      </ul>
      
      <h2>Weekly Schedule</h2>
      <p>Monday - Friday: Daily Mass at 6:30 AM</p>
      <p>Wednesday: Adoration at 7:00 PM</p>
      <p>Saturday: Confessions 3:30-4:30 PM, Vigil Mass 5:00 PM</p>
      <p>Sunday: Masses at 8:00 AM, 10:00 AM, 12:00 PM</p>
    `,
    date: "2023-06-04",
    isPublic: true,
    isNew: false,
    pdfUrl: "/bulletins/june-4-2023.pdf",
    createdAt: "2023-06-02T10:00:00Z",
    updatedAt: "2023-06-02T10:00:00Z",
  },
  {
    id: "3",
    title: "Weekly Bulletin - May 28, 2023",
    content: `
      <h2>Pastor's Message</h2>
      <p>Dear Parishioners,</p>
      <p>As we approach the end of the Easter season, let us continue to live as Easter people, filled with the joy of the Resurrection.</p>
      <p>God bless you all,</p>
      <p>Fr. Michael</p>
      
      <h2>Announcements</h2>
      <ul>
        <li>The parish office will be closed on Monday for Memorial Day.</li>
        <li>First Friday Adoration will be held this Friday from 9:00 AM to 3:00 PM.</li>
        <li>The Women's Guild will be hosting a bake sale after all Masses next weekend.</li>
      </ul>
      
      <h2>Weekly Schedule</h2>
      <p>Monday - Friday: Daily Mass at 6:30 AM</p>
      <p>Wednesday: Adoration at 7:00 PM</p>
      <p>Saturday: Confessions 3:30-4:30 PM, Vigil Mass 5:00 PM</p>
      <p>Sunday: Masses at 8:00 AM, 10:00 AM, 12:00 PM</p>
    `,
    date: "2023-05-28",
    isPublic: true,
    isNew: false,
    pdfUrl: "/bulletins/may-28-2023.pdf",
    createdAt: "2023-05-26T10:00:00Z",
    updatedAt: "2023-05-26T10:00:00Z",
  },
]

// Simulated API functions
export async function fetchPublicEvents(): Promise<EventType[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would be an API call to the server
  return mockEvents.filter((event) => event.isPublic)
}

export async function fetchPublicBulletins(): Promise<BulletinType[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would be an API call to the server
  return mockBulletins.filter((bulletin) => bulletin.isPublic)
}

export async function fetchUserSacraments(userId: string): Promise<SacramentType[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would be an API call to the server
  return []
}

export async function fetchUserEvents(userId: string): Promise<EventType[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would be an API call to the server
  return []
}

export async function fetchUserProfile(userId: string): Promise<UserType | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would be an API call to the server
  return null
}

