// This is a script that would be run to seed the database with initial events
// In a real app, you would run this with: node -r ts-node/register scripts/seed-events.ts

import { connectToDatabase } from "../lib/mongodb"

const seedEvents = [
  {
    title: "Summer Music Festival",
    description: "A three-day music festival featuring top artists from around the world.",
    date: "July 15, 2025",
    time: "12:00 PM - 11:00 PM",
    location: "Central Park, New York",
    category: "Music",
    image: "/placeholder.svg?height=200&width=400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Tech Conference 2025",
    description: "Join industry leaders for discussions on the latest technology trends and innovations.",
    date: "August 5, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center, San Francisco",
    category: "Technology",
    image: "/placeholder.svg?height=200&width=400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Food & Wine Festival",
    description: "Sample delicious cuisine and fine wines from top chefs and wineries.",
    date: "June 20, 2025",
    time: "11:00 AM - 8:00 PM",
    location: "Waterfront Park, Chicago",
    category: "Food",
    image: "/placeholder.svg?height=200&width=400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Art Exhibition Opening",
    description: "Be among the first to see this stunning collection of contemporary art.",
    date: "July 10, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "Modern Art Gallery, Los Angeles",
    category: "Arts",
    image: "/placeholder.svg?height=200&width=400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Marathon for Charity",
    description: "Run for a cause in this annual marathon supporting local charities.",
    date: "September 12, 2025",
    time: "7:00 AM - 12:00 PM",
    location: "Downtown, Boston",
    category: "Sports",
    image: "/placeholder.svg?height=200&width=400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Networking Mixer",
    description: "Connect with professionals in your industry at this casual networking event.",
    date: "July 25, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Skyline Lounge, Seattle",
    category: "Networking",
    image: "/placeholder.svg?height=200&width=400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...")
    const { db } = await connectToDatabase()

    console.log("Connected to MongoDB. Seeding events...")

    // Clear existing events
    await db.collection("events").deleteMany({})

    // Insert seed events
    const result = await db.collection("events").insertMany(seedEvents)

    console.log(`Successfully seeded ${result.insertedCount} events`)
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

// Run the seed function
seedDatabase()
