import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json()

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({
      email: userData.email,
    })

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User with this email already exists",
        },
        { status: 400 },
      )
    }

    // Create new user
    const user = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert user into MongoDB
    const result = await db.collection("users").insertOne(user)

    // Create default preferences
    await db.collection("userPreferences").insertOne({
      userId: result.insertedId,
      categories: [],
      location: "",
      maxDistance: 25,
      notificationsEnabled: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      userId: result.insertedId,
      message: "User created successfully",
    })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const email = url.searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Find user by email
    const user = await db.collection("users").findOne({ email })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Don't return sensitive information
    const { password, ...safeUser } = user

    return NextResponse.json({ user: safeUser })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}
