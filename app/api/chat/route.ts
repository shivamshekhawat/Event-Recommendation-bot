import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(req: NextRequest) {
  try {
    const { messages, userId } = await req.json()

    // Get the last user message
    const lastUserMessage = messages.filter((msg: any) => msg.role === "user").pop()

    if (!lastUserMessage) {
      return NextResponse.json({ error: "No user message found" }, { status: 400 })
    }

    // Create the system prompt
    const systemPrompt = `You are Event Buddy, an AI assistant specialized in helping users find events based on their preferences.
Your job is to:
1. Understand the user's event preferences (types of events, location, etc.)
2. Ask clarifying questions to better understand their interests
3. Provide personalized event recommendations
4. Help users set up notifications for events they might like

You have access to events in major cities. When recommending events, be specific about the type, location, and date.
Keep your responses friendly, helpful, and focused on events. If you don't know specific events, ask for more information about preferences.

After each user message, extract any preferences they mention (categories, location, etc.) and include them in your analysis.`

    // Generate response using AI SDK
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      system: systemPrompt,
      prompt: lastUserMessage.content,
    })

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Store the conversation
    if (userId) {
      // Store user message
      await db.collection("chatMessages").insertOne({
        userId: new ObjectId(userId),
        role: "user",
        content: lastUserMessage.content,
        timestamp: new Date(),
      })

      // Store assistant message
      await db.collection("chatMessages").insertOne({
        userId: new ObjectId(userId),
        role: "assistant",
        content: text,
        timestamp: new Date(),
      })

      // Extract preferences from the conversation
      // This would be more sophisticated in a production app
      const preferenceKeywords = {
        categories: [
          "music",
          "concert",
          "festival",
          "sports",
          "game",
          "match",
          "art",
          "exhibition",
          "food",
          "dining",
          "technology",
          "tech",
          "outdoor",
          "hiking",
          "networking",
          "education",
          "class",
          "entertainment",
          "movie",
          "theater",
        ],
        locations: ["new york", "los angeles", "chicago", "san francisco", "boston", "seattle"],
      }

      // Simple preference extraction (would be more sophisticated in production)
      const lowerCaseMessage = lastUserMessage.content.toLowerCase()
      const extractedCategories = preferenceKeywords.categories.filter((keyword) => lowerCaseMessage.includes(keyword))

      const extractedLocations = preferenceKeywords.locations.filter((location) => lowerCaseMessage.includes(location))

      // If preferences were extracted, update user preferences
      if (extractedCategories.length > 0 || extractedLocations.length > 0) {
        const existingPreferences = await db.collection("userPreferences").findOne({
          userId: new ObjectId(userId),
        })

        if (existingPreferences) {
          const updates: any = { updatedAt: new Date() }

          if (extractedCategories.length > 0) {
            // Add new categories without duplicates
            const updatedCategories = [...new Set([...(existingPreferences.categories || []), ...extractedCategories])]
            updates.categories = updatedCategories
          }

          if (extractedLocations.length > 0) {
            // Use the first extracted location
            updates.location = extractedLocations[0]
          }

          await db.collection("userPreferences").updateOne({ userId: new ObjectId(userId) }, { $set: updates })
        } else if (extractedCategories.length > 0 || extractedLocations.length > 0) {
          // Create new preferences
          await db.collection("userPreferences").insertOne({
            userId: new ObjectId(userId),
            categories: extractedCategories,
            location: extractedLocations[0] || "",
            maxDistance: 25, // Default
            notificationsEnabled: false, // Default
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        }
      }
    }

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
