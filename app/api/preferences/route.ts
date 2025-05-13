import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Fetch user preferences
    const preferences = await db.collection("userPreferences").findOne({
      userId: new ObjectId(userId),
    })

    if (!preferences) {
      return NextResponse.json(
        {
          error: "Preferences not found",
          preferences: null,
        },
        { status: 404 },
      )
    }

    return NextResponse.json({ preferences })
  } catch (error) {
    console.error("Error fetching preferences:", error)
    return NextResponse.json({ error: "Failed to fetch preferences" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { userId, ...preferences } = data

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Add timestamps
    const userPreferences = {
      ...preferences,
      userId: new ObjectId(userId),
      updatedAt: new Date(),
    }

    // Check if preferences already exist
    const existingPreferences = await db.collection("userPreferences").findOne({
      userId: new ObjectId(userId),
    })

    if (existingPreferences) {
      // Update existing preferences
      await db
        .collection("userPreferences")
        .updateOne({ userId: new ObjectId(userId) }, { $set: { ...userPreferences } })
    } else {
      // Create new preferences
      userPreferences.createdAt = new Date()
      await db.collection("userPreferences").insertOne(userPreferences)
    }

    return NextResponse.json({
      success: true,
      message: "Preferences saved successfully",
    })
  } catch (error) {
    console.error("Error saving preferences:", error)
    return NextResponse.json({ error: "Failed to save preferences" }, { status: 500 })
  }
}
