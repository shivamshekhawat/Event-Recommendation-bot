import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const category = url.searchParams.get("category")
    const search = url.searchParams.get("search")
    const location = url.searchParams.get("location")

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Build query based on parameters
    const query: any = {}

    if (category) {
      query.category = category
    }

    if (location) {
      query.location = { $regex: location, $options: "i" }
    }

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    // Fetch events from MongoDB
    const events = await db.collection("events").find(query).toArray()

    return NextResponse.json({ events })
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const eventData = await req.json()

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Add timestamps
    const event = {
      ...eventData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert event into MongoDB
    const result = await db.collection("events").insertOne(event)

    return NextResponse.json({
      success: true,
      eventId: result.insertedId,
      message: "Event created successfully",
    })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
